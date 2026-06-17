import { useState } from 'react'
import styled from 'styled-components'
import { FanzineWrap } from '../components/FanzineWrap'
import SEO from '../components/SEO'
import { colors, fonts } from '../theme'

const Hero = styled.div`
  background: ${colors.ink} url('/apropos.png') center 10%/cover no-repeat;
  position: relative;
  padding: 56px 40px 48px;
  border-bottom: 4px solid ${colors.ink};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 55%, rgba(10,10,10,0.2) 100%);
  }

  @media (max-width: 640px) {
    padding: 36px 20px 32px;
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
  margin-bottom: 28px;
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
  color: rgba(235,229,212,0.6);
`

const HeroAccroche = styled.div`
  font-family: ${fonts.body};
  font-size: 15px;
  line-height: 1.5;
  color: ${colors.paper};
  margin-top: 20px;
  padding-left: 16px;
  border-left: 3px solid ${colors.red};
  white-space: nowrap;

  @media (max-width: 640px) {
    white-space: normal;
    font-size: 14px;
  }
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

const FormSection = styled.div`
  padding: 64px 40px;
  background: ${colors.paper};
  border-bottom: 4px solid ${colors.ink};

  @media (max-width: 640px) {
    padding: 40px 20px;
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid rgba(10,10,10,0.15);
  border-right: ${({ $last }) => $last ? '2px solid rgba(10,10,10,0.15)' : 'none'};
  margin-bottom: -2px;

  @media (max-width: 640px) {
    border-right: 2px solid rgba(10,10,10,0.15);
  }
`

const FieldWrapFull = styled(FieldWrap)`
  grid-column: 1 / -1;
  border-right: 2px solid rgba(10,10,10,0.15);
`

const FieldLabel = styled.label`
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${colors.red};
  padding: 12px 20px 0;
`

const FieldInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  font-family: ${fonts.body};
  font-size: 15px;
  color: ${colors.ink};
  padding: 8px 20px 16px;

  &::placeholder { color: rgba(10,10,10,0.3); }
`

const FieldSelect = styled.select`
  background: transparent;
  border: none;
  outline: none;
  font-family: ${fonts.body};
  font-size: 15px;
  color: ${colors.ink};
  padding: 8px 20px 16px;
  cursor: pointer;
  appearance: none;

  option { background: ${colors.paper}; color: ${colors.ink}; }
`

const FieldTextarea = styled.textarea`
  background: transparent;
  border: none;
  outline: none;
  font-family: ${fonts.body};
  font-size: 15px;
  color: ${colors.ink};
  padding: 8px 20px 16px;
  resize: vertical;
  min-height: 160px;

  &::placeholder { color: rgba(10,10,10,0.3); }
`

const SubmitBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: ${colors.ink};
  color: ${colors.paper};
  border: none;
  padding: 20px 28px;
  font-family: ${fonts.display};
  font-size: clamp(18px, 2.5vw, 26px);
  letter-spacing: 2px;
  cursor: pointer;
  margin-top: 24px;
  transition: background 0.15s;

  &:hover:not(:disabled) { background: ${colors.red}; color: ${colors.paper}; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }

  &::after {
    content: '→';
    font-size: 28px;
  }
`

const FormMessage = styled.div`
  margin-top: 20px;
  font-family: ${fonts.body};
  font-size: 14px;
  color: ${({ $error }) => $error ? colors.red : colors.ink};
  letter-spacing: 1px;
`

const FORMSPREE_ID = 'mdavvjkk'

export default function ContactPage() {
  const [status, setStatus] = useState('idle')
  const [fields, setFields] = useState({ nom: '', email: '', objet: '', message: '' })

  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <FanzineWrap>
      <SEO title="Contact" description="Contactez Carillon pour vos demandes presse, management, booking ou coproduction. Email : contact@studiocarillon.fr" path="/contact" />
      <Hero>
        <HeroInner>
          <HeroTitle>ÉCRIS-NOUS</HeroTitle>
          <HeroText>
            Une question sur la coproduction, le management<br />
            ou l'édition ? On répond à tout.
          </HeroText>
          <HeroAccroche>
            Tu veux présenter ton projet en vue d'une collaboration ? On est à l'écoute.
          </HeroAccroche>
        </HeroInner>
      </Hero>

      <FormSection>
        <BlockLabel>01 // Formulaire</BlockLabel>
        <BlockTitle>TON PROJET</BlockTitle>
        <Rule />
        {status === 'sent' ? (
          <FormMessage>// Message envoyé — on revient vers toi rapidement.</FormMessage>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormGrid>
              <FieldWrap>
                <FieldLabel htmlFor="nom">Nom</FieldLabel>
                <FieldInput id="nom" name="nom" placeholder="Ton nom" value={fields.nom} onChange={set('nom')} required />
              </FieldWrap>
              <FieldWrap $last>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <FieldInput id="email" name="email" type="email" placeholder="ton@email.com" value={fields.email} onChange={set('email')} required />
              </FieldWrap>
              <FieldWrapFull>
                <FieldLabel htmlFor="objet">Objet</FieldLabel>
                <FieldSelect id="objet" name="objet" value={fields.objet} onChange={set('objet')} required>
                  <option value="" disabled>Choisir un objet</option>
                  <option value="Collaboration / Projet artistique">Collaboration / Projet artistique</option>
                  <option value="Management">Management</option>
                  <option value="Coproduction">Coproduction</option>
                  <option value="Édition musicale">Édition musicale</option>
                  <option value="Presse">Presse</option>
                  <option value="Autre">Autre</option>
                </FieldSelect>
              </FieldWrapFull>
              <FieldWrapFull>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <FieldTextarea id="message" name="message" placeholder="Présente ton projet, ta demande..." value={fields.message} onChange={set('message')} required />
              </FieldWrapFull>
            </FormGrid>
            {status === 'error' && <FormMessage $error>// Une erreur est survenue. Réessaie ou écris-nous directement.</FormMessage>}
            <SubmitBtn type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'ENVOI...' : 'ENVOYER'}
            </SubmitBtn>
          </form>
        )}
      </FormSection>

      <Grid>
        <EmailBlock>
          <BlockLabel>02 // Email</BlockLabel>
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
            <BlockLabel>03 // Réseaux</BlockLabel>
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
