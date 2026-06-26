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

const Hero = styled.div`
  position: relative; min-height: 100vh;
  background: ${colors.ink} url('/artist-akapov.jpg') center 25%/cover no-repeat;
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
  font-size: clamp(80px, 16vw, 200px);
  line-height: 0.82; letter-spacing: 4px;
  color: ${colors.paper}; margin-bottom: 24px;
`

const HeroTagline = styled.div`
  font-family: ${fonts.body};
  font-size: clamp(16px, 2.5vw, 22px);
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
  font-family: ${fonts.display}; font-size: clamp(24px, 4vw, 40px);
  letter-spacing: 2px; color: ${colors.paper}; line-height: 1;
`

const StatLabel = styled.div`
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
  color: ${colors.red}; margin-top: 4px;
`

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

const BioSection = styled.div`
  display: grid; grid-template-columns: 1fr 1.3fr;
  border-bottom: 4px solid ${colors.ink};
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`

const BioPhoto = styled.div`
  background: ${colors.ink} url('/artist-akapov.jpg') center/cover no-repeat;
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

const MemberGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 8px; margin-top: 28px;
`

const MemberCard = styled.div`
  padding: 14px 16px; background: ${colors.ink};
`

const MemberRole = styled.div`
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
  color: ${colors.red}; margin-bottom: 4px;
`

const MemberName = styled.div`
  font-family: ${fonts.display}; font-size: 20px;
  letter-spacing: 1px; color: ${colors.paper};
`

const DiscoSection = styled.div`
  background: ${colors.ink}; padding: 48px 40px;
  border-bottom: 4px solid ${colors.paper};
  @media (max-width: 640px) { padding: 32px 24px; }
`

const DiscoGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-top: 28px;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`

const DiscoItem = styled.div`
  padding: 24px; background: rgba(235,229,212,0.04);
  border: 1px solid rgba(235,229,212,0.08);
`

const DiscoYear = styled.div`
  font-family: ${fonts.heading}; font-weight: 700;
  font-size: 10px; letter-spacing: 3px;
  color: ${colors.red}; margin-bottom: 6px;
`

const DiscoTitle = styled.div`
  font-family: ${fonts.display}; font-size: 28px;
  letter-spacing: 1px; color: ${colors.paper};
  line-height: 1; margin-bottom: 4px;
`

const DiscoMeta = styled.div`
  font-family: ${fonts.body}; font-size: 12px;
  color: rgba(235,229,212,0.45);
`

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

const members = [
  { role: 'Chant', name: 'ARTHUR' },
  { role: 'Basse', name: 'YANNIS' },
  { role: 'Batterie', name: 'TITOU' },
  { role: 'Guitare', name: 'GRÉGORY' },
]

const clips = [
  { title: 'FLOWERS, WINE AND CANDLES', sub: 'Official Music Video', url: 'https://www.youtube.com/watch?v=_P4slDLNp-Q' },
]

const discographie = [
  { year: '2026', title: 'LIMBIC', meta: 'Single · 19/07/2026' },
  { year: '2026', title: 'FLOWERS, WINE AND CANDLES', meta: 'Single · Toutes plateformes' },
]

export default function EpkAkapovPage() {
  return (
    <FanzineWrap>
      <PrintStyle />
      <SEO
        title="EPK — AKAPOV"
        description="Press Kit AKAPOV 2026. Shoegaze Nu Metal."
        path="/epk/akapov"
      />

      <Hero>
        <HeroInner>
          <HeroTag>▼ Electronic Press Kit · 2026</HeroTag>
          <HeroBand>AKAPOV</HeroBand>
          <HeroTagline>
            Shoegaze Nu Metal
          </HeroTagline>
          <StatsBar>
            <Stat><StatVal>2026</StatVal><StatLabel>Début</StatLabel></Stat>
            <Stat><StatVal>1</StatVal><StatLabel>Sorties</StatLabel></Stat>
          </StatsBar>
        </HeroInner>
      </Hero>

      <ImpactStrip>
        <ImpactText>Pouah c’est magique</ImpactText>
        <ImpactSub>Scott Rand, YouTube</ImpactSub>
      </ImpactStrip>

      <BioSection>
        <BioPhoto />
        <BioContent>
          <SectionLabel>01 · Biographie</SectionLabel>
          <SectionTitle>QUI<br />SOMMES-<br />NOUS</SectionTitle>
          <Rule />
          <Body>
            <p>Seriously, we need a pitch.</p>
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

      <ContactSection>
        <SectionLabel>04 · Contact & Booking</SectionLabel>
        <SectionTitle $light>PROGRAM&shy;MEZ-NOUS</SectionTitle>
        <BookingCTA href="mailto:contact@studiocarillon.fr">
          <BookingLabel>contact@studiocarillon.fr</BookingLabel>
          <BookingArrow>→</BookingArrow>
        </BookingCTA>
        <ContactGrid>
          <ContactItem>
            <ContactLabel>Management / Booking</ContactLabel>
            <ContactVal>Maud · 06 45 30 94 93</ContactVal>
          </ContactItem>
          <ContactItem>
            <ContactLabel>Label</ContactLabel>
            <ContactVal>Carillon · carillonlabel.fr</ContactVal>
          </ContactItem>
          <ContactItem>
            <ContactLabel>Genre</ContactLabel>
            <ContactVal>Shoegaze Nu Metal</ContactVal>
          </ContactItem>
        </ContactGrid>
      </ContactSection>

      <PrintBtn className="no-print" onClick={() => window.print()}>
        ↓ Télécharger PDF
      </PrintBtn>
    </FanzineWrap>
  )
}
