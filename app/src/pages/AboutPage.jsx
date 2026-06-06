import styled from 'styled-components'
import { FanzineWrap } from '../components/FanzineWrap'
import SEO from '../components/SEO'
import { colors, fonts } from '../theme'

const SectionBlock = styled.div`
  display: grid;
  grid-template-columns: ${({ $reverse }) => $reverse ? '1fr 1.1fr' : '1.1fr 1fr'};
  border-bottom: 4px solid ${colors.ink};
  min-height: 480px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`

const SectionImg = styled.div`
  background: ${colors.ink} url("${({ $src }) => $src}") center/cover no-repeat;
  order: ${({ $reverse }) => $reverse ? 1 : 0};
  min-height: 320px;

  @media (max-width: 768px) {
    order: 0;
    min-height: 240px;
  }
`

const SectionContent = styled.div`
  padding: 40px 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ $dark }) => $dark ? colors.ink : colors.paper};
  color: ${({ $dark }) => $dark ? colors.paper : colors.ink};
  order: ${({ $reverse }) => $reverse ? 0 : 1};

  @media (max-width: 768px) {
    order: 1;
    padding: 28px 20px;
  }
`

const SectionNum = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 6px;
`

const SectionTitle = styled.div`
  font-family: ${fonts.display};
  font-size: clamp(36px, 5vw, 64px);
  line-height: 0.9;
  letter-spacing: 1px;
  margin-bottom: 20px;
`

const SectionText = styled.div`
  font-family: ${fonts.body};
  font-size: 15px;
  line-height: 1.65;

  p + p {
    margin-top: 14px;
  }
`

const SectionRule = styled.div`
  width: 48px;
  height: 4px;
  background: ${colors.red};
  margin: 18px 0;
`

const AProposBlock = styled.div`
  border-bottom: 4px solid ${colors.ink};
`

const AProposPhoto = styled.div`
  background: ${colors.ink} url('/apropos.png') center/cover no-repeat;
  min-height: clamp(320px, 50vw, 560px);
`

const AProposContent = styled.div`
  padding: 40px;
  background: ${colors.paper};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 28px 20px;
  }
`

const AProposText = styled.div`
  font-family: ${fonts.body};
  font-size: 15px;
  line-height: 1.65;
`

const AProposMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const MetaItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px;
  border: 2px solid ${colors.ink};
`

const MetaIcon = styled.div`
  font-family: ${fonts.display};
  font-size: 28px;
  color: ${colors.red};
  line-height: 1;
  flex-shrink: 0;
`

const MetaLabel = styled.div`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${colors.red};
  margin-bottom: 4px;
`

const MetaVal = styled.div`
  font-family: ${fonts.body};
  font-size: 13px;
  line-height: 1.4;
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

export default function AboutPage() {
  return (
    <FanzineWrap>
      <SEO title="À propos" description="Carillon, fondé en 2023. Label indépendant centré sur le management d'artistes, l'édition musicale et la coproduction phonographique." path="/a-propos" />
      <SectionBlock>
        <SectionImg $src="/coprod.png" />
        <SectionContent>
          <SectionNum>01 // Nos services</SectionNum>
          <SectionTitle>LA COPRO&shy;DUCTION</SectionTitle>
          <SectionRule />
          <SectionText>
            <p>
              La coproduction est un partenariat entre deux ou plusieurs personnes en vue
              de la création, du financement et de la distribution d'un projet musical.
              Chacune des parties investit dans le projet et en partage les bénéfices.
            </p>
            <p>
              Elle permet principalement de diviser les risques financiers. Les coproducteurs
              collaborent à toutes les étapes, de la création à la diffusion, impliquant
              leurs responsabilités financières, notamment pour l'enregistrement d'une œuvre.
            </p>
          </SectionText>
        </SectionContent>
      </SectionBlock>

      <SectionBlock $reverse>
        <SectionImg $src="/edition.png" $reverse />
        <SectionContent $dark $reverse>
          <SectionNum>02 // Nos services</SectionNum>
          <SectionTitle>L'ÉDITION MUSICALE</SectionTitle>
          <SectionRule />
          <SectionText>
            <p>
              L'édition d'une œuvre musicale c'est à la fois la <strong>protection juridique</strong> de
              cette œuvre — concourir à ce que les auteurs-compositeurs et producteurs soient
              rémunérés pour l'utilisation de leurs œuvres — et la <strong>commercialisation</strong> de
              cette œuvre dans le but de la faire connaître.
            </p>
            <p>
              L'éditeur suit administrativement et juridiquement la gestion et l'exploitation
              des œuvres : dépôt et déclaration, gestion des droits, distribution et exploitation.
            </p>
          </SectionText>
        </SectionContent>
      </SectionBlock>

      <AProposBlock>
        <AProposPhoto />
        <AProposContent>
          <AProposText>
            <p style={{ marginBottom: '14px' }}>
              <strong>CARILLON</strong> a vu le jour en 2023, sous la forme d'une société à l'objet
              multiple et uniquement dédié à la musique.
            </p>
            <p>
              Depuis 2026 et la fermeture du studio de répétitions et d'enregistrement éponyme,
              CARILLON est centré sur le <strong>management d'artistes</strong> et l'accompagnement
              de projets musicaux, l'<strong>édition</strong> et la <strong>coproduction phonographique</strong>.
            </p>
          </AProposText>
          <AProposMeta>
            <MetaItem>
              <MetaIcon>→</MetaIcon>
              <div>
                <MetaLabel>Management</MetaLabel>
                <MetaVal>Accompagnement d'artistes et de projets musicaux</MetaVal>
              </div>
            </MetaItem>
            <MetaItem>
              <MetaIcon>→</MetaIcon>
              <div>
                <MetaLabel>Édition</MetaLabel>
                <MetaVal>Protection juridique et commercialisation des œuvres</MetaVal>
              </div>
            </MetaItem>
            <MetaItem>
              <MetaIcon>→</MetaIcon>
              <div>
                <MetaLabel>Coproduction</MetaLabel>
                <MetaVal>Financement et distribution de projets musicaux</MetaVal>
              </div>
            </MetaItem>
          </AProposMeta>
        </AProposContent>
      </AProposBlock>
    </FanzineWrap>
  )
}
