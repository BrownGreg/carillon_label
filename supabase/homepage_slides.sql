-- ============================================================
-- CARILLON LABEL — Slides homepage
-- Coller dans l'éditeur SQL de votre projet Supabase
-- ============================================================

CREATE TABLE homepage_slides (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  bg_url text NOT NULL,
  bg_pos text DEFAULT 'center center',
  label text,
  band text,
  title text NOT NULL,
  date_text text,
  btn_text text,
  url text NOT NULL,
  external boolean DEFAULT true,
  active boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE homepage_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON homepage_slides FOR SELECT USING (true);
CREATE POLICY "auth_write" ON homepage_slides FOR ALL USING (auth.uid() IS NOT NULL);

-- Données initiales (slides initiales)
INSERT INTO homepage_slides (bg_url, bg_pos, label, band, title, date_text, btn_text, url, external, sort_order) VALUES
  ('/cover-vertigo.jpg',  'center center', '★ Nouvel EP',      'Empreinte', 'Vertigo',                     'Disponible maintenant', '→ Écouter',      'https://bfan.link/vertigo-18',                true,  2),
  ('/cover-melted.jpg',   'center center', '★ Single',         'Indicible', 'Melted',                      'Disponible maintenant', '→ Écouter',      '/artiste/indicible',                          false, 3);
