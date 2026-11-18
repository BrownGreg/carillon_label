import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { createGlobalStyle } from 'styled-components'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import RosterPage from './pages/RosterPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import EpkFeuilletteePage from './pages/EpkFeuilletteePage'
import NotFoundPage from './pages/NotFoundPage'
import ArtistPage from './pages/ArtistPage'
import EpkPage from './pages/EpkPage'
import AdminPage from './pages/admin/AdminPage'
import AdminArtistEdit from './pages/admin/AdminArtistEdit'
import AdminActivate from './pages/admin/AdminActivate'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0a0a;
    font-family: sans-serif;
    overflow-x: hidden;
  }
`

const ADMIN_PATHS = ['/admin']
const NO_HEADER_PATHS = ['/']

function Layout() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')
  const showHeader = !NO_HEADER_PATHS.includes(pathname) && !isAdmin
  const showFooter = !isAdmin

  return (
    <>
      {showHeader && <SiteHeader />}
      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/roster" element={<RosterPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* EPK hardcodé restant (migration schema à venir : compétences, témoignages, groupe par date) */}
        <Route path="/epk/felix-feuillette" element={<EpkFeuilletteePage />} />

        {/* Pages dynamiques pilotées par Supabase (éditables via /admin) */}
        <Route path="/artiste/:slug" element={<ArtistPage />} />
        <Route path="/epk/:slug" element={<EpkPage />} />

        {/* Administration */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/artiste/:id" element={<AdminArtistEdit />} />
        <Route path="/admin/activer" element={<AdminActivate />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {showFooter && <SiteFooter />}
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
      <GlobalStyle />
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
    </HelmetProvider>
  )
}
