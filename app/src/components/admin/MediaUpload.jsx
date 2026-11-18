import { useState, useRef } from 'react'
import styled from 'styled-components'
import { supabase } from '../../lib/supabase'
import { colors, fonts } from '../../theme'

const UploadArea = styled.div`
  border: 2px dashed rgba(10,10,10,0.2); padding: 20px; text-align: center;
  transition: border-color 0.15s; cursor: pointer;
  &:hover { border-color: ${colors.red}; }
`
const Preview = styled.img`
  display: block; max-height: 120px; max-width: 200px; object-fit: cover; margin-bottom: 10px;
`
const UrlInput = styled.input`
  width: 100%; border: 2px solid rgba(10,10,10,0.3); padding: 10px 12px;
  font-family: ${fonts.body}; font-size: 15px; background: white; outline: none;
  transition: border-color 0.15s; &:focus { border-color: ${colors.red}; }
`

export default function MediaUpload({ value, onChange, accept = 'image/*', folder = 'artists' }) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef()

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from('media').upload(path, file, { upsert: true })
    if (!error) {
      const { data } = supabase.storage.from('media').getPublicUrl(path)
      onChange(data.publicUrl)
    }
    setUploading(false)
  }

  return (
    <div>
      {value && (
        accept.includes('image')
          ? <Preview src={value} alt="Aperçu" />
          : <div style={{ fontSize: 12, marginBottom: 8, color: colors.red }}>✓ {value.split('/').pop()}</div>
      )}
      <UploadArea onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept={accept} style={{ display: 'none' }} onChange={handleFile} />
        {uploading
          ? <div style={{ fontFamily: fonts.heading, fontSize: 11, letterSpacing: 2 }}>// Upload en cours...</div>
          : <div>
              <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4 }}>
                Cliquez pour choisir un fichier
              </div>
              {value && <div style={{ fontSize: 11, color: colors.darkGrey, marginTop: 4 }}>Ou saisissez une URL ci-dessous</div>}
            </div>
        }
      </UploadArea>
      <UrlInput
        type="text" value={value || ''} placeholder="https://... ou /chemin/local"
        onChange={e => onChange(e.target.value)}
        style={{ marginTop: 8, fontSize: 12 }}
      />
    </div>
  )
}
