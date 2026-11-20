import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { colors, fonts } from '../../theme'
import MediaUpload from '../../components/admin/MediaUpload'
import { rosterCountLabel, ROSTER_PAGE_DEFAULTS } from '../../lib/roster'
import { CONTACT_PAGE_DEFAULTS } from '../../lib/contact'

/* ── Design admin — fonctionnel, cohérent avec la charte ── */

const Wrap = styled.div`
  min-height: 100vh;
  background: ${colors.paper};
  font-family: ${fonts.body};
`

const TopBar = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px; height: 64px;
  background: ${colors.ink}; border-bottom: 4px solid ${colors.red};
  position: sticky; top: 0; z-index: 10;
  @media (max-width: 640px) { padding: 0 20px; }
`
const Logo = styled.div`
  font-family: ${fonts.display}; font-size: 24px; letter-spacing: 3px; color: ${colors.paper};
  span { color: ${colors.red}; }
`
const LogoutBtn = styled.button`
  background: none; border: 2px solid rgba(235,229,212,0.3); color: ${colors.paper};
  font-family: ${fonts.heading}; font-weight: 700; font-size: 11px; letter-spacing: 2px;
  text-transform: uppercase; padding: 8px 20px; cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  &:hover { border-color: ${colors.red}; background: rgba(196,30,30,0.2); }
`

const Content = styled.div`
  padding: 40px;
  @media (max-width: 640px) { padding: 24px 20px; }
`

const PageTitle = styled.div`
  font-family: ${fonts.display}; font-size: clamp(36px, 5vw, 60px);
  letter-spacing: 2px; color: ${colors.ink}; line-height: 1; margin-bottom: 8px;
`
const PageSub = styled.div`
  font-family: ${fonts.body}; font-size: 13px; color: ${colors.darkGrey};
  letter-spacing: 1px; margin-bottom: 32px;
`

const AddBtn = styled(Link)`
  display: inline-flex; align-items: center; gap: 10px;
  background: ${colors.red}; color: ${colors.paper};
  font-family: ${fonts.heading}; font-weight: 700; font-size: 12px;
  letter-spacing: 3px; text-transform: uppercase; text-decoration: none;
  padding: 14px 28px; margin-bottom: 32px;
  transition: background 0.15s;
  &:hover { background: #a01818; }
`

const Table = styled.table`
  width: 100%; border-collapse: collapse;
  border: 4px solid ${colors.ink};
`
const Th = styled.th`
  padding: 12px 16px; text-align: left;
  font-family: ${fonts.heading}; font-weight: 700; font-size: 10px;
  letter-spacing: 3px; text-transform: uppercase;
  background: ${colors.ink}; color: ${colors.paper};
  border-right: 2px solid rgba(235,229,212,0.1);
  &:last-child { border-right: none; }
`
const Td = styled.td`
  padding: 14px 16px; border-bottom: 2px solid rgba(10,10,10,0.08);
  border-right: 2px solid rgba(10,10,10,0.06);
  font-size: 14px; color: ${colors.ink};
  &:last-child { border-right: none; }
`
const Tr = styled.tr`
  &:last-child td { border-bottom: none; }
  &:hover td { background: rgba(10,10,10,0.03); }
`
const StatusBadge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  font-family: ${fonts.heading}; font-weight: 700; font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  background: ${({ $active }) => $active ? '#d4edda' : '#f5c6cb'};
  color: ${({ $active }) => $active ? '#155724' : '#721c24'};
`
const EditBtn = styled(Link)`
  display: inline-block; padding: 6px 16px;
  background: ${colors.ink}; color: ${colors.paper};
  font-family: ${fonts.heading}; font-weight: 700; font-size: 10px; letter-spacing: 2px;
  text-transform: uppercase; text-decoration: none;
  transition: background 0.15s;
  &:hover { background: ${colors.red}; }
`
const IconBadge = styled.span`
  display: inline-block; width: 8px; height: 8px; border-radius: 50%;
  background: ${({ $on }) => $on ? colors.red : 'rgba(10,10,10,0.15)'};
  margin-right: 4px; vertical-align: middle;
`
const EmptyRow = styled.tr`
  td { padding: 40px; text-align: center; color: ${colors.darkGrey}; font-style: italic; }
`

/* ── LOGIN ── */

const LoginWrap = styled.div`
  min-height: 100vh; background: ${colors.ink};
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 24px;
`
const LoginBox = styled.div`
  background: ${colors.paper}; width: 100%; max-width: 400px;
  border: 4px solid ${colors.paper};
`
const LoginHeader = styled.div`
  background: ${colors.ink}; padding: 32px;
  border-bottom: 4px solid ${colors.red};
`
const LoginTitle = styled.div`
  font-family: ${fonts.display}; font-size: 48px; letter-spacing: 3px; color: ${colors.paper}; line-height: 1;
`
const LoginSub = styled.div`
  font-family: ${fonts.heading}; font-weight: 700; font-size: 10px; letter-spacing: 4px;
  text-transform: uppercase; color: ${colors.red}; margin-top: 8px;
`
const LoginBody = styled.div`padding: 32px;`
const LoginLabel = styled.label`
  display: block; font-family: ${fonts.heading}; font-weight: 700; font-size: 10px;
  letter-spacing: 3px; text-transform: uppercase; color: ${colors.ink}; margin-bottom: 8px;
`
const LoginInput = styled.input`
  width: 100%; border: 2px solid ${colors.ink}; padding: 12px 14px;
  font-family: ${fonts.body}; font-size: 15px; background: white;
  outline: none; margin-bottom: 20px;
  &:focus { border-color: ${colors.red}; }
`
const LoginBtn = styled.button`
  width: 100%; background: ${colors.red}; color: ${colors.paper};
  border: none; padding: 16px;
  font-family: ${fonts.heading}; font-weight: 700; font-size: 13px;
  letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
  transition: background 0.15s;
  &:hover:not(:disabled) { background: #a01818; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`
const LoginError = styled.div`
  background: #f5c6cb; color: #721c24;
  font-family: ${fonts.body}; font-size: 13px;
  padding: 12px 14px; margin-bottom: 20px;
`

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) { setError(err.message); setLoading(false); return }
    onLogin(data.session)
  }

  return (
    <LoginWrap>
      <LoginBox>
        <LoginHeader>
          <LoginTitle>CARILLON</LoginTitle>
          <LoginSub>▼ Administration</LoginSub>
        </LoginHeader>
        <LoginBody>
          <form onSubmit={handleSubmit}>
            {error && <LoginError>{error}</LoginError>}
            <LoginLabel htmlFor="email">Email</LoginLabel>
            <LoginInput
              id="email" type="email" value={email} required autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <LoginLabel htmlFor="password">Mot de passe</LoginLabel>
            <LoginInput
              id="password" type="password" value={password} required
              onChange={e => setPassword(e.target.value)}
            />
            <LoginBtn type="submit" disabled={loading}>
              {loading ? '// Connexion...' : '→ Connexion'}
            </LoginBtn>
          </form>
        </LoginBody>
      </LoginBox>
    </LoginWrap>
  )
}

const NavTabs = styled.div`display: flex; gap: 0; border-bottom: 4px solid ${colors.ink};`
const NavTab = styled.button`
  font-family: ${fonts.heading}; font-weight: 700; font-size: 11px; letter-spacing: 3px;
  text-transform: uppercase; padding: 14px 24px; border: none; cursor: pointer;
  background: ${({ $active }) => $active ? colors.red : colors.ink};
  color: ${colors.paper}; transition: background 0.15s;
  &:hover { background: ${({ $active }) => $active ? colors.red : '#2a2a2a'}; }
`

/* ── Gestion slides homepage ── */

const SlideList = styled.div`border: 4px solid ${colors.ink}; margin-bottom: 24px;`
const SlideRow = styled.div`
  display: grid; grid-template-columns: 80px 1fr auto;
  align-items: center; gap: 16px; padding: 12px 16px;
  border-bottom: 2px solid rgba(10,10,10,0.08);
  &:last-child { border-bottom: none; }
  background: white;
`
const SlideBg = styled.div`
  width: 80px; height: 56px;
  background: ${({ $url }) => `${colors.ink} url('${$url}') center/cover no-repeat`};
  flex-shrink: 0;
`
const SlideInfo = styled.div`font-family: ${fonts.body}; font-size: 13px; color: ${colors.ink};`

const SlideForm = styled.div`
  background: rgba(10,10,10,0.03); border: 2px dashed rgba(10,10,10,0.15); padding: 20px; margin-top: 8px;
`
const FormGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`
const FLabel = styled.label`
  display: block; font-family: ${fonts.heading}; font-weight: 700; font-size: 10px;
  letter-spacing: 3px; text-transform: uppercase; color: ${colors.ink}; margin-bottom: 6px;
`
const FInput = styled.input`
  width: 100%; border: 2px solid rgba(10,10,10,0.2); padding: 8px 10px;
  font-family: ${fonts.body}; font-size: 14px; background: white; outline: none;
  &:focus { border-color: ${colors.red}; }
`
const FTextarea = styled.textarea`
  width: 100%; border: 2px solid rgba(10,10,10,0.2); padding: 8px 10px;
  font-family: ${fonts.body}; font-size: 14px; background: white; outline: none; resize: vertical;
  &:focus { border-color: ${colors.red}; }
`
const FCheckRow = styled.label`
  display: flex; align-items: center; gap: 8px; cursor: pointer;
  font-family: ${fonts.body}; font-size: 14px; color: ${colors.ink}; margin-top: 8px;
  input { accent-color: ${colors.red}; width: 16px; height: 16px; }
`
const FAddBtn = styled.button`
  margin-top: 12px; background: ${colors.red}; color: ${colors.paper}; border: none; padding: 10px 24px;
  font-family: ${fonts.heading}; font-weight: 700; font-size: 11px; letter-spacing: 3px;
  text-transform: uppercase; cursor: pointer; &:hover { background: #a01818; }
`
const FDelBtn = styled.button`
  background: none; border: 2px solid rgba(10,10,10,0.15); color: #721c24;
  padding: 6px 12px; cursor: pointer; font-size: 13px;
  &:hover { border-color: ${colors.red}; }
`

const EMPTY_SLIDE = {
  bg_url: '', bg_pos: 'center center', label: '★ Nouveau single',
  band: '', title: '', date_text: 'Disponible maintenant',
  btn_text: '→ Écouter', url: '', external: true, sort_order: 0,
}

function SlidesTab() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [draft, setDraft] = useState(EMPTY_SLIDE)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from('homepage_slides').select('*').order('sort_order')
      .then(({ data }) => { setSlides(data || []); setLoading(false) })
  }, [])

  async function addSlide() {
    if (!draft.bg_url || !draft.title || !draft.url) return
    setSaving(true)
    const payload = { ...draft, sort_order: slides.length + 1 }
    const { data } = await supabase.from('homepage_slides').insert(payload).select().single()
    if (data) { setSlides(prev => [...prev, data]); setDraft(EMPTY_SLIDE) }
    setSaving(false)
  }

  async function deleteSlide(id) {
    if (!window.confirm('Supprimer ce slide ?')) return
    await supabase.from('homepage_slides').delete().eq('id', id)
    setSlides(prev => prev.filter(s => s.id !== id))
  }

  async function toggleActive(id, current) {
    await supabase.from('homepage_slides').update({ active: !current }).eq('id', id)
    setSlides(prev => prev.map(s => s.id === id ? { ...s, active: !current } : s))
  }

  async function moveSlide(index, direction) {
    const otherIndex = index + direction
    if (otherIndex < 0 || otherIndex >= slides.length) return
    const reordered = [...slides]
    const [moved] = reordered.splice(index, 1)
    reordered.splice(otherIndex, 0, moved)
    const renumbered = reordered.map((s, i) => ({ ...s, sort_order: i + 1 }))
    setSlides(renumbered)
    await Promise.all(renumbered.map(s => supabase.from('homepage_slides').update({ sort_order: s.sort_order }).eq('id', s.id)))
  }

  if (loading) return <div style={{ padding: 32, fontStyle: 'italic', color: colors.darkGrey }}>Chargement...</div>

  const d = draft
  const set = (k, v) => setDraft(prev => ({ ...prev, [k]: v }))

  return (
    <div>
      <PageTitle>HOMEPAGE</PageTitle>
      <PageSub>Slides du carrousel principal · {slides.length} slide{slides.length !== 1 ? 's' : ''}</PageSub>

      {slides.length > 0 && (
        <SlideList>
          {slides.map((s, index) => (
            <SlideRow key={s.id}>
              <SlideBg $url={s.bg_url} />
              <SlideInfo>
                <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 10, letterSpacing: 3, color: colors.red, marginBottom: 2 }}>{s.label}</div>
                <strong>{s.band}</strong> — {s.title.replace(/\\n/g, ' / ')}
                <div style={{ fontSize: 11, color: colors.darkGrey, marginTop: 2 }}>{s.url}</div>
                {!s.active && <span style={{ fontSize: 10, background: '#f5c6cb', color: '#721c24', padding: '2px 6px', marginTop: 4, display: 'inline-block' }}>Masqué</span>}
              </SlideInfo>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => moveSlide(index, -1)}
                  disabled={index === 0}
                  title="Monter"
                  style={{ background: 'none', border: `2px solid ${colors.ink}`, padding: '6px 10px', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 1, fontSize: 11, fontFamily: fonts.heading, fontWeight: 700 }}
                >↑</button>
                <button
                  onClick={() => moveSlide(index, 1)}
                  disabled={index === slides.length - 1}
                  title="Descendre"
                  style={{ background: 'none', border: `2px solid ${colors.ink}`, padding: '6px 10px', cursor: index === slides.length - 1 ? 'default' : 'pointer', opacity: index === slides.length - 1 ? 0.3 : 1, fontSize: 11, fontFamily: fonts.heading, fontWeight: 700 }}
                >↓</button>
                <button
                  onClick={() => toggleActive(s.id, s.active)}
                  style={{ background: 'none', border: `2px solid ${colors.ink}`, padding: '6px 10px', cursor: 'pointer', fontSize: 11, fontFamily: fonts.heading, fontWeight: 700, letterSpacing: 1 }}
                >{s.active ? 'Masquer' : 'Afficher'}</button>
                <FDelBtn onClick={() => deleteSlide(s.id)}>✕</FDelBtn>
              </div>
            </SlideRow>
          ))}
        </SlideList>
      )}

      <SlideForm>
        <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: colors.darkGrey, marginBottom: 16 }}>+ Ajouter un slide</div>

        <FormGrid>
          <div>
            <FLabel>Groupe / Artiste *</FLabel>
            <FInput placeholder="Indicible" value={d.band} onChange={e => set('band', e.target.value)} />
          </div>
          <div>
            <FLabel>Label (étiquette rouge)</FLabel>
            <FInput placeholder="★ Nouveau single" value={d.label} onChange={e => set('label', e.target.value)} />
          </div>
          <div>
            <FLabel>Titre (une ligne par \n) *</FLabel>
            <FTextarea
              placeholder={'Flowers,\nWine and\nCandles'} rows={3}
              value={d.title} onChange={e => set('title', e.target.value)}
            />
          </div>
          <div>
            <FLabel>Texte date / statut</FLabel>
            <FInput placeholder="Disponible maintenant" value={d.date_text} onChange={e => set('date_text', e.target.value)} />
            <div style={{ marginTop: 8 }}>
              <FLabel>Texte bouton</FLabel>
              <FInput placeholder="→ Voir le clip" value={d.btn_text} onChange={e => set('btn_text', e.target.value)} />
            </div>
          </div>
          <div>
            <FLabel>Image de fond *</FLabel>
            <MediaUpload value={d.bg_url} onChange={v => set('bg_url', v)} folder="homepage" />
            <div style={{ marginTop: 8 }}>
              <FLabel>Position image</FLabel>
              <FInput placeholder="center center" value={d.bg_pos} onChange={e => set('bg_pos', e.target.value)} />
            </div>
          </div>
          <div>
            <FLabel>Lien (URL) *</FLabel>
            <FInput placeholder="https://youtube.com/... ou /artiste/slug" value={d.url} onChange={e => set('url', e.target.value)} />
            <FCheckRow>
              <input type="checkbox" checked={d.external} onChange={e => set('external', e.target.checked)} />
              Lien externe (ouvre un nouvel onglet)
            </FCheckRow>
          </div>
        </FormGrid>

        <FAddBtn onClick={addSlide} disabled={saving}>
          {saving ? '// Ajout...' : '+ Ajouter ce slide'}
        </FAddBtn>
      </SlideForm>
    </div>
  )
}

const ABOUT_DEFAULTS = {
  coprod_img: '/coprod.png',
  coprod_title: 'LA COPRODUCTION',
  coprod_text: '',
  edition_img: '/edition.png',
  edition_title: "L'ÉDITION MUSICALE",
  edition_text: '',
  apropos_photo: '/apropos-2026.jpg',
  apropos_text: '',
  meta1_label: 'Management',
  meta1_value: '',
  meta2_label: 'Édition',
  meta2_value: '',
  meta3_label: 'Coproduction',
  meta3_value: '',
  meta4_label: 'Membres de',
  meta4_value: '',
}

function AboutTab() {
  const [row, setRow] = useState(null)
  const [draft, setDraft] = useState(ABOUT_DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('about_page').select('*').limit(1).maybeSingle()
      .then(({ data }) => {
        if (data) { setRow(data); setDraft({ ...ABOUT_DEFAULTS, ...data }) }
        setLoading(false)
      })
  }, [])

  const set = (k, v) => { setDraft(prev => ({ ...prev, [k]: v })); setSaved(false) }

  async function save() {
    setSaving(true)
    if (row) {
      await supabase.from('about_page').update(draft).eq('id', row.id)
    } else {
      const { data } = await supabase.from('about_page').insert(draft).select().single()
      if (data) setRow(data)
    }
    setSaving(false)
    setSaved(true)
  }

  if (loading) return <div style={{ padding: 32, fontStyle: 'italic', color: colors.darkGrey }}>Chargement...</div>

  const d = draft

  return (
    <div>
      <PageTitle>À PROPOS</PageTitle>
      <PageSub>Contenu de la page /a-propos · les mots entre **double astérisques** s'affichent en gras</PageSub>

      <SlideForm>
        <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: colors.darkGrey, marginBottom: 16 }}>01 // Coproduction</div>
        <FormGrid>
          <div>
            <FLabel>Titre</FLabel>
            <FInput value={d.coprod_title} onChange={e => set('coprod_title', e.target.value)} />
            <div style={{ marginTop: 8 }}>
              <FLabel>Image</FLabel>
              <MediaUpload value={d.coprod_img} onChange={v => set('coprod_img', v)} folder="about" />
            </div>
          </div>
          <div>
            <FLabel>Texte (un paragraphe par ligne vide)</FLabel>
            <FTextarea rows={6} value={d.coprod_text} onChange={e => set('coprod_text', e.target.value)} />
          </div>
        </FormGrid>
      </SlideForm>

      <SlideForm style={{ marginTop: 24 }}>
        <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: colors.darkGrey, marginBottom: 16 }}>02 // Édition musicale</div>
        <FormGrid>
          <div>
            <FLabel>Titre</FLabel>
            <FInput value={d.edition_title} onChange={e => set('edition_title', e.target.value)} />
            <div style={{ marginTop: 8 }}>
              <FLabel>Image</FLabel>
              <MediaUpload value={d.edition_img} onChange={v => set('edition_img', v)} folder="about" />
            </div>
          </div>
          <div>
            <FLabel>Texte (un paragraphe par ligne vide)</FLabel>
            <FTextarea rows={6} value={d.edition_text} onChange={e => set('edition_text', e.target.value)} />
          </div>
        </FormGrid>
      </SlideForm>

      <SlideForm style={{ marginTop: 24 }}>
        <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: colors.darkGrey, marginBottom: 16 }}>03 // Bloc à propos</div>
        <FormGrid>
          <div>
            <FLabel>Photo</FLabel>
            <MediaUpload value={d.apropos_photo} onChange={v => set('apropos_photo', v)} folder="about" />
          </div>
          <div>
            <FLabel>Texte intro (un paragraphe par ligne vide)</FLabel>
            <FTextarea rows={6} value={d.apropos_text} onChange={e => set('apropos_text', e.target.value)} />
          </div>
        </FormGrid>

        <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: colors.darkGrey, margin: '20px 0 12px' }}>Encarts infos</div>
        {[1, 2, 3, 4].map(n => (
          <FormGrid key={n} style={{ marginBottom: 12 }}>
            <div>
              <FLabel>Libellé {n}</FLabel>
              <FInput value={d[`meta${n}_label`]} onChange={e => set(`meta${n}_label`, e.target.value)} />
            </div>
            <div>
              <FLabel>Valeur {n}</FLabel>
              <FInput value={d[`meta${n}_value`]} onChange={e => set(`meta${n}_value`, e.target.value)} />
            </div>
          </FormGrid>
        ))}
      </SlideForm>

      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <FAddBtn onClick={save} disabled={saving}>{saving ? '// Enregistrement...' : 'Enregistrer'}</FAddBtn>
        {saved && <span style={{ fontFamily: fonts.heading, fontSize: 11, letterSpacing: 2, color: '#155724' }}>✓ Enregistré</span>}
      </div>
    </div>
  )
}

function ContactTab() {
  const [row, setRow] = useState(null)
  const [draft, setDraft] = useState(CONTACT_PAGE_DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.from('contact_page').select('*').limit(1).maybeSingle()
      .then(({ data }) => {
        if (data) { setRow(data); setDraft({ ...CONTACT_PAGE_DEFAULTS, ...data }) }
        setLoading(false)
      })
  }, [])

  const set = (k, v) => { setDraft(prev => ({ ...prev, [k]: v })); setSaved(false) }

  async function save() {
    setSaving(true); setError('')
    const payload = {
      hero_photo: draft.hero_photo, hero_focus: draft.hero_focus,
      hero_focus_mobile: draft.hero_focus_mobile, hero_zoom_mobile: draft.hero_zoom_mobile,
    }
    const res = row
      ? await supabase.from('contact_page').update(payload).eq('id', row.id)
      : await supabase.from('contact_page').insert(payload).select().single()
    if (res.error) setError(res.error.message)
    else { if (!row) setRow(res.data); setSaved(true) }
    setSaving(false)
  }

  if (loading) return <div style={{ padding: 32, fontStyle: 'italic', color: colors.darkGrey }}>Chargement...</div>

  const d = draft
  const previewBox = (w, h, focus, zoom) => (
    <div style={{
      width: w, height: h, border: `2px solid ${colors.ink}`, flexShrink: 0,
      background: `${colors.ink} url("${d.hero_photo}") ${focus} / ${zoom ? '200% auto' : 'cover'} no-repeat`,
    }} />
  )

  return (
    <div>
      <PageTitle>CONTACT</PageTitle>
      <PageSub>Bandeau « Écris-nous » en haut de la page /contact</PageSub>

      <SlideForm>
        <FormGrid>
          <div>
            <FLabel>Photo du bandeau</FLabel>
            <MediaUpload value={d.hero_photo} onChange={v => set('hero_photo', v)} folder="contact" />
          </div>
          <div>
            <FLabel>Cadrage ordinateur</FLabel>
            <FInput value={d.hero_focus} placeholder="center 10%" onChange={e => set('hero_focus', e.target.value)} />
            <div style={{ fontSize: 11, color: colors.darkGrey, margin: '4px 0 12px' }}>Ex : center top, center 10%, center 50%, 30% 60%</div>

            <FLabel>Cadrage mobile / tablette</FLabel>
            <FInput value={d.hero_focus_mobile} placeholder="right top" onChange={e => set('hero_focus_mobile', e.target.value)} />
            <FCheckRow style={{ marginTop: 8 }}>
              <input type="checkbox" checked={!!d.hero_zoom_mobile} onChange={e => set('hero_zoom_mobile', e.target.checked)} />
              Zoom x2 sur mobile / tablette
            </FCheckRow>
          </div>
        </FormGrid>

        <div style={{ marginTop: 20 }}>
          <FLabel>Aperçu du cadrage</FLabel>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', marginTop: 6 }}>
            <div>{previewBox(360, 90, d.hero_focus, false)}<div style={{ fontSize: 10, marginTop: 4 }}>Ordinateur</div></div>
            <div>{previewBox(120, 90, d.hero_focus_mobile, d.hero_zoom_mobile)}<div style={{ fontSize: 10, marginTop: 4 }}>Mobile</div></div>
          </div>
        </div>
      </SlideForm>

      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <FAddBtn onClick={save} disabled={saving}>{saving ? '// Enregistrement...' : 'Enregistrer'}</FAddBtn>
        {saved && <span style={{ fontFamily: fonts.heading, fontSize: 11, letterSpacing: 2, color: '#155724' }}>✓ Enregistré</span>}
        {error && <span style={{ fontFamily: fonts.body, fontSize: 12, color: '#721c24' }}>{error}</span>}
      </div>
    </div>
  )
}

function RosterHeaderForm({ artists }) {
  const [row, setRow] = useState(null)
  const [draft, setDraft] = useState(ROSTER_PAGE_DEFAULTS)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.from('roster_page').select('*').limit(1).maybeSingle()
      .then(({ data }) => { if (data) { setRow(data); setDraft({ ...ROSTER_PAGE_DEFAULTS, ...data }) } })
  }, [])

  const set = (k, v) => { setDraft(prev => ({ ...prev, [k]: v })); setSaved(false) }
  const autoCount = rosterCountLabel(artists)

  async function save() {
    setSaving(true); setError('')
    const payload = { count_text: draft.count_text, styles: draft.styles, tagline: draft.tagline }
    const res = row
      ? await supabase.from('roster_page').update(payload).eq('id', row.id)
      : await supabase.from('roster_page').insert(payload).select().single()
    if (res.error) setError(res.error.message)
    else { if (!row) setRow(res.data); setSaved(true) }
    setSaving(false)
  }

  const preview = [draft.count_text?.trim() || autoCount, draft.styles?.trim()].filter(Boolean).join(' · ')

  return (
    <SlideForm style={{ marginBottom: 32 }}>
      <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: colors.darkGrey, marginBottom: 16 }}>En-tête de la page /roster</div>
      <FormGrid>
        <div>
          <FLabel>Nombre d'artistes (laisser vide = automatique)</FLabel>
          <FInput value={draft.count_text} placeholder={autoCount} onChange={e => set('count_text', e.target.value)} />
        </div>
        <div>
          <FLabel>Styles</FLabel>
          <FInput value={draft.styles} placeholder="Metalcore / Death / Hardcore" onChange={e => set('styles', e.target.value)} />
        </div>
      </FormGrid>
      <div style={{ marginTop: 12 }}>
        <FLabel>Phrase d'accroche (laisser vide pour masquer)</FLabel>
        <FInput value={draft.tagline} onChange={e => set('tagline', e.target.value)} />
      </div>
      <div style={{ marginTop: 12, fontFamily: fonts.body, fontSize: 12, color: colors.darkGrey }}>
        Aperçu : <strong style={{ textTransform: 'uppercase', letterSpacing: 1 }}>{preview || '—'}</strong>
      </div>
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
        <FAddBtn onClick={save} disabled={saving}>{saving ? '// Enregistrement...' : 'Enregistrer'}</FAddBtn>
        {saved && <span style={{ fontFamily: fonts.heading, fontSize: 11, letterSpacing: 2, color: '#155724' }}>✓ Enregistré</span>}
        {error && <span style={{ fontFamily: fonts.body, fontSize: 12, color: '#721c24' }}>{error}</span>}
      </div>
    </SlideForm>
  )
}

export default function AdminPage() {
  const [session, setSession] = useState(undefined)
  const [tab, setTab] = useState('roster')
  const [artists, setArtists] = useState([])
  const [loadingArtists, setLoadingArtists] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) return
    setLoadingArtists(true)
    supabase
      .from('artists')
      .select('*')
      .order('sort_order')
      .then(({ data }) => { setArtists(data || []); setLoadingArtists(false) })
  }, [session])

  async function handleLogout() {
    await supabase.auth.signOut()
    setSession(null)
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Supprimer "${name}" ? Cette action est irréversible.`)) return
    await supabase.from('artists').delete().eq('id', id)
    setArtists(prev => prev.filter(a => a.id !== id))
  }

  if (session === undefined) return null

  if (!session) return <LoginForm onLogin={setSession} />

  return (
    <Wrap>
      <TopBar>
        <Logo>CARILLON <span>ADMIN</span></Logo>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: fonts.body, fontSize: 12, color: 'rgba(235,229,212,0.5)' }}>
            {session.user.email}
          </span>
          <LogoutBtn onClick={handleLogout}>Déconnexion</LogoutBtn>
        </div>
      </TopBar>

      <NavTabs>
        <NavTab $active={tab === 'roster'} onClick={() => setTab('roster')}>Roster</NavTab>
        <NavTab $active={tab === 'homepage'} onClick={() => setTab('homepage')}>Homepage</NavTab>
        <NavTab $active={tab === 'about'} onClick={() => setTab('about')}>À propos</NavTab>
        <NavTab $active={tab === 'contact'} onClick={() => setTab('contact')}>Contact</NavTab>
      </NavTabs>

      <Content>
        {tab === 'homepage' && <SlidesTab />}
        {tab === 'about' && <AboutTab />}
        {tab === 'contact' && <ContactTab />}

        {tab === 'roster' && <>
        <PageTitle>ROSTER</PageTitle>
        <PageSub>Gérez les artistes du label · {artists.length} artiste{artists.length !== 1 ? 's' : ''}</PageSub>

        <RosterHeaderForm artists={artists} />

        <AddBtn to="/admin/artiste/nouveau">+ Ajouter un artiste</AddBtn>

        <Table>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>Artiste</Th>
              <Th>Genre</Th>
              <Th>Statut</Th>
              <Th>Page</Th>
              <Th>EPK</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loadingArtists && (
              <tr><Td colSpan={7} style={{ textAlign: 'center', padding: 32, fontStyle: 'italic' }}>Chargement...</Td></tr>
            )}
            {!loadingArtists && artists.length === 0 && (
              <EmptyRow><Td colSpan={7}>Aucun artiste. Ajoutez-en un avec le bouton ci-dessus.</Td></EmptyRow>
            )}
            {artists.map(a => (
              <Tr key={a.id}>
                <Td style={{ fontFamily: fonts.heading, fontWeight: 700, color: colors.red }}>{a.roster_num}</Td>
                <Td>
                  <strong style={{ fontFamily: fonts.display, fontSize: 18, letterSpacing: 1 }}>{a.name}</strong>
                  <div style={{ fontSize: 11, color: colors.darkGrey, marginTop: 2 }}>/artiste/{a.slug}</div>
                </Td>
                <Td>{a.tag}</Td>
                <Td>
                  <StatusBadge $active={a.status === 'active'}>
                    {a.status === 'active' ? 'Actif' : 'Bientôt'}
                  </StatusBadge>
                </Td>
                <Td>
                  <IconBadge $on={a.has_artist_page} />
                  {a.has_artist_page ? 'Oui' : 'Non'}
                </Td>
                <Td>
                  <IconBadge $on={a.has_epk} />
                  {a.has_epk ? 'Oui' : 'Non'}
                </Td>
                <Td>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <EditBtn to={`/admin/artiste/${a.id}`}>Modifier</EditBtn>
                    {a.has_artist_page && (
                      <EditBtn
                        as="a" href={`/artiste/${a.slug}`} target="_blank"
                        style={{ background: 'transparent', color: colors.ink, border: `2px solid ${colors.ink}` }}
                      >↗ Page</EditBtn>
                    )}
                    {a.has_epk && (
                      <EditBtn
                        as="a" href={`/epk/${a.slug}`} target="_blank"
                        style={{ background: 'transparent', color: colors.ink, border: `2px solid ${colors.ink}` }}
                      >↗ EPK</EditBtn>
                    )}
                    <button
                      onClick={() => handleDelete(a.id, a.name)}
                      style={{
                        background: 'none', border: `2px solid rgba(10,10,10,0.2)`,
                        color: '#721c24', cursor: 'pointer', padding: '6px 12px',
                        fontFamily: fonts.heading, fontWeight: 700, fontSize: 10,
                        letterSpacing: 2, textTransform: 'uppercase',
                      }}
                    >✕</button>
                  </div>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
        </>}
      </Content>
    </Wrap>
  )
}
