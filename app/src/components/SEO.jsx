import { Helmet } from 'react-helmet-async'
import { SITE_URL } from '../config'

const BASE_URL = SITE_URL
const DEFAULT_IMG = `${BASE_URL}/logo-fx.png`

export default function SEO({ title, description, path = '', image }) {
  const fullTitle = title ? `${title} — Carillon` : 'Carillon — Label indépendant · Management · Édition · Coproduction'
  const fullUrl = `${BASE_URL}${path}`
  const img = image ? `${BASE_URL}${image}` : DEFAULT_IMG

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={img} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  )
}
