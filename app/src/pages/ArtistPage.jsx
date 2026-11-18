import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { FanzineWrap } from '../components/FanzineWrap'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import { colors, fonts } from '../theme'
import { supabase } from '../lib/supabase'
import NotFoundPage from './NotFoundPage'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`

const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(10,10,10,0.85);
  z-index: 100;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
`
const Modal = styled.div`
  background: ${colors.paper}; color: ${colors.ink};
  width: 100%; max-width: 560px; max-height: 80vh;
  overflow-y: auto; animation: ${fadeIn} 0.2s ease;
`
const ModalHeader = styled.div`
  display: flex; align-items: flex-start; gap: 20px;
  padding: 24px; border-bottom: 4px solid ${colors.ink};
  background: ${colors.ink}; color: ${colors.paper};
`
const ModalCover = styled.img`width: 80px; height: 80px; object-fit: cover; flex-shrink: 0;`
const ModalInfo = styled.div`flex: 1;`
const ModalTitle = styled.div`font-family: ${fonts.display}; font-size: 28px; line-height: 1; letter-spacing: 1px;`
const ModalMeta = styled.div`font-family: ${fonts.body}; font-size: 11px; color: rgba(235,229,212,0.6); margin-top: 6px; letter-spacing: 1px;`
const ModalClose = styled.button`
  background: none; border: none; color: ${colors.paper};
  font-family: ${fonts.display}; font-size: 24px; cursor: pointer;
  flex-shrink: 0; line-height: 1; padding: 0;
`
const TrackList = styled.div`padding: 8px 0;`
const Track = styled.div`
  display: grid; grid-template-columns: 28px 1fr auto;
  align-items: center; gap: 12px; padding: 10px 24px;
  border-bottom: 1px solid rgba(10,10,10,0.1);
  &:last-child { border-bottom: none; }
  &:hover { background: rgba(10,10,10,0.05); }
`
const TrackNum = styled.div`font-family: ${fonts.heading}; font-weight: 700; font-size: 11px; color: ${colors.red}; text-align: right;`
const TrackName = styled.div`font-family: ${fonts.body}; font-size: 14px; color: ${colors.ink};`
const TrackFeat = styled.div`font-family: ${fonts.body}; font-size: 11px; color: ${colors.darkGrey}; margin-top: 2px;`
const TrackDuration = styled.div`font-family: ${fonts.heading}; font-weight: 700; font-size: 12px; color: ${colors.darkGrey}; letter-spacing: 1px;`

const Hero = styled.div`
  position: relative; min-height: 70vh;
  background: ${({ $photo, $focus }) => `${colors.ink} url('${$photo}') ${$focus}/cover no-repeat`};
  display: flex; align-items: flex-end; overflow: hidden;
  @media (max-width: 640px) { min-height: 55vh; }
`
const HeroOverlay = styled.div`
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.3) 60%, transparent 100%);
`
const HeroContent = styled.div`
  position: relative; z-index: 1; padding: 40px; width: 100%;
  @media (max-width: 640px) { padding: 24px 20px; }
`
const HeroLabel = styled.div`
  font-family: ${fonts.heading}; font-weight: 700; font-size: 11px;
  letter-spacing: 4px; text-transform: uppercase; color: ${colors.red}; margin-bottom: 8px;
`
const HeroName = styled.div`
  font-family: ${fonts.display}; font-size: clamp(56px, 12vw, 140px);
  line-height: 0.85; letter-spacing: 2px; color: ${colors.paper};
`
const HeroGenre = styled.div`
  font-family: ${fonts.body}; font-size: 15px; color: rgba(235,229,212,0.6); margin-top: 12px;
`
const EpkBtn = styled(Link)`
  display: inline-flex; align-items: center; gap: 10px;
  margin-top: 24px; padding: 18px 40px;
  border: 3px solid ${colors.red}; color: ${colors.paper};
  background: ${colors.red}; font-family: ${fonts.heading}; font-weight: 700;
  font-size: 13px; letter-spacing: 3px; text-transform: uppercase; text-decoration: none;
  transition: background 0.15s, border-color 0.15s;
  &:hover { background: #a01818; border-color: #a01818; }
`
const InfoRow = styled.div`
  display: grid; grid-template-columns: repeat(4, 1fr);
  border-bottom: 4px solid ${colors.ink};
  @media (max-width: 640px) { grid-template-columns: 1fr 1fr; }
`
const InfoCell = styled.div`
  padding: 24px 28px;
  border-right: ${({ $last }) => $last ? 'none' : `4px solid ${colors.ink}`};
  background: ${colors.paper};
  @media (max-width: 640px) {
    border-right: none; border-bottom: 4px solid ${colors.ink};
    &:nth-child(odd) { border-right: 4px solid ${colors.ink}; }
    &:last-child, &:nth-last-child(2):nth-child(odd) { border-bottom: none; }
    padding: 18px 16px;
  }
`
const InfoLabel = styled.div`
  font-family: ${fonts.heading}; font-weight: 700; font-size: 10px;
  letter-spacing: 3px; text-transform: uppercase; color: ${colors.red}; margin-bottom: 6px;
`
const InfoVal = styled.div`
  font-family: ${fonts.display}; font-size: 22px; letter-spacing: 1px;
  color: ${colors.ink}; line-height: 1.1;
`
const DiscoSection = styled.div`
  background: ${colors.ink}; padding: 36px 40px;
  border-bottom: 4px solid ${colors.ink};
  @media (max-width: 640px) { padding: 28px 20px; }
`
const DiscoGrid = styled.div`
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 24px;
  @media (max-width: 768px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 400px) { grid-template-columns: repeat(2, 1fr); }
`
const DiscoCard = styled.div`
  background: ${colors.paper}; padding: 14px;
  transform: ${({ $tilt }) => $tilt === '1' ? 'rotate(-1deg)' : 'rotate(0.8deg)'};
`
const DiscoArt = styled.div`
  aspect-ratio: 1; background: ${colors.ink}; margin-bottom: 10px; overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(20%); transition: filter 0.3s ease; }
  &:hover img { filter: grayscale(0%); }
`
const DiscoName = styled.div`font-family: ${fonts.display}; font-size: 15px; letter-spacing: 1px; line-height: 1; color: ${colors.ink};`
const DiscoMeta = styled.div`font-family: ${fonts.body}; font-size: 10px; color: ${colors.darkGrey}; margin-top: 4px;`

const PlatformsSection = styled.div`
  padding: 36px 40px; border-bottom: 4px solid ${colors.ink}; background: ${colors.paper};
  @media (max-width: 640px) { padding: 28px 20px; }
`
const PlatformsGrid = styled.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 24px;
  @media (max-width: 640px) { grid-template-columns: repeat(2, 1fr); }
`
const Platform = styled.a`
  display: block; text-decoration: none; color: ${colors.ink};
  border: 3px solid ${colors.ink}; padding: 18px 12px; text-align: center;
  transition: background 0.15s, color 0.15s;
  &:hover { background: ${colors.ink}; color: ${colors.paper}; }
`
const PlatformName = styled.div`font-family: ${fonts.display}; font-size: 20px; letter-spacing: 2px;`
const PlatformArrow = styled.div`font-family: ${fonts.heading}; font-weight: 700; font-size: 11px; letter-spacing: 2px; margin-top: 4px; color: ${colors.red};`

const Loading = styled.div`
  display: flex; align-items: center; justify-content: center;
  min-height: 60vh; font-family: ${fonts.display}; font-size: 32px;
  color: ${colors.paper}; background: ${colors.ink};
`

export default function ArtistPage() {
  const { slug } = useParams()
  const [artist, setArtist] = useState(null)
  const [info, setInfo] = useState(null)
  const [platforms, setPlatforms] = useState([])
  const [releases, setReleases] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: a } = await supabase
        .from('artists')
        .select('*')
        .eq('slug', slug)
        .single()

      if (!a) { setNotFound(true); setLoading(false); return }

      const [infoRes, platformsRes, releasesRes] = await Promise.all([
        supabase.from('artist_info').select('*').eq('artist_id', a.id).single(),
        supabase.from('artist_platforms').select('*').eq('artist_id', a.id).order('sort_order'),
        supabase.from('artist_releases').select('*').eq('artist_id', a.id).order('sort_order'),
      ])

      setArtist(a)
      setInfo(infoRes.data)
      setPlatforms(platformsRes.data || [])
      setReleases(releasesRes.data || [])
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) return <Loading>// Chargement...</Loading>
  if (notFound) return <NotFoundPage />

  const epkSlug = info?.epk_slug || slug
  const heroPhoto = info?.hero_photo_url || artist.photo_url || ''

  return (
    <FanzineWrap>
      <SEO
        title={artist.name}
        description={`${artist.name} — ${info?.genre || artist.tag}. Découvrez la discographie et où écouter.`}
        path={`/artiste/${slug}`}
        image={heroPhoto}
      />

      <Hero $photo={heroPhoto} $focus={info?.hero_photo_focus || 'center 40%'}>
        <HeroOverlay />
        <HeroContent>
          <HeroLabel>▼ Page artiste</HeroLabel>
          <HeroName>{artist.name}</HeroName>
          <HeroGenre>// {info?.genre || artist.tag}{info?.since_year ? ` · Depuis ${info.since_year}` : ''}</HeroGenre>
          {artist.has_epk && (
            <EpkBtn to={`/epk/${epkSlug}`}>↓ Press Kit (EPK)</EpkBtn>
          )}
        </HeroContent>
      </Hero>

      {info && (
        <InfoRow>
          <InfoCell>
            <InfoLabel>Genre</InfoLabel>
            <InfoVal>{info.genre}</InfoVal>
          </InfoCell>
          <InfoCell>
            <InfoLabel>Origine</InfoLabel>
            <InfoVal>{info.origin}</InfoVal>
          </InfoCell>
          <InfoCell>
            <InfoLabel>Chez Carillon depuis</InfoLabel>
            <InfoVal>{info.since_year}</InfoVal>
          </InfoCell>
          <InfoCell $last>
            <InfoLabel>Line-up</InfoLabel>
            <InfoVal>{info.lineup}</InfoVal>
          </InfoCell>
        </InfoRow>
      )}

      {releases.length > 0 && (
        <DiscoSection>
          <SectionHeader title="DISCOGRAPHIE" inverted />
          <DiscoGrid>
            {releases.map((r) => (
              <DiscoCard key={r.id} $tilt={r.tilt} onClick={() => setSelected(r)} style={{ cursor: 'pointer' }}>
                <DiscoArt><img src={r.cover_url} alt={r.name} loading="lazy" decoding="async" /></DiscoArt>
                <DiscoName>{r.name}</DiscoName>
                <DiscoMeta>{r.meta}</DiscoMeta>
              </DiscoCard>
            ))}
          </DiscoGrid>
        </DiscoSection>
      )}

      {platforms.length > 0 && (
        <PlatformsSection>
          <PlatformsGrid>
            {platforms.map((p) => (
              <Platform key={p.id} href={p.url} target="_blank" rel="noopener noreferrer">
                <PlatformName>{p.name}</PlatformName>
                <PlatformArrow>→ ÉCOUTER</PlatformArrow>
              </Platform>
            ))}
          </PlatformsGrid>
        </PlatformsSection>
      )}

      {selected && (
        <Overlay onClick={() => setSelected(null)}>
          <Modal onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalCover src={selected.cover_url} alt={selected.name} />
              <ModalInfo>
                <ModalTitle>{selected.name}</ModalTitle>
                <ModalMeta>{selected.meta}</ModalMeta>
              </ModalInfo>
              <ModalClose onClick={() => setSelected(null)}>✕</ModalClose>
            </ModalHeader>
            <TrackList>
              {(selected.tracks || []).map((t, i) => (
                <Track key={i}>
                  <TrackNum>{i + 1}</TrackNum>
                  <div>
                    <TrackName>{t.name}</TrackName>
                    {t.feat && <TrackFeat>{t.feat}</TrackFeat>}
                  </div>
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
