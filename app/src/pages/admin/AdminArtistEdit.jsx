import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { colors, fonts } from '../../theme'
import MediaUpload from '../../components/admin/MediaUpload'

/* ── Styled components admin ── */

const Wrap = styled.div`min-height: 100vh; background: ${colors.paper};`
const TopBar = styled.div`
  display: flex; align-items: center; gap: 16px; padding: 0 40px; height: 64px;
  background: ${colors.ink}; border-bottom: 4px solid ${colors.red}; position: sticky; top: 0; z-index: 10;
  @media (max-width: 640px) { padding: 0 20px; }
`
const BackBtn = styled(Link)`
  font-family: ${fonts.heading}; font-weight: 700; font-size: 11px; letter-spacing: 2px;
  text-transform: uppercase; color: ${colors.paper}; text-decoration: none;
  border: 2px solid rgba(235,229,212,0.3); padding: 8px 16px;
  transition: border-color 0.15s; &:hover { border-color: ${colors.red}; }
`
const PageHeading = styled.div`font-family: ${fonts.display}; font-size: 28px; letter-spacing: 2px; color: ${colors.paper};`

const Content = styled.div`padding: 40px; @media (max-width: 640px) { padding: 24px 20px; }`

const Tabs = styled.div`display: flex; border-bottom: 4px solid ${colors.ink}; margin-bottom: 40px;`
const Tab = styled.button`
  font-family: ${fonts.heading}; font-weight: 700; font-size: 11px; letter-spacing: 3px;
  text-transform: uppercase; padding: 14px 24px; border: none; cursor: pointer;
  background: ${({ $active }) => $active ? colors.ink : 'transparent'};
  color: ${({ $active }) => $active ? colors.paper : colors.ink};
  border-right: 2px solid ${colors.ink}; transition: background 0.15s, color 0.15s;
  &:hover { background: ${({ $active }) => $active ? colors.ink : 'rgba(10,10,10,0.06)'}; }
`

const Section = styled.div`margin-bottom: 40px;`
const SectionTitle = styled.div`
  font-family: ${fonts.heading}; font-weight: 700; font-size: 11px; letter-spacing: 4px;
  text-transform: uppercase; color: ${colors.red}; margin-bottom: 20px;
  padding-bottom: 8px; border-bottom: 2px solid rgba(10,10,10,0.1);
`
const Row = styled.div`
  display: grid; grid-template-columns: ${({ $cols }) => $cols || '1fr 1fr'}; gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`
const Field = styled.div`margin-bottom: 20px;`
const Label = styled.label`
  display: block; font-family: ${fonts.heading}; font-weight: 700; font-size: 10px;
  letter-spacing: 3px; text-transform: uppercase; color: ${colors.ink}; margin-bottom: 8px;
`
const Hint = styled.div`font-family: ${fonts.body}; font-size: 11px; color: ${colors.darkGrey}; margin-top: 4px;`
const Input = styled.input`
  width: 100%; border: 2px solid rgba(10,10,10,0.3); padding: 10px 12px;
  font-family: ${fonts.body}; font-size: 15px; background: white; outline: none;
  transition: border-color 0.15s; &:focus { border-color: ${colors.red}; }
`
const Textarea = styled.textarea`
  width: 100%; border: 2px solid rgba(10,10,10,0.3); padding: 10px 12px;
  font-family: ${fonts.body}; font-size: 14px; background: white; outline: none; resize: vertical;
  min-height: 120px; transition: border-color 0.15s; &:focus { border-color: ${colors.red}; }
`
const Select = styled.select`
  width: 100%; border: 2px solid rgba(10,10,10,0.3); padding: 10px 12px;
  font-family: ${fonts.body}; font-size: 15px; background: white; outline: none;
  transition: border-color 0.15s; &:focus { border-color: ${colors.red}; }
`
const CheckRow = styled.label`
  display: flex; align-items: center; gap: 10px; cursor: pointer;
  font-family: ${fonts.body}; font-size: 14px; color: ${colors.ink};
  input { width: 18px; height: 18px; accent-color: ${colors.red}; cursor: pointer; }
`

const SaveBtn = styled.button`
  background: ${colors.red}; color: ${colors.paper}; border: none; padding: 14px 32px;
  font-family: ${fonts.heading}; font-weight: 700; font-size: 12px; letter-spacing: 3px;
  text-transform: uppercase; cursor: pointer; transition: background 0.15s;
  &:hover:not(:disabled) { background: #a01818; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`
const SaveFeedback = styled.span`
  font-family: ${fonts.heading}; font-size: 11px; letter-spacing: 2px;
  color: ${({ $error }) => $error ? '#721c24' : '#155724'}; margin-left: 12px;
`

/* ── Liste sous-items (dates, clips, membres, etc.) ── */

const SubList = styled.div`border: 2px solid rgba(10,10,10,0.1); margin-bottom: 12px;`
const SubRow = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 10px 14px; border-bottom: 1px solid rgba(10,10,10,0.06);
  &:last-child { border-bottom: none; }
  font-family: ${fonts.body}; font-size: 13px; color: ${colors.ink};
`
const SubInfo = styled.div`flex: 1;`
const DeleteBtn = styled.button`
  background: none; border: none; cursor: pointer; color: #721c24;
  font-size: 16px; padding: 4px 8px; flex-shrink: 0;
  &:hover { color: ${colors.red}; }
`
const AddForm = styled.div`
  background: rgba(10,10,10,0.03); border: 2px dashed rgba(10,10,10,0.15); padding: 16px;
`
const AddFormTitle = styled.div`
  font-family: ${fonts.heading}; font-weight: 700; font-size: 10px; letter-spacing: 3px;
  text-transform: uppercase; color: ${colors.darkGrey}; margin-bottom: 12px;
`
const AddBtn = styled.button`
  background: ${colors.ink}; color: ${colors.paper}; border: none; padding: 10px 20px;
  font-family: ${fonts.heading}; font-weight: 700; font-size: 11px; letter-spacing: 2px;
  text-transform: uppercase; cursor: pointer; transition: background 0.15s;
  &:hover { background: ${colors.red}; }
`

/* ── Gestion tracks (discographie) ── */

function TrackEditor({ tracks, onChange }) {
  const [draft, setDraft] = useState({ name: '', duration: '', feat: '' })
  return (
    <div>
      {tracks.length > 0 && (
        <SubList>
          {tracks.map((t, i) => (
            <SubRow key={i}>
              <SubInfo>
                <strong>{i + 1}. {t.name}</strong>
                {t.feat && <span style={{ color: colors.darkGrey }}> — {t.feat}</span>}
                <span style={{ color: colors.red, marginLeft: 8, fontFamily: fonts.heading, fontSize: 11 }}>{t.duration}</span>
              </SubInfo>
              <DeleteBtn onClick={() => onChange(tracks.filter((_, j) => j !== i))}>✕</DeleteBtn>
            </SubRow>
          ))}
        </SubList>
      )}
      <AddForm>
        <AddFormTitle>+ Ajouter un titre</AddFormTitle>
        <Row $cols="1fr 1fr 1fr">
          <Input placeholder="Titre" value={draft.name} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} />
          <Input placeholder="Durée (3:42)" value={draft.duration} onChange={e => setDraft(d => ({ ...d, duration: e.target.value }))} />
          <Input placeholder="feat. (optionnel)" value={draft.feat} onChange={e => setDraft(d => ({ ...d, feat: e.target.value }))} />
        </Row>
        <AddBtn onClick={() => {
          if (!draft.name) return
          onChange([...tracks, { name: draft.name, duration: draft.duration, feat: draft.feat || undefined }])
          setDraft({ name: '', duration: '', feat: '' })
        }}>Ajouter</AddBtn>
      </AddForm>
    </div>
  )
}

/* ── Formulaire release discographie ── */

function ReleasesEditor({ artistId }) {
  const [releases, setReleases] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [draft, setDraft] = useState({ name: '', meta: '', cover_url: '', tilt: '1', tracks: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!artistId) return
    supabase.from('artist_releases').select('*').eq('artist_id', artistId).order('sort_order')
      .then(({ data }) => { setReleases(data || []); setLoading(false) })
  }, [artistId])

  async function addRelease() {
    if (!draft.name) return
    const { data } = await supabase.from('artist_releases').insert({
      artist_id: artistId, name: draft.name, meta: draft.meta,
      cover_url: draft.cover_url, tilt: draft.tilt,
      sort_order: releases.length + 1, tracks: draft.tracks,
    }).select().single()
    if (data) { setReleases(prev => [...prev, data]); setDraft({ name: '', meta: '', cover_url: '', tilt: '1', tracks: [] }) }
  }

  async function deleteRelease(id) {
    await supabase.from('artist_releases').delete().eq('id', id)
    setReleases(prev => prev.filter(r => r.id !== id))
    if (expanded === id) setExpanded(null)
  }

  async function updateReleaseTracks(id, tracks) {
    await supabase.from('artist_releases').update({ tracks }).eq('id', id)
    setReleases(prev => prev.map(r => r.id === id ? { ...r, tracks } : r))
  }

  function editRelease(id, patch) {
    setReleases(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r))
  }

  async function saveRelease(r) {
    await supabase.from('artist_releases').update({
      name: r.name, meta: r.meta, cover_url: r.cover_url, tilt: r.tilt,
    }).eq('id', r.id)
  }

  async function moveRelease(index, direction) {
    const otherIndex = index + direction
    if (otherIndex < 0 || otherIndex >= releases.length) return
    const reordered = [...releases]
    const [moved] = reordered.splice(index, 1)
    reordered.splice(otherIndex, 0, moved)
    const renumbered = reordered.map((r, i) => ({ ...r, sort_order: i + 1 }))
    setReleases(renumbered)
    await Promise.all(renumbered.map(r => supabase.from('artist_releases').update({ sort_order: r.sort_order }).eq('id', r.id)))
  }

  if (loading) return <div style={{ color: colors.darkGrey, fontStyle: 'italic' }}>Chargement...</div>

  return (
    <div>
      {releases.length > 0 && (
        <SubList>
          {releases.map((r, index) => (
            <div key={r.id}>
              <SubRow>
                <SubInfo>
                  <strong>{r.name}</strong>
                  <span style={{ color: colors.darkGrey, marginLeft: 8, fontSize: 12 }}>{r.meta}</span>
                </SubInfo>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => moveRelease(index, -1)}
                    disabled={index === 0}
                    title="Monter"
                    style={{ background: 'none', border: `1px solid ${colors.ink}`, cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 1, padding: '4px 10px', fontSize: 11, fontFamily: fonts.heading }}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveRelease(index, 1)}
                    disabled={index === releases.length - 1}
                    title="Descendre"
                    style={{ background: 'none', border: `1px solid ${colors.ink}`, cursor: index === releases.length - 1 ? 'default' : 'pointer', opacity: index === releases.length - 1 ? 0.3 : 1, padding: '4px 10px', fontSize: 11, fontFamily: fonts.heading }}
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                    style={{ background: 'none', border: `1px solid ${colors.ink}`, cursor: 'pointer', padding: '4px 10px', fontSize: 11, fontFamily: fonts.heading }}
                  >
                    {expanded === r.id ? '▲ Masquer' : '▼ Tracklist'}
                  </button>
                  <DeleteBtn onClick={() => deleteRelease(r.id)}>✕</DeleteBtn>
                </div>
              </SubRow>
              {expanded === r.id && (
                <div style={{ padding: '16px', background: 'rgba(10,10,10,0.02)', borderTop: '1px solid rgba(10,10,10,0.06)' }}>
                  <AddFormTitle>Modifier la sortie</AddFormTitle>
                  <Row $cols="1fr 1fr">
                    <Field><Label>Titre</Label><Input value={r.name} onChange={e => editRelease(r.id, { name: e.target.value })} /></Field>
                    <Field><Label>Meta</Label><Input value={r.meta} onChange={e => editRelease(r.id, { meta: e.target.value })} /></Field>
                  </Row>
                  <Field>
                    <Label>Pochette</Label>
                    <MediaUpload value={r.cover_url} onChange={v => editRelease(r.id, { cover_url: v })} folder="releases" />
                  </Field>
                  <Field>
                    <Label>Inclinaison (CSS)</Label>
                    <Select value={r.tilt} onChange={e => editRelease(r.id, { tilt: e.target.value })}>
                      <option value="1">Gauche (−1°)</option>
                      <option value="2">Droite (+0.8°)</option>
                    </Select>
                  </Field>
                  <AddBtn onClick={() => saveRelease(r)}>Enregistrer</AddBtn>

                  <div style={{ marginTop: 24 }}>
                    <AddFormTitle>Tracklist</AddFormTitle>
                    <TrackEditor tracks={r.tracks || []} onChange={t => updateReleaseTracks(r.id, t)} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </SubList>
      )}
      <AddForm>
        <AddFormTitle>+ Ajouter une sortie</AddFormTitle>
        <Row $cols="1fr 1fr">
          <Field><Label>Titre</Label><Input placeholder="VERTIGO" value={draft.name} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} /></Field>
          <Field><Label>Meta</Label><Input placeholder="2025 · EP · 22:40" value={draft.meta} onChange={e => setDraft(d => ({ ...d, meta: e.target.value }))} /></Field>
        </Row>
        <Field>
          <Label>Pochette</Label>
          <MediaUpload value={draft.cover_url} onChange={v => setDraft(d => ({ ...d, cover_url: v }))} folder="releases" />
        </Field>
        <Field>
          <Label>Inclinaison (CSS)</Label>
          <Select value={draft.tilt} onChange={e => setDraft(d => ({ ...d, tilt: e.target.value }))}>
            <option value="1">Gauche (−1°)</option>
            <option value="2">Droite (+0.8°)</option>
          </Select>
        </Field>
        <AddBtn onClick={addRelease} style={{ marginTop: 8 }}>Ajouter la sortie</AddBtn>
      </AddForm>
    </div>
  )
}

/* ── Éditeur générique de liste (membres, dates, clips, downloads, photos) ── */

function ListEditor({ artistId, table, fields, renderRow }) {
  const [items, setItems] = useState([])
  const [draft, setDraft] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!artistId) return
    supabase.from(table).select('*').eq('artist_id', artistId).order('sort_order')
      .then(({ data }) => { setItems(data || []); setLoading(false) })
  }, [artistId, table])

  async function addItem() {
    const required = fields.filter(f => f.required)
    if (required.some(f => !draft[f.key])) return
    const payload = { artist_id: artistId, sort_order: items.length + 1 }
    fields.forEach(f => { if (draft[f.key] !== undefined) payload[f.key] = draft[f.key] })
    const { data } = await supabase.from(table).insert(payload).select().single()
    if (data) { setItems(prev => [...prev, data]); setDraft({}) }
  }

  async function deleteItem(id) {
    await supabase.from(table).delete().eq('id', id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  if (loading) return <div style={{ color: colors.darkGrey, fontStyle: 'italic' }}>Chargement...</div>

  return (
    <div>
      {items.length > 0 && (
        <SubList>
          {items.map(item => (
            <SubRow key={item.id}>
              <SubInfo>{renderRow(item)}</SubInfo>
              <DeleteBtn onClick={() => deleteItem(item.id)}>✕</DeleteBtn>
            </SubRow>
          ))}
        </SubList>
      )}
      <AddForm>
        <AddFormTitle>+ Ajouter</AddFormTitle>
        <Row $cols={`repeat(${Math.min(fields.length, 3)}, 1fr)`}>
          {fields.filter(f => f.type !== 'file').map(f => (
            <Field key={f.key}>
              {f.label && <Label>{f.label}</Label>}
              {f.type === 'textarea'
                ? <Textarea placeholder={f.placeholder} value={draft[f.key] || ''}
                    onChange={e => setDraft(d => ({ ...d, [f.key]: e.target.value }))} rows={3} />
                : <Input type={f.type || 'text'} placeholder={f.placeholder} value={draft[f.key] || ''}
                    onChange={e => setDraft(d => ({ ...d, [f.key]: e.target.value }))} />
              }
            </Field>
          ))}
        </Row>
        {fields.filter(f => f.type === 'file').map(f => (
          <Field key={f.key}>
            <Label>{f.label}</Label>
            <MediaUpload
              value={draft[f.key] || ''}
              accept={f.accept || 'image/*,application/pdf'}
              folder={f.folder || 'epk'}
              onChange={v => setDraft(d => ({ ...d, [f.key]: v }))}
            />
          </Field>
        ))}
        <AddBtn onClick={addItem}>Ajouter</AddBtn>
      </AddForm>
    </div>
  )
}

/* ── Composant principal ── */

export default function AdminArtistEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'nouveau'

  const [tab, setTab] = useState('roster')
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [feedbackError, setFeedbackError] = useState(false)
  const [artistId, setArtistId] = useState(null)

  /* Roster */
  const [roster, setRoster] = useState({
    slug: '', roster_num: '', name: '', tag: '', kind: 'groupe',
    photo_url: '', photo_focus: 'center center',
    status: 'active', has_artist_page: true, has_epk: false, sort_order: 0,
  })

  /* Page artiste */
  const [info, setInfo] = useState({
    hero_photo_url: '', hero_photo_focus: 'center 40%', genre: '', origin: '', since_year: '', lineup: '', epk_slug: '',
  })

  /* EPK */
  const [epk, setEpk] = useState({
    hero_photo_url: '', hero_photo_focus: 'center 30%', secondary_photo_url: '',
    tagline: '', quote: '', quote_source: '', bio: '',
    stats: { founded: '', years: '', releases: '', album: '' },
    booking_email: '', booking_contact: '', booking_label_name: '',
    genre_display: '', city_display: '',
  })

  /* Chargement données existantes */
  useEffect(() => {
    if (isNew) return
    supabase.from('artists').select('*').eq('id', id).single()
      .then(({ data: a }) => {
        if (!a) return
        setArtistId(a.id)
        setRoster({ slug: a.slug, roster_num: a.roster_num, name: a.name, tag: a.tag, kind: a.kind || 'groupe', photo_url: a.photo_url || '', photo_focus: a.photo_focus || 'center center', status: a.status, has_artist_page: a.has_artist_page, has_epk: a.has_epk, sort_order: a.sort_order })
      })
    supabase.from('artist_info').select('*').eq('artist_id', id).single()
      .then(({ data: i }) => {
        if (i) setInfo({ hero_photo_url: i.hero_photo_url || '', hero_photo_focus: i.hero_photo_focus || 'center 40%', genre: i.genre || '', origin: i.origin || '', since_year: i.since_year || '', lineup: i.lineup || '', epk_slug: i.epk_slug || '' })
      })
    supabase.from('epk_pages').select('*').eq('artist_id', id).single()
      .then(({ data: e }) => {
        if (e) setEpk({
          hero_photo_url: e.hero_photo_url || '',
          hero_photo_focus: e.hero_photo_focus || 'center 30%',
          secondary_photo_url: e.secondary_photo_url || '',
          tagline: e.tagline || '', quote: e.quote || '', quote_source: e.quote_source || '',
          bio: e.bio || '',
          stats: e.stats || { founded: '', years: '', releases: '', album: '' },
          booking_email: e.booking_email || '',
          booking_contact: e.booking_contact || '',
          booking_label_name: e.booking_label_name || '',
          genre_display: e.genre_display || '',
          city_display: e.city_display || '',
        })
      })
    setLoading(false)
  }, [id, isNew])

  function showFeedback(msg, isError = false) {
    setFeedback(msg); setFeedbackError(isError)
    setTimeout(() => setFeedback(''), 3000)
  }

  async function saveRoster() {
    if (!roster.name || !roster.slug) { showFeedback('Nom et slug requis', true); return }
    setSaving(true)
    if (isNew) {
      const { data, error } = await supabase.from('artists').insert(roster).select().single()
      if (error) { showFeedback(error.message, true); setSaving(false); return }
      setArtistId(data.id)
      navigate(`/admin/artiste/${data.id}`, { replace: true })
    } else {
      const { error } = await supabase.from('artists').update(roster).eq('id', artistId || id)
      if (error) { showFeedback(error.message, true); setSaving(false); return }
    }
    showFeedback('✓ Roster sauvegardé')
    setSaving(false)
  }

  async function saveInfo() {
    const aid = artistId || id
    if (!aid) { showFeedback('Sauvegardez d\'abord le roster', true); return }
    setSaving(true)
    const { data: existing } = await supabase.from('artist_info').select('id').eq('artist_id', aid).single()
    if (existing) {
      await supabase.from('artist_info').update(info).eq('artist_id', aid)
    } else {
      await supabase.from('artist_info').insert({ ...info, artist_id: aid })
    }
    showFeedback('✓ Page artiste sauvegardée')
    setSaving(false)
  }

  async function saveEpk() {
    const aid = artistId || id
    if (!aid) { showFeedback('Sauvegardez d\'abord le roster', true); return }
    setSaving(true)
    const payload = { ...epk, stats: epk.stats }
    const { data: existing } = await supabase.from('epk_pages').select('id').eq('artist_id', aid).single()
    if (existing) {
      await supabase.from('epk_pages').update(payload).eq('artist_id', aid)
    } else {
      await supabase.from('epk_pages').insert({ ...payload, artist_id: aid })
    }
    showFeedback('✓ EPK sauvegardé')
    setSaving(false)
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', fontFamily: fonts.display, fontSize: 32, color: colors.paper, background: colors.ink }}>
      // Chargement...
    </div>
  )

  const aid = artistId || (isNew ? null : id)
  const artistName = roster.name || 'NOUVEL ARTISTE'

  return (
    <Wrap>
      <TopBar>
        <BackBtn to="/admin">← Retour</BackBtn>
        <PageHeading>{artistName}</PageHeading>
      </TopBar>

      <Content>
        <Tabs>
          {[['roster', 'Roster'], ['page', 'Page Artiste'], ['epk', 'EPK']].map(([key, label]) => (
            <Tab key={key} $active={tab === key} onClick={() => setTab(key)}>{label}</Tab>
          ))}
        </Tabs>

        {/* ── ROSTER ── */}
        {tab === 'roster' && (
          <div>
            <Section>
              <SectionTitle>Informations générales</SectionTitle>
              <Row $cols="1fr 1fr">
                <Field>
                  <Label>Nom de l'artiste *</Label>
                  <Input value={roster.name} onChange={e => setRoster(r => ({ ...r, name: e.target.value }))} placeholder="EMPREINTE" />
                </Field>
                <Field>
                  <Label>Slug (URL) *</Label>
                  <Input value={roster.slug} onChange={e => setRoster(r => ({ ...r, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} placeholder="empreinte" />
                  <Hint>/artiste/<strong>{roster.slug || 'slug'}</strong></Hint>
                </Field>
              </Row>
              <Row $cols="1fr 1fr 1fr 1fr">
                <Field>
                  <Label>Type</Label>
                  <Select value={roster.kind} onChange={e => setRoster(r => ({ ...r, kind: e.target.value }))}>
                    <option value="groupe">Groupe</option>
                    <option value="artiste">Artiste solo</option>
                  </Select>
                  <Hint>Pour le comptage auto de la page Roster</Hint>
                </Field>
                <Field>
                  <Label>Genre / Tag</Label>
                  <Input value={roster.tag} onChange={e => setRoster(r => ({ ...r, tag: e.target.value }))} placeholder="Modern Metal" />
                </Field>
                <Field>
                  <Label>Numéro roster</Label>
                  <Input value={roster.roster_num} onChange={e => setRoster(r => ({ ...r, roster_num: e.target.value }))} placeholder="01" />
                </Field>
                <Field>
                  <Label>Ordre d'affichage</Label>
                  <Input type="number" value={roster.sort_order} onChange={e => setRoster(r => ({ ...r, sort_order: +e.target.value }))} />
                </Field>
              </Row>
            </Section>

            <Section>
              <SectionTitle>Photo roster (carte)</SectionTitle>
              <MediaUpload value={roster.photo_url} onChange={v => setRoster(r => ({ ...r, photo_url: v }))} folder="artists" />
              <Field style={{ marginTop: 16 }}>
                <Label>Point focal</Label>
                <Input value={roster.photo_focus} onChange={e => setRoster(r => ({ ...r, photo_focus: e.target.value }))} placeholder="center 40%" />
                <Hint>Ex: center top, center 40%, 30% 60%</Hint>
              </Field>
            </Section>

            <Section>
              <SectionTitle>Visibilité</SectionTitle>
              <Row $cols="1fr 1fr 1fr">
                <Field>
                  <Label>Statut</Label>
                  <Select value={roster.status} onChange={e => setRoster(r => ({ ...r, status: e.target.value }))}>
                    <option value="active">Actif</option>
                    <option value="coming_soon">Bientôt</option>
                  </Select>
                </Field>
                <Field>
                  <CheckRow>
                    <input type="checkbox" checked={roster.has_artist_page} onChange={e => setRoster(r => ({ ...r, has_artist_page: e.target.checked }))} />
                    Page artiste active
                  </CheckRow>
                </Field>
                <Field>
                  <CheckRow>
                    <input type="checkbox" checked={roster.has_epk} onChange={e => setRoster(r => ({ ...r, has_epk: e.target.checked }))} />
                    EPK actif
                  </CheckRow>
                </Field>
              </Row>
            </Section>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SaveBtn onClick={saveRoster} disabled={saving}>
                {saving ? '// Sauvegarde...' : '→ Sauvegarder'}
              </SaveBtn>
              {feedback && <SaveFeedback $error={feedbackError}>{feedback}</SaveFeedback>}
            </div>
          </div>
        )}

        {/* ── PAGE ARTISTE ── */}
        {tab === 'page' && (
          <div>
            <Section>
              <SectionTitle>Informations de la page</SectionTitle>
              <Row $cols="1fr 1fr">
                <Field><Label>Genre</Label><Input value={info.genre} onChange={e => setInfo(i => ({ ...i, genre: e.target.value }))} placeholder="Modern Metal" /></Field>
                <Field><Label>Origine</Label><Input value={info.origin} onChange={e => setInfo(i => ({ ...i, origin: e.target.value }))} placeholder="Amiens" /></Field>
              </Row>
              <Row $cols="1fr 1fr">
                <Field><Label>Chez Carillon depuis</Label><Input value={info.since_year} onChange={e => setInfo(i => ({ ...i, since_year: e.target.value }))} placeholder="2018" /></Field>
                <Field><Label>Slug EPK</Label><Input value={info.epk_slug} onChange={e => setInfo(i => ({ ...i, epk_slug: e.target.value }))} placeholder="empreinte" /><Hint>/epk/<strong>{info.epk_slug || 'slug'}</strong></Hint></Field>
              </Row>
              <Field><Label>Line-up</Label><Input value={info.lineup} onChange={e => setInfo(i => ({ ...i, lineup: e.target.value }))} placeholder="Yannis · Lylian · Félix" /></Field>
            </Section>

            <Section>
              <SectionTitle>Photo hero (bandeau)</SectionTitle>
              <MediaUpload value={info.hero_photo_url} onChange={v => setInfo(i => ({ ...i, hero_photo_url: v }))} folder="artists" />
              <Field style={{ marginTop: 16 }}>
                <Label>Point focal</Label>
                <Input value={info.hero_photo_focus} onChange={e => setInfo(i => ({ ...i, hero_photo_focus: e.target.value }))} placeholder="center 40%" />
                <Hint>Ex: center top, center 40%, 30% 60% — ajuste le cadrage de la photo dans le bandeau</Hint>
              </Field>
            </Section>

            {!isNew && aid && (
              <Section>
                <SectionTitle>Plateformes streaming</SectionTitle>
                <ListEditor
                  artistId={aid}
                  table="artist_platforms"
                  fields={[
                    { key: 'name', label: 'Plateforme', placeholder: 'SPOTIFY', required: true },
                    { key: 'url', label: 'URL', placeholder: 'https://...', required: true },
                  ]}
                  renderRow={item => <><strong>{item.name}</strong> — <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: colors.red, fontSize: 12 }}>{item.url}</a></>}
                />
              </Section>
            )}

            {!isNew && aid && (
              <Section>
                <SectionTitle>Discographie</SectionTitle>
                <ReleasesEditor artistId={aid} />
              </Section>
            )}

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SaveBtn onClick={saveInfo} disabled={saving || (!aid && isNew)}>
                {saving ? '// Sauvegarde...' : '→ Sauvegarder'}
              </SaveBtn>
              {!aid && isNew && <SaveFeedback $error>Sauvegardez d'abord l'onglet Roster</SaveFeedback>}
              {feedback && aid && <SaveFeedback $error={feedbackError}>{feedback}</SaveFeedback>}
            </div>
          </div>
        )}

        {/* ── EPK ── */}
        {tab === 'epk' && (
          <div>
            <Section>
              <SectionTitle>Présentation</SectionTitle>
              <Field><Label>Tagline</Label><Textarea value={epk.tagline} onChange={e => setEpk(k => ({ ...k, tagline: e.target.value }))} placeholder="Du métal moderne qui frappe au casque..." rows={3} /></Field>
              <Row $cols="1fr 1fr">
                <Field><Label>Citation presse</Label><Textarea value={epk.quote} onChange={e => setEpk(k => ({ ...k, quote: e.target.value }))} rows={4} /></Field>
                <Field><Label>Source citation</Label><Input value={epk.quote_source} onChange={e => setEpk(k => ({ ...k, quote_source: e.target.value }))} placeholder="Ben — BGP Music Live" /></Field>
              </Row>
              <Field><Label>Biographie</Label><Textarea value={epk.bio} onChange={e => setEpk(k => ({ ...k, bio: e.target.value }))} rows={8} placeholder="Séparez les paragraphes par une ligne vide." /></Field>
            </Section>

            <Section>
              <SectionTitle>Statistiques (bandeau hero)</SectionTitle>
              <Row $cols="1fr 1fr 1fr 1fr">
                <Field><Label>Fondé en</Label><Input value={epk.stats.founded} onChange={e => setEpk(k => ({ ...k, stats: { ...k.stats, founded: e.target.value } }))} placeholder="2018" /></Field>
                <Field><Label>Années scène</Label><Input value={epk.stats.years} onChange={e => setEpk(k => ({ ...k, stats: { ...k.stats, years: e.target.value } }))} placeholder="7" /></Field>
                <Field><Label>Sorties</Label><Input value={epk.stats.releases} onChange={e => setEpk(k => ({ ...k, stats: { ...k.stats, releases: e.target.value } }))} placeholder="14" /></Field>
                <Field><Label>Album prévu</Label><Input value={epk.stats.album} onChange={e => setEpk(k => ({ ...k, stats: { ...k.stats, album: e.target.value } }))} placeholder="2027" /></Field>
              </Row>
            </Section>

            <Section>
              <SectionTitle>Photos</SectionTitle>
              <Row $cols="1fr 1fr">
                <Field>
                  <Label>Photo hero (plein écran)</Label>
                  <MediaUpload value={epk.hero_photo_url} onChange={v => setEpk(k => ({ ...k, hero_photo_url: v }))} folder="epk" />
                  <Field style={{ marginTop: 12 }}>
                    <Label>Point focal</Label>
                    <Input value={epk.hero_photo_focus} onChange={e => setEpk(k => ({ ...k, hero_photo_focus: e.target.value }))} placeholder="center 30%" />
                    <Hint>Ex: center top, center 30%, 30% 60%</Hint>
                  </Field>
                </Field>
                <Field><Label>Photo bio (section biographie)</Label><MediaUpload value={epk.secondary_photo_url} onChange={v => setEpk(k => ({ ...k, secondary_photo_url: v }))} folder="epk" /></Field>
              </Row>
            </Section>

            <Section>
              <SectionTitle>Contact & Booking</SectionTitle>
              <Row $cols="1fr 1fr">
                <Field><Label>Email booking</Label><Input type="email" value={epk.booking_email} onChange={e => setEpk(k => ({ ...k, booking_email: e.target.value }))} placeholder="contact@studiocarillon.fr" /></Field>
                <Field><Label>Contact (nom · téléphone)</Label><Input value={epk.booking_contact} onChange={e => setEpk(k => ({ ...k, booking_contact: e.target.value }))} placeholder="Maud · 06 45 30 94 93" /></Field>
              </Row>
              <Row $cols="1fr 1fr">
                <Field><Label>Nom du label</Label><Input value={epk.booking_label_name} onChange={e => setEpk(k => ({ ...k, booking_label_name: e.target.value }))} placeholder="Carillon · carillonlabel.fr" /></Field>
                <Field><Label>Genre (contact)</Label><Input value={epk.genre_display} onChange={e => setEpk(k => ({ ...k, genre_display: e.target.value }))} placeholder="Métal moderne" /></Field>
              </Row>
              <Field><Label>Ville</Label><Input value={epk.city_display} onChange={e => setEpk(k => ({ ...k, city_display: e.target.value }))} placeholder="Amiens, France" /></Field>
            </Section>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
              <SaveBtn onClick={saveEpk} disabled={saving || (!aid && isNew)}>
                {saving ? '// Sauvegarde...' : '→ Sauvegarder'}
              </SaveBtn>
              {!aid && isNew && <SaveFeedback $error>Sauvegardez d'abord l'onglet Roster</SaveFeedback>}
              {feedback && aid && <SaveFeedback $error={feedbackError}>{feedback}</SaveFeedback>}
            </div>

            {!isNew && aid && (
              <>
                <Section>
                  <SectionTitle>Membres du groupe</SectionTitle>
                  <ListEditor
                    artistId={aid} table="epk_members"
                    fields={[
                      { key: 'role', label: 'Rôle', placeholder: 'Chant', required: true },
                      { key: 'name', label: 'Nom', placeholder: 'YANNIS', required: true },
                    ]}
                    renderRow={item => <><span style={{ color: colors.red, fontSize: 11, fontFamily: fonts.heading, letterSpacing: 2 }}>{item.role}</span> — <strong>{item.name}</strong></>}
                  />
                </Section>

                <Section>
                  <SectionTitle>Dates de concert</SectionTitle>
                  <ListEditor
                    artistId={aid} table="epk_dates"
                    fields={[
                      { key: 'date_str', label: 'Date', placeholder: '05.02.2025', required: true },
                      { key: 'groupe', label: 'Groupe (optionnel, si plusieurs groupes)', placeholder: 'KAMI NO IKARI' },
                      { key: 'lieu', label: 'Lieu', placeholder: 'Lyon — La Pente', required: true },
                    ]}
                    renderRow={item => <><span style={{ color: colors.red, fontFamily: fonts.heading, fontWeight: 700, fontSize: 11, marginRight: 12 }}>{item.date_str}</span>{item.groupe && <strong style={{ marginRight: 6 }}>{item.groupe} —</strong>}{item.lieu}</>}
                  />
                </Section>

                <Section>
                  <SectionTitle>Clips / Music videos</SectionTitle>
                  <ListEditor
                    artistId={aid} table="epk_clips"
                    fields={[
                      { key: 'title', label: 'Titre', placeholder: 'SHATTERED MEMORIES', required: true },
                      { key: 'feat', label: 'feat. (optionnel)', placeholder: 'feat. Flo from Averses' },
                      { key: 'url', label: 'URL YouTube', placeholder: 'https://youtube.com/...' },
                    ]}
                    renderRow={item => <><strong>{item.title}</strong>{item.feat && <span style={{ color: colors.darkGrey }}> — {item.feat}</span>}{item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: colors.red, marginLeft: 8, fontSize: 12 }}>↗</a>}</>}
                  />
                </Section>

                <Section>
                  <SectionTitle>Fichiers téléchargeables (PDFs, rider, etc.)</SectionTitle>
                  <ListEditor
                    artistId={aid} table="epk_downloads"
                    fields={[
                      { key: 'label', label: 'Nom du fichier', placeholder: 'Press Kit 2025', required: true },
                      { key: 'file_type', label: 'Type', placeholder: 'PDF · 13 MB' },
                      { key: 'file_url', label: 'Fichier', type: 'file', accept: 'application/pdf,image/*', folder: 'downloads', required: true },
                    ]}
                    renderRow={item => <><strong>{item.label}</strong>{item.file_type && <span style={{ color: colors.red, marginLeft: 8, fontSize: 11 }}>{item.file_type}</span>}</>}
                  />
                </Section>

                <Section>
                  <SectionTitle>Photos carrousel (galerie EPK)</SectionTitle>
                  <ListEditor
                    artistId={aid} table="epk_photos"
                    fields={[
                      { key: 'photo_url', label: 'Photo', type: 'file', accept: 'image/*', folder: 'epk/carousel', required: true },
                    ]}
                    renderRow={item => <><img src={item.photo_url} alt="" style={{ width: 60, height: 60, objectFit: 'cover', marginRight: 10, verticalAlign: 'middle' }} />{item.photo_url.split('/').pop()}</>}
                  />
                </Section>
              </>
            )}
          </div>
        )}
      </Content>
    </Wrap>
  )
}
