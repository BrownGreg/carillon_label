import { useState, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { useNavigate, Link } from 'react-router-dom'
import { FanzineWrap } from '../components/FanzineWrap'
import SEO from '../components/SEO'
import { colors, fonts } from '../theme'

const bubblePulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`

const slides = [
  {
    bg: '/Cover_flower.jpg',
    bgPos: 'center 70%',
    label: '★ Nouveau single',
    band: 'Akapov',
    title: ['Flowers,', 'Wine and', 'Candles'],
    date: 'Disponible maintenant',
    btn: '→ Voir le clip',
    to: 'https://www.youtube.com/watch?v=_P4slDLNp-Q',
    external: true,
  },
  {
    bg: '/cover-vertigo.jpg',
    bgPos: 'center center',
    label: '★ Nouvel EP',
    band: 'Empreinte',
    title: ['Vertigo'],
    date: 'Disponible maintenant',
    btn: '→ Écouter',
    to: 'https://bfan.link/vertigo-18',
    external: true,
  },
  {
    bg: '/cover-melted.jpg',
    bgPos: 'center center',
    label: '★ Single',
    band: 'Indicible',
    title: ['Melted'],
    date: 'Disponible maintenant',
    btn: '→ Écouter',
    to: '/artiste/indicible',
    external: false,
  },
]

const Screen = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 136px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`

const Left = styled.div`
  background: ${colors.ink};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 5px 5px;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 48px 24px;
    min-height: 60vh;
  }
`

const Logo = styled.img`
  width: clamp(200px, 32vw, 420px);
  height: auto;
  position: relative;
  z-index: 1;
  margin-bottom: 28px;
`

const Tagline = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(235,229,212,0.35);
  text-align: center;
  position: relative;
  z-index: 1;
  margin-bottom: 48px;
  line-height: 1.8;
`

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 280px;
`

const NavBtn = styled(Link)`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 13px 24px;
  border: 2px solid rgba(235,229,212,0.2);
  color: rgba(235,229,212,0.55);
  background: transparent;
  text-align: center;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
  cursor: pointer;

  &:hover {
    border-color: ${colors.paper};
    color: ${colors.paper};
  }

  &[data-primary] {
    background: ${colors.red};
    border-color: ${colors.red};
    color: ${colors.paper};

    &:hover {
      background: #a01818;
      border-color: #a01818;
    }
  }
`

const RightPanel = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 768px) {
    min-height: 420px;
  }
`

const SlideBg = styled.div`
  position: absolute;
  inset: 0;
  background: ${colors.ink} url(${({ $src }) => $src}) ${({ $pos }) => $pos || 'center 70%'}/cover no-repeat;
  opacity: ${({ $active }) => $active ? 1 : 0};
  transition: opacity 0.8s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(10,10,10,0.95) 0%,
      rgba(10,10,10,0.4) 50%,
      rgba(10,10,10,0.15) 100%
    );
  }
`

const RightContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 36px 32px;
  z-index: 1;
`

const RightLabel = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 10px;
  animation: ${bubblePulse} 2.5s ease-in-out infinite;
`

const RightBand = styled.div`
  font-family: ${fonts.body};
  font-size: 13px;
  color: rgba(235,229,212,0.5);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 4px;
`

const RightTitle = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(32px, 4vw, 56px);
  line-height: 0.9;
  color: ${colors.paper};
  margin-bottom: 20px;
  letter-spacing: 1px;
`

const RightDate = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(235,229,212,0.45);
  margin-bottom: 20px;
`

const SlideBtn = styled.div`
  display: inline-block;
  background: ${colors.red};
  color: ${colors.paper};
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 10px 22px;
  border: 2px solid ${colors.red};
  transition: background 0.2s, color 0.2s;

  ${RightPanel}:hover & {
    background: transparent;
    color: ${colors.red};
  }
`

const SlideDots = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
  align-items: center;
`

const SlideDot = styled.button`
  width: ${({ $active }) => $active ? '20px' : '6px'};
  height: 6px;
  background: ${({ $active }) => $active ? colors.red : 'rgba(235,229,212,0.3)'};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: width 0.3s, background 0.3s;

  &:hover {
    background: ${colors.paper};
  }
`

export default function HomePage() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent(s => (s + 1) % slides.length), [])

  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [next])

  const slide = slides[current]

  const handlePanelClick = () => {
    if (slide.external) window.open(slide.to, '_blank', 'noopener noreferrer')
    else navigate(slide.to)
  }

  return (
    <FanzineWrap>
      <SEO
        title="Accueil"
        description="Carillon est un label indépendant français. Management d'artistes, édition musicale et coproduction phonographique. Metalcore, Death Metal, Shoegaze."
        path="/"
      />
      <Screen>
        <Left>
          <Logo src="/logo-carillon-cream-full.png" alt="Carillon" />
          <Tagline>
            Label indépendant · Management<br />
            Édition · Coproduction phonographique
          </Tagline>
          <Nav>
            <NavBtn to="/roster" data-primary>→ Notre roster</NavBtn>
            <NavBtn to="/a-propos">À propos</NavBtn>
            <NavBtn to="/contact">Contact</NavBtn>
          </Nav>
        </Left>

        <RightPanel onClick={handlePanelClick}>
          {slides.map((s, i) => (
            <SlideBg key={i} $src={s.bg} $pos={s.bgPos} $active={i === current} />
          ))}
          <RightContent>
            <RightLabel>{slide.label}</RightLabel>
            <RightBand>{slide.band}</RightBand>
            <RightTitle>
              {slide.title.map((line, i) => (
                <span key={i}>{line}{i < slide.title.length - 1 && <br />}</span>
              ))}
            </RightTitle>
            <RightDate>{slide.date}</RightDate>
            <SlideBtn>{slide.btn}</SlideBtn>
            <SlideDots onClick={e => e.stopPropagation()}>
              {slides.map((_, i) => (
                <SlideDot key={i} $active={i === current} onClick={() => setCurrent(i)} />
              ))}
            </SlideDots>
          </RightContent>
        </RightPanel>
      </Screen>
    </FanzineWrap>
  )
}
