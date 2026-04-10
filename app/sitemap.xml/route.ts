import { blogPosts } from '@/lib/blog'
import { siteConfig } from '@/lib/seo'

export const dynamic = 'force-static'

export async function GET() {
  const now = new Date().toISOString()
  const staticRoutes = [
    { path: '', changefreq: 'weekly', priority: '1.0', lastmod: now },
    { path: '/hakkimizda', changefreq: 'monthly', priority: '0.8', lastmod: now },
    { path: '/hizmetlerimiz', changefreq: 'weekly', priority: '0.9', lastmod: now },
    { path: '/elektrikli-araclar', changefreq: 'weekly', priority: '0.9', lastmod: now },
    { path: '/filo-analizi', changefreq: 'weekly', priority: '0.9', lastmod: now },
    { path: '/vehicles', changefreq: 'daily', priority: '0.8', lastmod: now },
    { path: '/blog', changefreq: 'weekly', priority: '0.8', lastmod: now },
    { path: '/iletisim', changefreq: 'monthly', priority: '0.8', lastmod: now },
    { path: '/teklif-al', changefreq: 'weekly', priority: '0.9', lastmod: now },
    { path: '/gizlilik-politikasi', changefreq: 'yearly', priority: '0.3', lastmod: now },
    { path: '/kullanim-kosullari', changefreq: 'yearly', priority: '0.3', lastmod: now },
  ]

  const blogRoutes = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: new Date(post.date).toISOString(),
  }))

  const urls = [...staticRoutes, ...blogRoutes]
    .map(
      (route) => `
  <url>
    <loc>${siteConfig.url}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('')

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
