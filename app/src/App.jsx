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
import ArtistEmpreintePage from './pages/ArtistEmpreintePage'
import ArtistIndiciblePage from './pages/ArtistIndiciblePage'
import ReleaseAkapovPage from './pages/ReleaseAkapovPage'
import EpkEmpreintePage from './pages/EpkEmpreintePage'
import EpkIndiciblePage from './pages/EpkIndiciblePage'
import NotFoundPage from './pages/NotFoundPage'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0a0a;
    font-family: sans-serif;
    overflow-x: hidden;
  }
`

function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      {pathname !== '/' && <SiteHeader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roster" element={<RosterPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/artiste/empreinte" element={<ArtistEmpreintePage />} />
        <Route path="/artiste/indicible" element={<ArtistIndiciblePage />} />
        <Route path="/sortie/akapov-fwac" element={<ReleaseAkapovPage />} />
        <Route path="/epk/empreinte" element={<EpkEmpreintePage />} />
        <Route path="/epk/indicible" element={<EpkIndiciblePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
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
