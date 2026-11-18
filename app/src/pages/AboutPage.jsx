import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FanzineWrap } from '../components/FanzineWrap'
import SEO from '../components/SEO'
import { colors, fonts } from '../theme'
import { supabase } from '../lib/supabase'

const DEFAULTS = {
  coprod_img: '/coprod.png',
  coprod_title: 'LA COPRODUCTION',
  coprod_text: `La coproduction est un partenariat entre deux ou plusieurs personnes en vue de la création, du financement et de la distribution d'un projet musical. Chacune des parties investit dans le projet et en partage les bénéfices.

Elle permet principalement de diviser les risques financiers. Les coproducteurs collaborent à toutes les étapes, de la création à la diffusion, impliquant leurs responsabilités financières, notamment pour l'enregistrement d'une œuvre.`,
  edition_img: '/edition.png',
  edition_title: "L'ÉDITION MUSICALE",
  edition_text: `L'édition d'une œuvre musicale c'est à la fois la **protection juridique** de cette œuvre — concourir à ce que les auteurs-compositeurs et producteurs soient rémunérés pour l'utilisation de leurs œuvres — et la **commercialisation** de cette œuvre dans le but de la faire connaître.

L'éditeur suit administrativement et juridiquement la gestion et l'exploitation des œuvres : dépôt et déclaration, gestion des droits, distribution et exploitation.`,
  apropos_photo: '/apropos-2026.jpg',
  apropos_text: `**CARILLON** a vu le jour en 2023, sous la forme d'une société à l'objet multiple et uniquement dédié à la musique.

Depuis 2026 et la fermeture du studio de répétitions et d'enregistrement éponyme, CARILLON est centré sur le **management d'artistes** et l'accompagnement de projets musicaux, l'**édition** et la **coproduction phonographique**.`,
  meta1_label: 'Management',
  meta1_value: "Accompagnement d'artistes et de projets musicaux",
  meta2_label: 'Édition',
  meta2_value: 'Protection juridique et commercialisation des œuvres',
  meta3_label: 'Coproduction',
  meta3_value: 'Financement et distribution de projets musicaux',
  meta4_label: 'Membres de',
  meta4_value: "Haute Fidélité — Fédération des musiques métalliques — Union des managers d'artistes (UMAN)",
}

function formatParagraphs(text) {
  return (text || '').split('\n\n').map((para, i) => (
    <p key={i}>
      {para.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
        chunk.startsWith('**') && chunk.endsWith('**')
          ? <strong key={j}>{chunk.slice(2, -2)}</strong>
          : chunk
      )}
    </p>
  ))
}

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
  background: ${colors.ink} url('${({ $src }) => $src}') center/cover no-repeat;
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
  const [content, setContent] = useState(DEFAULTS)

  useEffect(() => {
    supabase.from('about_page').select('*').limit(1).maybeSingle()
      .then(({ data }) => { if (data) setContent({ ...DEFAULTS, ...data }) })
  }, [])

  const c = content

  return (
    <FanzineWrap>
      <SEO title="À propos" description="Carillon, fondé en 2023. Label indépendant centré sur le management d'artistes, l'édition musicale et la coproduction phonographique." path="/a-propos" />
      <SectionBlock>
        <SectionImg $src={c.coprod_img} />
        <SectionContent>
          <SectionNum>01 // Nos services</SectionNum>
          <SectionTitle>{c.coprod_title}</SectionTitle>
          <SectionRule />
          <SectionText>{formatParagraphs(c.coprod_text)}</SectionText>
        </SectionContent>
      </SectionBlock>

      <SectionBlock $reverse>
        <SectionImg $src={c.edition_img} $reverse />
        <SectionContent $dark $reverse>
          <SectionNum>02 // Nos services</SectionNum>
          <SectionTitle>{c.edition_title}</SectionTitle>
          <SectionRule />
          <SectionText>{formatParagraphs(c.edition_text)}</SectionText>
        </SectionContent>
      </SectionBlock>

      <AProposBlock>
        <AProposPhoto $src={c.apropos_photo} />
        <AProposContent>
          <AProposText>{formatParagraphs(c.apropos_text)}</AProposText>
          <AProposMeta>
            <MetaItem>
              <MetaIcon>→</MetaIcon>
              <div>
                <MetaLabel>{c.meta1_label}</MetaLabel>
                <MetaVal>{c.meta1_value}</MetaVal>
              </div>
            </MetaItem>
            <MetaItem>
              <MetaIcon>→</MetaIcon>
              <div>
                <MetaLabel>{c.meta2_label}</MetaLabel>
                <MetaVal>{c.meta2_value}</MetaVal>
              </div>
            </MetaItem>
            <MetaItem>
              <MetaIcon>→</MetaIcon>
              <div>
                <MetaLabel>{c.meta3_label}</MetaLabel>
                <MetaVal>{c.meta3_value}</MetaVal>
              </div>
            </MetaItem>
            <MetaItem>
              <MetaIcon>→</MetaIcon>
              <div>
                <MetaLabel>{c.meta4_label}</MetaLabel>
                <MetaVal>{c.meta4_value}</MetaVal>
              </div>
            </MetaItem>
          </AProposMeta>
        </AProposContent>
      </AProposBlock>
    </FanzineWrap>
  )
}
