/**
 * SEO utilities — metadata builders, JSON-LD schema generators
 * Target keywords: Indian Spice Exporter, Turmeric Exporter India,
 * Gujarat Spice Exporter, Wholesale Spice Supplier India, etc.
 */

export const SITE_CONFIG = {
  name: 'Global StarTrack Export',
  shortName: 'GSTE',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://globalstartrack.com',
  logo: '/assets/logo/logo.png',
  phone: '+91 87996 44050',
  email: 'Info@globalstartrack.com',
  whatsapp: '918799644050',
  address: {
    street: 'Sidhpur',
    city: 'Patan',
    state: 'Gujarat',
    country: 'India',
    postalCode: '384151',
  },
  social: {
    instagram: 'https://www.instagram.com/globalstartrackexport',
    linkedin: 'https://www.linkedin.com/in/global-star-track-export-undefined-a22414420',
  },
};

/** Canonical URL helper */
export function canonicalUrl(path: string): string {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/** Open Graph image object */
export const DEFAULT_OG_IMAGE = {
  url: '/assets/logo/logo.png',
  width: 1200,
  height: 630,
  alt: 'Global StarTrack Export - Premium Indian Spice Exporter from Gujarat, India',
};

// ---------------------------------------------------------------------------
// JSON-LD Schema generators
// ---------------------------------------------------------------------------

/** Organization schema — used on every page */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: 'GS Track Export',
    url: SITE_CONFIG.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      width: 200,
      height: 200,
    },
    description:
      'Global StarTrack Export is an Indian spices export company focused on cumin seeds, turmeric, red chilli, quality-focused sourcing, and buyer requirement support.',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phone,
        contactType: 'sales',
        availableLanguage: ['English', 'Hindi', 'Gujarati'],
        areaServed: 'Worldwide',
      },
      {
        '@type': 'ContactPoint',
        email: SITE_CONFIG.email,
        contactType: 'customer support',
      },
    ],
    sameAs: Object.values(SITE_CONFIG.social),
    knowsAbout: [
      'Indian Spice Export',
      'Turmeric Export',
      'Red Chilli Export',
      'Cumin Seeds Export',
      'Gujarat Spice Supplier',
      'Quality-Focused Sourcing',
    ],
  };
}

/** LocalBusiness schema */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'FoodEstablishment'],
    '@id': `${SITE_CONFIG.url}/#local`,
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.9161,
      longitude: 72.3908,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Indian Spices',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Turmeric Powder' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Turmeric Whole' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Red Chilli Powder' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Red Chilli Whole' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Cumin Seeds' } },
      ],
    },
    knowsAbout: 'Indian Spice Export, Quality-Focused Sourcing, Buyer Requirement Support',
  };
}

/** WebSite schema with SearchAction */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description:
      'Premium Indian spice exporter from Gujarat. We export turmeric, red chilli, cumin, coriander and more to global markets.',
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** BreadcrumbList schema */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Product schema */
export function productSchema(product: {
  name: string;
  description: string;
  image: string;
  category: string;
  origin?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
    },
    countryOfOrigin: {
      '@type': 'Country',
      name: product.origin ?? 'India',
    },
  };
}

/** FAQ schema */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
