-- ============================================================
-- CARILLON LABEL — Point focal photos hero (page artiste + EPK)
-- Coller dans l'éditeur SQL de votre projet Supabase
-- ============================================================

ALTER TABLE artist_info ADD COLUMN IF NOT EXISTS hero_photo_focus text DEFAULT 'center 40%';
ALTER TABLE epk_pages ADD COLUMN IF NOT EXISTS hero_photo_focus text DEFAULT 'center 30%';
