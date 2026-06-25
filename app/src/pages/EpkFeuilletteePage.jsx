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
  position: fixed; bottom: 32px; right: 32px;
  background: ${colors.red}; color: ${colors.paper};
  border: none; padding: 20px 48px;
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 14px; letter-spacing: 3px; text-transform: uppercase;
  cursor: pointer; z-index: 100;
  animation: ${pulse} 2.5s ease-in-out infinite;
  transition: background 0.15s;
  &:hover { background: ${colors.ink}; }
  @media print { display: none; }
`

/* ── HERO ── */
const Hero = styled.div`
  position: relative; min-height: 100vh;
  background: ${colors.ink} url('/ff/KNI-TOULOUSE-29-1024x683.jpg') center 25%/cover no-repeat;
  display: flex; flex-direction: column; justify-content: flex-end;
  border-bottom: 4px solid ${colors.ink}; overflow: hidden;
  &::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.55) 40%, rgba(10,10,10,0.97) 100%);
  }
`

const HeroInner = styled.div`
  position: relative; z-index: 1; padding: 0 48px 64px;
  @media (max-width: 640px) { padding: 0 24px 40px; }
`

const HeroTag = styled.div`
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 11px; letter-spacing: 6px; text-transform: uppercase;
  color: ${colors.red}; margin-bottom: 16px;
`

const HeroBand = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(64px, 11vw, 160px);
  line-height: 0.84; letter-spacing: 4px;
  color: ${colors.paper}; margin-bottom: 24px;
`

const HeroTagline = styled.div`
  font-family: ${fonts.body};
  font-size: clamp(14px, 2vw, 20px);
  color: rgba(235,229,212,0.75); line-height: 1.5;
  max-width: 600px; margin-bottom: 32px;
`

const StatsBar = styled.div`
  display: flex; flex-wrap: wrap; gap: 0;
  border: 2px solid rgba(235,229,212,0.2);
`

const Stat = styled.div`
  padding: 16px 28px; border-right: 2px solid rgba(235,229,212,0.2);
  &:last-child { border-right: none; }
  @media (max-width: 480px) { padding: 12px 16px; }
`

const StatVal = styled.div`
  font-family: ${fonts.display}; font-size: clamp(22px, 3.5vw, 38px);
  letter-spacing: 2px; color: ${colors.paper}; line-height: 1;
`

const StatLabel = styled.div`
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
  color: ${colors.red}; margin-top: 4px;
`

/* ── IMPACT ── */
const ImpactStrip = styled.div`
  background: ${colors.red}; padding: 40px 48px;
  border-bottom: 4px solid ${colors.ink};
  @media (max-width: 640px) { padding: 32px 24px; }
`

const ImpactText = styled.div`
  font-family: ${fonts.display}; font-size: clamp(20px, 3.2vw, 46px);
  line-height: 1.1; color: ${colors.paper}; letter-spacing: 2px;
`

const ImpactSub = styled.div`
  font-family: ${fonts.body}; font-size: 14px;
  color: rgba(235,229,212,0.7); margin-top: 12px;
  letter-spacing: 2px; text-transform: uppercase;
`

/* ── BIO ── */
const BioSection = styled.div`
  display: grid; grid-template-columns: 1fr 1.3fr;
  border-bottom: 4px solid ${colors.ink};
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`

const BioPhoto = styled.div`
  background: ${colors.ink} url('/ff/sans-titre-5-sur-43-600x600.jpg') center/cover no-repeat;
  min-height: 480px;
`

const BioContent = styled.div`
  padding: 48px 40px; background: ${colors.paper};
  @media (max-width: 640px) { padding: 32px 24px; }
`

const SectionLabel = styled.div`
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 10px; letter-spacing: 5px; text-transform: uppercase;
  color: ${colors.red}; margin-bottom: 8px;
`

const SectionTitle = styled.div`
  font-family: ${fonts.display}; font-size: clamp(40px, 6vw, 72px);
  line-height: 0.88; letter-spacing: 2px;
  color: ${({ $light }) => $light ? colors.paper : colors.ink};
`

const Rule = styled.div`
  width: 48px; height: 4px; background: ${colors.red}; margin: 20px 0;
`

const Body = styled.div`
  font-family: ${fonts.body}; font-size: 15px;
  line-height: 1.75; color: ${colors.ink};
  p + p { margin-top: 14px; }
`

/* ── SKILLS ── */
const SkillsSection = styled.div`
  background: ${colors.ink}; padding: 48px 40px;
  border-bottom: 4px solid ${colors.paper};
  @media (max-width: 640px) { padding: 32px 24px; }
`

const SkillsGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-top: 28px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`

const SkillCard = styled.div`
  padding: 28px 24px; background: rgba(235,229,212,0.04);
  border: 1px solid rgba(235,229,212,0.08);
`

const SkillCat = styled.div`
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${colors.red}; margin-bottom: 14px;
`

const SkillList = styled.ul`
  list-style: none; padding: 0;
  li {
    font-family: ${fonts.body}; font-size: 14px;
    color: rgba(235,229,212,0.85); line-height: 1.6;
    padding: 5px 0; border-bottom: 1px solid rgba(235,229,212,0.05);
    &:last-child { border-bottom: none; }
    &::before { content: '// '; color: ${colors.red}; }
  }
`

/* ── VIDÉOS ── */
const ClipsSection = styled.div`
  padding: 48px 40px; background: ${colors.ink};
  border-bottom: 4px solid ${colors.paper};
  @media (max-width: 640px) { padding: 32px 24px; }
`

const ClipsGrid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px; margin-top: 28px;
`

const ClipCard = styled.a`
  display: block; text-decoration: none;
  background: rgba(235,229,212,0.04); border: 1px solid rgba(235,229,212,0.2);
  padding: 24px 20px; position: relative; overflow: hidden;
  transition: background 0.15s;
  &::before {
    content: ''; position: absolute;
    left: 0; top: 0; bottom: 0; width: 3px; background: ${colors.red};
  }
  &:hover { background: rgba(235,229,212,0.08); }
`

const ClipTitle = styled.div`
  font-family: ${fonts.display}; font-size: 18px;
  letter-spacing: 1px; color: ${colors.paper}; line-height: 1.1; margin-bottom: 6px;
`

const ClipSub = styled.div`
  font-family: ${fonts.body}; font-size: 11px;
  color: rgba(235,229,212,0.45); margin-bottom: 12px;
`

const ClipCta = styled.div`
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: ${colors.red};
`

/* ── CAROUSEL ── */
const CarouselSection = styled.div`
  background: ${colors.ink}; border-bottom: 4px solid ${colors.paper};
  overflow: hidden;
  @media print { display: none; }
`

const CarouselHeader = styled.div`
  padding: 24px 40px 0;
  @media (max-width: 640px) { padding: 20px 24px 0; }
`

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
  img {
    max-width: 100%; max-height: 100%;
    width: auto; height: 100%; object-fit: contain; display: block;
    filter: grayscale(15%);
  }
`

const CarouselOverlay = styled.div`
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 40%);
  pointer-events: none;
`

const CarouselControls = styled.div`
  position: absolute; bottom: 20px; right: 24px;
  display: flex; align-items: center; gap: 12px; z-index: 2;
`

const CarouselDots = styled.div`display: flex; gap: 6px; align-items: center;`

const CarouselDot = styled.div`
  width: ${({ $active }) => $active ? '20px' : '6px'}; height: 6px;
  background: ${({ $active }) => $active ? colors.red : 'rgba(235,229,212,0.3)'};
  transition: width 0.3s, background 0.3s;
`

const CarouselBtn = styled.button`
  background: rgba(10,10,10,0.6); border: 2px solid rgba(235,229,212,0.3);
  color: ${colors.paper}; font-family: ${fonts.display};
  font-size: 20px; width: 44px; height: 44px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: border-color 0.15s, background 0.15s; line-height: 1;
  &:hover { border-color: ${colors.red}; background: rgba(196,30,30,0.3); }
`

/* ── DATES ── */
const ShowMoreBtn = styled.button`
  margin-top: 20px;
  background: none;
  border: 2px solid ${colors.ink};
  color: ${colors.ink};
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  padding: 10px 24px; cursor: pointer;
  transition: background 0.15s, color 0.15s;
  &:hover { background: ${colors.ink}; color: ${colors.paper}; }
`

const DatesSection = styled.div`
  padding: 48px 40px; background: ${colors.paper};
  border-bottom: 4px solid ${colors.ink};
  @media (max-width: 640px) { padding: 32px 24px; }
`

const DatesGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-top: 28px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`

const DateItem = styled.div`
  padding: 9px 0; border-bottom: 1px solid rgba(10,10,10,0.07);
  display: flex; gap: 12px; align-items: flex-start;
`

const DateVal = styled.div`
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 10px; letter-spacing: 1px; color: ${colors.red};
  white-space: nowrap; flex-shrink: 0; padding-top: 1px;
`

const DateInfo = styled.div``

const DateGroupe = styled.div`
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 10px; letter-spacing: 2px; color: ${colors.ink};
`

const DatePlace = styled.div`
  font-family: ${fonts.body}; font-size: 12px;
  color: rgba(10,10,10,0.5); line-height: 1.4;
`

const pingAnim = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(196,30,30,0.5); }
  50% { box-shadow: 0 0 0 4px rgba(196,30,30,0); }
`

const UpcomingBadge = styled.span`
  display: inline-flex; align-items: center; gap: 5px;
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: ${colors.red}; margin-left: 8px; vertical-align: middle;
  &::before {
    content: ''; display: inline-block; width: 6px; height: 6px;
    border-radius: 50%; background: ${colors.red};
    animation: ${pingAnim} 1.5s ease-in-out infinite; flex-shrink: 0;
  }
`

function isUpcoming(dateStr) {
  const [d, m, y] = dateStr.split('/')
  return new Date(+y, +m - 1, +d) >= new Date()
}

/* ── TÉMOIGNAGES ── */
const TestiSection = styled.div`
  background: ${colors.ink}; padding: 48px 40px;
  border-bottom: 4px solid ${colors.paper};
  @media (max-width: 640px) { padding: 32px 24px; }
`

const TestiGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 28px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`

const TestiCard = styled.div`
  padding: 32px 24px 24px; background: rgba(235,229,212,0.04);
  border: 1px solid rgba(235,229,212,0.08); position: relative;
  &::before {
    content: '"'; font-family: ${fonts.display}; font-size: 80px;
    color: rgba(196,30,30,0.2); line-height: 0.8;
    position: absolute; top: 12px; left: 18px;
  }
`

const TestiText = styled.div`
  font-family: ${fonts.body}; font-size: 13px;
  color: rgba(235,229,212,0.8); line-height: 1.75;
  font-style: italic; padding-top: 20px;
`

const TestiSource = styled.div`
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${colors.red}; margin-top: 18px;
`

/* ── CONTACT ── */
const ContactSection = styled.div`
  background: ${colors.ink}; padding: 64px 48px;
  @media (max-width: 640px) { padding: 40px 24px; }
`

const BookingCTA = styled.a`
  display: flex; align-items: center; justify-content: space-between;
  background: ${colors.red}; color: ${colors.paper};
  text-decoration: none; padding: 28px 40px;
  margin-top: 32px; margin-bottom: 32px; transition: background 0.15s;
  &:hover { background: #a01818; }
  @media (max-width: 640px) { flex-direction: column; gap: 12px; padding: 24px; }
`

const BookingLabel = styled.div`
  font-family: ${fonts.display}; font-size: clamp(20px, 3.5vw, 42px); letter-spacing: 2px;
`

const BookingArrow = styled.div`font-family: ${fonts.display}; font-size: 48px;`

const ContactGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`

const ContactItem = styled.div`
  padding: 20px 24px; background: rgba(235,229,212,0.04);
  border: 1px solid rgba(235,229,212,0.08);
`

const ContactLabel = styled.div`
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
  color: ${colors.red}; margin-bottom: 6px;
`

const ContactVal = styled.div`
  font-family: ${fonts.body}; font-size: 15px; color: ${colors.paper};
`

/* ── DATA ── */

const videos = [
  { title: 'Divine Excuse', sub: 'Kami No Ikari — Drum Playthrough', url: 'https://www.youtube.com/watch?v=1KRoOFYsFQc' },
  { title: 'Turbo', sub: 'Dirtyloops — Drum Cover', url: 'https://www.youtube.com/watch?v=ahcGjwns9Zs' },
  { title: 'Thrift Shop', sub: 'Macklemore — Drum Cover', url: 'https://www.youtube.com/watch?v=mOu_d_AktmY' },
  { title: "That's What I Like", sub: 'Bruno Mars — Drum Cover', url: 'https://www.youtube.com/watch?v=AQiT6oiq8J8' },
]

const photos = [
  '/ff/KNI-TOULOUSE-29-1024x683.jpg',
  '/ff/KNI-TOULOUSE-23-600x600.jpg',
  '/ff/KNI-VIENNA-4-600x600.jpg',
  '/ff/KNI-ZAGREB-4-600x600.jpg',
  '/ff/KNI-PRAGUE-10-600x600.jpg',
  '/ff/KNI-LE-COVENT_-29-600x600.jpg',
  '/ff/KNI-LE-COVENT_-33-1-600x600.jpg',
  '/ff/KNI-ZIQUODROME-62-600x600.jpg',
  '/ff/FERTOIS-METAL-FEST-16-600x600.jpg',
  '/ff/FERTOIS-METAL-FEST-349-600x600.jpg',
  '/ff/FERTOIS-METAL-FEST-361-600x600.jpg',
  '/ff/Indicible_1001bieres-12-600x600.jpg',
  '/ff/sans-titre-5-sur-43-600x600.jpg',
  '/ff/sans-titre-13-sur-43-600x600.jpg',
  '/ff/20240604_121440-600x600.jpg',
  '/ff/53666086993_91ebbedc16_o-600x600.jpg',
  '/ff/IMG-20240708-WA0000-600x600.jpg',
  '/ff/IMG-20241116-WA0000-600x600.jpg',
  '/ff/received_1492843365023828-600x600.png',
]

const dates = [
  { date: '03/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Hamburg — Markthalle 🇩🇪' },
  { date: '04/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Oberhausen — Turbinenhalle 2 🇩🇪' },
  { date: '05/01/2025', groupe: 'KAMI NO IKARI', lieu: 'St Niklaas — De Casino 🇧🇪' },
  { date: '07/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Londres — Academy Islington 🇬🇧' },
  { date: '08/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Paris — La Machine du Moulin Rouge 🇫🇷' },
  { date: '09/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Toulouse — Le Bikini 🇫🇷' },
  { date: '10/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Burgos — Sala Andén 🇪🇸' },
  { date: '11/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Madrid — Sala del Wizink 🇪🇸' },
  { date: '12/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Barcelone — Razzmatazz 2 🇪🇸' },
  { date: '14/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Lyon — La Rayonne 🇫🇷' },
  { date: '15/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Trezzo sul Adda — Live Club 🇮🇹' },
  { date: '16/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Zurich — Komplex 457 🇨🇭' },
  { date: '17/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Munich — Backstage Werk 🇩🇪' },
  { date: '18/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Budapest — Barba Negra 🇭🇺' },
  { date: '19/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Zagreb — Boogaloo 🇭🇷' },
  { date: '21/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Vienne — Simm City 🇦🇹' },
  { date: '22/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Kosice — Colosseum 🇸🇰' },
  { date: '23/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Wroclaw — A2 🇵🇱' },
  { date: '24/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Prague — Meet Factory 🇨🇿' },
  { date: '25/01/2025', groupe: 'KAMI NO IKARI', lieu: 'Leipzig — Hellraiser 🇩🇪' },
  { date: '05/02/2025', groupe: 'EMPREINTE', lieu: 'Lyon — La Pente 🇫🇷' },
  { date: '06/03/2025', groupe: 'EMPREINTE', lieu: 'Orléans — Le Dropkick 🇫🇷' },
  { date: '06/03/2025', groupe: 'THROUGH THE VOID', lieu: 'Orléans — Le Dropkick 🇫🇷' },
  { date: '07/03/2025', groupe: 'EMPREINTE', lieu: 'Limoges — Le Dropkick 🇫🇷' },
  { date: '07/03/2025', groupe: 'THROUGH THE VOID', lieu: 'Limoges — Le Dropkick 🇫🇷' },
  { date: '09/03/2025', groupe: 'EMPREINTE', lieu: 'Lille — La Brat Cave 🇫🇷' },
  { date: '13/03/2025', groupe: 'EMPREINTE', lieu: 'Charleroi — Le Vecteur 🇧🇪' },
  { date: '14/03/2025', groupe: 'INDICIBLE', lieu: 'Amiens — Péniche Célestine 🇫🇷' },
  { date: '10/04/2025', groupe: 'KAMI NO IKARI', lieu: 'Marseille — Makeda 🇫🇷' },
  { date: '03/05/2025', groupe: 'VERMICULAR INCUBATION', lieu: 'Liège — Deathtoberfest 🇧🇪' },
  { date: '16/05/2025', groupe: 'KAMI NO IKARI', lieu: 'Eragny — Covent Garden 🇫🇷' },
  { date: '17/05/2025', groupe: 'EMPREINTE', lieu: 'Compiègne — Ziquodrome 🇫🇷' },
  { date: '23/05/2025', groupe: 'VERMICULAR INCUBATION', lieu: 'St Johan — Rock The Hell 🇨🇭' },
  { date: '29/05/2025', groupe: 'VERMICULAR INCUBATION', lieu: 'Alkmaar — Hearie Metal Fest 🇳🇱' },
  { date: '06/06/2025', groupe: 'IANWILL', lieu: 'Ambérieu en Bugey — Triplette Social Club 🇫🇷' },
  { date: '07/06/2025', groupe: 'IANWILL', lieu: "Grenoble — L'Ampérage 🇫🇷" },
  { date: '14/06/2025', groupe: 'KAMI NO IKARI', lieu: 'Compiègne — Ziquodrome 🇫🇷' },
  { date: '18/07/2025', groupe: 'VERMICULAR INCUBATION', lieu: 'Stoumont — Dim Fest 🇧🇪' },
  { date: '21/08/2025', groupe: 'VERMICULAR INCUBATION', lieu: 'Aarau — Le Kiff 🇨🇭' },
  { date: '22/08/2025', groupe: 'VERMICULAR INCUBATION', lieu: 'Andernach — Deathfeast 🇩🇪' },
  { date: '30/08/2025', groupe: 'KAMI NO IKARI', lieu: 'Fertois — Fertois Metal Fest 🇫🇷' },
  { date: '13/09/2025', groupe: 'EMPREINTE', lieu: 'Bambiderstroff — Bambi Metal Fest 🇫🇷' },
  { date: '20/09/2025', groupe: 'EMPREINTE', lieu: 'Betz — Festival de la Voix Verte 🇫🇷' },
  { date: '27/09/2025', groupe: 'IANWILL', lieu: 'Le Havre — Apocalypse Metal Fest 🇫🇷' },
  { date: '04/10/2025', groupe: 'IANWILL', lieu: 'Quimper — Novamax 🇫🇷' },
  { date: '10/10/2025', groupe: 'IANWILL', lieu: 'Nantes — Shelter 🇫🇷' },
  { date: '11/10/2025', groupe: 'IANWILL', lieu: 'Bordeaux — Salem Bar 🇫🇷' },
  { date: '12/11/2025', groupe: 'EMPREINTE', lieu: 'Marseille — Makeda 🇫🇷' },
  { date: '13/11/2025', groupe: 'EMPREINTE', lieu: 'Montpellier — Secret Place 🇫🇷' },
  { date: '22/11/2025', groupe: 'KAMI NO IKARI', lieu: 'Savigny le Temple — Charitable Fest 🇫🇷' },
  { date: '28/11/2025', groupe: 'IANWILL', lieu: 'Lorient — Le Pit Dog 🇫🇷' },
  { date: '05/12/2025', groupe: 'IANWILL', lieu: 'Anthony — Espace Vasarely 🇫🇷' },
  { date: '12/12/2025', groupe: 'EMPREINTE', lieu: 'Amiens — Cité Carter 🇫🇷' },
  { date: '12/12/2025', groupe: 'INDICIBLE', lieu: 'Amiens — Cité Carter 🇫🇷' },
  { date: '22/01/2026', groupe: 'EMPREINTE', lieu: 'Lille — Brat Cave 🇫🇷' },
  { date: '23/01/2026', groupe: 'IANWILL', lieu: 'Paris — La Boule Noire 🇫🇷' },
  { date: '30/01/2026', groupe: 'IANWILL', lieu: 'Eragny — Covent Garden 🇫🇷' },
  { date: '19/02/2026', groupe: 'EMPREINTE', lieu: 'Schaerbeek — Remifest 🇧🇪' },
  { date: '21/03/2026', groupe: 'KAMI NO IKARI', lieu: 'Châteauroux — 9Cube5 🇫🇷' },
  { date: '16/05/2026', groupe: 'EMPREINTE', lieu: 'Soissons — Esplanade du Mail 🇫🇷' },
  { date: '30/05/2026', groupe: 'KAMI NO IKARI', lieu: 'Mulhouse — Noumatrouff (release party Smash Hit Combo) 🇫🇷' },
  { date: '10/06/2026', groupe: 'IANWILL', lieu: 'Hradec Králové — Festival Rock for People 🇨🇿 (Tremplin Planetrox Europe)' },
  { date: '22/06/2026', groupe: 'INDICIBLE', lieu: 'Les Passagers du Zinc, Besançon 🇫🇷' },
]

const testimonials = [
  {
    text: "Félix a su apprendre en très peu de temps un set de métal extrême mais surtout il a su s'approprier les morceaux pour leur donner une dimension incroyable. C'est un plaisir de bosser et d'être sur scène avec lui aussi bien professionnellement que humainement.",
    source: 'Amarino — KAMI NO IKARI',
  },
  {
    text: "Félix s'est proposé de lui-même de nous sauver la date en bossant le set à domicile. Sans aucune repet et avec seulement 2 semaines de boulot, il a su non seulement sauver notre concert, mais sublimer la presta en y apportant sa patte perso, son énergie, sa rigueur, sa bonne humeur, et son groove d'enfer !",
    source: 'Max — YERAO',
  },
  {
    text: "C'est un réel plaisir de travailler avec Félix. C'est un musicien à la fois sérieux, rigoureux, bosseur et doté d'un excellent niveau. Sa maîtrise technique et sa précision en font un pilier rythmique sur lequel on peut s'appuyer les yeux fermés. Humainement et musicalement, c'est une valeur sûre.",
    source: 'Audrey — IANWILL',
  },
  {
    text: "Une seule répétition a suffi pour nous montrer qu'il était au point. Une fois sur scène, Félix a été irréprochable et débordant d'énergie. Malgré l'absence de notre batteur, nous avons pris un réel plaisir à jouer nos morceaux avec lui.",
    source: 'David — THROUGH THE VOID',
  },
]

export default function EpkFeuilletteePage() {
  const [slide, setSlide] = useState(0)
  const [showAllDates, setShowAllDates] = useState(false)
  const next = useCallback(() => setSlide(s => (s + 1) % photos.length), [])
  const prev = useCallback(() => setSlide(s => (s - 1 + photos.length) % photos.length), [])

  useEffect(() => {
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [next])

  return (
    <FanzineWrap>
      <PrintStyle />
      <SEO
        title="EPK — Félix Feuillette"
        description="Press Kit Félix Feuillette 2026. Batteur professionnel — Session · Live · Studio · Masterclass."
        path="/epk/felix-feuillette"
      />

      <Hero>
        <HeroInner>
          <HeroTag>▼ Electronic Press Kit · 2026</HeroTag>
          <HeroBand>FÉLIX<br />FEUIL&shy;LETTE</HeroBand>
          <HeroTagline>
            Batteur professionnel — Session · Live · Studio · Masterclass
          </HeroTagline>
          <StatsBar>
            <Stat><StatVal>2004</StatVal><StatLabel>Batteur depuis</StatLabel></Stat>
            <Stat><StatVal>100+</StatVal><StatLabel>Concerts</StatLabel></Stat>
            <Stat><StatVal>EU</StatVal><StatLabel>Tournée 2025</StatLabel></Stat>
            <Stat><StatVal>3</StatVal><StatLabel>Groupes</StatLabel></Stat>
          </StatsBar>
        </HeroInner>
      </Hero>

      <ImpactStrip>
        <ImpactText>UN JEU PUISSANT, PRÉCIS, MAIS TOUJOURS AU SERVICE DE LA MUSIQUE</ImpactText>
        <ImpactSub>// Metal extrême · Rock · Hardcore · Musiques actuelles</ImpactSub>
      </ImpactStrip>

      <BioSection>
        <BioPhoto />
        <BioContent>
          <SectionLabel>01 · Biographie</SectionLabel>
          <SectionTitle>QUI<br />SUIS-JE</SectionTitle>
          <Rule />
          <Body>
            <p>
              Batteur passionné et inlassable travailleur, <strong>Félix Feuillette</strong> évolue
              derrière les fûts depuis 2004. Nourri dès l'enfance par les sonorités du rock et du metal,
              il développe au fil des années une véritable expertise dans le metal extrême, sans jamais
              cesser d'explorer d'autres styles pour enrichir son jeu et affiner sa polyvalence.
            </p>
            <p>
              Depuis ses débuts en groupe en 2013, Félix cumule aujourd'hui plus de 100 concerts à son
              actif, des salles intimistes aux scènes de festivals. En 2025, il embarque sur sa première{' '}
              <strong>tournée européenne</strong> avec Kami No Ikari, assurant chaque soir dans des
              salles de 1 000 personnes — un marathon scénique salué pour sa précision, son endurance
              et son énergie.
            </p>
            <p>
              Musicien de session apprécié pour sa fiabilité et son professionnalisme, il maîtrise
              rapidement les sets (1 à 2 semaines, avec ou sans répétition) tout en s'appropriant
              chaque morceau pour y injecter sa personnalité rythmique et son groove distinctif.
            </p>
          </Body>
        </BioContent>
      </BioSection>

      <SkillsSection>
        <SectionLabel>02 · Compétences</SectionLabel>
        <SectionTitle $light>SKILLS</SectionTitle>
        <Rule />
        <SkillsGrid>
          <SkillCard>
            <SkillCat>Hard Skills</SkillCat>
            <SkillList>
              <li>Spécialité : metal extrême, rock, metal, hardcore, musiques actuelles</li>
              <li>Session live & studio — set appris en 1 à 2 semaines</li>
              <li>+100 concerts en salles, clubs et festivals</li>
              <li>Tournée européenne 2025 (salles de 1 000 personnes)</li>
              <li>Technique avancée & endurance scénique</li>
              <li>Connaissance théorique solide</li>
              <li>Matériel optimisé pour chaque projet</li>
              <li>Anglais courant · Permis · Véhiculé · Passeport valide</li>
            </SkillList>
          </SkillCard>
          <SkillCard>
            <SkillCat>Soft Skills</SkillCat>
            <SkillList>
              <li>Adaptabilité</li>
              <li>Professionnel, fiable et autonome</li>
              <li>Travail rigoureux, bon relationnel</li>
              <li>Force de proposition</li>
              <li>À l'aise en studio comme sur scène</li>
              <li>Bonne humeur & énergie communicative</li>
            </SkillList>
          </SkillCard>
        </SkillsGrid>
      </SkillsSection>

      <ClipsSection>
        <SectionLabel>03 · Vidéos</SectionLabel>
        <SectionTitle $light>WATCH<br />&amp; LISTEN</SectionTitle>
        <Rule />
        <ClipsGrid>
          {videos.map(v => (
            <ClipCard key={v.title} href={v.url} target="_blank" rel="noopener noreferrer">
              <ClipTitle>{v.title}</ClipTitle>
              <ClipSub>{v.sub}</ClipSub>
              <ClipCta>→ Voir sur YouTube</ClipCta>
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
              <img src={src} alt={`Félix Feuillette live ${i + 1}`} loading="lazy" decoding="async" />
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
        <DatesGrid>
          {(showAllDates ? dates : dates.slice(0, 10)).map((d, i) => (
            <DateItem key={i}>
              <DateVal>{d.date}</DateVal>
              <DateInfo>
                <DateGroupe>{d.groupe}</DateGroupe>
                <DatePlace>
                  {d.lieu}
                  {isUpcoming(d.date) && <UpcomingBadge>À venir</UpcomingBadge>}
                </DatePlace>
              </DateInfo>
            </DateItem>
          ))}
        </DatesGrid>
        {!showAllDates && dates.length > 10 && (
          <ShowMoreBtn onClick={() => setShowAllDates(true)}>
            Afficher plus ({dates.length - 10} dates)
          </ShowMoreBtn>
        )}
      </DatesSection>

      <TestiSection>
        <SectionLabel>06 · Témoignages</SectionLabel>
        <SectionTitle $light>ILS EN<br />PARLENT</SectionTitle>
        <Rule />
        <TestiGrid>
          {testimonials.map((t, i) => (
            <TestiCard key={i}>
              <TestiText>{t.text}</TestiText>
              <TestiSource>{t.source}</TestiSource>
            </TestiCard>
          ))}
        </TestiGrid>
      </TestiSection>

      <ContactSection>
        <SectionLabel>07 · Contact & Booking</SectionLabel>
        <SectionTitle $light>PROGRAM&shy;MEZ-MOI</SectionTitle>
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
            <ContactLabel>Direct</ContactLabel>
            <ContactVal>07 83 77 95 33</ContactVal>
          </ContactItem>
          <ContactItem>
            <ContactLabel>Spécialité</ContactLabel>
            <ContactVal>Metal extrême · Session</ContactVal>
          </ContactItem>
          <ContactItem>
            <ContactLabel>Endorsement</ContactLabel>
            <ContactVal>
              <a href="https://asbadrums.com/artist/felix-feuillette" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', borderBottom: `1px solid ${colors.red}` }}>
                ASBA Drums ↗
              </a>
            </ContactVal>
          </ContactItem>
          <ContactItem>
            <ContactLabel>Label</ContactLabel>
            <ContactVal>Carillon · carillonlabel.fr</ContactVal>
          </ContactItem>
        </ContactGrid>
      </ContactSection>

      <PrintBtn className="no-print" onClick={() => window.print()}>
        ↓ Télécharger PDF
      </PrintBtn>
    </FanzineWrap>
  )
}
