import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://globalstartrack.com').replace(
    /\/$/,
    ''
  );

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin-panel', '/admin-login', '/api/'],
      },
      {
        // Block common bad bots
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot'],
        disallow: '/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
