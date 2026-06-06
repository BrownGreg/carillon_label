import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FanzineWrap } from '../components/FanzineWrap'
import SEO from '../components/SEO'
import { colors, fonts } from '../theme'

const Header = styled.div`
  padding: 40px 40px 32px;
  border-bottom: 4px solid ${colors.ink};
  background: ${colors.paper};

  @media (max-width: 640px) {
    padding: 28px 20px 24px;
  }
`

const HeaderLabel = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 8px;
`

const HeaderTitle = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(52px, 10vw, 120px);
  line-height: 0.85;
  letter-spacing: 2px;
  color: ${colors.ink};
`

const HeaderSub = styled.div`
  font-family: ${fonts.body};
  font-size: 13px;
  letter-spacing: 2px;
  margin-top: 12px;
  text-transform: uppercase;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ArtistCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${colors.ink};
  position: relative;
  overflow: hidden;
  border-bottom: 4px solid ${colors.ink};
  border-right: 4px solid ${colors.ink};
  min-height: 480px;
  background: ${colors.ink};

  &:nth-child(even) {
    border-right: none;
  }

  @media (max-width: 768px) {
    border-right: none;
    min-height: 360px;
  }

  &:hover img {
    transform: scale(1.04);
    filter: grayscale(0%);
  }

  &:hover ${'' /* ArtistOverlay */} {
    background: linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.3) 60%, transparent 100%);
  }
`

const ArtistPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $focus }) => $focus || 'center center'};
  position: absolute;
  inset: 0;
  filter: grayscale(30%);
  transition: transform 0.4s ease, filter 0.4s ease;
`

const ArtistPhotoBg = styled.div`
  position: absolute;
  inset: 0;
  background: ${colors.ink};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.display};
  font-size: 120px;
  color: #1f1f1f;
`

const ArtistOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 50%, transparent 100%);
  transition: background 0.3s ease;
  z-index: 1;
`

const ArtistInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 28px 32px;
  z-index: 2;

  @media (max-width: 640px) {
    padding: 20px;
  }
`

const ArtistNum = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 4px;
`

const ArtistName = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(36px, 5vw, 64px);
  line-height: 0.9;
  letter-spacing: 2px;
  color: ${colors.paper};
  margin-bottom: 8px;
`

const ArtistGenre = styled.div`
  font-family: ${fonts.body};
  font-size: 13px;
  color: rgba(235,229,212,0.7);
  margin-bottom: 12px;
`

const ArtistTag = styled.div`
  display: inline-block;
  background: ${colors.red};
  color: ${colors.paper};
  padding: 4px 12px;
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
`

const ArtistArrow = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  font-family: ${fonts.display};
  font-size: 28px;
  color: ${colors.paper};
  opacity: 0.5;
  z-index: 2;
`

const Divider = styled.div`
  background: ${colors.ink};
  color: ${colors.paper};
  padding: 14px 40px;
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  border-bottom: 4px solid ${colors.ink};

  @media (max-width: 640px) {
    padding: 14px 20px;
  }
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

const roster = [
  {
    num: '01',
    name: 'EMPREINTE',
    genre: '// Metalcore · Électronique',
    tag: 'Amiens · Depuis 2018',
    photo: '/artist-empreinte.jpg',
    focus: 'center 40%',
    to: '/artiste/empreinte',
  },
  {
    num: '02',
    name: 'INDICIBLE',
    genre: '// Death · Groove · Slam',
    tag: 'Amiens',
    photo: '/artist-indicible.jpg',
    to: '/artiste/indicible',
  },
  {
    num: '03',
    name: 'AKAPOV',
    genre: '// Shoegaze metal',
    tag: 'Nouveau ★',
    photo: '/artist-akapov.jpg',
    focus: 'center 20%',
    to: '/sortie/akapov-fwac',
  },
  {
    num: '04',
    name: 'F. FEUILLETTE',
    genre: '// Batteur · Sessions',
    tag: 'Solo · Session',
    photo: '/artist-feuillette.jpg',
    to: '#',
  },
]

export default function RosterPage() {
  return (
    <FanzineWrap>
      <SEO title="Roster" description="Découvrez les artistes du label Carillon : Empreinte, Indicible, Akapov, F. Feuillette. Metalcore, Death Metal, Shoegaze Metal." path="/roster" />
      <Header>
        <HeaderLabel>▼ Nos artistes ▼</HeaderLabel>
        <HeaderTitle>ROSTER</HeaderTitle>
        <HeaderSub>4 groupes · Metalcore / Death / Hardcore / Shoegaze Metal</HeaderSub>
      </Header>

      <Divider>★ Cliquer sur un artiste pour en savoir plus ★</Divider>

      <Grid>
        {roster.map((artist) => (
          <ArtistCard key={artist.num} to={artist.to}>
            {artist.photo
              ? <ArtistPhoto src={artist.photo} alt={artist.name} $focus={artist.focus} />
              : <ArtistPhotoBg>{artist.name[0]}</ArtistPhotoBg>
            }
            <ArtistOverlay />
            <ArtistArrow>→</ArtistArrow>
            <ArtistInfo>
              <ArtistNum>{artist.num} //</ArtistNum>
              <ArtistName>{artist.name}</ArtistName>
              <ArtistGenre>{artist.genre}</ArtistGenre>
              <ArtistTag>{artist.tag}</ArtistTag>
            </ArtistInfo>
          </ArtistCard>
        ))}
      </Grid>
    </FanzineWrap>
  )
}
