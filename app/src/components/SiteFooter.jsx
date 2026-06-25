import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors, fonts } from '../theme'

const Bar = styled.footer`
  background: ${colors.ink};
  color: ${colors.paper};
  padding: 24px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${fonts.body};
  font-size: 11px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
    text-align: center;
    padding: 20px;
  }
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;

  img {
    height: 32px;
    width: auto;
  }
`

export default function SiteFooter() {
  return (
    <Bar>
      <Logo to="/"><img src="/logo-carillon-cream.png" alt="Carillon" /></Logo>
      <span>© 2026 — Tous droits réservés</span>
      <span>Management · Édition · Coproduction</span>
    </Bar>
  )
}
