export const dynamic = 'force-static'

export async function GET() {
  const manifest = {
    name: 'CarFlex',
    short_name: 'CarFlex',
    description:
      'Kurumsal araç kiralama, uzun dönem filo yönetimi ve elektrikli araç dönüşüm çözümleri.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f172a',
    lang: 'tr',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon-1024.png',
        sizes: '1024x1024',
        type: 'image/png',
      },
    ],
  }

  return Response.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
