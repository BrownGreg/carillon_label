import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { FanzineWrap } from '../components/FanzineWrap'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import { colors, fonts } from '../theme'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`

/* ── MODAL ── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10,10,10,0.85);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`

const Modal = styled.div`
  background: ${colors.paper};
  color: ${colors.ink};
  width: 100%;
  max-width: 560px;
  max-height: 80vh;
  overflow-y: auto;
  animation: ${fadeIn} 0.2s ease;
`

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
  border-bottom: 4px solid ${colors.ink};
  background: ${colors.ink};
  color: ${colors.paper};
`

const ModalCover = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  flex-shrink: 0;
`

const ModalInfo = styled.div`flex: 1;`

const ModalTitle = styled.div`
  font-family: ${fonts.display};
  font-size: 28px;
  line-height: 1;
  letter-spacing: 1px;
`

const ModalMeta = styled.div`
  font-family: ${fonts.body};
  font-size: 11px;
  color: rgba(235,229,212,0.6);
  margin-top: 6px;
  letter-spacing: 1px;
`

const ModalClose = styled.button`
  background: none;
  border: none;
  color: ${colors.paper};
  font-family: ${fonts.display};
  font-size: 24px;
  cursor: pointer;
  flex-shrink: 0;
  line-height: 1;
  padding: 0;
`

const TrackList = styled.div`padding: 8px 0;`

const Track = styled.div`
  display: grid;
  grid-template-columns: 28px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 10px 24px;
  border-bottom: 1px solid rgba(10,10,10,0.1);
  &:last-child { border-bottom: none; }
  &:hover { background: rgba(10,10,10,0.05); }
`

const TrackNum = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  color: ${colors.red};
  text-align: right;
`

const TrackName = styled.div`
  font-family: ${fonts.body};
  font-size: 14px;
  color: ${colors.ink};
`

const TrackDuration = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 12px;
  color: ${colors.darkGrey};
  letter-spacing: 1px;
`


/* ── HERO ── */
const Hero = styled.div`
  position: relative;
  min-height: 70vh;
  background: ${colors.ink} url('/artist-akapov.jpg') center 30%/cover no-repeat;
  display: flex;
  align-items: flex-end;
  overflow: hidden;

  @media (max-width: 640px) {
    min-height: 55vh;
  }
`

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.3) 60%, transparent 100%);
`

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 40px;
  width: 100%;

  @media (max-width: 640px) {
    padding: 24px 20px;
  }
`

const HeroLabel = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 8px;
`

const HeroName = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(56px, 12vw, 140px);
  line-height: 0.85;
  letter-spacing: 2px;
  color: ${colors.paper};
`

const HeroGenre = styled.div`
  font-family: ${fonts.body};
  font-size: 15px;
  color: rgba(235,229,212,0.6);
  margin-top: 12px;
`

/* ── INFO ROW ── */
const InfoRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 4px solid ${colors.ink};

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`

const InfoCell = styled.div`
  padding: 24px 28px;
  border-right: ${({ $last }) => $last ? 'none' : `4px solid ${colors.ink}`};
  background: ${colors.paper};

  @media (max-width: 640px) {
    border-right: none;
    border-bottom: 4px solid ${colors.ink};

    &:nth-child(odd) {
      border-right: 4px solid ${colors.ink};
    }

    &:last-child, &:nth-last-child(2):nth-child(odd) {
      border-bottom: none;
    }

    padding: 18px 16px;
  }
`

const InfoLabel = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 6px;
`

const InfoVal = styled.div`
  font-family: ${fonts.display};
  font-size: 22px;
  letter-spacing: 1px;
  color: ${colors.ink};
  line-height: 1.1;
`

/* ── DISCOGRAPHIE ── */
const DiscoSection = styled.div`
  background: ${colors.ink};
  padding: 36px 40px;
  border-bottom: 4px solid ${colors.ink};

  @media (max-width: 640px) {
    padding: 28px 20px;
  }
`

const DiscoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 24px;
  max-width: 560px;
`

const DiscoCard = styled.div`
  background: ${colors.paper};
  padding: 14px;
  transform: ${({ $tilt }) => $tilt === '1' ? 'rotate(-1deg)' : 'rotate(0.8deg)'};
  cursor: pointer;
  transition: transform 0.15s;

  &:hover {
    transform: rotate(0deg) scale(1.02);
  }
`

const DiscoArt = styled.div`
  aspect-ratio: 1;
  background: ${colors.ink};
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(20%);
    transition: filter 0.3s ease;
  }

  &:hover img {
    filter: grayscale(0%);
  }
`


const DiscoName = styled.div`
  font-family: ${fonts.display};
  font-size: 15px;
  letter-spacing: 1px;
  line-height: 1;
  color: ${colors.ink};
`

const DiscoMeta = styled.div`
  font-family: ${fonts.body};
  font-size: 10px;
  color: ${colors.darkGrey};
  margin-top: 4px;
`

/* ── PLATFORMS ── */
const PlatformsSection = styled.div`
  padding: 36px 40px;
  border-bottom: 4px solid ${colors.ink};
  background: ${colors.paper};

  @media (max-width: 640px) {
    padding: 28px 20px;
  }
`

const PlatformsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 24px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Platform = styled.a`
  display: block;
  text-decoration: none;
  color: ${colors.ink};
  border: 3px solid ${colors.ink};
  padding: 18px 12px;
  text-align: center;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${colors.ink};
    color: ${colors.paper};
  }
`

const PlatformName = styled.div`
  font-family: ${fonts.display};
  font-size: 20px;
  letter-spacing: 2px;
`

const PlatformArrow = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 2px;
  margin-top: 4px;
  color: ${colors.red};
`

/* ── DATA ── */
const discography = [
  {
    name: 'LIMBIC',
    meta: '19/07/2026 · Single',
    tilt: '1',
    cover: '/cover-bleed-yourself.jpg',
    tracks: [{ name: 'Limbic', duration: '3:36' }],
  },
  {
    name: 'FLOWERS, WINE AND CANDLES',
    meta: '19/06/2026 · Single',
    tilt: '2',
    cover: '/Cover_flower.jpg',
    tracks: [{ name: 'Flowers, Wine and Candles', duration: '2:42' }],
  },
]

const platforms = [
  { name: 'SPOTIFY', url: 'https://open.spotify.com/intl-fr/artist/1OCQSGIvc2iO0O1PAUBWmz?si=tOS8v-aMQxeqQofGBEEIBw' },
  { name: 'APPLE MUSIC', url: 'https://music.apple.com/fr/artist/akapov/1576031015' },
  { name: 'DEEZER', url: 'https://www.deezer.com/fr/artist/149343932' },
  { name: 'YOUTUBE', url: 'https://www.youtube.com/@akapovband_fr' },
]

export default function ArtistAkapovPage() {
  const [selected, setSelected] = useState(null)

  return (
    <FanzineWrap>
      <SEO
        title="Akapov"
        description="Akapov — Shoegaze Nu Metal. Découvrez la discographie et où écouter."
        path="/artiste/akapov"
        image="/artist-akapov.jpg"
      />

      <Hero>
        <HeroOverlay />
        <HeroContent>
          <HeroLabel>▼ Page artiste</HeroLabel>
          <HeroName>AKAPOV</HeroName>
          <HeroGenre>// Shoegaze Nu Metal · Depuis 2024</HeroGenre>
          <Link to="/epk/akapov" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginTop: '24px', padding: '18px 40px',
            border: `3px solid ${colors.red}`, color: colors.paper,
            background: colors.red,
            fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px',
            letterSpacing: '3px', textTransform: 'uppercase', textDecoration: 'none',
            transition: 'background 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#a01818'; e.currentTarget.style.borderColor = '#a01818' }}
          onMouseLeave={e => { e.currentTarget.style.background = colors.red; e.currentTarget.style.borderColor = colors.red }}
          >
            ↓ Press Kit (EPK)
          </Link>
        </HeroContent>
      </Hero>

      <InfoRow>
        <InfoCell>
          <InfoLabel>Genre</InfoLabel>
          <InfoVal>Shoegaze Nu Metal</InfoVal>
        </InfoCell>
        <InfoCell>
          <InfoLabel>Origine</InfoLabel>
          <InfoVal>Amiens</InfoVal>
        </InfoCell>
        <InfoCell>
          <InfoLabel>Chez Carillon depuis</InfoLabel>
          <InfoVal>2026</InfoVal>
        </InfoCell>
        <InfoCell $last>
          <InfoLabel>Line-up</InfoLabel>
          <InfoVal>Arthur · Yannis<br />Titou · Grégory</InfoVal>
        </InfoCell>
      </InfoRow>

      <DiscoSection>
        <SectionHeader title="DISCOGRAPHIE" inverted />
        <DiscoGrid>
          {discography.map((d, i) => (
            <DiscoCard key={i} $tilt={d.tilt} onClick={() => setSelected(d)}>
              <DiscoArt>
                <img src={d.cover} alt={d.name} loading="lazy" decoding="async" />

              </DiscoArt>
              <DiscoName>{d.name}</DiscoName>
              <DiscoMeta>{d.meta}</DiscoMeta>
            </DiscoCard>
          ))}
        </DiscoGrid>
      </DiscoSection>

      <PlatformsSection>
        <PlatformsGrid>
          {platforms.map((p) => (
            <Platform key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">
              <PlatformName>{p.name}</PlatformName>
              <PlatformArrow>→ ÉCOUTER</PlatformArrow>
            </Platform>
          ))}
        </PlatformsGrid>
      </PlatformsSection>

      {selected && (
        <Overlay onClick={() => setSelected(null)}>
          <Modal onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalCover src={selected.cover} alt={selected.name} />
              <ModalInfo>
                <ModalTitle>{selected.name}</ModalTitle>
                <ModalMeta>{selected.meta}</ModalMeta>
              </ModalInfo>
              <ModalClose onClick={() => setSelected(null)}>✕</ModalClose>
            </ModalHeader>
            <TrackList>
              {selected.tracks.map((t, i) => (
                <Track key={i}>
                  <TrackNum>{i + 1}</TrackNum>
                  <TrackName>{t.name}</TrackName>
                  <TrackDuration>{t.duration}</TrackDuration>
                </Track>
              ))}
            </TrackList>
          </Modal>
        </Overlay>
      )}
    </FanzineWrap>
  )
}
