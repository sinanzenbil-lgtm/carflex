import { absoluteUrl } from '@/lib/seo'

const title = 'Kurumsal Araç Kiralama Teklifi Al | CarFlex'
const description =
  'Şirketiniz için uzun dönem filo kiralama, elektrikli araç ve operasyonel destek teklifini hızlıca alın.'
const canonical = absoluteUrl('/teklif-al')
const image = absoluteUrl('/banner.png')

export default function Head() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  )
}
