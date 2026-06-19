import { useState, useEffect, useCallback } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { FanzineWrap } from '../components/FanzineWrap'
import SEO from '../components/SEO'
import { colors, fonts } from '../theme'

const PrintStyle = createGlobalStyle`
  @media print {
    nav, header, footer, .no-print { display: none !important; }
    body { background: white !important; }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
`

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(196,30,30,0.5); }
  50% { box-shadow: 0 0 0 16px rgba(196,30,30,0); }
`

const PrintBtn = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: ${colors.red};
  color: ${colors.paper};
  border: none;
  padding: 16px 32px;
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 100;
  animation: ${pulse} 2.5s ease-in-out infinite;
  transition: background 0.15s;
  &:hover { background: ${colors.ink}; }
  @media print { display: none; }
`

/* ── HERO ── */
const Hero = styled.div`
  position: relative;
  min-height: 100vh;
  background: ${colors.ink} url('/epk/empreinte-pic1.jpg') center 30%/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-bottom: 4px solid ${colors.ink};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(10,10,10,0.2) 0%,
      rgba(10,10,10,0.5) 40%,
      rgba(10,10,10,0.95) 100%
    );
  }
`

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  padding: 0 48px 64px;

  @media (max-width: 640px) {
    padding: 0 24px 40px;
  }
`

const HeroTag = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 16px;
`

const HeroBand = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(80px, 16vw, 200px);
  line-height: 0.82;
  letter-spacing: 4px;
  color: ${colors.paper};
  margin-bottom: 24px;
`

const HeroTagline = styled.div`
  font-family: ${fonts.body};
  font-size: clamp(16px, 2.5vw, 22px);
  color: rgba(235,229,212,0.75);
  line-height: 1.5;
  max-width: 600px;
  margin-bottom: 32px;
`

const StatsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  border: 2px solid rgba(235,229,212,0.2);
`

const Stat = styled.div`
  padding: 16px 28px;
  border-right: 2px solid rgba(235,229,212,0.2);
  &:last-child { border-right: none; }

  @media (max-width: 480px) {
    padding: 12px 16px;
  }
`

const StatVal = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(24px, 4vw, 40px);
  letter-spacing: 2px;
  color: ${colors.paper};
  line-height: 1;
`

const StatLabel = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-top: 4px;
`

/* ── QUOTE ── */
const QuoteHero = styled.div`
  background: ${colors.red};
  padding: 56px 48px;
  border-bottom: 4px solid ${colors.ink};

  @media (max-width: 640px) {
    padding: 40px 24px;
  }
`

const QuoteMark = styled.div`
  font-family: ${fonts.display};
  font-size: 120px;
  line-height: 0.6;
  color: rgba(235,229,212,0.2);
  margin-bottom: -20px;
`

const QuoteText = styled.blockquote`
  font-family: ${fonts.display};
  font-size: clamp(22px, 3.5vw, 40px);
  line-height: 1.15;
  color: ${colors.paper};
  letter-spacing: 1px;
  margin: 0 0 20px;
`

const QuoteSource = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(235,229,212,0.7);
`

/* ── BIO ── */
const BioSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  border-bottom: 4px solid ${colors.ink};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const BioPhoto = styled.div`
  background: ${colors.ink} url('/epk/empreinte-pic2.jpg') center/cover no-repeat;
  min-height: 480px;
`

const BioContent = styled.div`
  padding: 48px 40px;
  background: ${colors.paper};

  @media (max-width: 640px) {
    padding: 32px 24px;
  }
`

const SectionLabel = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 8px;
`

const SectionTitle = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(40px, 6vw, 72px);
  line-height: 0.88;
  letter-spacing: 2px;
  color: ${({ $light }) => $light ? colors.paper : colors.ink};
  margin-bottom: 4px;
`

const Rule = styled.div`
  width: 48px;
  height: 4px;
  background: ${colors.red};
  margin: 20px 0;
`

const Body = styled.div`
  font-family: ${fonts.body};
  font-size: 15px;
  line-height: 1.75;
  color: ${colors.ink};
  p + p { margin-top: 14px; }
`

const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 28px;
`

const MemberCard = styled.div`
  padding: 14px 16px;
  background: ${colors.ink};
`

const MemberRole = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 4px;
`

const MemberName = styled.div`
  font-family: ${fonts.display};
  font-size: 20px;
  letter-spacing: 1px;
  color: ${colors.paper};
`

/* ── DISCO ── */
const DiscoSection = styled.div`
  background: ${colors.ink};
  padding: 48px 40px;
  border-bottom: 4px solid ${colors.paper};

  @media (max-width: 640px) {
    padding: 32px 24px;
  }
`

const DiscoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 2px;
  margin-top: 28px;
`

const DiscoItem = styled.div`
  padding: 16px;
  background: rgba(235,229,212,0.04);
  border: 1px solid rgba(235,229,212,0.08);
  transition: background 0.15s;
  &:hover { background: rgba(235,229,212,0.08); }
`

const DiscoYear = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 3px;
  color: ${colors.red};
  margin-bottom: 4px;
`

const DiscoTitle = styled.div`
  font-family: ${fonts.body};
  font-size: 13px;
  font-weight: bold;
  color: ${colors.paper};
`

const DiscoFormat = styled.div`
  font-family: ${fonts.body};
  font-size: 11px;
  color: rgba(235,229,212,0.4);
  margin-top: 2px;
`

/* ── CLIPS ── */
const ClipsSection = styled.div`
  padding: 48px 40px;
  background: ${colors.ink};
  border-bottom: 4px solid ${colors.paper};

  @media (max-width: 640px) {
    padding: 32px 24px;
  }
`

const ClipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
  margin-top: 28px;
`

const ClipCard = styled.div`
  display: block;
  text-decoration: none;
  background: rgba(235,229,212,0.04);
  border: 1px solid ${({ $active }) => $active ? 'rgba(235,229,212,0.2)' : 'rgba(235,229,212,0.08)'};
  padding: 24px 20px;
  position: relative;
  overflow: hidden;
  cursor: ${({ $active }) => $active ? 'pointer' : 'default'};
  transition: background 0.15s, border-color 0.15s;

  &::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: ${({ $active }) => $active ? colors.red : 'rgba(235,229,212,0.15)'};
  }

  &:hover {
    background: ${({ $active }) => $active ? 'rgba(235,229,212,0.08)' : 'rgba(235,229,212,0.04)'};
  }
`

const ClipTitle = styled.div`
  font-family: ${fonts.display};
  font-size: 18px;
  letter-spacing: 1px;
  color: ${colors.paper};
  line-height: 1.1;
  margin-bottom: 6px;
`

const ClipFeat = styled.div`
  font-family: ${fonts.body};
  font-size: 11px;
  color: rgba(235,229,212,0.45);
  margin-bottom: 12px;
`

const ClipCta = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${({ $active }) => $active ? colors.red : 'rgba(235,229,212,0.2)'};
`

/* ── CAROUSEL ── */
const CarouselSection = styled.div`
  background: ${colors.ink};
  border-bottom: 4px solid ${colors.paper};
  overflow: hidden;
  @media print { display: none; }
`

const CarouselTrack = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 640px) {
    height: 340px;
  }
`

const CarouselSlide = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => $active ? 1 : 0};
  transition: opacity 0.7s ease;
  pointer-events: ${({ $active }) => $active ? 'auto' : 'none'};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: 100%;
    object-fit: contain;
    display: block;
    filter: grayscale(15%);
  }
`

const CarouselOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 40%);
  pointer-events: none;
`

const CarouselControls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2;
`

const CarouselBtn = styled.button`
  background: rgba(10,10,10,0.6);
  border: 2px solid rgba(235,229,212,0.3);
  color: ${colors.paper};
  font-family: ${fonts.display};
  font-size: 20px;
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s, background 0.15s;
  line-height: 1;

  &:hover {
    border-color: ${colors.red};
    background: rgba(196,30,30,0.3);
  }
`

const CarouselDots = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`

const CarouselDot = styled.div`
  width: ${({ $active }) => $active ? '20px' : '6px'};
  height: 6px;
  background: ${({ $active }) => $active ? colors.red : 'rgba(235,229,212,0.3)'};
  transition: width 0.3s, background 0.3s;
`

const CarouselHeader = styled.div`
  padding: 24px 40px 0;

  @media (max-width: 640px) {
    padding: 20px 24px 0;
  }
`

/* ── DATES ── */
const DatesSection = styled.div`
  padding: 48px 40px;
  background: ${colors.paper};
  border-bottom: 4px solid ${colors.ink};

  @media (max-width: 640px) {
    padding: 32px 24px;
  }
`

const DateRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 20px;
  padding: 16px 0;
  border-bottom: 2px solid rgba(10,10,10,0.08);
  align-items: center;
  &:last-child { border-bottom: none; }
`

const DateVal = styled.div`
  font-family: ${fonts.display};
  font-size: 20px;
  letter-spacing: 1px;
  color: ${colors.red};
`

const DatePlace = styled.div`
  font-family: ${fonts.body};
  font-size: 15px;
  color: ${colors.ink};
`

/* ── CONTACT ── */
const ContactSection = styled.div`
  background: ${colors.ink};
  padding: 64px 48px;

  @media (max-width: 640px) {
    padding: 40px 24px;
  }
`

const BookingCTA = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.red};
  color: ${colors.paper};
  text-decoration: none;
  padding: 28px 40px;
  margin-top: 32px;
  margin-bottom: 32px;
  transition: background 0.15s;
  &:hover { background: #a01818; }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
    padding: 24px;
  }
`

const BookingLabel = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(24px, 4vw, 48px);
  letter-spacing: 2px;
`

const BookingArrow = styled.div`
  font-family: ${fonts.display};
  font-size: 48px;
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const ContactItem = styled.div`
  padding: 20px 24px;
  background: rgba(235,229,212,0.04);
  border: 1px solid rgba(235,229,212,0.08);
`

const ContactLabel = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 9px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 6px;
`

const ContactVal = styled.div`
  font-family: ${fonts.body};
  font-size: 15px;
  color: ${colors.paper};
`

const members = [
  { role: 'Chant', name: 'YANNIS' },
  { role: 'Guitare', name: 'LYLIAN' },
  { role: 'Guitare', name: 'QUENTIN' },
  { role: 'Batterie', name: 'MATEO' },
]

const discographie = [
  { year: '2025', title: 'VERTIGO', format: 'EP', url: 'https://bfan.link/vertigo-18' },
  { year: '2025', title: 'SHATTERED MEMORIES', format: 'Single' },
  { year: '2025', title: 'MADNESS', format: 'Single' },
  { year: '2025', title: 'SATELLITE', format: 'Single' },
  { year: '2025', title: 'THE SURFACE (Acoustic)', format: 'Single' },
  { year: '2024', title: 'THE SURFACE', format: 'Single' },
  { year: '2024', title: 'ICE COLD KNIVES', format: 'Single' },
  { year: '2024', title: 'DREAM', format: 'Single' },
  { year: '2022', title: 'THE OTHER WORLD ALT.', format: 'Single' },
  { year: '2021', title: 'VOID', format: 'EP' },
  { year: '2020', title: 'WASTELAND', format: 'Single' },
  { year: '2019', title: 'GRAY', format: 'Single' },
  { year: '2019', title: 'LEAD ME NOWHERE', format: 'Single' },
  { year: '2018', title: 'VASA', format: 'EP' },
]

const photos = [
  '/carrousel/carousel_01_8.jpg',
  '/carrousel/GROUE-ET-PUBLIC1-600x600.jpg',
  '/carrousel/GROUPE-ET-PUBLIC2-600x600.jpg',
  '/carrousel/GROUPE-ET-PUBLIC3-600x600.jpg',
  '/carrousel/P1090016-600x600.jpg',
  '/carrousel/P1090027-600x600.jpg',
  '/carrousel/P1090181-600x600.jpg',
  '/carrousel/P1090296-600x600.jpg',
  '/carrousel/P1029709-600x600.jpg',
  '/carrousel/P1029864-600x600.jpg',
  '/carrousel/YANNIS-600x600.jpg',
  '/carrousel/YANNIS2-600x600.jpg',
  '/carrousel/FELIX1-600x600.jpg',
  '/carrousel/FELIX2-600x600.jpg',
  '/carrousel/NATHAN2-600x600.jpg',
  '/carrousel/1-600x600.jpg',
]

const clips = [
  { title: 'SHATTERED MEMORIES', feat: 'feat. Flo from Averses', url: 'https://bfan.link/shattered-memories-1' },
  { title: 'MADNESS', feat: 'feat. Clem Richard from ASHEN', url: 'https://www.youtube.com/watch?v=AcB1ULW5Q7k' },
  { title: 'ICE COLD KNIVES', feat: null, url: 'https://www.youtube.com/watch?v=fr7aAd8it9E' },
  { title: 'SATELLITE', feat: null, url: 'https://www.youtube.com/watch?v=Nzv9FKUQgMk' },
]

const dates = [
  { date: '05.02.2025', lieu: 'Lyon — La Pente' },
  { date: '06.03.2025', lieu: "Orléans — Le Dropkick" },
  { date: '07.03.2025', lieu: 'Limoges — Le Dropkick' },
  { date: '09.03.2025', lieu: 'Lille — La Brat Cave' },
  { date: '13.03.2025', lieu: 'Charleroi — Le Vecteur (Belgique)' },
  { date: '17.05.2025', lieu: 'Compiègne — Ziquodrome · avec Ashen & Alternight' },
  { date: '13.09.2025', lieu: 'Bambiderstroff — Bambi Metal Fest' },
  { date: '20.09.2025', lieu: 'Betz — Festival de la Voix Verte' },
  { date: '12.11.2025', lieu: 'Marseille — Makeda' },
  { date: '13.11.2025', lieu: 'Montpellier — Secret Place' },
  { date: '12.12.2025', lieu: 'Amiens — Cité Carter' },
  { date: '22.01.2026', lieu: 'Lille — Brat Cave' },
  { date: '19.02.2026', lieu: 'Schaerbeek — Remifest' },
  { date: '16.05.2026', lieu: 'Soissons — Saint-Jean-des-Vignes' },
]

export default function EpkEmpreintePage() {
  const [slide, setSlide] = useState(0)

  const next = useCallback(() => setSlide(s => (s + 1) % photos.length), [])
  const prev = useCallback(() => setSlide(s => (s - 1 + photos.length) % photos.length), [])

  useEffect(() => {
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [next])

  return (
    <FanzineWrap>
      <PrintStyle />
      <SEO title="EPK — Empreinte" description="Press Kit Empreinte 2026. Metalcore · Électronique. Amiens, France." path="/epk/empreinte" />

      <Hero>
        <HeroInner>
          <HeroTag>▼ Electronic Press Kit · 2026</HeroTag>
          <HeroBand>EM&shy;PREIN&shy;TE</HeroBand>
          <HeroTagline>
            Du métal moderne qui frappe au casque comme sur scène —<br />
            un rouleau compresseur d'énergie, vibrante, vivante.
          </HeroTagline>
          <StatsBar>
            <Stat><StatVal>2018</StatVal><StatLabel>Fondé en</StatLabel></Stat>
            <Stat><StatVal>7</StatVal><StatLabel>Années scène</StatLabel></Stat>
            <Stat><StatVal>14</StatVal><StatLabel>Sorties</StatLabel></Stat>
            <Stat><StatVal>2027</StatVal><StatLabel>Album prévu</StatLabel></Stat>
          </StatsBar>
        </HeroInner>
      </Hero>

      <QuoteHero>
        <QuoteMark>"</QuoteMark>
        <QuoteText>
          Premier uppercut de la soirée. Un set percutant, lourd et intense.
          Le groupe local a directement mis la barre très haut.
        </QuoteText>
        <QuoteSource>Ben — BGP Music Live</QuoteSource>
      </QuoteHero>

      <BioSection>
        <BioPhoto />
        <BioContent>
          <SectionLabel>01 · Biographie</SectionLabel>
          <SectionTitle>QUI<br />SOMMES-<br />NOUS</SectionTitle>
          <Rule />
          <Body>
            <p>
              EMPREINTE poursuit sa route en 2026 avec une évolution de line-up :
              Yannis et Lylian continuent l'aventure, rejoints par Quentin à la guitare
              et Mateo à la batterie.
            </p>
            <p>
              Le groupe reste déterminé à toujours proposer une musique originale
              et impactante, du métal moderne à écouter tantôt au casque pour une
              introspection partagée et centrée sur les thèmes abordés (le mal-être,
              la dépression…), tantôt en live pour se laisser embarquer dans un
              rouleau compresseur d'énergie, vibrante, vivante, comme un défouloir.
            </p>
            <p>
              Premier album en préparation, prévu pour début 2027.
            </p>
            <p>
              Dans la lignée de <strong>Northlane</strong>, <strong>Bad Omens</strong>.
            </p>
          </Body>
          <MemberGrid>
            {members.map(m => (
              <MemberCard key={m.name}>
                <MemberRole>{m.role}</MemberRole>
                <MemberName>{m.name}</MemberName>
              </MemberCard>
            ))}
          </MemberGrid>
        </BioContent>
      </BioSection>

      <DiscoSection>
        <SectionLabel>02 · Discographie</SectionLabel>
        <SectionTitle $light>DISCO&shy;GRAPHIE</SectionTitle>
        <Rule />
        <DiscoGrid>
          {discographie.map(d => (
            <DiscoItem
              key={d.title}
              as={d.url ? 'a' : 'div'}
              href={d.url || undefined}
              target={d.url ? '_blank' : undefined}
              rel={d.url ? 'noopener noreferrer' : undefined}
              style={d.url ? { textDecoration: 'none', cursor: 'pointer' } : {}}
            >
              <DiscoYear>{d.year}</DiscoYear>
              <DiscoTitle>{d.title}</DiscoTitle>
              <DiscoFormat>{d.format}{d.url ? ' · →' : ''}</DiscoFormat>
            </DiscoItem>
          ))}
        </DiscoGrid>
      </DiscoSection>

      <ClipsSection>
        <SectionLabel>03 · Clips</SectionLabel>
        <SectionTitle $light>MUSIC<br />VIDEOS</SectionTitle>
        <Rule />
        <ClipsGrid>
          {clips.map(c => (
            <ClipCard
              key={c.title}
              as={c.url ? 'a' : 'div'}
              href={c.url || undefined}
              target={c.url ? '_blank' : undefined}
              rel={c.url ? 'noopener noreferrer' : undefined}
              $active={!!c.url}
            >
              <ClipTitle>{c.title}</ClipTitle>
              {c.feat && <ClipFeat>{c.feat}</ClipFeat>}
              <ClipCta $active={!!c.url}>{c.url ? '→ Écouter / Voir' : '— Bientôt disponible'}</ClipCta>
            </ClipCard>
          ))}
        </ClipsGrid>
      </ClipsSection>

      <CarouselSection>
        <CarouselHeader>
          <SectionLabel>04 · Photos live</SectionLabel>
        </CarouselHeader>
        <CarouselTrack>
          {photos.map((src, i) => (
            <CarouselSlide key={src} $active={i === slide}>
              <img src={src} alt={`Empreinte live ${i + 1}`} loading="lazy" decoding="async" />
            </CarouselSlide>
          ))}
          <CarouselOverlay />
          <CarouselControls>
            <CarouselDots>
              {photos.map((_, i) => (
                <CarouselDot key={i} $active={i === slide} onClick={() => setSlide(i)} style={{ cursor: 'pointer' }} />
              ))}
            </CarouselDots>
            <CarouselBtn onClick={prev}>‹</CarouselBtn>
            <CarouselBtn onClick={next}>›</CarouselBtn>
          </CarouselControls>
        </CarouselTrack>
      </CarouselSection>

      <DatesSection>
        <SectionLabel>05 · Concerts</SectionLabel>
        <SectionTitle>DATES</SectionTitle>
        <Rule />
        {dates.map(d => (
          <DateRow key={d.date}>
            <DateVal>{d.date}</DateVal>
            <DatePlace>{d.lieu}</DatePlace>
          </DateRow>
        ))}

        <div style={{ marginTop: '32px', padding: '20px', background: '#f5f0e4', borderLeft: '4px solid #c41e1e' }}>
          <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: colors.red, marginBottom: '6px' }}>Trioffs 2024</div>
          <div style={{ fontFamily: fonts.body, fontSize: '14px', lineHeight: '1.6', color: colors.ink }}>
            Lauréat de la catégorie <strong>« Espoir Booster »</strong> — Empreinte a su convaincre l'ensemble
            du jury par son identité marquée, son énergie live et sa capacité à faire vibrer une scène.
          </div>
        </div>
      </DatesSection>

      <ContactSection>
        <SectionLabel>06 · Contact & Booking</SectionLabel>
        <SectionTitle $light>PROGRAM&shy;MEZ-NOUS</SectionTitle>
        <BookingCTA href="mailto:contact@studiocarillon.fr">
          <BookingLabel>contact@studiocarillon.fr</BookingLabel>
          <BookingArrow>→</BookingArrow>
        </BookingCTA>
        <ContactGrid>
          <ContactItem>
            <ContactLabel>Management / Booking</ContactLabel>
            <ContactVal>Maud · 07 44 84 63 35</ContactVal>
          </ContactItem>
          <ContactItem>
            <ContactLabel>Label</ContactLabel>
            <ContactVal>Carillon · carillonlabel.fr</ContactVal>
          </ContactItem>
          <ContactItem>
            <ContactLabel>Genre</ContactLabel>
            <ContactVal>Metalcore · Électronique</ContactVal>
          </ContactItem>
          <ContactItem>
            <ContactLabel>Ville</ContactLabel>
            <ContactVal>Amiens, France</ContactVal>
          </ContactItem>
        </ContactGrid>
      </ContactSection>

      <PrintBtn className="no-print" onClick={() => window.print()}>
        ↓ Télécharger PDF
      </PrintBtn>
    </FanzineWrap>
  )
}
