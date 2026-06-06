import styled from 'styled-components'
import { FanzineWrap } from '../components/FanzineWrap'
import SEO from '../components/SEO'
import { colors, fonts } from '../theme'

const Hero = styled.div`
  background: ${colors.ink} url('/apropos.png') center 10%/cover no-repeat;
  position: relative;
  padding: 80px 40px 64px;
  border-bottom: 4px solid ${colors.ink};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,0.3) 100%);
  }

  @media (max-width: 640px) {
    padding: 48px 20px 40px;
  }
`

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 640px;
`

const HeroLabel = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 12px;
`

const HeroTitle = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(64px, 12vw, 140px);
  line-height: 0.85;
  letter-spacing: 2px;
  color: ${colors.paper};
  margin-bottom: 24px;
`

const HeroText = styled.div`
  font-family: ${fonts.body};
  font-size: 16px;
  line-height: 1.65;
  color: rgba(235,229,212,0.7);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  border-bottom: 4px solid ${colors.ink};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const EmailBlock = styled.div`
  padding: 48px 40px;
  background: ${colors.paper};
  border-right: 4px solid ${colors.ink};

  @media (max-width: 768px) {
    padding: 32px 20px;
    border-right: none;
    border-bottom: 4px solid ${colors.ink};
  }
`

const BlockLabel = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 12px;
`

const BlockTitle = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(36px, 5vw, 52px);
  line-height: 0.9;
  letter-spacing: 1px;
  color: ${({ $light }) => $light ? colors.paper : colors.ink};
  margin-bottom: 28px;
`

const Rule = styled.div`
  width: 40px;
  height: 4px;
  background: ${colors.red};
  margin-bottom: 24px;
`

const EmailLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: ${colors.paper};
  background: ${colors.ink};
  padding: 20px 24px;
  font-family: ${fonts.body};
  font-size: clamp(14px, 2vw, 18px);
  margin-bottom: 16px;
  transition: background 0.15s;

  &:hover { background: ${colors.red}; }

  &::after {
    content: '→';
    font-family: ${fonts.display};
    font-size: 24px;
    flex-shrink: 0;
    margin-left: 16px;
  }
`

const EmailNote = styled.div`
  font-family: ${fonts.body};
  font-size: 12px;
  color: ${colors.darkGrey};
  letter-spacing: 1px;
  line-height: 2;
`

const SocialBlock = styled.div`
  padding: 48px 40px;
  background: ${colors.ink};
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 32px 20px;
  }
`

const SocialLink = styled.a`
  display: block;
  text-decoration: none;
  color: ${colors.paper};
  border: 3px solid rgba(235,229,212,0.15);
  padding: 24px 20px;
  margin-top: auto;
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: ${colors.paper};
    background: rgba(235,229,212,0.05);
  }
`

const SocialPlatform = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 10px;
`

const SocialHandle = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(22px, 3vw, 34px);
  letter-spacing: 1px;
  line-height: 1;
  margin-bottom: 12px;
`

const SocialArrow = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(235,229,212,0.35);
`

export default function ContactPage() {
  return (
    <FanzineWrap>
      <SEO title="Contact" description="Contactez Carillon pour vos demandes presse, management, booking ou coproduction. Email : contact@studiocarillon.fr" path="/contact" />
      <Hero>
        <HeroInner>
          <HeroLabel>▼ Nous contacter</HeroLabel>
          <HeroTitle>ÉCRIS-NOUS</HeroTitle>
          <HeroText>
            Une question sur la coproduction, le management<br />
            ou l'édition ? On répond à tout.
          </HeroText>
        </HeroInner>
      </Hero>

      <Grid>
        <EmailBlock>
          <BlockLabel>01 // Email</BlockLabel>
          <BlockTitle>CONTACT</BlockTitle>
          <Rule />
          <EmailLink href="mailto:contact@studiocarillon.fr">
            contact@studiocarillon.fr
          </EmailLink>
          <EmailNote>
            // Presse<br />
            // Management & booking<br />
            // Coproduction<br />
            // Toute autre demande
          </EmailNote>
        </EmailBlock>

        <SocialBlock>
          <div>
            <BlockLabel>02 // Réseaux</BlockLabel>
            <BlockTitle $light>SUIS-NOUS</BlockTitle>
            <Rule />
          </div>
          <SocialLink href="https://www.instagram.com/carillon_mgmt" target="_blank" rel="noopener noreferrer">
            <SocialPlatform>Instagram</SocialPlatform>
            <SocialHandle>@carillon_mgmt</SocialHandle>
            <SocialArrow>→ Voir le profil</SocialArrow>
          </SocialLink>
        </SocialBlock>
      </Grid>
    </FanzineWrap>
  )
}
