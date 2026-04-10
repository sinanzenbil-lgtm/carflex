import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/lib/blog'
import { absoluteUrl, createMetadata, siteConfig } from '@/lib/seo'

type BlogDetailProps = {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: BlogDetailProps): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug)

  if (!post) {
    return createMetadata({
      title: 'Blog',
      description: siteConfig.description,
      path: '/blog',
    })
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    keywords: [post.category, post.title, 'blog yazısı'],
    type: 'article',
  })
}

export default function BlogDetailPage({ params }: BlogDetailProps) {
  const post = blogPosts.find((item) => item.slug === params.slug)

  if (!post) {
    notFound()
  }

  const paragraphs = post.content.trim().split('\n\n')
  const firstParagraph = paragraphs[0]
  const otherParagraphs = paragraphs.slice(1)

  const firstLetter = firstParagraph.charAt(0)
  const restOfFirstParagraph = firstParagraph.slice(1)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.image)],
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    articleSection: post.category,
    inLanguage: 'tr-TR',
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/carflex-logo.png'),
      },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <Script
        id={`blog-post-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Back Link */}
        <Link href="/blog" className="text-lime-600 hover:text-lime-700 text-sm font-bold mb-10 inline-block uppercase tracking-widest transition-colors">
          ← Blog'a Geri Dön
        </Link>

        {/* Category & Date */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
          <span className="bg-lime-100 text-lime-700 px-3 py-1 rounded-full font-semibold uppercase tracking-wider text-xs">
            {post.category}
          </span>
          <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-12">
          {post.title}
        </h1>

        {/* Image */}
        <div className="relative w-full h-[350px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl mb-16 border border-gray-100">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {/* First Paragraph with Large Initial */}
          <p className="text-gray-800 text-xl md:text-2xl leading-relaxed mb-10 overflow-hidden">
            <span className="float-left text-7xl md:text-8xl font-extrabold mr-4 text-slate-900 leading-none mt-2">
              {firstLetter}
            </span>
            {restOfFirstParagraph}
          </p>

          {/* Remaining Paragraphs */}
          {otherParagraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 text-xl md:text-2xl leading-relaxed mb-10">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  )
}
