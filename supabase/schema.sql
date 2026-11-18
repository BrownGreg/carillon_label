-- ============================================================
-- CARILLON LABEL — Supabase Schema
-- Coller dans l'éditeur SQL de votre projet Supabase
-- ============================================================

-- Artistes (roster + routing)
CREATE TABLE artists (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  roster_num text NOT NULL DEFAULT '01',
  name text NOT NULL,
  tag text NOT NULL DEFAULT '',
  photo_url text,
  photo_focus text DEFAULT 'center center',
  status text DEFAULT 'active',       -- 'active' | 'coming_soon'
  has_artist_page boolean DEFAULT true,
  has_epk boolean DEFAULT false,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Infos page artiste (1:1)
CREATE TABLE artist_info (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE UNIQUE NOT NULL,
  hero_photo_url text,
  genre text,
  origin text,
  since_year text,
  lineup text,
  epk_slug text
);

-- Plateformes de streaming
CREATE TABLE artist_platforms (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  sort_order int DEFAULT 0
);

-- Discographie (tracks en JSONB)
CREATE TABLE artist_releases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  meta text,
  cover_url text,
  tilt text DEFAULT '1',
  sort_order int DEFAULT 0,
  tracks jsonb DEFAULT '[]'::jsonb
);

-- Page EPK (1:1)
CREATE TABLE epk_pages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE UNIQUE NOT NULL,
  hero_photo_url text,
  secondary_photo_url text,
  tagline text,
  quote text,
  quote_source text,
  bio text,
  stats jsonb DEFAULT '{}'::jsonb,    -- {founded, years, releases, album}
  booking_email text,
  booking_contact text,
  booking_label_name text,
  genre_display text,
  city_display text
);

-- Membres du groupe
CREATE TABLE epk_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL,
  name text NOT NULL,
  sort_order int DEFAULT 0
);

-- Dates de concert
CREATE TABLE epk_dates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE NOT NULL,
  date_str text NOT NULL,
  lieu text NOT NULL,
  sort_order int DEFAULT 0
);

-- Clips / music videos
CREATE TABLE epk_clips (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  feat text,
  url text,
  sort_order int DEFAULT 0
);

-- Fichiers téléchargeables (PDFs, etc.)
CREATE TABLE epk_downloads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE NOT NULL,
  label text NOT NULL,
  file_type text,
  file_url text NOT NULL,
  sort_order int DEFAULT 0
);

-- Photos carrousel EPK
CREATE TABLE epk_photos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE NOT NULL,
  photo_url text NOT NULL,
  sort_order int DEFAULT 0
);

-- Distinctions / récompenses
CREATE TABLE epk_badges (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE NOT NULL,
  label text NOT NULL,
  description text NOT NULL
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE epk_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE epk_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE epk_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE epk_clips ENABLE ROW LEVEL SECURITY;
ALTER TABLE epk_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE epk_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE epk_badges ENABLE ROW LEVEL SECURITY;

-- Lecture publique
CREATE POLICY "public_read" ON artists FOR SELECT USING (true);
CREATE POLICY "public_read" ON artist_info FOR SELECT USING (true);
CREATE POLICY "public_read" ON artist_platforms FOR SELECT USING (true);
CREATE POLICY "public_read" ON artist_releases FOR SELECT USING (true);
CREATE POLICY "public_read" ON epk_pages FOR SELECT USING (true);
CREATE POLICY "public_read" ON epk_members FOR SELECT USING (true);
CREATE POLICY "public_read" ON epk_dates FOR SELECT USING (true);
CREATE POLICY "public_read" ON epk_clips FOR SELECT USING (true);
CREATE POLICY "public_read" ON epk_downloads FOR SELECT USING (true);
CREATE POLICY "public_read" ON epk_photos FOR SELECT USING (true);
CREATE POLICY "public_read" ON epk_badges FOR SELECT USING (true);

-- Écriture pour utilisateurs authentifiés uniquement
CREATE POLICY "auth_write" ON artists FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON artist_info FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON artist_platforms FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON artist_releases FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON epk_pages FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON epk_members FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON epk_dates FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON epk_clips FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON epk_downloads FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON epk_photos FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_write" ON epk_badges FOR ALL USING (auth.uid() IS NOT NULL);

-- ============================================================
-- Bucket Storage pour les médias
-- Créer dans Storage > Buckets > New bucket
-- Nom: media, Public: oui
-- ============================================================
-- Ces politiques s'appliquent après avoir créé le bucket "media"

CREATE POLICY "public_media_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "auth_media_insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.uid() IS NOT NULL);

CREATE POLICY "auth_media_update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'media' AND auth.uid() IS NOT NULL);

CREATE POLICY "auth_media_delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'media' AND auth.uid() IS NOT NULL);
