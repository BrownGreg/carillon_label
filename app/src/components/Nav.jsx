import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { colors, fonts } from '../theme'

const NavBar = styled.nav`
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 4px solid ${colors.ink};
`

const BackBtn = styled.button`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  background: none;
  border: none;
  color: ${colors.ink};
  padding: 0;
`

const Logo = styled(Link)`
  font-family: ${fonts.display};
  font-size: 28px;
  letter-spacing: 3px;
  text-decoration: none;
  color: ${colors.ink};
`

const Lang = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
`

export default function Nav({ backLabel, backTo }) {
  const navigate = useNavigate()
  return (
    <NavBar>
      <BackBtn onClick={() => navigate(backTo ?? -1)}>← {backLabel}</BackBtn>
      <Logo to="/">CARILLON</Logo>
      <Lang>FR / EN</Lang>
    </NavBar>
  )
}
