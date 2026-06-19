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
  background: ${colors.ink} url('/epk/indicible-pic2.jpg') center 25%/cover no-repeat;
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
      rgba(10,10,10,0.15) 0%,
      rgba(10,10,10,0.55) 40%,
      rgba(10,10,10,0.97) 100%
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
  font-size: clamp(72px, 14vw, 180px);
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

/* ── IMPACT STRIP ── */
const ImpactStrip = styled.div`
  background: ${colors.red};
  padding: 40px 48px;
  border-bottom: 4px solid ${colors.ink};

  @media (max-width: 640px) {
    padding: 32px 24px;
  }
`

const ImpactText = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(24px, 4vw, 52px);
  line-height: 1.1;
  color: ${colors.paper};
  letter-spacing: 2px;
`

const ImpactSub = styled.div`
  font-family: ${fonts.body};
  font-size: 14px;
  color: rgba(235,229,212,0.7);
  margin-top: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
`

/* ── BIO ── */
const BioSection = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  border-bottom: 4px solid ${colors.ink};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const BioContent = styled.div`
  padding: 48px 40px;
  background: ${colors.paper};
  order: 0;

  @media (max-width: 640px) {
    padding: 32px 24px;
    order: 1;
  }
`

const BioPhoto = styled.div`
  background: ${colors.ink} url('/epk/indicible-pic1.jpg') center/cover no-repeat;
  min-height: 480px;
  order: 1;

  @media (max-width: 768px) {
    order: 0;
    min-height: 320px;
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
  font-size: 18px;
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
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  margin-top: 28px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const DiscoItem = styled.div`
  padding: 24px;
  background: rgba(235,229,212,0.04);
  border: 1px solid rgba(235,229,212,0.08);
`

const DiscoYear = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 3px;
  color: ${colors.red};
  margin-bottom: 6px;
`

const DiscoTitle = styled.div`
  font-family: ${fonts.display};
  font-size: 28px;
  letter-spacing: 1px;
  color: ${colors.paper};
  line-height: 1;
  margin-bottom: 4px;
`

const DiscoMeta = styled.div`
  font-family: ${fonts.body};
  font-size: 12px;
  color: rgba(235,229,212,0.45);
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

const ClipCard = styled.a`
  display: block;
  text-decoration: none;
  background: rgba(235,229,212,0.04);
  border: 1px solid rgba(235,229,212,0.2);
  padding: 24px 20px;
  position: relative;
  overflow: hidden;
  transition: background 0.15s, border-color 0.15s;

  &::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: ${colors.red};
  }

  &:hover {
    background: rgba(235,229,212,0.08);
    border-color: rgba(235,229,212,0.3);
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

const ClipSub = styled.div`
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
  color: ${colors.red};
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

const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  margin-top: 28px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const DateItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid rgba(10,10,10,0.08);
  display: flex;
  gap: 14px;
  align-items: flex-start;
`

const DateVal = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 1px;
  color: ${colors.red};
  white-space: nowrap;
  flex-shrink: 0;
  padding-top: 2px;
`

const DatePlace = styled.div`
  font-family: ${fonts.body};
  font-size: 13px;
  color: ${colors.ink};
  line-height: 1.4;
`

const pingAnim = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(196,30,30,0.5); }
  50% { box-shadow: 0 0 0 4px rgba(196,30,30,0); }
`

const UpcomingBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-left: 8px;
  vertical-align: middle;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.red};
    animation: ${pingAnim} 1.5s ease-in-out infinite;
    flex-shrink: 0;
  }
`

function isUpcoming(dateStr) {
  const [d, m, y] = dateStr.split('/')
  return new Date(+y, +m - 1, +d) >= new Date()
}

/* ── PHOTO STRIP ── */
const PhotoStrip = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4px;
  border-bottom: 4px solid ${colors.ink};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Photo = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
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
  font-size: clamp(20px, 3.5vw, 42px);
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
  { role: 'Chant saturé & Guitare', name: 'GABRIEL D.' },
  { role: 'Guitare', name: 'BOB D.' },
  { role: 'Basse', name: 'ARTHUR D.' },
  { role: 'Batterie', name: 'FÉLIX F.' },
]

const discographie = [
  {
    year: '2024', title: 'ODTS', meta: 'EP — 4 titres · Toutes plateformes',
  },
  {
    year: '2023', title: 'INDICIBLE', meta: 'EP éponyme — 5 titres · Toutes plateformes',
  },
]

const clips = [
  { title: 'SHAME', sub: 'Single · Official Music Video', url: 'https://www.youtube.com/watch?v=KSEu7m4QuDs' },
  { title: "LIGHT'S BANE", sub: 'Playthrough Guitar & Bass', url: 'https://www.youtube.com/watch?v=X3iDHfGpYTM' },
  { title: 'O.D.T.S.', sub: 'Full EP 2024', url: 'https://www.youtube.com/watch?v=DH2n81ECapY' },
]

const dates = [
  { date: '25/05/2023', lieu: 'Beer Square, Lille' },
  { date: '03/06/2023', lieu: 'Jules Vernes Metal Days, Amiens' },
  { date: '10/06/2023', lieu: 'Kraken, St Quentin' },
  { date: '22/11/2023', lieu: 'Lune des Pirates, Amiens' },
  { date: '23/02/2024', lieu: 'Covent Garden, Eragny' },
  { date: '08/03/2024', lieu: '3 Pièces, Rouen' },
  { date: '06/04/2024', lieu: 'Reload Gaming Bar, Douai' },
  { date: '20/04/2024', lieu: 'Viry-Châtillon' },
  { date: '09/05/2024', lieu: 'Yeti Bar, Lille' },
  { date: '19/05/2024', lieu: 'Accueil Froid Nuke' },
  { date: '13/09/2024', lieu: '1001 Bières, Amiens — Release Party ODTS' },
  { date: '09/11/2024', lieu: "McDaid's, Le Havre" },
  { date: '10/11/2024', lieu: "No Man's Land Industry, Nantes" },
  { date: '11/11/2024', lieu: 'Dropkick Bar, Limoges' },
  { date: '22/11/2024', lieu: '3 Pièces, Rouen' },
  { date: '06/12/2024', lieu: 'Canadian Café, Tours' },
  { date: '07/12/2024', lieu: 'Dropkick, Orléans' },
  { date: '14/03/2025', lieu: 'Péniche Célestine, Amiens' },
  { date: '12/12/2025', lieu: 'Cité Carter, Amiens' },
  { date: '10/04/2026', lieu: '1001 Bières, Amiens' },
  { date: '22/05/2026', lieu: 'PDZ, Besançon' },
  { date: '23/05/2026', lieu: 'Café du Théâtre, Pontarlier' },
  { date: '06/06/2026', lieu: 'Planche Apérock, Dunkerque' },
]

export default function EpkIndiciblePage() {
  return (
    <FanzineWrap>
      <PrintStyle />
      <SEO title="EPK — Indicible" description="Press Kit Indicible 2026. Death Metal · Groove · Slam. Amiens, France." path="/epk/indicible" />

      <Hero>
        <HeroInner>
          <HeroTag>▼ Electronic Press Kit · 2026</HeroTag>
          <HeroBand>INDI&shy;CIBLE</HeroBand>
          <HeroTagline>
            45 minutes de Death metal brutal et groovy —<br />
            aucun compromis, juste du cassage de nuque.
          </HeroTagline>
          <StatsBar>
            <Stat><StatVal>2022</StatVal><StatLabel>Fondé en</StatLabel></Stat>
            <Stat><StatVal>23+</StatVal><StatLabel>Concerts</StatLabel></Stat>
            <Stat><StatVal>2</StatVal><StatLabel>EPs</StatLabel></Stat>
            <Stat><StatVal>45 min</StatVal><StatLabel>Set live</StatLabel></Stat>
          </StatsBar>
        </HeroInner>
      </Hero>

      <ImpactStrip>
        <ImpactText>ON NE SAIT PAS SI LES RIFFS ONT ÉTÉ TROUVÉS PAR DES MATHÉMATICIENS OU DES HOMMES DES CAVERNES.</ImpactText>
        <ImpactSub>// Morbid Angel · Breakdowns · Slam Parts · 45 min de set</ImpactSub>
      </ImpactStrip>

      <BioSection>
        <BioContent>
          <SectionLabel>01 · Biographie</SectionLabel>
          <SectionTitle>QUI<br />SOMMES-<br />NOUS</SectionTitle>
          <Rule />
          <Body>
            <p>
              Formé en 2022, INDICIBLE joue du Death metal violent et groovy.
              Une passion morbide pour les histoires tragiques et gore —
              tueurs en série, sectes, horreurs indicibles.
            </p>
            <p>
              Le groupe mélange le groove Death old-school avec des éléments du metal
              extrême moderne : Slam, Deathcore, breakdowns. Morbid Angel qui ferait
              des slam parts.
            </p>
            <p>
              Deux EPs en deux ans, 23+ concerts à travers la France.
              Le groupe est disponible pour <strong>45 minutes de set intense et brutal</strong>.
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
        <BioPhoto />
      </BioSection>

      <DiscoSection>
        <SectionLabel>02 · Discographie</SectionLabel>
        <SectionTitle $light>DISCO&shy;GRAPHIE</SectionTitle>
        <Rule />
        <DiscoGrid>
          {discographie.map(d => (
            <DiscoItem key={d.title}>
              <DiscoYear>{d.year}</DiscoYear>
              <DiscoTitle>{d.title}</DiscoTitle>
              <DiscoMeta>{d.meta}</DiscoMeta>
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
            <ClipCard key={c.title} href={c.url} target="_blank" rel="noopener noreferrer">
              <ClipTitle>{c.title}</ClipTitle>
              {c.sub && <ClipSub>{c.sub}</ClipSub>}
              <ClipCta>→ Voir sur YouTube</ClipCta>
            </ClipCard>
          ))}
        </ClipsGrid>
      </ClipsSection>

      <PhotoStrip>
        <Photo src="/epk/indicible-pic1.jpg" alt="Indicible live" />
        <Photo src="/epk/indicible-pic2.jpg" alt="Indicible bandshoot" />
        <Photo src="/epk/indicible-pic3.jpg" alt="Indicible bandshoot" />
      </PhotoStrip>

      <DatesSection>
        <SectionLabel>04 · Concerts</SectionLabel>
        <SectionTitle>DATES</SectionTitle>
        <Rule />
        <DatesGrid>
          {dates.map(d => (
            <DateItem key={d.date + d.lieu}>
              <DateVal>{d.date}</DateVal>
              <DatePlace>
                {d.lieu}
                {isUpcoming(d.date) && <UpcomingBadge>À venir</UpcomingBadge>}
              </DatePlace>
            </DateItem>
          ))}
        </DatesGrid>
      </DatesSection>

      <ContactSection>
        <SectionLabel>05 · Contact & Booking</SectionLabel>
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
            <ContactLabel>Email groupe</ContactLabel>
            <ContactVal>indicible.band@gmail.com</ContactVal>
          </ContactItem>
          <ContactItem>
            <ContactLabel>Genre</ContactLabel>
            <ContactVal>Death Metal · Groove · Slam</ContactVal>
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
