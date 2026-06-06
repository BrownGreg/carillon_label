import styled, { keyframes } from 'styled-components'
import { FanzineWrap } from '../components/FanzineWrap'
import SEO from '../components/SEO'
import { colors, fonts } from '../theme'

const presavePulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(196, 30, 30, 0.6); }
  50% { box-shadow: 0 0 0 12px rgba(196, 30, 30, 0); }
`

const Hero = styled.div`
  position: relative;
  background: ${colors.ink} url('/Cover_flower.jpg') center 70%/cover no-repeat;
  display: flex;
  align-items: flex-start;
  border-bottom: 4px solid ${colors.ink};
  overflow: hidden;
`

const HeroLastLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 40px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding-right: 0;
  }
`

const PresaveBtn = styled.a`
  flex-shrink: 0;
  padding: 14px 32px;
  background: ${colors.red};
  color: ${colors.paper};
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-decoration: none;
  border: 3px solid ${colors.red};
  white-space: nowrap;
  animation: ${presavePulse} 2s ease-in-out infinite;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: transparent;
    color: ${colors.paper};
  }

  @media (max-width: 640px) {
    align-self: flex-start;
  }
`

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(10,10,10,0.95) 0%,
    rgba(10,10,10,0.7) 50%,
    rgba(10,10,10,0.1) 100%
  );
`

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 40px 40px 56px;
  width: 100%;

  @media (max-width: 640px) {
    padding: 24px 20px 40px;
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

const HeroBand = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(28px, 5vw, 52px);
  letter-spacing: 6px;
  color: rgba(235,229,212,0.5);
  line-height: 1;
  margin-bottom: 4px;
`

const HeroTitle = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(48px, 10vw, 120px);
  line-height: 0.85;
  letter-spacing: 1px;
  color: ${colors.paper};

  em {
    font-style: normal;
    color: ${colors.red};
  }
`

const HeroDate = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(235,229,212,0.5);
  margin-top: 16px;
`

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  }

  @media (max-width: 640px) {
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


const MembersSection = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  border-bottom: 4px solid ${colors.ink};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const MembersPhoto = styled.div`
  background: ${colors.ink} url('/artist-akapov.jpg') center 30%/cover no-repeat;
  min-height: 400px;

  @media (max-width: 768px) {
    min-height: 260px;
  }
`

const MembersContent = styled.div`
  background: ${colors.ink};
  padding: 36px 40px;

  @media (max-width: 640px) {
    padding: 28px 20px;
  }
`

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 24px;
`

const MemberCard = styled.div`
  background: ${colors.paper};
  padding: 16px;
  transform: ${({ $tilt }) => $tilt === '1' ? 'rotate(-0.8deg)' : 'rotate(0.6deg)'};
`

const MemberRole = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 6px;
`

const MemberName = styled.div`
  font-family: ${fonts.display};
  font-size: 24px;
  line-height: 1;
  letter-spacing: 1px;
  color: ${colors.ink};
`

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
  cursor: pointer;
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

const SectionTitle = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(28px, 4vw, 48px);
  letter-spacing: 1px;
  color: ${({ $inverted }) => $inverted ? colors.paper : colors.ink};
`

const Footer = styled.div`
  padding: 24px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${fonts.body};
  font-size: 11px;
  background: ${colors.ink};
  color: ${colors.paper};

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
    text-align: center;
    padding: 20px;
  }
`

const FooterLogo = styled.div`
  font-family: ${fonts.display};
  font-size: 32px;
  letter-spacing: 3px;
`

const members = [
  { role: 'Chant', name: 'ARTHUR', tilt: '1' },
  { role: 'Basse', name: 'YANNIS', tilt: '2' },
  { role: 'Batterie', name: 'TITOU', tilt: '1' },
  { role: 'Guitare', name: 'GRÉGORY', tilt: '2' },
]

const platforms = [
  { name: 'SPOTIFY', url: 'https://open.spotify.com/intl-fr/artist/1OCQSGIvc2iO0O1PAUBWmz?si=tOS8v-aMQxeqQofGBEEIBw' },
  { name: 'APPLE MUSIC', url: 'https://music.apple.com/fr/artist/akapov/1576031015' },
  { name: 'DEEZER', url: 'https://www.deezer.com/fr/artist/149343932' },
  { name: 'YOUTUBE', url: 'https://www.youtube.com/@akapovband_fr' },
]

export default function ReleaseAkapovPage() {
  return (
    <FanzineWrap>
      <SEO title="Akapov — Flowers, Wine and Candles" description="Flowers, Wine and Candles — premier single d'Akapov. Shoegaze metal. Disponible le 19 juin 2026. Presave dès maintenant." path="/sortie/akapov-fwac" image="/Cover_flower.jpg" />
      <Hero>
        <HeroOverlay />
        <HeroContent>
          <HeroLabel>▼ New single</HeroLabel>
          <HeroBand>AKAPOV</HeroBand>
          <HeroTitle>
            FLOWERS,<br />
            WINE AND
          </HeroTitle>
          <HeroLastLine>
            <HeroTitle as="div"><em>CANDLES</em></HeroTitle>
            <PresaveBtn href="https://bfan.link/flowers-wine-and-candles" target="_blank" rel="noopener noreferrer">
              → Presave
            </PresaveBtn>
          </HeroLastLine>
        </HeroContent>
      </Hero>

      <InfoRow>
        <InfoCell>
          <InfoLabel>Sortie</InfoLabel>
          <InfoVal>19 / 06 / 26</InfoVal>
        </InfoCell>
        <InfoCell>
          <InfoLabel>Format</InfoLabel>
          <InfoVal>Single · Digital</InfoVal>
        </InfoCell>
        <InfoCell $last>
          <InfoLabel>Genre</InfoLabel>
          <InfoVal>Shoegaze metal</InfoVal>
        </InfoCell>
      </InfoRow>

      <MembersSection>
        <MembersPhoto />
        <MembersContent>
          <SectionTitle $inverted>LES MEMBRES</SectionTitle>
          <MembersGrid>
            {members.map((m) => (
              <MemberCard key={m.name} $tilt={m.tilt}>
                <MemberRole>▼ {m.role}</MemberRole>
                <MemberName>{m.name}</MemberName>
              </MemberCard>
            ))}
          </MembersGrid>
        </MembersContent>
      </MembersSection>

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
    </FanzineWrap>
  )
}
