import type { Metadata } from 'next'

export const siteConfig = {
  name: 'CarFlex',
  legalName: 'CarFlex',
  url: 'https://carflex.com.tr',
  defaultTitle: 'Kurumsal Araç Kiralama ve Filo Çözümleri',
  description:
    'CarFlex; kurumsal araç kiralama, uzun dönem filo yönetimi, elektrikli araç dönüşümü ve operasyonel destek çözümleri sunar.',
  locale: 'tr_TR',
  ogImage: '/banner.png',
  phone: '+90 532 655 57 22',
  email: 'info@carflex.com.tr',
  address: {
    streetAddress: 'Rıhtım Sk. No:8/3 Üsküdar',
    addressLocality: 'İstanbul',
    addressRegion: 'İstanbul',
    postalCode: '34662',
    addressCountry: 'TR',
  },
  keywords: [
    'araç kiralama',
    'kurumsal araç kiralama',
    'filo kiralama',
    'uzun dönem araç kiralama',
    'operasyonel kiralama',
    'elektrikli araç kiralama',
    'filo yönetimi',
    'kurumsal filo çözümleri',
    'istanbul araç kiralama',
    'şirket araç kiralama',
  ],
} as const

type MetadataInput = {
  title: string
  description: string
  path?: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  return new URL(path.startsWith('/') ? path : `/${path}`, siteConfig.url).toString()
}

export function createMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image = siteConfig.ogImage,
  type = 'website',
  noIndex = false,
}: MetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: path,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            noarchive: true,
            nosnippet: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  }
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: siteConfig.legalName,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    logo: absoluteUrl('/carflex-logo.png'),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.address,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'customer service',
      email: siteConfig.email,
      availableLanguage: ['Turkish'],
    },
  }
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'tr-TR',
    publisher: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  }
}
