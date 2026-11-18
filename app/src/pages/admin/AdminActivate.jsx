import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { colors, fonts } from '../../theme'

const Wrap = styled.div`
  min-height: 100vh; background: ${colors.ink};
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 24px;
`
const Box = styled.div`
  background: ${colors.paper}; width: 100%; max-width: 400px;
  border: 4px solid ${colors.paper};
`
const Header = styled.div`
  background: ${colors.ink}; padding: 32px;
  border-bottom: 4px solid ${colors.red};
`
const Title = styled.div`
  font-family: ${fonts.display}; font-size: 40px; letter-spacing: 3px; color: ${colors.paper}; line-height: 1;
`
const Sub = styled.div`
  font-family: ${fonts.heading}; font-weight: 700; font-size: 10px; letter-spacing: 4px;
  text-transform: uppercase; color: ${colors.red}; margin-top: 8px;
`
const Body = styled.div`padding: 32px;`
const Label = styled.label`
  display: block; font-family: ${fonts.heading}; font-weight: 700; font-size: 10px;
  letter-spacing: 3px; text-transform: uppercase; color: ${colors.ink}; margin-bottom: 8px;
`
const Input = styled.input`
  width: 100%; border: 2px solid ${colors.ink}; padding: 12px 14px;
  font-family: ${fonts.body}; font-size: 15px; background: white;
  outline: none; margin-bottom: 20px;
  &:focus { border-color: ${colors.red}; }
`
const Btn = styled.button`
  width: 100%; background: ${colors.red}; color: ${colors.paper};
  border: none; padding: 16px;
  font-family: ${fonts.heading}; font-weight: 700; font-size: 13px;
  letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
  transition: background 0.15s;
  &:hover:not(:disabled) { background: #a01818; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`
const Msg = styled.div`
  background: ${({ $error }) => $error ? '#f5c6cb' : '#d4edda'};
  color: ${({ $error }) => $error ? '#721c24' : '#155724'};
  font-family: ${fonts.body}; font-size: 13px;
  padding: 12px 14px; margin-bottom: 20px;
`
const Info = styled.div`
  font-family: ${fonts.body}; font-size: 13px; color: ${colors.darkGrey}; line-height: 1.5;
`

export default function AdminActivate() {
  const [status, setStatus] = useState('checking') // checking | ready | invalid
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) { setEmail(session.user.email); setStatus('ready') }
      else setStatus('invalid')
    })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password.length < 6) { setError('Le mot de passe doit faire au moins 6 caractères.'); return }
    if (password !== confirm) { setError('Les deux mots de passe ne correspondent pas.'); return }
    setSaving(true)
    const { error: err } = await supabase.auth.updateUser({ password })
    if (err) { setError(err.message); setSaving(false); return }
    navigate('/admin')
  }

  return (
    <Wrap>
      <Box>
        <Header>
          <Title>CARILLON</Title>
          <Sub>▼ Activation du compte</Sub>
        </Header>
        <Body>
          {status === 'checking' && <Info>Vérification du lien...</Info>}

          {status === 'invalid' && (
            <>
              <Msg $error>Ce lien d'activation est invalide ou a expiré.</Msg>
              <Info>Demandez un nouveau lien d'invitation, puis ouvrez-le dans ce navigateur.</Info>
            </>
          )}

          {status === 'ready' && (
            <form onSubmit={handleSubmit}>
              <Info style={{ marginBottom: 20 }}>
                Bienvenue <strong>{email}</strong> — choisissez votre mot de passe pour accéder à l'administration.
              </Info>
              {error && <Msg $error>{error}</Msg>}
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password" type="password" value={password} required autoFocus
                onChange={e => setPassword(e.target.value)}
              />
              <Label htmlFor="confirm">Confirmer le mot de passe</Label>
              <Input
                id="confirm" type="password" value={confirm} required
                onChange={e => setConfirm(e.target.value)}
              />
              <Btn type="submit" disabled={saving}>
                {saving ? '// Enregistrement...' : '→ Activer mon compte'}
              </Btn>
            </form>
          )}
        </Body>
      </Box>
    </Wrap>
  )
}
