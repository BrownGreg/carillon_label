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
  font-family: ${fonts.display};
  font-size: 32px;
  letter-spacing: 3px;
  color: ${colors.paper};
  text-decoration: none;
`

export default function SiteFooter() {
  return (
    <Bar>
      <Logo to="/">CARILLON</Logo>
      <span>© 2026 — Tous droits réservés</span>
      <span>Management · Édition · Coproduction</span>
    </Bar>
  )
}
