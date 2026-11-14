export interface ServiceData {
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  heroImage: string;
  aboutImage?: string;
  aboutTitle: string;
  aboutDesc: string;
  servicesHeading?: string;
  servicesSubheading?: string;
  longContentHtml?: string;
  seoTitle?: string;
  metaDescription?: string;
  servicesGrid: {
    icon: string;
    title: string;
    desc: string;
  }[];
  advantages: {
    icon?: string;
    title: string;
    desc: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SERVICES_DATABASE: Record<string, ServiceData> = {
  'amazon-seller-account-management-services': {
    slug: 'amazon-seller-account-management-services',
    badge: 'Ecomvanta · Amazon.in Marketplace Operations',
    title: 'Amazon Account Management Services in India',
    seoTitle: 'Amazon Account Management Services in India | Ecomvanta',
    metaDescription: 'Amazon account management services for Indian sellers: listings, ads, FBA, orders and account health. See the scope and request a free audit call.',
    subtitle: "Running an Amazon seller account is daily work. Listings need upkeep, stock needs planning, ads need tuning, orders need tracking, and account-health alerts need answers. Ecomvanta's Amazon account management services take that routine work off your team. The account stays in your name and under your control. We work with Amazon.in sellers, brands and manufacturers from our team in New Delhi. Scope covers Seller Central handling, A+ catalogue content, FBA inventory planning and Sponsored Ads, depending on what you need.",
    heroImage: '/home-img/Amazon-account-management.webp',
    aboutImage: '/service-img/Amazon-left-img.png',
    aboutTitle: 'What Are Amazon Account Management Services?',
    aboutDesc: "Amazon account management services mean a team handles the recurring operations of your Seller Central account on your behalf. Typical areas are listings, inventory, orders, advertising, account health and reporting. The exact scope is agreed upfront, because no two sellers need the same mix. There is one limit worth stating plainly. A provider works inside Amazon's rules. It does not control Amazon's decisions regarding approvals, restrictions, or suspensions.",
    servicesHeading: 'Amazon Seller Account Management Services We Offer',
    servicesSubheading: 'Every seller gets a scope matched to the account rather than a fixed bundle. Here is what we can include.',
    longContentHtml: `
<h2>Managing it yourself vs. hiring a provider</h2>
<table>
  <thead>
    <tr>
      <th>Comparison Factor</th>
      <th>Self-managed</th>
      <th>With a provider</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Time</strong></td>
      <td>Your hours, every week</td>
      <td>Your operational hours shift to the provider's team</td>
    </tr>
    <tr>
      <td><strong>Skills</strong></td>
      <td>You learn Seller Central, ads and policies as you go</td>
      <td>You get a team that handles these tasks daily</td>
    </tr>
    <tr>
      <td><strong>Cost</strong></td>
      <td>No service fee; your time and any mistakes</td>
      <td>Monthly service fee</td>
    </tr>
    <tr>
      <td><strong>Control</strong></td>
      <td>Full</td>
      <td>Full ownership, shared day-to-day work</td>
    </tr>
    <tr>
      <td><strong>Best for</strong></td>
      <td>Small catalogues and sellers who want to learn</td>
      <td>Larger catalogues, significant ad spend, or limited time</td>
    </tr>
  </tbody>
</table>

<h2>Who Needs Amazon Seller Account Management Services?</h2>
<ul>
  <li><strong>Established sellers</strong> whose sales have flattened and whose catalogue, ads and stock have grown past what one person can watch.</li>
  <li><strong>Growing brands</strong> adding SKUs and variations, where catalogue errors and stockouts become expensive.</li>
  <li><strong>Manufacturers and distributors</strong> new to Amazon who know their product but not Seller Central, Brand Registry or FBA planning.</li>
  <li><strong>Multi-channel sellers</strong> running Amazon alongside Flipkart, Meesho or their own website, who want one team across channels.</li>
  <li><strong>Anyone buried in operations:</strong> ticket follow-ups, return queries, ad bids and listing fixes that eat the time meant for sourcing and strategy.</li>
</ul>
<p><strong>Who may not need it yet:</strong> a seller with a handful of products and spare time can run the account alone for a few weeks first. They will hire better afterwards.</p>

<h2>Benefits of Professional Amazon Account Management</h2>
<ul>
  <li>Operations follow a routine instead of relying on reactive work.</li>
  <li>The catalogue stays consistent across listings and variations.</li>
  <li>Stock and order processes become more structured.</li>
  <li>You see performance issues earlier, with ads, returns, and sales in one report.</li>
  <li>Your hours go back to product and strategy.</li>
  <li>Growth decisions are based on data.</li>
</ul>
<p><strong>What this does not mean:</strong> More sales are not guaranteed. Outcomes depend on product demand, pricing, competition, stock, ads, reviews and Amazon's policies. A provider improves how you operate. It cannot change those factors.</p>

<h2>How Amazon Seller Central Account Management Works</h2>
<ol>
  <li><strong>Account audit call.</strong> We review your listings, ads, inventory and account-health alerts, along with your goals.</li>
  <li><strong>Scope and plan.</strong> You get a written scope of what we will handle, what we will not, and the fee.</li>
  <li><strong>Access setup.</strong> You grant access through Amazon's own permission tools.</li>
  <li><strong>Implementation.</strong> We carry out the agreed tasks, starting with the highest-impact fixes.</li>
  <li><strong>Monitoring and reporting.</strong> You get regular KPI reports and a named contact.</li>
  <li><strong>Periodic review.</strong> We review results and agree what changes next.</li>
</ol>

<h3>How access to your account works</h3>
<p>Your account stays yours. Amazon's guidance is not to share your password, and to give each person only the permissions they need. External providers should be added as authorized partners rather than as ordinary users. We guide you through the current steps in Seller Central.</p>

<h3>What does a dedicated Amazon account manager do?</h3>
<p>Your Amazon account manager is the person who knows your account. They watch alerts and orders, run the weekly routine, raise cases with Amazon and report back, always within the permissions you grant.</p>

<h2>Why Choose Ecomvanta?</h2>
<ul>
  <li>A team based in New Delhi, serving Indian sellers across Amazon, Flipkart, Meesho, Myntra and quick-commerce platforms.</li>
  <li>Founder-led. Shivam Dubey leads the company. Read more on our <a href="/founder">founder page</a>.</li>
  <li>Regular KPI reporting, so you see what changed and why.</li>
  <li>A free account audit call before you commit to anything.</li>
  <li>One team across channels. If you also sell on Flipkart, see our <a href="/flipkart-account-management-services">Flipkart account management services</a>.</li>
</ul>

<h3>How to choose the best Amazon account management services</h3>
<p>Whoever you hire, check these six things:</p>
<ol>
  <li><strong>Account ownership:</strong> your email, mobile number and GST stay on the account.</li>
  <li><strong>Written scope:</strong> SKU count, campaigns, order handling and reporting.</li>
  <li><strong>Fee clarity:</strong> flat or tied to sales or ad spend, and whether ad budget is separate.</li>
  <li><strong>A sample report</strong> before signing.</li>
  <li><strong>A named contact</strong> and response times in writing.</li>
  <li><strong>No guarantees</strong> about rankings, sales, or reinstatement.</li>
</ol>

<h2>Amazon Account Management Pricing</h2>
<p>We quote after the audit call because the fee depends on the account. The main pricing factors are:</p>
<ul>
  <li>Number of products and variations</li>
  <li>Account complexity and current condition</li>
  <li>Scope: listings only, or ads, inventory and orders too</li>
  <li>Advertising management requirements</li>
  <li>Reporting and communication needs</li>
  <li>Marketplace and business scale</li>
</ul>
<p><strong>Keep three costs separate.</strong> Our service fee pays for the work. Amazon's own selling and fulfilment fees go to Amazon. Advertising spend also goes to Amazon. Ask any provider to confirm in writing that the fee excludes ad budget.</p>
<p><strong>A quick break-even check (illustrative numbers only):</strong> if a service fee is ₹10,000 a month and your net margin is 12%, you need roughly ₹83,000 of extra monthly sales, or equivalent savings, to cover it. We will walk through this with your real numbers.</p>
<p><a href="#quote">Request a Customized Quote</a></p>

<h2>Talk to Ecomvanta About Your Amazon Account</h2>
<p>Tell us about your products, your account's current state and your goals. We will show you what we would look at first and what it would cost, before you commit to anything.</p>
<p><a href="#audit">Request a Free Account Audit Call</a> | <a href="https://wa.me/918787249407?text=Hi%20EcomVanta%2C%20I%20want%20to%20enquire%20about%20Amazon%20Account%20Management">WhatsApp us: +91 878 724 9407</a></p>
`.trim(),
    servicesGrid: [
      {
        icon: '/brand-img/report.png',
        title: 'Account setup and onboarding',
        desc: 'The problem: Registration, Brand Registry, GTIN exemptions, category approvals and tax settings stall new sellers. What we do: Prepare the documents, submit the requests, and configure the settings. What to expect: Amazon decides on approvals. We do not control the outcome.',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'Listing and catalogue optimisation',
        desc: 'The problem: Weak titles, bullets and images cost visibility and clicks. What we do: Rewrite titles and bullets around buyer search terms, prepare compliant images and A+ Content, and keep variations tidy. What to expect: Cleaner, more consistent listings. Search rank also depends on demand, price, reviews and competition. For deeper listing work, see our <a href="/amazon-product-listing-catalogue-services">Amazon product listing and catalogue services</a>.',
      },
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Amazon advertising (PPC)',
        desc: 'The problem: Ad spend leaks into search terms that do not convert. What we do: Run Sponsored Products, Sponsored Brands and Display campaigns, prune keywords, add negatives and adjust bids by placement. What to expect: Regular reporting on ad cost against ad-attributed sales. Results vary by category and competition.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'Inventory and order management in your Amazon seller account',
        desc: 'The problem: Stockouts lose sales. Overstock and stranded units cost money. What we do: Forecast replenishment, create inbound shipment plans, fix stranded inventory, and monitor orders, cancellations and return queries within the access you grant. What to expect: More predictable stock and faster follow-up. You remain responsible for physical supply and, if you ship yourself, dispatch.',
      },
      {
        icon: '/brand-img/policy.png',
        title: 'Account health and policy issue support',
        desc: "The problem: Policy warnings, listing suppressions and customer-experience defects can threaten sales. What we do: Monitor account health, find the cause of an alert, and prepare documented responses to Amazon. What to expect: Faster, better-prepared responses. We cannot guarantee any reinstatement or restriction removal. That is Amazon's decision.",
      },
      {
        icon: '/brand-img/spending.png',
        title: 'Pricing, Buy Box and promotions',
        desc: 'The problem: Prices drift against competitors and promotions run without a plan. What we do: Benchmark competitor pricing, monitor Buy Box status, and plan coupons and deals. What to expect: Informed pricing decisions. Buy Box ownership depends on price, stock, fulfilment and performance, so we cannot promise it.',
      },
      {
        icon: '/brand-img/customer-service.png',
        title: 'Reviews and seller feedback',
        desc: "The problem: Low ratings and unanswered feedback hurt conversion. What we do: Enrol eligible products in programmes such as Amazon Vine, manage seller feedback, and keep buyer messaging within Amazon's rules. What to expect: A compliant process. We do not buy or incentivise reviews. See also our <a href=\"/ecommerce-rating-and-review-management-services\">rating and review management services</a>.",
      },
      {
        icon: '/brand-img/data.png',
        title: 'Brand Store and reporting',
        desc: 'The problem: Sellers cannot tell what is working. What we do: Build Brand Stores and share KPI reports covering sales rank, conversion and margin signals. A+ creative is supported by our <a href="/graphic-design-company-in-india">graphic and A+ design team</a>. What to expect: Regular reviews and clear next steps.',
      },
    ],
    advantages: [],
    faqs: [
      {
        question: 'What are Amazon account management services?',
        answer: 'They are done-for-you support where a team handles recurring Seller Central work such as listings, inventory, orders, ads, account health and reporting. The scope is agreed in advance, and you keep ownership of the account.',
      },
      {
        question: 'What does an Amazon account manager do?',
        answer: 'An Amazon account manager monitors your account daily, carries out the agreed tasks, raises cases with Amazon, and reports performance. They act within the permissions you grant.',
      },
      {
        question: 'What is included in Amazon seller account management services?',
        answer: 'That depends on the plan. Common areas are account setup, listing optimisation, advertising, inventory and order support, account-health monitoring, pricing and promotions, and reporting. We agree this in writing before starting.',
      },
      {
        question: 'Can an Amazon account manager help manage seller orders?',
        answer: "Yes, within the access you grant. That can include tracking orders, inbound shipments, cancellations and return queries. They cannot control Amazon's delivery, and stock and dispatch (for self-shipped orders) stay your responsibility.",
      },
      {
        question: 'How do I choose an Amazon Seller Central account manager?',
        answer: "Check account ownership, written scope, fee clarity, a sample report, a named contact, and the absence of guarantees. If a provider claims Amazon SPN status, verify it in Amazon's own directory.",
      },
      {
        question: 'How much do Amazon account management services cost in India?',
        answer: "It varies based on product count, scope, advertising, and reporting needs. We do not publish a flat price because it would mislead. We quote after reviewing your account. Amazon's fees and ad spend are separate.",
      },
      {
        question: 'Can a service guarantee more Amazon sales?',
        answer: "No. A provider can improve how the account runs, but sales depend on demand, price, competition, stock, reviews and Amazon's policies. Be cautious of anyone who guarantees results.",
      },
      {
        question: 'How do I get started with Ecomvanta?',
        answer: 'Request a free account audit call through our <a href="/contact-us">contact page</a> or WhatsApp on +91 878 724 9407. We review your account, discuss your goals, and suggest a suitable scope. You decide whether to proceed.',
      },
    ],
  },

  'flipkart-account-management-services': {
    slug: 'flipkart-account-management-services',
    badge: 'EcomVanta · Flipkart Marketplace Operations',
    title: 'Flipkart Account Management Services in India',
    seoTitle: 'Flipkart Account Management Services in India | EcomVanta',
    metaDescription: 'Running a Flipkart seller account requires consistent attention to listings, advertising, inventory, orders, returns, pricing and account health. Talk to our Flipkart team.',
    subtitle: 'Running a Flipkart seller account requires consistent attention to listings, advertising, inventory, orders, returns, pricing and account health. EcomVanta provides end-to-end Flipkart account management support so you can focus on your products, supply chain and business growth while our team manages the day-to-day marketplace operations.',
    heroImage: '/flipkart-account/product-dashboard.png',
    aboutImage: '/abt-img/flipkart-web-about.png',
    aboutTitle: 'What Are Flipkart Account Management Services?',
    aboutDesc: 'Flipkart account management is a done-for-you marketplace management service in which an experienced team handles the day-to-day operational work inside your Flipkart Seller Hub account. This can include product listings, Flipkart SEO, advertising, inventory coordination, orders, returns, pricing, promotions and account-health monitoring. You remain the account owner and retain control of your business. EcomVanta manages the repetitive operational work, identifies issues and helps keep the account organised and performance-focused.',
    servicesHeading: 'Our Flipkart Seller Account Management Services',
    longContentHtml: `
<h2>How Our Flipkart Account Management Process Works</h2>
<ol>
  <li><strong>Account Review</strong> — We review your recent account performance, including sales, return reasons, advertising performance and inactive or flagged listings.</li>
  <li><strong>Priority Plan</strong> — We identify the most important issues, explain what should be fixed first and share the proposed scope and commercial terms before work begins.</li>
  <li><strong>Optimisation &amp; Setup</strong> — We improve listings, restructure or optimise campaigns where required, and organise inventory and return-handling processes.</li>
  <li><strong>Ongoing Management &amp; Reporting</strong> — We manage the account on an ongoing basis and provide regular performance reporting and improvement priorities.</li>
</ol>

<h2>Flipkart Account Management Charges: How Pricing Works</h2>
<p>Our management fee depends on the scope of work. Factors may include the number of SKUs, advertising requirements, catalogue complexity and the level of order and return support required. We recommend defining the scope clearly before finalising the monthly fee.</p>
<p>Any marketplace fees and advertising budgets are clearly separated from the agency management fee.</p>

<h3>Keep These Costs Separate</h3>
<ul>
  <li><strong>Management Fee</strong> — The fee paid to EcomVanta for the agreed account-management services.</li>
  <li><strong>Flipkart Marketplace Fees</strong> — Applicable selling, commission, shipping, collection and other marketplace charges. Rates can vary, so sellers should check the latest applicable charges in their Flipkart seller account.</li>
  <li><strong>Advertising Budget</strong> — The amount allocated to Flipkart advertising campaigns. This is separate from the EcomVanta management fee.</li>
</ul>

<h3>Do a Break-Even Check Before You Hire Anyone</h3>
<p>Consider the management fee against the incremental contribution your business expects from better operations, improved advertising efficiency, reduced cancellations or returns, and other measurable improvements.</p>
<p>For example, if a management fee is ₹10,000 per month and your contribution margin after product cost and marketplace fees is 12%, you would need approximately ₹83,333 in additional monthly sales to generate ₹10,000 of contribution. This is an illustrative example only, not a promise of results.</p>

<h2>Flipkart Seller Support or an Account Manager: Which Do You Need?</h2>
<p>For a single marketplace issue, you can use the support options available inside your Flipkart Seller Hub account. An account-management service is more useful when you have recurring operational work such as catalogue updates, advertising optimisation, return management, ticket follow-ups, pricing and ongoing performance monitoring.</p>
<p>If you only need to resolve an occasional issue, handling it directly through Seller Hub may be sufficient. If your team is spending significant time on marketplace operations every week, professional account management can help organise and streamline the workload.</p>

<h2>Is Flipkart Account Management Right for Your Business?</h2>
<h3>It may be a good fit if:</h3>
<ul>
  <li>You run marketplace advertising but need clearer visibility into ad performance, returns and profitability.</li>
  <li>You have a large catalogue that is difficult to maintain manually.</li>
  <li>Your team spends significant time on tickets, returns, listing updates and marketplace operations instead of focusing on sourcing and growth.</li>
</ul>

<h3>It may not be the right fit if:</h3>
<ul>
  <li>Your GST, brand authorisation or sourcing setup is not ready. We can guide the process, but we cannot create approvals or rights you do not hold.</li>
  <li>You expect a guaranteed ranking, sales figure or specific marketplace outcome. Marketplace results depend on multiple factors, and EcomVanta does not guarantee sales.</li>
  <li>You have a small catalogue and enough internal time to manage Seller Hub yourself.</li>
  <li>You want purchased or fake reviews. EcomVanta does not provide or recommend such practices.</li>
</ul>

<h2>What You Can Expect When You Work With EcomVanta</h2>
<ul>
  <li>You retain ownership and control of your Flipkart seller account.</li>
  <li>Your account scope, responsibilities and commercial terms are clearly defined before work begins.</li>
  <li>You receive clear performance reporting covering agreed marketplace metrics.</li>
  <li>We focus on the work and operational improvements we can control; actual results depend on your category, competition, pricing, stock, account condition and marketplace environment.</li>
  <li>No fake or purchased reviews.</li>
</ul>

<h2>Flipkart Account Management Services — Contact EcomVanta</h2>
<p>For enquiries, reach our official Flipkart account management team directly:</p>
<ul>
  <li><strong>Phone:</strong> <a href="tel:+918787249407">+91 878 724 9407</a></li>
  <li><strong>WhatsApp:</strong> <a href="https://wa.me/918787249407?text=Hi%20EcomVanta%2C%20I%20want%20to%20enquire%20about%20Flipkart%20Account%20Management">+91 878 724 9407</a></li>
  <li><strong>Email:</strong> <a href="mailto:ecomvanta40@gmail.com">ecomvanta40@gmail.com</a></li>
  <li><strong>Working Hours:</strong> 9:00 AM to 7:00 PM (Mon - Sat)</li>
</ul>
<p><strong>Security Notice:</strong> For account-security reasons, never share your OTP, Seller Hub password, UPI PIN or other sensitive credentials with anyone claiming to be a marketplace representative.</p>

<h2>Get Your Flipkart Account Reviewed by EcomVanta</h2>
<p>Share your recent account performance, including sales, advertising results, return reasons and key operational challenges. EcomVanta can identify priority areas for improvement and propose an appropriate management scope and commercial plan.</p>
<p><a href="#audit">Talk to Our Flipkart Team →</a></p>
`.trim(),
    servicesGrid: [
      {
        icon: '/brand-img/report.png',
        title: 'Flipkart Seller Account Setup & Brand Approval',
        desc: 'New to Flipkart? We guide you through seller registration and help you prepare the required GST, PAN and brand-authorisation documents. Where brand approval is required, we guide you through the applicable process using genuine business documents. Approval decisions remain with Flipkart.',
      },
      {
        icon: '/Flipkart Product listing optimisation.png',
        title: 'Product Listing Optimisation & Flipkart SEO',
        desc: 'We optimise product titles, attributes, category mapping, images and other catalogue elements to improve listing quality and search relevance while following Flipkart catalogue requirements. Clean and accurate listings also help reduce avoidable catalogue issues.',
      },
      {
        icon: '/Flipkart Advertising campaigns.png',
        title: 'Flipkart Ads Management',
        desc: 'We set up and manage sponsored campaigns, monitor ad spend and ad sales, and optimise bids and budgets based on performance. Your advertising budget is paid to Flipkart; our management fee is separate and covers the work performed by our team.',
      },
      {
        icon: '/Flipkart Inventory management.png',
        title: 'Inventory, Order & Return Management',
        desc: 'We coordinate inventory visibility with marketplace operations to reduce avoidable stock-outs and order cancellations. We review return and cancellation reasons and, where applicable, help raise claims with the required supporting evidence.',
      },
      {
        icon: '/Flipkart Competitor analysis.png',
        title: 'Pricing, Deals & Promotions',
        desc: 'We review market pricing and competitor positioning and help plan suitable deals, offers and promotions while keeping profitability in focus. Promotional decisions are aligned with your pricing and margin objectives.',
      },
      {
        icon: '/Flipkart Account health.png',
        title: 'Account Health & Suspension Support',
        desc: 'We monitor policy warnings, account-health issues and rating changes, identify potential causes and help prepare documented responses or appeals where required. Flipkart makes the final decision on restrictions, reinstatement or other account actions; therefore, no reinstatement guarantee is offered.',
      },
      {
        icon: '/Flipkart Performance monitoring.png',
        title: 'Monthly Performance Reporting',
        desc: 'You receive a clear monthly report covering key marketplace metrics such as sales, advertising spend and return rate. Reviewing these metrics together provides a better view of account performance than looking at sales alone.',
      },
    ],
    advantages: [],
    faqs: [
      {
        question: 'What do Flipkart account management services include?',
        answer: 'Depending on the agreed plan, services can include listing optimisation, Flipkart SEO, advertising management, inventory coordination, order and return support, pricing and promotions, account-health monitoring and reporting.',
      },
      {
        question: 'How much do Flipkart account management services cost in India?',
        answer: 'Pricing depends on the number of SKUs, account complexity, advertising scope and operational requirements. EcomVanta can provide a quote after reviewing the account and defining the required scope. Marketplace fees and advertising budgets should be treated separately.',
      },
      {
        question: 'Can I manage my Flipkart account myself?',
        answer: 'Yes. For a small catalogue and limited operational requirements, self-management can be practical. Professional management becomes more valuable as listings, advertising, tickets, returns and daily marketplace tasks increase.',
      },
      {
        question: 'Will I lose control of my Flipkart account?',
        answer: 'No. You remain the account owner. EcomVanta provides management support within the scope and access permissions agreed with you.',
      },
      {
        question: 'How long before I see results?',
        answer: 'There is no universal timeline because results depend on the category, competition, pricing, stock availability, account condition and other marketplace factors. At the beginning of the engagement, agree on measurable KPIs and review them regularly.',
      },
      {
        question: 'Do you guarantee more sales?',
        answer: 'No. EcomVanta does not guarantee a specific sales figure, ranking or marketplace outcome. We commit to the agreed scope of work, optimisation activities and reporting.',
      },
    ],
  },

  'meesho-account-management-services': {
    slug: 'meesho-account-management-services',
    badge: 'Zero Commission Marketplace Growth',
    title: 'Meesho Seller Account Management Services in India',
    seoTitle: 'Meesho Seller Account Management Services in India | Ecomvanta',
    metaDescription: 'Meesho seller account management services for Indian sellers, including account setup, orders, inventory, ads and reporting. Request a free account audit call.',
    subtitle: "Selling on Meesho looks simple at the start. Register, upload a catalogue, ship orders. The workload builds up fast: stock that drifts out of sync, orders to dispatch on time, returns to follow up, ads to tune, and a seller panel that needs checking every day. Ecomvanta's Meesho seller account management services take that routine work off your plate while the account stays in your name. We work with Indian Meesho sellers, manufacturers and brands, from our team in New Delhi. Whether you are opening your first account or running a growing catalogue, we agree a scope with you first and then handle the day-to-day operations inside it.",
    heroImage: '/Meesho/meesho-web-about.webp',
    aboutImage: '/Meesho/Meesho Product Listing Services.webp',
    aboutTitle: 'What Are Meesho Seller Account Management Services?',
    aboutDesc: "Meesho seller account management services involve a team handling the recurring operations of your Meesho Supplier Panel account on your behalf. This usually covers account setup, order and inventory follow-up, advertising, pricing checks, issue identification and reporting. The exact scope is agreed before work starts. Meesho's Supplier Panel can be managed yourself, and many sellers do this when they start. The difference with a provider is time and routine. A team that reviews your account regularly can spot a stock mismatch or a declining metric earlier than someone checking between other responsibilities. One limit is worth stating plainly: a provider works within Meesho's rules and does not have special access to Meesho or control over its decisions.",
    longContentHtml: `
<h2>Managing it yourself vs. getting account management support</h2>
<table>
  <thead>
    <tr>
      <th>Comparison Factor</th>
      <th>Self-managed</th>
      <th>With a provider</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Time</strong></td>
      <td>Your hours, daily</td>
      <td>Handled by the provider's team</td>
    </tr>
    <tr>
      <td><strong>Skills</strong></td>
      <td>You learn the panel, ads and policies as you go</td>
      <td>You get people who work on Meesho accounts regularly</td>
    </tr>
    <tr>
      <td><strong>Cost</strong></td>
      <td>No service fee; your time and the cost of mistakes</td>
      <td>Monthly service fee</td>
    </tr>
    <tr>
      <td><strong>Control</strong></td>
      <td>Full</td>
      <td>You keep ownership; day-to-day work is shared</td>
    </tr>
    <tr>
      <td><strong>Best for</strong></td>
      <td>Small catalogues and sellers who want to learn</td>
      <td>Growing catalogues and busy owners</td>
    </tr>
  </tbody>
</table>

<h2>Who Needs Meesho Account Management?</h2>
<ul>
  <li>New sellers who want help with registration, verification and a clean first setup instead of learning through avoidable errors or rejections.</li>
  <li>Existing sellers whose order volume, returns and stock updates have outgrown one person's available time.</li>
  <li>Manufacturers and brands that sell through Meesho alongside other channels and want one team coordinating their marketplace operations.</li>
  <li>Businesses selling on several marketplaces that need consistent stock and pricing across channels. See our <a href="/flipkart-account-management-services">Flipkart</a> and <a href="/amazon-seller-account-management-services">Amazon account management services</a> for those platforms.</li>
  <li>Sellers who want steadier operations, with the same checks done the same way every week.</li>
</ul>
<p>Not every seller needs this. If you have a small catalogue and time to spare, managing the account yourself for a few weeks can help you understand where you actually need support.</p>

<h2>Meesho Account Setup</h2>
<p>Meesho states that registration requires an active bank account and either a GSTIN (for GST sellers) or an Enrolment ID / UIN (for non-GST sellers). It also states that registration is completed through its supplier site and that it charges 0% commission. Rules for non-GST sellers differ from those for GST sellers, including where orders can be shipped, so check Meesho's current terms before choosing a route.</p>
<p><strong>Where Ecomvanta helps:</strong></p>
<ul>
  <li>Checking that your GST or Enrolment ID details, bank details and pickup address match before submission</li>
  <li>Walking you through the Supplier Panel after registration</li>
  <li>Preparing you for the first catalogue upload</li>
</ul>
<p>We do not decide approvals, and we do not promise timelines. Meesho does both.</p>

<h2>Ongoing Account Management and Meesho Seller Support</h2>
<p>After setup, the work is ongoing. We check the panel on a regular schedule, monitor orders and returns, keep stock figures current, review ads and report back.</p>
<p>When something goes wrong, such as a rejected catalogue, a payment query or a flagged account, we identify the cause, gather the right details and raise the issue through Meesho's own support channels with you. Meesho's team decides the outcome. We cannot promise any reinstatement, penalty reversal or uninterrupted account operation.</p>
<ul>
  <li><strong>What we manage directly:</strong> monitoring, follow-up, ad reviews, reporting.</li>
  <li><strong>What needs you or Meesho:</strong> product supply, packing and dispatch, final approvals, and decisions on rules and penalties.</li>
</ul>

<h2>Product Listing Is a Separate Service</h2>
<p>Catalogue and listing work can be part of account management when included in your agreed scope. Detailed work on titles, descriptions, attributes and images has its own service page. See our <a href="/ecommerce-product-listing-services">e-commerce product listing and cataloguing services</a> for more details. This page stays focused on running the account day to day.</p>

<h2>Benefits of Professional Meesho Account Management</h2>
<ul>
  <li>More organised day-to-day operations</li>
  <li>More consistent monitoring of orders, returns and stock</li>
  <li>Clearer workflows for who does what</li>
  <li>More structured reporting</li>
  <li>Less routine administration for you</li>
  <li>Better-informed decisions on pricing and advertising</li>
</ul>
<p><strong>What this does not mean:</strong> More sales are not guaranteed. Results depend on product demand, price, competition, stock, customer response, Meesho's rules and the scope of work we agree.</p>

<h2>How Ecomvanta's Meesho Account Management Process Works</h2>
<ol>
  <li><strong>Discussion.</strong> You tell us about your business, products and current account state.</li>
  <li><strong>Assessment.</strong> We review the account and operational needs.</li>
  <li><strong>Scope and responsibilities.</strong> We agree in writing what we handle, what you handle and the fee.</li>
  <li><strong>Access and onboarding.</strong> You give access in a controlled way, and we never ask you to share more than the work needs.</li>
  <li><strong>Delivery.</strong> We carry out the agreed account management work.</li>
  <li><strong>Reporting and review.</strong> You get regular reports and a periodic review of results and next steps.</li>
</ol>

<h2>How to choose a Meesho account management expert</h2>
<p>Whoever you hire, check five things:</p>
<ol>
  <li><strong>Account ownership:</strong> your registered details stay on the account.</li>
  <li><strong>Written scope:</strong> what is included, and what costs extra.</li>
  <li><strong>Fee clarity:</strong> flat or tied to sales, and whether ad budget is separate.</li>
  <li><strong>A sample report</strong> before you sign.</li>
  <li><strong>No guarantees</strong> about sales, rank or reinstatement.</li>
</ol>

<h2>Meesho Account Management Pricing</h2>
<p>We provide a quote after the audit call because the fee depends on the account. The main factors are:</p>
<ul>
  <li>Account complexity</li>
  <li>Number of products and operational requirements</li>
  <li>Level of ongoing support needed</li>
  <li>Reporting and communication needs</li>
  <li>The scope we agree</li>
</ul>
<p>Keep your costs separate. Our service fee covers the agreed work. Meesho's own charges are paid to Meesho. Meesho advertises 0% commission, but shipping and other charges can still apply, so check Meesho's pricing page for the current figures. Ad spend is also separate from our fee. Confirm in writing whether the service fee excludes ad spend.</p>
<p><a href="#audit">Request a Customised Quote</a></p>

<h2>Talk to Ecomvanta About Your Meesho Account</h2>
<p>Tell us about your products, your current account and what takes up most of your time. We will show you what we would review first and what it would cost before you commit to anything.</p>
<p><a href="#audit">Request a Free Account Audit Call</a> | <a href="https://wa.me/918787249407?text=Hi%20EcomVanta%2C%20I%20want%20to%20enquire%20about%20Meesho%20Account%20Management">WhatsApp us: +91 878 724 9407</a></p>
`.trim(),
    servicesGrid: [
      {
        icon: '/abt-img/Meesho Account set-up and verification.png',
        title: 'Account setup and onboarding',
        desc: 'The problem: Incorrect registration details, bank verification issues and pickup-address mismatches can delay new sellers. What we do: Guide you through registration, check your documents and details before submission, and help configure the account. What to expect: A cleaner start (Meesho verifies and approves accounts).',
      },
      {
        icon: '/abt-img/Meesho Inventory management.png',
        title: 'Order, inventory and daily operations',
        desc: 'The problem: Stock counts can drift out of sync, orders can wait too long to be dispatched, and cancellations can increase. What we do: Monitor orders, coordinate inventory updates across channels, and follow up on dispatch and return queries. What to expect: Fewer missed updates and quicker follow-up.',
      },
      {
        icon: '/abt-img/Meesho Advertising and promotion.png',
        title: 'Meesho Ads Management',
        desc: 'The problem: Ad budgets can be spent without a clear view of the results they generate. What we do: Set up and review Meesho Ads campaigns, allocate budgets and make adjustments based on results. What to expect: Regular review of ad spend against orders generated.',
      },
      {
        icon: '/abt-img/Meesho Performance monitoring.png',
        title: 'Price and competitor checks',
        desc: 'The problem: A price that is too high can reduce orders, while a price that is too low can erode margins. What we do: Benchmark your prices against similar products and flag where a change may be worth testing. What to expect: Better-informed pricing decisions; you make the final decision.',
      },
      {
        icon: '/abt-img/Meesho Order management.png',
        title: 'Reporting and review',
        desc: 'The problem: Sellers often cannot see which products and actions are actually working. What we do: Share regular reports on orders, returns and ad performance, and review next steps with you. What to expect: A clear picture of account performance, not a promise of fixed growth.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'New Delhi Team & Founder-Led',
        desc: 'A team based in New Delhi led by Shivam Dubey, serving Indian sellers across Meesho, Amazon, Flipkart, Myntra and quick-commerce platforms.',
      },
      {
        icon: '/css/Time efficiency (2).png',
        title: 'Written Scope & Regular Reporting',
        desc: 'Written scope and regular reporting, so you know what you are paying for, plus one team across marketplaces if your stock and pricing span several channels.',
      },
      {
        icon: '/css/Active issue resolution (2).png',
        title: 'Free Account Audit Call First',
        desc: 'A free account audit call before you commit to anything — we review your account, discuss your goals and suggest a scope while your details stay on the account.',
      },
    ],
    faqs: [
      {
        question: 'What are Meesho seller account management services?',
        answer: 'They are done-for-you services in which a team handles recurring work on your Meesho Supplier Panel account, such as setup assistance, order and inventory follow-up, advertising, pricing checks and reporting. The scope is agreed in advance, and you retain ownership of the account.',
      },
      {
        question: 'What does a Meesho account management expert do?',
        answer: "A Meesho account management expert checks your account regularly, carries out the agreed tasks, follows up on issues through Meesho's channels and reports on performance. They work within the access you provide.",
      },
      {
        question: 'Does Ecomvanta provide Meesho account setup assistance?',
        answer: 'Yes. We help you prepare your details, check them before submission and guide you through the Supplier Panel. Meesho decides on approval, and we cannot promise approval timelines.',
      },
      {
        question: 'What is included in Meesho seller support?',
        answer: 'On our side, it means monitoring your account, identifying issues, gathering details and raising them with Meesho on your behalf or alongside you, depending on the issue. Meesho operates its own supplier support and makes the final decisions.',
      },
      {
        question: 'Can account management include order-related operational support?',
        answer: "Yes, within the access you grant. This covers monitoring orders, coordinating stock updates and following up on dispatch and return queries. Packing and handover to Meesho's logistics remain your responsibility.",
      },
      {
        question: 'Are Meesho account management and product listing services the same?',
        answer: 'No. Account management covers the day-to-day running of your account. Product listing covers creating and improving catalogue content such as titles, descriptions, attributes and images. We keep these as separate services, and listing is included only if it is part of your agreed scope.',
      },
      {
        question: 'How much do Meesho account management services cost?',
        answer: "It depends on account complexity, the number of products, support level, reporting needs and agreed scope. We provide a quote after reviewing your account. Meesho's own charges and your ad spend are separate.",
      },
      {
        question: 'How do I enquire about Meesho account management services from Ecomvanta?',
        answer: 'Request a free account audit call through our contact page or WhatsApp at +91 878 724 9407. We review your account, discuss your goals and suggest a scope. You decide whether to proceed.',
      },
    ],
  },

  'shopify-store-management-services': {
    slug: 'shopify-store-management-services',
    badge: 'D2C Brand Scaling Experts',
    title: 'Shopify Store Management Services',
    subtitle: 'From high-converting custom UI/UX design to Meta/Google conversion ads and retention marketing, we build sustainable D2C businesses.',
    heroImage: '/Shopify/About (7).webp',
    aboutImage: '/Shopify/Shopify Seller Account Management Services.webp',
    aboutTitle: 'Scale Your Independent D2C Brand',
    aboutDesc: 'Own your customer data and build repeat brand loyalty. Our Shopify engineers and performance marketers handle store design, app integrations, and conversion rate optimization.',
    servicesGrid: [
      {
        icon: '/abt-img/Shopify Store set-up and customisation..png',
        title: 'Custom Store Design & Themes',
        desc: 'Fast, mobile-first responsive Shopify theme development optimized for checkout speed.',
      },
      {
        icon: '/abt-img/Shopify Product listing and inventory management.png',
        title: 'Catalog & Collection Setup',
        desc: 'Rich product landing pages, video media, size charts, and bundles.',
      },
      {
        icon: '/abt-img/Shopify Order processing and fulfilment.png',
        title: 'Logistics & 3PL Integration',
        desc: 'Integration with Shiprocket, Delhivery, Bluedart, and automated NDR workflows.',
      },
      {
        icon: '/abt-img/Shopify Customer support management.png',
        title: 'WhatsApp Automation & Retention',
        desc: 'Abandoned cart recovery, order tracking notifications, and WhatsApp CRM integration.',
      },
      {
        icon: '/abt-img/Shopify Performance analytics and reporting.png',
        title: 'Meta & Google Conversion Ads',
        desc: 'Targeted ROAS-focused ad campaigns driving qualified buyer traffic.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Certified Shopify Developers',
        desc: 'Custom Liquid theme modification and app optimization.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: 'Conversion Rate Optimization (CRO)',
        desc: 'A/B testing checkout funnels to elevate store conversion rates above 3.5%.',
      },
    ],
    faqs: [
      {
        question: 'Do you manage ads for Shopify stores?',
        answer: 'Yes! We run complete full-funnel Meta (Facebook/Instagram) and Google Performance Max campaigns to drive profitable D2C sales.',
      },
    ],
  },

  'blinkit-seller-account-management-services': {
    slug: 'blinkit-seller-account-management-services',
    badge: 'Quick Commerce 10-Minute Growth',
    title: 'Blinkit Account Management & Onboarding',
    subtitle: 'Launch and scale your brand on India’s leading 10-minute delivery platform with dark store inventory planning and brand visibility.',
    heroImage: '/zepto-page-images/Expand your brand with 10-minute commerce1.webp',
    aboutImage: '/zepto-page-images/What Is Zepto Seller Onboarding and Why Does It Matter1.webp',
    aboutTitle: 'Lead the Quick Commerce Revolution',
    aboutDesc: 'Consumers now demand instant 10-minute delivery. We handle complete Blinkit onboarding, city dark store inventory replenishment, and in-app sponsored ads.',
    servicesGrid: [
      {
        icon: '/brand-img/report.png',
        title: 'Blinkit Brand Onboarding',
        desc: 'Brand verification, agreement signing, FSSAI compliance, and catalog activation.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'Dark Store Stock Allocation',
        desc: 'Demand forecasting across micro-warehouses in Delhi NCR, Mumbai, Bangalore, Jaipur.',
      },
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Blinkit Sponsored Ads',
        desc: 'Category banner placements, search bar keyword targeting, and flash promotions.',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'Stockout Prevention & PO Tracking',
        desc: 'Real-time Purchase Order (PO) tracking and automated reordering schedules.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Dedicated Quick Commerce Team',
        desc: 'Experienced in daily dark store inventory logistics and instant delivery algorithms.',
      },
    ],
    faqs: [
      {
        question: 'What documents are required to sell on Blinkit?',
        answer: 'GST certificate, PAN card, FSSAI license (for food/supplements), trademark/brand authorization, and bank details.',
      },
    ],
  },

  'myntra-account-management-services': {
    slug: 'myntra-account-management-services',
    badge: 'Premium Fashion & Lifestyle',
    title: 'Myntra Account Management Services',
    subtitle: 'Elevate your apparel, footwear, and accessory brand on India’s top fashion marketplace with curated listings and EORS campaign strategy.',
    heroImage: '/myntra/about (8).webp',
    aboutImage: '/myntra/Myntra Seller Account Setup & Onboarding.webp',
    aboutTitle: 'Dominate Fashion & Lifestyle on Myntra',
    aboutDesc: 'Myntra is India’s premier destination for style. We ensure your brand complies with strict catalog guidelines, lifestyle imagery standards, and participates in blockbuster sales events.',
    servicesGrid: [
      {
        icon: '/Platform expertise.png',
        title: 'Seller Onboarding & Curation',
        desc: 'Brand gate approvals, style code allocation, and brand registry approval.',
      },
      {
        icon: '/content-creation.png',
        title: 'Fashion Catalog & Style Tags',
        desc: 'Attributes, fabric specs, color swatches, model size guides, and HD lifestyle shots.',
      },
      {
        icon: '/planning.png',
        title: 'Inventory & Warehouse Sync',
        desc: 'JIT (Just In Time) and PPMP (Partner Portal Marketplace Model) inventory fulfillment.',
      },
      {
        icon: '/financial-analysis.png',
        title: 'Myntra Ads & Visibility',
        desc: 'Targeted fashion banners, brand days, and End of Reason Sale (EORS) promotions.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Fashion Algorithm Mastery',
        desc: 'Curated style indexing ensuring top spots in category trends.',
      },
    ],
    faqs: [
      {
        question: 'Can any brand sell on Myntra?',
        answer: 'Myntra has a curated onboarding process. We help submit brand portfolios and secure fast-track approvals for quality brands.',
      },
    ],
  },

  'seo-company-in-india': {
    slug: 'seo-company-in-india',
    badge: 'Organic Search Engine Dominance',
    title: 'Search Engine Optimization (SEO) Company in India',
    subtitle: 'Drive high-intent organic traffic and achieve #1 Google rankings with data-backed technical SEO, keyword architecture, and quality link building.',
    heroImage: '/new-images/seo-services-featured-image.png 1.png',
    aboutImage: '/new-images/happy-young-man-wearing-jeans-shirt-standing-using-tablet-studio-grey-wall 1.png',
    aboutTitle: 'Dominate Search Engines with ROI-Focused SEO',
    aboutDesc: 'Over 90% of online experiences begin with a search engine. We implement white-hat on-page, off-page, and technical SEO frameworks that turn organic searches into customers.',
    servicesGrid: [
      {
        icon: '/new-images/image 20.png',
        title: 'Technical SEO & Core Web Vitals',
        desc: 'Speed optimization, mobile responsiveness, XML sitemaps, and schema markup.',
      },
      {
        icon: '/new-images/image 21.png',
        title: 'High-Intent Keyword Research',
        desc: 'Identifying transactional keywords with high search volume and commercial intent.',
      },
      {
        icon: '/new-images/image 22.png',
        title: 'E-Commerce SEO & Architecture',
        desc: 'Category page structure, faceted navigation optimization, and product schema.',
      },
      {
        icon: '/new-images/image 23.png',
        title: 'Authority Link Building',
        desc: 'High DA editorial backlinks, guest posting, and brand mentions.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Guaranteed Ranking Growth',
        desc: 'Transparent Google Search Console analytics and keyword tracking.',
      },
    ],
    faqs: [
      {
        question: 'How long does SEO take to show results?',
        answer: 'Most clients see noticeable keyword movements and organic impression gains within 60 to 90 days, with substantial traffic growth by months 4-6.',
      },
    ],
  },

  'meta-ads-management-company-in-india': {
    slug: 'meta-ads-management-company-in-india',
    badge: 'High-ROAS Social Advertising',
    title: 'Meta Ads Management (Facebook & Instagram)',
    subtitle: 'Generate profitable sales and scale customer acquisition with high-converting creative ads, lookalike audiences, and full-funnel pixel tracking.',
    heroImage: '/new-images/meta-banner.png',
    aboutImage: '/new-images/meta-2.png',
    aboutTitle: 'Scale Your Sales with Meta Advertising',
    aboutDesc: 'We craft compelling video ads, carousel formats, and UGC creatives paired with advanced audience segmentation to achieve 3.5X+ ROAS for D2C brands.',
    servicesGrid: [
      {
        icon: '/new-images/image 28.png',
        title: 'Creative Ad Design & Copywriting',
        desc: 'High-hook video creatives, carousels, and benefit-driven ad copy.',
      },
      {
        icon: '/new-images/image 29.png',
        title: 'Full-Funnel Campaign Architecture',
        desc: 'Top of funnel prospecting, middle of funnel engagement, and bottom of funnel retargeting.',
      },
      {
        icon: '/new-images/image 30.png',
        title: 'CAPI & Pixel Integration',
        desc: 'Conversions API setup for accurate tracking and iOS privacy compliance.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Meta Certified Media Buyers',
        desc: 'Managing over ₹1Cr+ in monthly advertising spend across industries.',
      },
    ],
    faqs: [
      {
        question: 'What is a good ROAS for Meta Ads in India?',
        answer: 'Depending on product gross margins, we typically target between 3.0X and 5.0X blended ROAS for healthy profitability.',
      },
    ],
  },

  'google-ads-management-company-in-india': {
    slug: 'google-ads-management-company-in-india',
    badge: 'Certified Google Premier Partner',
    title: 'Google Ads & PPC Management Company',
    subtitle: 'Capture high-intent buyers with Google Search, Performance Max (PMax), Shopping Ads, and YouTube Video campaigns.',
    heroImage: '/new-images/google-banner.png',
    aboutImage: '/new-images/google-2.png',
    aboutTitle: 'Drive Instant Sales with Google PPC',
    aboutDesc: 'Reach customers at the exact moment they are searching for your products. We optimize Google Merchant Center feeds, search keyword bids, and smart shopping campaigns.',
    servicesGrid: [
      {
        icon: '/new-images/image 31.png',
        title: 'Performance Max (PMax) Campaigns',
        desc: 'Unified advertising across Search, Shopping, YouTube, Gmail, and Discover.',
      },
      {
        icon: '/new-images/image 32.png',
        title: 'Google Shopping & Merchant Center',
        desc: 'Feed optimization, negative keyword filtering, and product title enrichment.',
      },
      {
        icon: '/new-images/image 33.png',
        title: 'Search Ads & High Intent Keywords',
        desc: 'Exact & phrase match keyword bidding with high Quality Scores.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Maximized Ad Spend Efficiency',
        desc: 'Negative keyword sculpting to eliminate wasteful click expenditure.',
      },
    ],
    faqs: [
      {
        question: 'What is Google Performance Max (PMax)?',
        answer: 'PMax is an AI-powered campaign type that finds converting customers across all of Google’s channels with optimized automated bidding.',
      },
    ],
  },

  'graphic-design-company-in-india': {
    slug: 'graphic-design-company-in-india',
    badge: 'Creative Visual Excellence',
    title: 'E-Commerce Graphic Design Services',
    subtitle: 'Transform your brand perception with stunning Amazon A+ content, Brand Storefronts, packaging, infographics, and digital ad banners.',
    heroImage: '/new-images/graphic-banner.png',
    aboutImage: '/new-images/graphic-2.png',
    aboutTitle: 'Design That Sells',
    aboutDesc: 'Visuals determine conversion rates. Our creative team produces high-end lifestyle renders, infographic overlays, and interactive brand stores that inspire customer trust.',
    servicesGrid: [
      {
        icon: '/new-images/image 36.png',
        title: 'Amazon A+ Content / EBC',
        desc: 'Enhanced Brand Content modules highlighting product USP and comparisons.',
      },
      {
        icon: '/new-images/image 37.png',
        title: 'Multi-Page Brand Storefronts',
        desc: 'Responsive, immersive Amazon storefronts designed to cross-sell catalogs.',
      },
      {
        icon: '/new-images/image 38.png',
        title: 'Product Infographics & Retouching',
        desc: 'Feature callouts, dimension charts, and realistic 3D shadow enhancements.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Conversion-Focused Visuals',
        desc: 'Designed scientifically to answer customer questions and boost conversions by 25%+.',
      },
    ],
    faqs: [
      {
        question: 'Does A+ content really increase sales?',
        answer: 'According to Amazon data, adding high-quality A+ Content can increase sales conversion rates by 5% to 20%.',
      },
    ],
  },

  'ecommerce-rating-and-review-management-services': {
    slug: 'ecommerce-rating-and-review-management-services',
    badge: 'Brand Reputation & Social Proof Scaling',
    title: 'E-Commerce Rating & Review Management Services',
    subtitle: 'Build 4.8★+ customer trust on Amazon, Flipkart, Meesho, Myntra, Blinkit & Shopify. We accelerate verified buyer reviews, remove policy-violating negative feedback, and skyrocket sales conversion rates.',
    heroImage: '/home-img/Amazon-product-listing-optimization.webp',
    aboutImage: '/flipkart-account/product-dashboard.png',
    aboutTitle: 'Turn Customer Reviews Into Your Biggest Sales Multiplier',
    aboutDesc: 'Over 93% of online shoppers read customer reviews before making a purchase. A single 1-star review can drop listing conversions by up to 35%. EcomVanta provides 100% policy-compliant rating and review management services for Amazon, Flipkart, Meesho, Blinkit, and Quick Commerce brands to safeguard your brand reputation and establish category leadership.',
    servicesGrid: [
      {
        icon: '/brand-img/customer-service.png',
        title: 'Amazon Vine & Review Acceleration',
        desc: 'Compliant review generation via Amazon Vine, automated "Request a Review" integrations, and post-purchase follow-up systems that multiply positive feedback.',
      },
      {
        icon: '/brand-img/policy.png',
        title: 'Flipkart Ratings & Buyer Feedback',
        desc: 'Accelerating verified buyer reviews and improving Listing Quality Score (LQS) to maintain Gold/Diamond seller tier badges.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'Blinkit, Zepto & Quick Commerce Reviews',
        desc: 'Real-time rating monitoring on dark store platforms to maintain 4.5+ star product reputation and rapid impulse reorders.',
      },
      {
        icon: '/brand-img/report.png',
        title: 'Negative Review Suppression & Removal',
        desc: 'Proactive escalation and removal of policy-violating reviews, competitor sabotage, fake claims, and delivery/fulfillment complaints (FBA/FBF strike-throughs).',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'Voice of Customer (VOC) Analytics',
        desc: 'In-depth sentiment analysis and return reason diagnostics to fix root-cause packaging, size, or quality issues before they harm your rating.',
      },
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Competitor Review Reverse Engineering',
        desc: 'Auditing top competitor complaints and negative reviews to highlight winning product USPs and comparison tables in your A+ content.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: '100% Marketplace TOS Compliant',
        desc: 'Zero black-hat techniques. All review acquisition strategies strictly adhere to Amazon Anti-Manipulation Policy and marketplace guidelines.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: 'Proven Conversion Rate Multiplier',
        desc: 'Increasing your listing rating from 3.8★ to 4.5★+ increases organic conversion rate by up to 120% and lowers your ad ACOS.',
      },
      {
        icon: '/css/Active issue resolution (2).png',
        title: 'Rapid Review Escalation & Support',
        desc: 'Dedicated account managers monitoring your product ratings 24/7 with swift case logging for unfair or malicious negative feedback.',
      },
    ],
    faqs: [
      {
        question: 'How do you generate reviews legally on Amazon and Flipkart?',
        answer: 'We utilize 100% compliant official programs including Amazon Vine, the automated Request a Review API, Flipkart Post-Delivery Feedback workflows, and high-converting product inserts that encourage authentic buyer feedback without incentivization or TOS violations.',
      },
      {
        question: 'Can negative reviews be removed from Amazon or Flipkart?',
        answer: 'Yes, if a negative review violates marketplace community guidelines (e.g., contains vulgarity, mentions competitor names, discusses FBA delivery issues rather than the product, or constitutes abusive competitor sabotage), we raise official policy tickets for complete removal or strike-through.',
      },
      {
        question: 'What marketplaces do you support for review management?',
        answer: 'We provide review and rating management across Amazon, Flipkart, Meesho, Myntra, Blinkit, Zepto, Swiggy Instamart, Nykaa, and D2C brand websites (Shopify/WooCommerce).',
      },
      {
        question: 'How does improved product rating impact Amazon PPC advertising?',
        answer: 'Higher star ratings and positive review counts drastically improve your ad Click-Through Rate (CTR) and Conversion Rate (CVR). This results in lower cost-per-click (CPC), reduced ACOS, and higher ROAS on all your sponsored ad campaigns.',
      },
    ],
  },

  'rating-and-review-management-services': {
    slug: 'rating-and-review-management-services',
    badge: 'Brand Reputation & Social Proof Scaling',
    title: 'Rating & Review Management Services',
    subtitle: 'Build 4.8★+ customer trust on Amazon, Flipkart, Meesho, Myntra, Blinkit & Shopify. We accelerate verified buyer reviews, remove policy-violating negative feedback, and skyrocket sales conversion rates.',
    heroImage: '/home-img/Amazon-product-listing-optimization.webp',
    aboutImage: '/flipkart-account/product-dashboard.png',
    aboutTitle: 'Turn Customer Reviews Into Your Biggest Sales Multiplier',
    aboutDesc: 'Over 93% of online shoppers read customer reviews before making a purchase. A single 1-star review can drop listing conversions by up to 35%. EcomVanta provides 100% policy-compliant rating and review management services for Amazon, Flipkart, Meesho, Blinkit, and Quick Commerce brands to safeguard your brand reputation and establish category leadership.',
    servicesGrid: [
      {
        icon: '/brand-img/customer-service.png',
        title: 'Amazon Vine & Review Acceleration',
        desc: 'Compliant review generation via Amazon Vine, automated "Request a Review" integrations, and post-purchase follow-up systems that multiply positive feedback.',
      },
      {
        icon: '/brand-img/policy.png',
        title: 'Flipkart Ratings & Buyer Feedback',
        desc: 'Accelerating verified buyer reviews and improving Listing Quality Score (LQS) to maintain Gold/Diamond seller tier badges.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'Blinkit, Zepto & Quick Commerce Reviews',
        desc: 'Real-time rating monitoring on dark store platforms to maintain 4.5+ star product reputation and rapid impulse reorders.',
      },
      {
        icon: '/brand-img/report.png',
        title: 'Negative Review Suppression & Removal',
        desc: 'Proactive escalation and removal of policy-violating reviews, competitor sabotage, fake claims, and delivery/fulfillment complaints (FBA/FBF strike-throughs).',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'Voice of Customer (VOC) Analytics',
        desc: 'In-depth sentiment analysis and return reason diagnostics to fix root-cause packaging, size, or quality issues before they harm your rating.',
      },
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Competitor Review Reverse Engineering',
        desc: 'Auditing top competitor complaints and negative reviews to highlight winning product USPs and comparison tables in your A+ content.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: '100% Marketplace TOS Compliant',
        desc: 'Zero black-hat techniques. All review acquisition strategies strictly adhere to Amazon Anti-Manipulation Policy and marketplace guidelines.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: 'Proven Conversion Rate Multiplier',
        desc: 'Increasing your listing rating from 3.8★ to 4.5★+ increases organic conversion rate by up to 120% and lowers your ad ACOS.',
      },
      {
        icon: '/css/Active issue resolution (2).png',
        title: 'Rapid Review Escalation & Support',
        desc: 'Dedicated account managers monitoring your product ratings 24/7 with swift case logging for unfair or malicious negative feedback.',
      },
    ],
    faqs: [
      {
        question: 'How do you generate reviews legally on Amazon and Flipkart?',
        answer: 'We utilize 100% compliant official programs including Amazon Vine, the automated Request a Review API, Flipkart Post-Delivery Feedback workflows, and high-converting product inserts that encourage authentic buyer feedback without incentivization or TOS violations.',
      },
      {
        question: 'Can negative reviews be removed from Amazon or Flipkart?',
        answer: 'Yes, if a negative review violates marketplace community guidelines (e.g., contains vulgarity, mentions competitor names, discusses FBA delivery issues rather than the product, or constitutes abusive competitor sabotage), we raise official policy tickets for complete removal or strike-through.',
      },
      {
        question: 'What marketplaces do you support for review management?',
        answer: 'We provide review and rating management across Amazon, Flipkart, Meesho, Myntra, Blinkit, Zepto, Swiggy Instamart, Nykaa, and D2C brand websites (Shopify/WooCommerce).',
      },
      {
        question: 'How does improved product rating impact Amazon PPC advertising?',
        answer: 'Higher star ratings and positive review counts drastically improve your ad Click-Through Rate (CTR) and Conversion Rate (CVR). This results in lower cost-per-click (CPC), reduced ACOS, and higher ROAS on all your sponsored ad campaigns.',
      },
    ],
  },

  'whatsapp-integration-services': {
    slug: 'whatsapp-integration-services',
    badge: 'Meta Official WhatsApp Business API Partner',
    title: 'WhatsApp Integration & Business API Automation',
    subtitle: 'Connect WhatsApp Business API with Shopify, WooCommerce, CRM & ERP. Automate order updates, abandoned cart recovery, AI chatbots, catalog checkout, and 24/7 customer support.',
    heroImage: '/home-img/whatsapp-icon-arvian.webp',
    aboutImage: '/home-img/content-marketing.webp',
    aboutTitle: 'Scale Direct-to-Consumer Conversions With WhatsApp Automation',
    aboutDesc: 'With over 500M+ active WhatsApp users in India and an unprecedented 98% message open rate, WhatsApp is the most powerful revenue channel for modern e-commerce brands. EcomVanta helps brands integrate official Meta WhatsApp Cloud API, configure automated sales flows, recover lost carts, and automate 24/7 customer support.',
    servicesGrid: [
      {
        icon: '/brand-img/policy.png',
        title: 'Official Cloud API & Green Tick Verification',
        desc: 'End-to-end Meta Business Manager verification, official WhatsApp Cloud API provisioning, and Green Tick verified badge application.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'E-commerce & CRM Integration',
        desc: 'Seamless zero-code and custom API integration with Shopify, WooCommerce, Magento, Custom Web, Zoho, LeadSquared, and ERPs.',
      },
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Automated Abandoned Cart Recovery',
        desc: 'Trigger personalized discount messages with 1-click checkout links within 15 minutes of checkout abandonment to recover 25-40% lost sales.',
      },
      {
        icon: '/brand-img/customer-service.png',
        title: 'Instant Order & Logistics Alerts',
        desc: 'Automated transactional notifications for order confirmations, live shipment tracking links, NDR (Non-Delivery Report) address re-confirmation, and COD verification.',
      },
      {
        icon: '/brand-img/report.png',
        title: 'AI Chatbots & Live Agent Routing',
        desc: 'Intelligent conversational AI bots to handle FAQs, return/exchange requests, sizing guides, and smooth handover to human support agents.',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'WhatsApp Catalog & Interactive Checkout',
        desc: 'Native in-chat product showcases, quick-reply carousels, payment gateway links (UPI/Razorpay), and frictionless re-ordering.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: '98% Open Rate & Instant Engagement',
        desc: 'Reach customers where they spend the most time with 5X higher response rates than traditional email and SMS.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: '35%+ Cart Recovery Multiplier',
        desc: 'Proven automated recovery sequences that turn dropped checkouts into high-margin paid orders on autopilot.',
      },
      {
        icon: '/css/Active issue resolution (2).png',
        title: '100% Meta Compliance & Anti-Spam Protection',
        desc: 'Strict adherence to Meta quality rating guidelines to protect your business phone number from bans and rate limiting.',
      },
    ],
    faqs: [
      {
        question: 'What is the WhatsApp Business API and how does it differ from regular WhatsApp Business app?',
        answer: 'WhatsApp Business API is designed for growing and medium-to-large businesses. It allows unlimited team members to chat from one number, integrates directly with your Shopify/eCommerce store, enables automated notifications (order updates, abandoned carts), broadcasts promotional campaigns to thousands of opt-in users, and provides AI chatbot capabilities.',
      },
      {
        question: 'Can you help get the Official WhatsApp Green Tick badge?',
        answer: 'Yes, we assist eligible brands with Meta Business Manager verification, notable brand press coverage submission, and the official Green Tick verification process.',
      },
      {
        question: 'Can WhatsApp API help reduce COD RTO (Return to Origin) rates?',
        answer: 'Absolutely. We configure automated COD order confirmation messages via WhatsApp where buyers confirm or cancel their order before dispatch. We also automate NDR (Non-Delivery Report) flows to capture alternate delivery addresses and delivery slots.',
      },
      {
        question: 'Which e-commerce platforms can be integrated with WhatsApp?',
        answer: 'We integrate with Shopify, WooCommerce, Wix, Magento, Custom Next.js/React websites, Webflow, and leading Indian logistics aggregators (Shiprocket, NimbusPost, Delhivery, etc.).',
      },
    ],
  },

  'whatsapp-integration': {
    slug: 'whatsapp-integration',
    badge: 'Meta Official WhatsApp Business API Partner',
    title: 'WhatsApp Integration & Business API Automation',
    subtitle: 'Connect WhatsApp Business API with Shopify, WooCommerce, CRM & ERP. Automate order updates, abandoned cart recovery, AI chatbots, catalog checkout, and 24/7 customer support.',
    heroImage: '/home-img/whatsapp-icon-arvian.webp',
    aboutImage: '/home-img/content-marketing.webp',
    aboutTitle: 'Scale Direct-to-Consumer Conversions With WhatsApp Automation',
    aboutDesc: 'With over 500M+ active WhatsApp users in India and an unprecedented 98% message open rate, WhatsApp is the most powerful revenue channel for modern e-commerce brands. EcomVanta helps brands integrate official Meta WhatsApp Cloud API, configure automated sales flows, recover lost carts, and automate 24/7 customer support.',
    servicesGrid: [
      {
        icon: '/brand-img/policy.png',
        title: 'Official Cloud API & Green Tick Verification',
        desc: 'End-to-end Meta Business Manager verification, official WhatsApp Cloud API provisioning, and Green Tick verified badge application.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'E-commerce & CRM Integration',
        desc: 'Seamless zero-code and custom API integration with Shopify, WooCommerce, Magento, Custom Web, Zoho, LeadSquared, and ERPs.',
      },
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Automated Abandoned Cart Recovery',
        desc: 'Trigger personalized discount messages with 1-click checkout links within 15 minutes of checkout abandonment to recover 25-40% lost sales.',
      },
      {
        icon: '/brand-img/customer-service.png',
        title: 'Instant Order & Logistics Alerts',
        desc: 'Automated transactional notifications for order confirmations, live shipment tracking links, NDR (Non-Delivery Report) address re-confirmation, and COD verification.',
      },
      {
        icon: '/brand-img/report.png',
        title: 'AI Chatbots & Live Agent Routing',
        desc: 'Intelligent conversational AI bots to handle FAQs, return/exchange requests, sizing guides, and smooth handover to human support agents.',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'WhatsApp Catalog & Interactive Checkout',
        desc: 'Native in-chat product showcases, quick-reply carousels, payment gateway links (UPI/Razorpay), and frictionless re-ordering.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: '98% Open Rate & Instant Engagement',
        desc: 'Reach customers where they spend the most time with 5X higher response rates than traditional email and SMS.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: '35%+ Cart Recovery Multiplier',
        desc: 'Proven automated recovery sequences that turn dropped checkouts into high-margin paid orders on autopilot.',
      },
      {
        icon: '/css/Active issue resolution (2).png',
        title: '100% Meta Compliance & Anti-Spam Protection',
        desc: 'Strict adherence to Meta quality rating guidelines to protect your business phone number from bans and rate limiting.',
      },
    ],
    faqs: [
      {
        question: 'What is the WhatsApp Business API and how does it differ from regular WhatsApp Business app?',
        answer: 'WhatsApp Business API is designed for growing and medium-to-large businesses. It allows unlimited team members to chat from one number, integrates directly with your Shopify/eCommerce store, enables automated notifications (order updates, abandoned carts), broadcasts promotional campaigns to thousands of opt-in users, and provides AI chatbot capabilities.',
      },
      {
        question: 'Can you help get the Official WhatsApp Green Tick badge?',
        answer: 'Yes, we assist eligible brands with Meta Business Manager verification, notable brand press coverage submission, and the official Green Tick verification process.',
      },
    ],
  },

  'sms-voice-call-whatsapp-marketing-services': {
    slug: 'sms-voice-call-whatsapp-marketing-services',
    badge: 'Omnichannel Direct Outreach & Performance Marketing',
    title: 'SMS, Voice Call & WhatsApp Marketing Services',
    subtitle: 'Scale high-ROI omnichannel customer acquisition and retention. Deploy promotional Bulk SMS, automated OBD voice calls, interactive IVR broadcasts, and hyper-targeted WhatsApp marketing campaigns.',
    heroImage: '/home-img/content-marketing.webp',
    aboutImage: '/home-img/Amazon-account-management.webp',
    aboutTitle: 'Reach Millions of Shoppers Directly on Their Mobile Devices',
    aboutDesc: 'Email alone is no longer enough to scale modern brands. Combining Bulk SMS, Automated Outbound Voice Calls (OBD/IVR), and WhatsApp Marketing creates a powerful 360-degree outreach strategy that maximizes festival sale revenue, re-engages dormant customers, and slashes customer acquisition cost (CAC).',
    servicesGrid: [
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Promotional & Transactional Bulk SMS',
        desc: 'High-throughput DLT-approved SMS gateways with 99.9% delivery rate, dynamic name personalization, URL shorteners, and click tracking.',
      },
      {
        icon: '/brand-img/customer-service.png',
        title: 'Voice Broadcasting & OBD Calling',
        desc: 'Automated high-volume recorded voice broadcasts for flash sale announcements, festival discounts, event invitations, and VIP customer alerts.',
      },
      {
        icon: '/brand-img/policy.png',
        title: 'Interactive IVR & Lead Qualification',
        desc: 'Smart press-1 key input voice campaigns to instantly qualify prospective wholesale buyers, bulk order leads, and direct calls to your sales team.',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'Targeted WhatsApp Broadcast Blasts',
        desc: 'Rich media WhatsApp campaigns with image banners, videos, CTA buttons, and discount promo codes with instant 98% open rates.',
      },
      {
        icon: '/brand-img/report.png',
        title: 'Audience Segmentation & RFM Clustering',
        desc: 'Segment customer lists based on Recency, Frequency, and Monetary value (RFM) to deliver the right message at the right purchase cycle.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'DLT Registration & Regulatory Compliance',
        desc: 'Complete assistance with TRAI DLT portal registration, header/sender ID whitelisting, and template approval with zero compliance bottlenecks.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: '10X Higher Response Rate',
        desc: 'Mobile-first messaging yields up to 45% click-through and interaction rates compared to traditional channels.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: 'Instant Multi-Channel Delivery',
        desc: 'Transmit up to 100,000+ messages and voice calls per minute during peak festival flash sales and product launches.',
      },
      {
        icon: '/css/Active issue resolution (2).png',
        title: '100% TRAI DLT & Meta Compliant',
        desc: 'Zero risk of spam blacklisting or telecom penalties with strictly compliant sender IDs and template approvals.',
      },
    ],
    faqs: [
      {
        question: 'What is TRAI DLT registration and is it required for SMS marketing in India?',
        answer: 'Yes, as per TRAI regulations in India, every business sending commercial SMS must register their entity, sender IDs (headers), and SMS content templates on an authorized DLT portal (such as Jio, Airtel, Vodafone, or BSNL). EcomVanta handles the full DLT registration and template approval process for you.',
      },
      {
        question: 'How do automated Voice Call broadcasts (OBD) work for e-commerce?',
        answer: 'Outbound Dialing (OBD) automatically calls customer phone lists simultaneously and plays a pre-recorded audio announcement (e.g., announcing a 50% festival sale or reminding them of an urgent order status). Shoppers can interact by pressing numbers on their phone keypad to receive a WhatsApp link or talk to an agent.',
      },
      {
        question: 'Can we send WhatsApp broadcasts to customers who haven\'t saved our number?',
        answer: 'Yes, via the official WhatsApp Business API, you can send pre-approved template broadcast messages to opted-in customer phone numbers regardless of whether they have saved your contact details in their phone address book.',
      },
      {
        question: 'How do you measure the ROI of multi-channel marketing campaigns?',
        answer: 'We provide comprehensive real-time dashboards tracking delivery rates, open rates, unique click-through rates (CTR), UTM-tagged purchases, total revenue generated, and overall return on ad spend (ROAS).',
      },
    ],
  },

  'marketing-whatsapp-sms-voice': {
    slug: 'marketing-whatsapp-sms-voice',
    badge: 'Omnichannel Direct Outreach & Performance Marketing',
    title: 'SMS, Voice Call & WhatsApp Marketing Services',
    subtitle: 'Scale high-ROI omnichannel customer acquisition and retention. Deploy promotional Bulk SMS, automated OBD voice calls, interactive IVR broadcasts, and hyper-targeted WhatsApp marketing campaigns.',
    heroImage: '/home-img/content-marketing.webp',
    aboutImage: '/home-img/Amazon-account-management.webp',
    aboutTitle: 'Reach Millions of Shoppers Directly on Their Mobile Devices',
    aboutDesc: 'Email alone is no longer enough to scale modern brands. Combining Bulk SMS, Automated Outbound Voice Calls (OBD/IVR), and WhatsApp Marketing creates a powerful 360-degree outreach strategy that maximizes festival sale revenue, re-engages dormant customers, and slashes customer acquisition cost (CAC).',
    servicesGrid: [
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Promotional & Transactional Bulk SMS',
        desc: 'High-throughput DLT-approved SMS gateways with 99.9% delivery rate, dynamic name personalization, URL shorteners, and click tracking.',
      },
      {
        icon: '/brand-img/customer-service.png',
        title: 'Voice Broadcasting & OBD Calling',
        desc: 'Automated high-volume recorded voice broadcasts for flash sale announcements, festival discounts, event invitations, and VIP customer alerts.',
      },
      {
        icon: '/brand-img/policy.png',
        title: 'Interactive IVR & Lead Qualification',
        desc: 'Smart press-1 key input voice campaigns to instantly qualify prospective wholesale buyers, bulk order leads, and direct calls to your sales team.',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'Targeted WhatsApp Broadcast Blasts',
        desc: 'Rich media WhatsApp campaigns with image banners, videos, CTA buttons, and discount promo codes with instant 98% open rates.',
      },
      {
        icon: '/brand-img/report.png',
        title: 'Audience Segmentation & RFM Clustering',
        desc: 'Segment customer lists based on Recency, Frequency, and Monetary value (RFM) to deliver the right message at the right purchase cycle.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'DLT Registration & Regulatory Compliance',
        desc: 'Complete assistance with TRAI DLT portal registration, header/sender ID whitelisting, and template approval with zero compliance bottlenecks.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: '10X Higher Response Rate',
        desc: 'Mobile-first messaging yields up to 45% click-through and interaction rates compared to traditional channels.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: 'Instant Multi-Channel Delivery',
        desc: 'Transmit up to 100,000+ messages and voice calls per minute during peak festival flash sales and product launches.',
      },
    ],
    faqs: [
      {
        question: 'What is TRAI DLT registration and is it required for SMS marketing in India?',
        answer: 'Yes, as per TRAI regulations in India, every business sending commercial SMS must register their entity, sender IDs (headers), and SMS content templates on an authorized DLT portal. EcomVanta handles the full DLT registration for you.',
      },
    ],
  },
};

