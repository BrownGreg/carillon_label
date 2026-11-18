-- ============================================================
-- CARILLON LABEL — En-tête de la page Roster
-- Coller dans l'éditeur SQL de votre projet Supabase
-- Ré-exécutable sans risque : ne modifie jamais une donnée existante
-- ============================================================

-- 1. Type d'artiste (pour le comptage auto "2 groupes + 1 artiste")
--    Félix est marqué "artiste solo" uniquement à la création de la colonne,
--    pour ne pas écraser un réglage fait ensuite depuis l'admin.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'artists' AND column_name = 'kind'
  ) THEN
    ALTER TABLE artists ADD COLUMN kind text DEFAULT 'groupe';  -- 'groupe' | 'artiste'
    UPDATE artists SET kind = 'artiste' WHERE slug = 'felix-feuillette';
  END IF;
END $$;

-- 2. Textes de l'en-tête (ligne unique)
CREATE TABLE IF NOT EXISTS roster_page (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  count_text text DEFAULT '',   -- vide = calcul automatique
  styles text DEFAULT 'Metalcore / Death / Hardcore',
  tagline text DEFAULT 'Des artistes aux profils différents partageant les mêmes valeurs',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE roster_page ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read" ON roster_page;
CREATE POLICY "public_read" ON roster_page FOR SELECT USING (true);
DROP POLICY IF EXISTS "auth_write" ON roster_page;
CREATE POLICY "auth_write" ON roster_page FOR ALL USING (auth.uid() IS NOT NULL);

INSERT INTO roster_page (count_text)
SELECT '' WHERE NOT EXISTS (SELECT 1 FROM roster_page);
