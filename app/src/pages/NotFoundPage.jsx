import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { colors, fonts } from '../theme'

const Wrap = styled.div`
  background: ${colors.ink};
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '404';
    position: absolute;
    font-family: ${fonts.display};
    font-size: clamp(180px, 30vw, 400px);
    color: rgba(255,255,255,0.03);
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }
`

const Label = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 12px;
  position: relative;
`

const Title = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(48px, 10vw, 100px);
  line-height: 0.9;
  color: ${colors.paper};
  margin-bottom: 20px;
  position: relative;
`

const Text = styled.div`
  font-family: ${fonts.body};
  font-size: 15px;
  color: rgba(235,229,212,0.5);
  margin-bottom: 36px;
  position: relative;
`

const BackBtn = styled(Link)`
  display: inline-block;
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 14px 32px;
  border: 3px solid ${colors.paper};
  color: ${colors.paper};
  position: relative;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${colors.paper};
    color: ${colors.ink};
  }
`

export default function NotFoundPage() {
  return (
    <Wrap>
      <Helmet><title>Page introuvable — Carillon</title><meta name="robots" content="noindex" /></Helmet>
      <Label>▼ Erreur</Label>
      <Title>PAGE<br />INTROUVABLE</Title>
      <Text>Cette page n'existe pas ou a été déplacée.</Text>
      <BackBtn to="/">← Retour à l'accueil</BackBtn>
    </Wrap>
  )
}
