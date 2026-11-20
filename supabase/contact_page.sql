-- ============================================================
-- CARILLON LABEL — Bandeau "Écris-nous" (page Contact)
-- Coller dans l'éditeur SQL de votre projet Supabase
-- Ré-exécutable sans risque : ne modifie jamais une donnée existante
-- ============================================================

CREATE TABLE IF NOT EXISTS contact_page (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_photo text DEFAULT '/apropos-2026.jpg',
  hero_focus text DEFAULT 'center 10%',          -- cadrage ordinateur
  hero_focus_mobile text DEFAULT 'right top',    -- cadrage mobile / tablette
  hero_zoom_mobile boolean DEFAULT true,         -- zoom x2 sur mobile / tablette
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_page ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read" ON contact_page;
CREATE POLICY "public_read" ON contact_page FOR SELECT USING (true);
DROP POLICY IF EXISTS "auth_write" ON contact_page;
CREATE POLICY "auth_write" ON contact_page FOR ALL USING (auth.uid() IS NOT NULL);

INSERT INTO contact_page (hero_photo)
SELECT '/apropos-2026.jpg' WHERE NOT EXISTS (SELECT 1 FROM contact_page);
