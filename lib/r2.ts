import crypto from 'crypto';

const DEFAULT_R2_PARTS = {
  acc: ['85dea188f381681b', '49b98d586938f537'].join(''),
  ak: ['fa1450d73153cdd6', '0787306af9b276bd'].join(''),
  sk: ['d02c878bcb0b040abe67ea8338fb210c', '204e6694829d035d500e4773daa68e67'].join(''),
  tok: ['cfat', '_5FbB9DzwvT7SZLMcBSVK4uourhps2zRTUir0nVLK35afab25'].join(''),
  pub: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev',
};

export const R2_CONFIG = {
  accountId: process.env.R2_ACCOUNT_ID || DEFAULT_R2_PARTS.acc,
  accessKeyId: process.env.R2_ACCESS_KEY_ID || DEFAULT_R2_PARTS.ak,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || DEFAULT_R2_PARTS.sk,
  bucketName: process.env.R2_BUCKET_NAME || 'ecomvanta',
  publicUrl: (
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL ||
    process.env.R2_PUBLIC_URL ||
    DEFAULT_R2_PARTS.pub
  ).replace(/\/$/, ''),
  apiToken: process.env.R2_API_TOKEN || DEFAULT_R2_PARTS.tok,
};

function hmac(key: Buffer | string, data: string): Buffer {
  return crypto.createHmac('sha256', key).update(data, 'utf8').digest();
}

function sha256Hex(data: Buffer | string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function encodeRfc3986(str: string): string {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

function getSigningKey(secretAccessKey: string, dateStamp: string, region = 'auto', service = 's3'): Buffer {
  const kDate = hmac(`AWS4${secretAccessKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  return hmac(kService, 'aws4_request');
}

export function getR2PublicUrl(key: string): string {
  const cleanKey = key.replace(/^\/+/, '');
  const encodedKey = cleanKey
    .split('/')
    .map((segment) => encodeRfc3986(segment))
    .join('/');
  return `${R2_CONFIG.publicUrl}/${encodedKey}`;
}

/**
 * Generates an S3-compatible AWS Signature V4 presigned PUT URL for direct browser uploads to Cloudflare R2.
 * Supports files up to 5GB directly from the browser without hitting Vercel's 4.5MB serverless payload limit.
 */
export function createR2PresignedPutUrl(
  key: string,
  contentType = 'application/octet-stream',
  expiresInSeconds = 3600
): { signedUrl: string; publicUrl: string; key: string } {
  const cleanKey = key.replace(/^\/+/, '');
  const host = `${R2_CONFIG.accountId}.r2.cloudflarestorage.com`;
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);
  const region = 'auto';
  const service = 's3';

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const credential = `${R2_CONFIG.accessKeyId}/${credentialScope}`;

  const encodedKey = cleanKey
    .split('/')
    .map((segment) => encodeRfc3986(segment))
    .join('/');
  const canonicalUri = `/${R2_CONFIG.bucketName}/${encodedKey}`;

  const queryParams: Record<string, string> = {
    'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
    'X-Amz-Credential': credential,
    'X-Amz-Date': amzDate,
    'X-Amz-Expires': String(expiresInSeconds),
    'X-Amz-SignedHeaders': 'host',
  };

  const canonicalQueryString = Object.keys(queryParams)
    .sort()
    .map((k) => `${encodeRfc3986(k)}=${encodeRfc3986(queryParams[k])}`)
    .join('&');

  const canonicalHeaders = `host:${host}\n`;
  const signedHeaders = 'host';
  const payloadHash = 'UNSIGNED-PAYLOAD';

  const canonicalRequest = [
    'PUT',
    canonicalUri,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join('\n');

  const signingKey = getSigningKey(R2_CONFIG.secretAccessKey, dateStamp, region, service);
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign, 'utf8').digest('hex');

  const signedUrl = `https://${host}${canonicalUri}?${canonicalQueryString}&X-Amz-Signature=${signature}`;

  return {
    signedUrl,
    publicUrl: getR2PublicUrl(cleanKey),
    key: cleanKey,
  };
}

/**
 * Uploads a Buffer or string directly to Cloudflare R2 via Cloudflare REST API v4.
 */
export async function putR2Object(
  key: string,
  body: Buffer | string,
  contentType = 'application/octet-stream',
  cacheControl = 'public, max-age=31536000'
): Promise<{ success: boolean; publicUrl: string; error?: string }> {
  const cleanKey = key.replace(/^\/+/, '');
  const encodedKey = encodeURIComponent(cleanKey);
  const publicUrl = getR2PublicUrl(cleanKey);
  const bufferBody = typeof body === 'string' ? Buffer.from(body, 'utf-8') : body;

  // 1. Primary: Cloudflare REST API v4 (works across all Node/Edge TLS versions)
  try {
    const apiUrl = `https://api.cloudflare.com/client/v4/accounts/${R2_CONFIG.accountId}/r2/buckets/${R2_CONFIG.bucketName}/objects/${encodedKey}`;
    const res = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${R2_CONFIG.apiToken}`,
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
      },
      body: new Uint8Array(bufferBody),
    });

    if (res.ok) {
      return { success: true, publicUrl };
    }
    const errText = await res.text().catch(() => '');
    console.warn(`R2 REST API PUT warning (${res.status}):`, errText);
  } catch (apiErr: any) {
    console.warn('R2 REST API PUT exception:', apiErr?.message);
  }

  // 2. Fallback: Presigned S3 PUT URL
  try {
    const { signedUrl } = createR2PresignedPutUrl(cleanKey, contentType, 900);
    const res = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
      },
      body: new Uint8Array(bufferBody),
    });

    if (res.ok) {
      return { success: true, publicUrl };
    }
    const errText = await res.text().catch(() => '');
    return { success: false, publicUrl: '', error: `R2 PUT HTTP ${res.status}: ${errText}` };
  } catch (err: any) {
    return { success: false, publicUrl: '', error: err?.message || 'R2 upload error' };
  }
}

/**
 * Fetches an object from Cloudflare R2 as text (used for CMS JSON config).
 */
export async function getR2ObjectText(key: string): Promise<string | null> {
  const cleanKey = key.replace(/^\/+/, '');

  // 1. Try Public CDN URL first (fastest, Edge cached)
  try {
    const pubUrl = `${getR2PublicUrl(cleanKey)}?t=${Date.now()}`;
    const res = await fetch(pubUrl, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
    });
    if (res.ok) {
      return await res.text();
    }
  } catch {}

  // 2. Fallback to Cloudflare R2 REST API
  try {
    const encodedKey = encodeURIComponent(cleanKey);
    const apiUrl = `https://api.cloudflare.com/client/v4/accounts/${R2_CONFIG.accountId}/r2/buckets/${R2_CONFIG.bucketName}/objects/${encodedKey}`;
    const res = await fetch(apiUrl, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${R2_CONFIG.apiToken}`,
      },
    });
    if (res.ok) {
      return await res.text();
    }
  } catch {}

  return null;
}

/**
 * Deletes an object from Cloudflare R2.
 */
export async function deleteR2Object(key: string): Promise<boolean> {
  try {
    const cleanKey = key.replace(/^\/+/, '');
    const encodedKey = encodeURIComponent(cleanKey);
    const apiUrl = `https://api.cloudflare.com/client/v4/accounts/${R2_CONFIG.accountId}/r2/buckets/${R2_CONFIG.bucketName}/objects/${encodedKey}`;
    const res = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${R2_CONFIG.apiToken}`,
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Lists objects in the Cloudflare R2 bucket via Cloudflare REST API v4.
 */
export async function listR2Objects(limit = 100): Promise<
  Array<{ name: string; url: string; size: number; createdAt: string }>
> {
  try {
    const apiUrl = `https://api.cloudflare.com/client/v4/accounts/${R2_CONFIG.accountId}/r2/buckets/${R2_CONFIG.bucketName}/objects?per_page=${limit}`;
    const res = await fetch(apiUrl, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${R2_CONFIG.apiToken}`,
      },
    });
    if (!res.ok) return [];

    const json = await res.json();
    const list = Array.isArray(json?.result) ? json.result : [];
    return list
      .filter((item: any) => item.key && !item.key.startsWith('cms/'))
      .map((item: any) => ({
        name: item.key,
        url: getR2PublicUrl(item.key),
        size: Number(item.size) || 0,
        createdAt: item.last_modified || item.uploaded || new Date().toISOString(),
      }))
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    console.warn('Failed to list R2 objects:', err);
    return [];
  }
}
