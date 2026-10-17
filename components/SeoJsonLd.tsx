import React from 'react';
import { getRouteJsonLdScripts } from '@/lib/seoServer';

export default async function SeoJsonLd({ urlPath }: { urlPath: string }) {
  const schemas = await getRouteJsonLdScripts(urlPath);
  if (!schemas || schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={`jsonld-${schema['@type'] || idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
