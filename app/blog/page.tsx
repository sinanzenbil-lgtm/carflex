import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog'
import Script from 'next/script'
import { absoluteUrl, createMetadata, siteConfig } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Blog',
  description:
    'CarFlex blogunda filo yönetimi, araç kiralama, elektrikli araç dönüşümü ve operasyonel verimlilik içeriklerini okuyun.',
  path: '/blog',
  keywords: ['araç kiralama blog', 'filo yönetimi blog', 'elektrikli araç blog'],
})

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1))
  const blogListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteConfig.name} Blog`,
    url: absoluteUrl('/blog'),
    inLanguage: 'tr-TR',
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: new Date(post.date).toISOString(),
      image: absoluteUrl(post.image),
    })),
  }

  return (
    <div className="min-h-screen bg-white">
      <Script
        id="blog-list-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />
      <section className="bg-white pt-16 pb-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            Filo yönetimi, elektrikli araçlar ve operasyonel kiralama hakkında en güncel kurumsal içerikler.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col gap-24">
            {posts.map((post) => (
              <article key={post.slug} className="group flex flex-col">
                {/* 1. Image - En Üstte */}
                <div className="relative w-full h-[350px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-lg mb-10 group-hover:shadow-2xl transition-all duration-300">
                  <Link href={`/blog/${post.slug}`}>
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </Link>
                </div>

                {/* 2. Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-lime-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                {/* 3. Meta Info - Başlığın Altında */}
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
                  <span className="bg-lime-100 text-lime-700 px-3 py-1 rounded-full font-semibold uppercase tracking-wider text-xs">
                    {post.category}
                  </span>
                  <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                </div>

                {/* 4. Excerpt */}
                <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="inline-flex items-center gap-2 text-lime-600 font-bold hover:gap-3 transition-all text-xl"
                >
                  Devamını Oku 
                  <span className="text-2xl">→</span>
                </Link>
                
                <div className="mt-20 border-b border-gray-100 w-full"></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
