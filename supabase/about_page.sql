-- ============================================================
-- CARILLON LABEL — Page "À propos"
-- Coller dans l'éditeur SQL de votre projet Supabase
-- Ré-exécutable sans risque : ne modifie jamais une ligne existante
-- ============================================================

CREATE TABLE IF NOT EXISTS about_page (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  coprod_img text DEFAULT '/coprod.png',
  coprod_title text DEFAULT 'LA COPRODUCTION',
  coprod_text text,
  edition_img text DEFAULT '/edition.png',
  edition_title text DEFAULT 'L''ÉDITION MUSICALE',
  edition_text text,
  apropos_photo text DEFAULT '/apropos-2026.jpg',
  apropos_text text,
  meta1_label text DEFAULT 'Management',
  meta1_value text,
  meta2_label text DEFAULT 'Édition',
  meta2_value text,
  meta3_label text DEFAULT 'Coproduction',
  meta3_value text,
  meta4_label text DEFAULT 'Membres de',
  meta4_value text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_page ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read" ON about_page;
CREATE POLICY "public_read" ON about_page FOR SELECT USING (true);
DROP POLICY IF EXISTS "auth_write" ON about_page;
CREATE POLICY "auth_write" ON about_page FOR ALL USING (auth.uid() IS NOT NULL);

-- Ligne unique avec le contenu actuel de la page (seulement si la table est vide)
-- (dans les textes, **mot** = texte en gras)
INSERT INTO about_page (
  coprod_text, edition_text, apropos_text,
  meta1_value, meta2_value, meta3_value, meta4_value
)
SELECT
  'La coproduction est un partenariat entre deux ou plusieurs personnes en vue de la création, du financement et de la distribution d''un projet musical. Chacune des parties investit dans le projet et en partage les bénéfices.

Elle permet principalement de diviser les risques financiers. Les coproducteurs collaborent à toutes les étapes, de la création à la diffusion, impliquant leurs responsabilités financières, notamment pour l''enregistrement d''une œuvre.',

  'L''édition d''une œuvre musicale c''est à la fois la **protection juridique** de cette œuvre — concourir à ce que les auteurs-compositeurs et producteurs soient rémunérés pour l''utilisation de leurs œuvres — et la **commercialisation** de cette œuvre dans le but de la faire connaître.

L''éditeur suit administrativement et juridiquement la gestion et l''exploitation des œuvres : dépôt et déclaration, gestion des droits, distribution et exploitation.',

  '**CARILLON** a vu le jour en 2023, sous la forme d''une société à l''objet multiple et uniquement dédié à la musique.

Depuis 2026 et la fermeture du studio de répétitions et d''enregistrement éponyme, CARILLON est centré sur le **management d''artistes** et l''accompagnement de projets musicaux, l''**édition** et la **coproduction phonographique**.',

  'Accompagnement d''artistes et de projets musicaux',
  'Protection juridique et commercialisation des œuvres',
  'Financement et distribution de projets musicaux',
  'Haute Fidélité — Fédération des musiques métalliques — Union des managers d''artistes (UMAN)'
WHERE NOT EXISTS (SELECT 1 FROM about_page);

