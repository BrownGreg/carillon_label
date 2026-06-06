import styled, { keyframes } from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { colors, fonts } from '../theme'

const bubblePulse = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 4px rgba(126, 20, 255, 0.2))
            drop-shadow(0 0 8px rgba(71, 191, 255, 0.1));
    transform: scale(1);
  }
  50% {
    filter: drop-shadow(0 0 14px rgba(126, 20, 255, 0.7))
            drop-shadow(0 0 28px rgba(71, 191, 255, 0.4))
            drop-shadow(0 0 6px rgba(237, 230, 255, 0.3));
    transform: scale(1.03);
  }
`

const Bar = styled.header`
  background: ${colors.ink};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 32px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 16px 20px;
    gap: 12px;
  }
`

const LogoWrap = styled(Link)`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  text-decoration: none;

  @media (max-width: 900px) {
    gap: 14px;
  }
`

const Tagline = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.paper};
  opacity: 0.55;
  line-height: 1.5;

  @media (max-width: 768px) {
    display: none;
  }
`

const LogoImg = styled.img`
  height: 96px;
  width: auto;
  transition: filter 0.3s ease;

  ${LogoWrap}:hover & {
    animation: ${bubblePulse} 1.8s ease-in-out infinite;
  }

  @media (max-width: 480px) {
    height: 72px;
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 10px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 100%;
  }
`

const NavBtn = styled(NavLink)`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 8px 18px;
  border: 2px solid ${colors.paper};
  color: ${colors.paper};
  background: transparent;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s;

  &:hover, &.active {
    background: ${colors.paper};
    color: ${colors.ink};
  }

  &[data-primary] {
    background: ${colors.red};
    border-color: ${colors.red};

    &:hover {
      background: #a01818;
      border-color: #a01818;
      color: ${colors.paper};
    }

    &.active {
      background: ${colors.paper};
      border-color: ${colors.paper};
      color: ${colors.ink};
    }
  }

  @media (max-width: 480px) {
    flex: 1;
    text-align: center;
  }
`

export default function SiteHeader() {
  return (
    <Bar>
      <LogoWrap to="/">
        <LogoImg src="/logo-fx.png" alt="Carillon" />
        <Tagline>Label indépendant · Management<br />Édition · Coproduction phonographique</Tagline>
      </LogoWrap>
      <Nav>
        <NavBtn to="/roster" data-primary>→ Roster</NavBtn>
        <NavBtn to="/a-propos">À propos</NavBtn>
        <NavBtn to="/contact">Contact</NavBtn>
      </Nav>
    </Bar>
  )
}
