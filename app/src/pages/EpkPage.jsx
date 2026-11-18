import { useState, useEffect, useCallback } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { useParams } from 'react-router-dom'
import { FanzineWrap } from '../components/FanzineWrap'
import SEO from '../components/SEO'
import { colors, fonts } from '../theme'
import { supabase } from '../lib/supabase'
import NotFoundPage from './NotFoundPage'

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
  position: fixed; bottom: 32px; right: 32px;
  background: ${colors.red}; color: ${colors.paper};
  border: none; padding: 20px 48px;
  font-family: ${fonts.heading}; font-weight: 700; font-size: 14px;
  letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
  z-index: 100; animation: ${pulse} 2.5s ease-in-out infinite;
  transition: background 0.15s;
  &:hover { background: ${colors.ink}; }
  @media print { display: none; }
`

const Hero = styled.div`
  position: relative; min-height: 100vh;
  background: ${({ $photo, $focus }) => `${colors.ink} url('${$photo}') ${$focus}/cover no-repeat`};
  display: flex; flex-direction: column; justify-content: flex-end;
  border-bottom: 4px solid ${colors.ink}; overflow: hidden;
  &::before {
    content: '';position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.95) 100%);
  }
`
const HeroInner = styled.div`
  position: relative; z-index: 1; padding: 0 48px 64px;
  @media (max-width: 640px) { padding: 0 24px 40px; }
`
const HeroTag = styled.div`
  font-family: ${fonts.heading}; font-weight: 700; font-size: 11px;
  letter-spacing: 6px; text-transform: uppercase; color: ${colors.red}; margin-bottom: 16px;
`
const HeroBand = styled.div`
  font-family: ${fonts.display}; font-size: clamp(80px, 16vw, 200px);
  line-height: 0.82; letter-spacing: 4px; color: ${colors.paper}; margin-bottom: 24px;
`
const HeroTagline = styled.div`
  font-family: ${fonts.body}; font-size: clamp(16px, 2.5vw, 22px);
  color: rgba(235,229,212,0.75); line-height: 1.5; max-width: 600px; margin-bottom: 32px;
`
const StatsBar = styled.div`display: flex; flex-wrap: wrap; gap: 0; border: 2px solid rgba(235,229,212,0.2);`
const Stat = styled.div`
  padding: 16px 28px; border-right: 2px solid rgba(235,229,212,0.2);
  &:last-child { border-right: none; }
  @media (max-width: 480px) { padding: 12px 16px; }
`
const StatVal = styled.div`font-family: ${fonts.display}; font-size: clamp(24px, 4vw, 40px); letter-spacing: 2px; color: ${colors.paper}; line-height: 1;`
const StatLabel = styled.div`font-family: ${fonts.heading}; font-weight: 700; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: ${colors.red}; margin-top: 4px;`

const QuoteHero = styled.div`
  background: ${colors.red}; padding: 56px 48px; border-bottom: 4px solid ${colors.ink};
  @media (max-width: 640px) { padding: 40px 24px; }
`
const QuoteMark = styled.div`font-family: ${fonts.display}; font-size: 120px; line-height: 0.6; color: rgba(235,229,212,0.2); margin-bottom: -20px;`
const QuoteText = styled.blockquote`
  font-family: ${fonts.display}; font-size: clamp(22px, 3.5vw, 40px);
  line-height: 1.15; color: ${colors.paper}; letter-spacing: 1px; margin: 0 0 20px;
`
const QuoteSource = styled.div`font-family: ${fonts.heading}; font-weight: 700; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: rgba(235,229,212,0.7);`

const BioSection = styled.div`
  display: grid; grid-template-columns: 1fr 1.2fr; border-bottom: 4px solid ${colors.ink};
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`
const BioPhoto = styled.div`
  background: ${({ $photo }) => `${colors.ink} url('${$photo}') center/cover no-repeat`};
  min-height: 480px;
`
const BioContent = styled.div`
  padding: 48px 40px; background: ${colors.paper};
  @media (max-width: 640px) { padding: 32px 24px; }
`
const SectionLabel = styled.div`
  font-family: ${fonts.heading}; font-weight: 700; font-size: 10px;
  letter-spacing: 5px; text-transform: uppercase; color: ${colors.red}; margin-bottom: 8px;
`
const SectionTitle = styled.div`
  font-family: ${fonts.display}; font-size: clamp(40px, 6vw, 72px);
  line-height: 0.88; letter-spacing: 2px;
  color: ${({ $light }) => $light ? colors.paper : colors.ink}; margin-bottom: 4px;
`
const Rule = styled.div`width: 48px; height: 4px; background: ${colors.red}; margin: 20px 0;`
const Body = styled.div`
  font-family: ${fonts.body}; font-size: 15px; line-height: 1.75; color: ${colors.ink};
  p + p { margin-top: 14px; }
`
const MemberGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 28px;`
const MemberCard = styled.div`padding: 14px 16px; background: ${colors.ink};`
const MemberRole = styled.div`font-family: ${fonts.heading}; font-weight: 700; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: ${colors.red}; margin-bottom: 4px;`
const MemberName = styled.div`font-family: ${fonts.display}; font-size: 20px; letter-spacing: 1px; color: ${colors.paper};`

const DiscoSection = styled.div`
  background: ${colors.ink}; padding: 48px 40px; border-bottom: 4px solid ${colors.paper};
  @media (max-width: 640px) { padding: 32px 24px; }
`
const DiscoGrid = styled.div`display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 2px; margin-top: 28px;`
const DiscoItem = styled.div`
  padding: 16px; background: rgba(235,229,212,0.04); border: 1px solid rgba(235,229,212,0.08);
  transition: background 0.15s; &:hover { background: rgba(235,229,212,0.08); }
`
const DiscoYear = styled.div`font-family: ${fonts.heading}; font-weight: 700; font-size: 10px; letter-spacing: 3px; color: ${colors.red}; margin-bottom: 4px;`
const DiscoTitle = styled.div`font-family: ${fonts.body}; font-size: 13px; font-weight: bold; color: ${colors.paper};`
const DiscoFormat = styled.div`font-family: ${fonts.body}; font-size: 11px; color: rgba(235,229,212,0.4); margin-top: 2px;`

const ClipsSection = styled.div`
  padding: 48px 40px; background: ${colors.ink}; border-bottom: 4px solid ${colors.paper};
  @media (max-width: 640px) { padding: 32px 24px; }
`
const ClipsGrid = styled.div`display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; margin-top: 28px;`
const ClipCard = styled.div`
  display: block; text-decoration: none;
  background: rgba(235,229,212,0.04);
  border: 1px solid ${({ $active }) => $active ? 'rgba(235,229,212,0.2)' : 'rgba(235,229,212,0.08)'};
  padding: 24px 20px; position: relative; overflow: hidden;
  cursor: ${({ $active }) => $active ? 'pointer' : 'default'};
  transition: background 0.15s, border-color 0.15s;
  &::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: ${({ $active }) => $active ? colors.red : 'rgba(235,229,212,0.15)'};
  }
  &:hover { background: ${({ $active }) => $active ? 'rgba(235,229,212,0.08)' : 'rgba(235,229,212,0.04)'}; }
`
const ClipTitle = styled.div`font-family: ${fonts.display}; font-size: 18px; letter-spacing: 1px; color: ${colors.paper}; line-height: 1.1; margin-bottom: 6px;`
const ClipFeat = styled.div`font-family: ${fonts.body}; font-size: 11px; color: rgba(235,229,212,0.45); margin-bottom: 12px;`
const ClipCta = styled.div`
  font-family: ${fonts.heading}; font-weight: 700; font-size: 10px; letter-spacing: 3px;
  text-transform: uppercase; color: ${({ $active }) => $active ? colors.red : 'rgba(235,229,212,0.2)'};
`

const CarouselSection = styled.div`background: ${colors.ink}; border-bottom: 4px solid ${colors.paper}; overflow: hidden; @media print { display: none; }`
const CarouselTrack = styled.div`
  position: relative; width: 100%; height: 600px; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  @media (max-width: 640px) { height: 340px; }
`
const CarouselSlide = styled.div`
  position: absolute; inset: 0;
  opacity: ${({ $active }) => $active ? 1 : 0};
  transition: opacity 0.7s ease;
  pointer-events: ${({ $active }) => $active ? 'auto' : 'none'};
  display: flex; align-items: center; justify-content: center;
  img { max-width: 100%; max-height: 100%; width: auto; height: 100%; object-fit: contain; display: block; filter: grayscale(15%); }
`
const CarouselOverlay = styled.div`position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 40%); pointer-events: none;`
const CarouselControls = styled.div`position: absolute; bottom: 20px; right: 24px; display: flex; align-items: center; gap: 12px; z-index: 2;`
const CarouselBtn = styled.button`
  background: rgba(10,10,10,0.6); border: 2px solid rgba(235,229,212,0.3);
  color: ${colors.paper}; font-family: ${fonts.display}; font-size: 20px;
  width: 44px; height: 44px; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: border-color 0.15s, background 0.15s; line-height: 1;
  &:hover { border-color: ${colors.red}; background: rgba(196,30,30,0.3); }
`
const CarouselDots = styled.div`display: flex; gap: 6px; align-items: center;`
const CarouselDot = styled.div`
  width: ${({ $active }) => $active ? '20px' : '6px'}; height: 6px;
  background: ${({ $active }) => $active ? colors.red : 'rgba(235,229,212,0.3)'};
  transition: width 0.3s, background 0.3s; cursor: pointer;
`
const CarouselHeader = styled.div`padding: 24px 40px 0; @media (max-width: 640px) { padding: 20px 24px 0; }`

const DatesSection = styled.div`
  padding: 48px 40px; background: ${colors.paper}; border-bottom: 4px solid ${colors.ink};
  @media (max-width: 640px) { padding: 32px 24px; }
`
const DatesGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-top: 28px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`
const DateItem = styled.div`padding: 12px 0; border-bottom: 1px solid rgba(10,10,10,0.08); display: flex; gap: 14px; align-items: flex-start;`
const DateVal = styled.div`font-family: ${fonts.heading}; font-weight: 700; font-size: 11px; letter-spacing: 1px; color: ${colors.red}; white-space: nowrap; flex-shrink: 0; padding-top: 2px;`
const DatePlace = styled.div`font-family: ${fonts.body}; font-size: 13px; color: ${colors.ink}; line-height: 1.4;`
const UpcomingBadge = styled.span`
  display: inline-flex; align-items: center; gap: 5px;
  font-family: ${fonts.heading}; font-weight: 700; font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: ${colors.red}; margin-left: 8px; vertical-align: middle;
  &::before { content: ''; display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${colors.red}; animation: ${pulse} 1.5s ease-in-out infinite; flex-shrink: 0; }
`

const DownloadsSection = styled.div`
  padding: 48px 40px; background: ${colors.paper}; border-bottom: 4px solid ${colors.ink};
  @media (max-width: 640px) { padding: 32px 24px; }
  @media print { display: none; }
`
const DownloadsGrid = styled.div`display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; margin-top: 28px;`
const DownloadBtn = styled.a`
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  text-decoration: none; padding: 16px 20px; border: 2px solid ${colors.ink};
  color: ${colors.ink}; background: transparent; transition: background 0.15s, color 0.15s;
  &:hover { background: ${colors.ink}; color: ${colors.paper}; }
`
const DownloadLabel = styled.div`font-family: ${fonts.heading}; font-weight: 700; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; line-height: 1.4;`
const DownloadType = styled.div`font-family: ${fonts.body}; font-size: 10px; color: ${colors.red}; margin-top: 3px; letter-spacing: 1px;`
const DownloadArrow = styled.div`font-family: ${fonts.display}; font-size: 20px; flex-shrink: 0;`

const BadgeStrip = styled.div`
  margin-top: 32px; padding: 20px; background: #f5f0e4; border-left: 4px solid ${colors.red};
`
const BadgeLabel = styled.div`font-family: ${fonts.heading}; font-weight: 700; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: ${colors.red}; margin-bottom: 6px;`
const BadgeDesc = styled.div`font-family: ${fonts.body}; font-size: 14px; line-height: 1.6; color: ${colors.ink};`

const ContactSection = styled.div`
  background: ${colors.ink}; padding: 64px 48px;
  @media (max-width: 640px) { padding: 40px 24px; }
`
const ContactTitle = styled.div`font-family: ${fonts.display}; font-size: clamp(40px, 6vw, 72px); line-height: 0.88; letter-spacing: 2px; color: ${colors.paper}; margin-bottom: 4px;`
const BookingCTA = styled.a`
  display: flex; align-items: center; justify-content: space-between;
  background: ${colors.red}; color: ${colors.paper}; text-decoration: none;
  padding: 28px 40px; margin-top: 32px; margin-bottom: 32px; transition: background 0.15s;
  &:hover { background: #a01818; }
  @media (max-width: 640px) { flex-direction: column; gap: 12px; padding: 24px; }
`
const BookingLabel = styled.div`font-family: ${fonts.display}; font-size: clamp(24px, 4vw, 48px); letter-spacing: 2px;`
const BookingArrow = styled.div`font-family: ${fonts.display}; font-size: 48px;`
const ContactGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`
const ContactItem = styled.div`padding: 20px 24px; background: rgba(235,229,212,0.04); border: 1px solid rgba(235,229,212,0.08);`
const ContactLabel = styled.div`font-family: ${fonts.heading}; font-weight: 700; font-size: 9px; letter-spacing: 4px; text-transform: uppercase; color: ${colors.red}; margin-bottom: 6px;`
const ContactVal = styled.div`font-family: ${fonts.body}; font-size: 15px; color: ${colors.paper};`

const Loading = styled.div`
  display: flex; align-items: center; justify-content: center;
  min-height: 60vh; font-family: ${fonts.display}; font-size: 32px;
  color: ${colors.paper}; background: ${colors.ink};
`

function isUpcoming(dateStr) {
  const clean = dateStr.replace(/\//g, '.')
  const [d, m, y] = clean.split('.')
  if (!d || !m || !y) return false
  return new Date(+y, +m - 1, +d) >= new Date()
}

export default function EpkPage() {
  const { slug } = useParams()
  const [artist, setArtist] = useState(null)
  const [epk, setEpk] = useState(null)
  const [members, setMembers] = useState([])
  const [releases, setReleases] = useState([])
  const [clips, setClips] = useState([])
  const [dates, setDates] = useState([])
  const [downloads, setDownloads] = useState([])
  const [photos, setPhotos] = useState([])
  const [badges, setBadges] = useState([])
  const [slide, setSlide] = useState(0)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const next = useCallback(() => setSlide(s => (s + 1) % photos.length), [photos.length])
  const prev = useCallback(() => setSlide(s => (s - 1 + photos.length) % photos.length), [photos.length])

  useEffect(() => {
    if (photos.length < 2) return
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [next, photos.length])

  useEffect(() => {
    async function load() {
      const { data: a } = await supabase
        .from('artists')
        .select('*')
        .eq('slug', slug)
        .single()

      if (!a) { setNotFound(true); setLoading(false); return }

      const [epkRes, membersRes, releasesRes, clipsRes, datesRes, downloadsRes, photosRes, badgesRes] = await Promise.all([
        supabase.from('epk_pages').select('*').eq('artist_id', a.id).single(),
        supabase.from('epk_members').select('*').eq('artist_id', a.id).order('sort_order'),
        supabase.from('artist_releases').select('*').eq('artist_id', a.id).order('sort_order'),
        supabase.from('epk_clips').select('*').eq('artist_id', a.id).order('sort_order'),
        supabase.from('epk_dates').select('*').eq('artist_id', a.id).order('sort_order'),
        supabase.from('epk_downloads').select('*').eq('artist_id', a.id).order('sort_order'),
        supabase.from('epk_photos').select('*').eq('artist_id', a.id).order('sort_order'),
        supabase.from('epk_badges').select('*').eq('artist_id', a.id),
      ])

      setArtist(a)
      setEpk(epkRes.data)
      setMembers(membersRes.data || [])
      setReleases(releasesRes.data || [])
      setClips(clipsRes.data || [])
      setDates(datesRes.data || [])
      setDownloads(downloadsRes.data || [])
      setPhotos(photosRes.data || [])
      setBadges(badgesRes.data || [])
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) return <Loading>// Chargement...</Loading>
  if (notFound || !epk) return <NotFoundPage />

  const stats = epk.stats || {}
  const statsEntries = [
    stats.founded && { val: stats.founded, label: 'Fondé en' },
    stats.years && { val: stats.years, label: 'Années scène' },
    stats.releases && { val: stats.releases, label: 'Sorties' },
    stats.album && { val: stats.album, label: 'Album prévu' },
  ].filter(Boolean)

  const bioParagraphs = (epk.bio || '').split(/\n\n+/).filter(Boolean)

  return (
    <FanzineWrap>
      <PrintStyle />
      <SEO
        title={`EPK — ${artist.name}`}
        description={`Press Kit ${artist.name}. ${epk.genre_display || artist.tag}. ${epk.city_display || ''}`}
        path={`/epk/${slug}`}
      />

      {/* Hero */}
      <Hero $photo={epk.hero_photo_url || artist.photo_url} $focus={epk.hero_photo_focus || 'center 30%'}>
        <HeroInner>
          <HeroTag>▼ Electronic Press Kit · {new Date().getFullYear()}</HeroTag>
          <HeroBand>{artist.name}</HeroBand>
          {epk.tagline && <HeroTagline>{epk.tagline}</HeroTagline>}
          {statsEntries.length > 0 && (
            <StatsBar>
              {statsEntries.map(s => (
                <Stat key={s.label}><StatVal>{s.val}</StatVal><StatLabel>{s.label}</StatLabel></Stat>
              ))}
            </StatsBar>
          )}
        </HeroInner>
      </Hero>

      {/* Citation */}
      {epk.quote && (
        <QuoteHero>
          <QuoteMark>"</QuoteMark>
          <QuoteText>{epk.quote}</QuoteText>
          {epk.quote_source && <QuoteSource>{epk.quote_source}</QuoteSource>}
        </QuoteHero>
      )}

      {/* Bio + membres */}
      {(bioParagraphs.length > 0 || members.length > 0) && (
        <BioSection>
          {epk.secondary_photo_url && <BioPhoto $photo={epk.secondary_photo_url} />}
          <BioContent>
            <SectionLabel>01 · Biographie</SectionLabel>
            <SectionTitle>QUI<br />SOMMES-<br />NOUS</SectionTitle>
            <Rule />
            <Body>
              {bioParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </Body>
            {members.length > 0 && (
              <MemberGrid>
                {members.map(m => (
                  <MemberCard key={m.id}>
                    <MemberRole>{m.role}</MemberRole>
                    <MemberName>{m.name}</MemberName>
                  </MemberCard>
                ))}
              </MemberGrid>
            )}
          </BioContent>
        </BioSection>
      )}

      {/* Discographie */}
      {releases.length > 0 && (
        <DiscoSection>
          <SectionLabel>02 · Discographie</SectionLabel>
          <SectionTitle $light>DISCOGRAPHIE</SectionTitle>
          <Rule />
          <DiscoGrid>
            {releases.map(r => (
              <DiscoItem key={r.id}>
                <DiscoYear>{r.meta?.split('·')[0]?.trim() || ''}</DiscoYear>
                <DiscoTitle>{r.name}</DiscoTitle>
                <DiscoFormat>{r.meta?.split('·').slice(1).join('·').trim() || ''}</DiscoFormat>
              </DiscoItem>
            ))}
          </DiscoGrid>
        </DiscoSection>
      )}

      {/* Clips */}
      {clips.length > 0 && (
        <ClipsSection>
          <SectionLabel>03 · Clips</SectionLabel>
          <SectionTitle $light>MUSIC<br />VIDEOS</SectionTitle>
          <Rule />
          <ClipsGrid>
            {clips.map(c => (
              <ClipCard
                key={c.id}
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
      )}

      {/* Carrousel photos */}
      {photos.length > 0 && (
        <CarouselSection>
          <CarouselHeader><SectionLabel>04 · Photos live</SectionLabel></CarouselHeader>
          <CarouselTrack>
            {photos.map((p, i) => (
              <CarouselSlide key={p.id} $active={i === slide}>
                <img src={p.photo_url} alt={`${artist.name} live ${i + 1}`} loading="lazy" decoding="async" />
              </CarouselSlide>
            ))}
            <CarouselOverlay />
            {photos.length > 1 && (
              <CarouselControls>
                <CarouselDots>
                  {photos.map((_, i) => (
                    <CarouselDot key={i} $active={i === slide} onClick={() => setSlide(i)} />
                  ))}
                </CarouselDots>
                <CarouselBtn onClick={prev}>‹</CarouselBtn>
                <CarouselBtn onClick={next}>›</CarouselBtn>
              </CarouselControls>
            )}
          </CarouselTrack>
        </CarouselSection>
      )}

      {/* Dates */}
      {dates.length > 0 && (
        <DatesSection>
          <SectionLabel>05 · Concerts</SectionLabel>
          <SectionTitle>DATES</SectionTitle>
          <Rule />
          <DatesGrid>
            {dates.map(d => (
              <DateItem key={d.id}>
                <DateVal>{d.date_str}</DateVal>
                <DatePlace>
                  {d.lieu}
                  {isUpcoming(d.date_str) && <UpcomingBadge>À venir</UpcomingBadge>}
                </DatePlace>
              </DateItem>
            ))}
          </DatesGrid>
          {badges.map(b => (
            <BadgeStrip key={b.id}>
              <BadgeLabel>{b.label}</BadgeLabel>
              <BadgeDesc>{b.description}</BadgeDesc>
            </BadgeStrip>
          ))}
        </DatesSection>
      )}

      {/* Téléchargements */}
      {downloads.length > 0 && (
        <DownloadsSection>
          <SectionLabel>06 · Ressources</SectionLabel>
          <SectionTitle>TÉLÉCHARGEMENTS</SectionTitle>
          <Rule />
          <DownloadsGrid>
            {downloads.map(d => (
              <DownloadBtn key={d.id} href={d.file_url} download target="_blank" rel="noopener noreferrer">
                <div>
                  <DownloadLabel>{d.label}</DownloadLabel>
                  <DownloadType>{d.file_type}</DownloadType>
                </div>
                <DownloadArrow>↓</DownloadArrow>
              </DownloadBtn>
            ))}
          </DownloadsGrid>
        </DownloadsSection>
      )}

      {/* Contact */}
      <ContactSection>
        <SectionLabel>07 · Contact & Booking</SectionLabel>
        <ContactTitle>PROGRAMMEZ-NOUS</ContactTitle>
        <BookingCTA href={`mailto:${epk.booking_email || 'contact@studiocarillon.fr'}`}>
          <BookingLabel>{epk.booking_email || 'contact@studiocarillon.fr'}</BookingLabel>
          <BookingArrow>→</BookingArrow>
        </BookingCTA>
        <ContactGrid>
          {epk.booking_contact && (
            <ContactItem>
              <ContactLabel>Management / Booking</ContactLabel>
              <ContactVal>{epk.booking_contact}</ContactVal>
            </ContactItem>
          )}
          {epk.booking_label_name && (
            <ContactItem>
              <ContactLabel>Label</ContactLabel>
              <ContactVal>{epk.booking_label_name}</ContactVal>
            </ContactItem>
          )}
          {epk.genre_display && (
            <ContactItem>
              <ContactLabel>Genre</ContactLabel>
              <ContactVal>{epk.genre_display}</ContactVal>
            </ContactItem>
          )}
          {epk.city_display && (
            <ContactItem>
              <ContactLabel>Ville</ContactLabel>
              <ContactVal>{epk.city_display}</ContactVal>
            </ContactItem>
          )}
        </ContactGrid>
      </ContactSection>

      <PrintBtn className="no-print" onClick={() => window.print()}>
        ↓ Télécharger PDF
      </PrintBtn>
    </FanzineWrap>
  )
}
