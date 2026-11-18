-- ============================================================
-- CARILLON LABEL — Groupe par date (EPK Félix Feuillette, batteur
-- de session qui joue avec plusieurs groupes)
-- Coller dans l'éditeur SQL de votre projet Supabase
-- ============================================================

ALTER TABLE epk_dates ADD COLUMN IF NOT EXISTS groupe text;

-- Corrige les 2 dates déjà ajoutées par le client depuis l'admin
-- (le champ "groupe" n'existait pas encore, il avait été mis dans "lieu")
UPDATE epk_dates SET groupe = 'KAMI NO IKARI', lieu = 'Barb''n''Rock Festival (60)', date_str = '26/06/2026', sort_order = 64
  WHERE id = '6a03b3d8-7ac5-4493-9776-ddbe9fd69451';
UPDATE epk_dates SET groupe = 'EARLY MAGGOTS', lieu = 'Rockstadt Fest (Roumanie)', date_str = '01/08/2026', sort_order = 65
  WHERE id = '7e1fb58d-fed0-4d46-b548-3e455254bacd';

-- Backfill des 63 dates historiques, jusque-là codées en dur dans le site
-- (artist_id = Félix Feuillette)
INSERT INTO epk_dates (artist_id, date_str, groupe, lieu, sort_order) VALUES
  ('44444444-4444-4444-4444-444444444444', '03/01/2025', 'KAMI NO IKARI', 'Hamburg — Markthalle 🇩🇪', 1),
  ('44444444-4444-4444-4444-444444444444', '04/01/2025', 'KAMI NO IKARI', 'Oberhausen — Turbinenhalle 2 🇩🇪', 2),
  ('44444444-4444-4444-4444-444444444444', '05/01/2025', 'KAMI NO IKARI', 'St Niklaas — De Casino 🇧🇪', 3),
  ('44444444-4444-4444-4444-444444444444', '07/01/2025', 'KAMI NO IKARI', 'Londres — Academy Islington 🇬🇧', 4),
  ('44444444-4444-4444-4444-444444444444', '08/01/2025', 'KAMI NO IKARI', 'Paris — La Machine du Moulin Rouge 🇫🇷', 5),
  ('44444444-4444-4444-4444-444444444444', '09/01/2025', 'KAMI NO IKARI', 'Toulouse — Le Bikini 🇫🇷', 6),
  ('44444444-4444-4444-4444-444444444444', '10/01/2025', 'KAMI NO IKARI', 'Burgos — Sala Andén 🇪🇸', 7),
  ('44444444-4444-4444-4444-444444444444', '11/01/2025', 'KAMI NO IKARI', 'Madrid — Sala del Wizink 🇪🇸', 8),
  ('44444444-4444-4444-4444-444444444444', '12/01/2025', 'KAMI NO IKARI', 'Barcelone — Razzmatazz 2 🇪🇸', 9),
  ('44444444-4444-4444-4444-444444444444', '14/01/2025', 'KAMI NO IKARI', 'Lyon — La Rayonne 🇫🇷', 10),
  ('44444444-4444-4444-4444-444444444444', '15/01/2025', 'KAMI NO IKARI', 'Trezzo sul Adda — Live Club 🇮🇹', 11),
  ('44444444-4444-4444-4444-444444444444', '16/01/2025', 'KAMI NO IKARI', 'Zurich — Komplex 457 🇨🇭', 12),
  ('44444444-4444-4444-4444-444444444444', '17/01/2025', 'KAMI NO IKARI', 'Munich — Backstage Werk 🇩🇪', 13),
  ('44444444-4444-4444-4444-444444444444', '18/01/2025', 'KAMI NO IKARI', 'Budapest — Barba Negra 🇭🇺', 14),
  ('44444444-4444-4444-4444-444444444444', '19/01/2025', 'KAMI NO IKARI', 'Zagreb — Boogaloo 🇭🇷', 15),
  ('44444444-4444-4444-4444-444444444444', '21/01/2025', 'KAMI NO IKARI', 'Vienne — Simm City 🇦🇹', 16),
  ('44444444-4444-4444-4444-444444444444', '22/01/2025', 'KAMI NO IKARI', 'Kosice — Colosseum 🇸🇰', 17),
  ('44444444-4444-4444-4444-444444444444', '23/01/2025', 'KAMI NO IKARI', 'Wroclaw — A2 🇵🇱', 18),
  ('44444444-4444-4444-4444-444444444444', '24/01/2025', 'KAMI NO IKARI', 'Prague — Meet Factory 🇨🇿', 19),
  ('44444444-4444-4444-4444-444444444444', '25/01/2025', 'KAMI NO IKARI', 'Leipzig — Hellraiser 🇩🇪', 20),
  ('44444444-4444-4444-4444-444444444444', '05/02/2025', 'EMPREINTE', 'Lyon — La Pente 🇫🇷', 21),
  ('44444444-4444-4444-4444-444444444444', '06/03/2025', 'EMPREINTE', 'Orléans — Le Dropkick 🇫🇷', 22),
  ('44444444-4444-4444-4444-444444444444', '06/03/2025', 'THROUGH THE VOID', 'Orléans — Le Dropkick 🇫🇷', 23),
  ('44444444-4444-4444-4444-444444444444', '07/03/2025', 'EMPREINTE', 'Limoges — Le Dropkick 🇫🇷', 24),
  ('44444444-4444-4444-4444-444444444444', '07/03/2025', 'THROUGH THE VOID', 'Limoges — Le Dropkick 🇫🇷', 25),
  ('44444444-4444-4444-4444-444444444444', '09/03/2025', 'EMPREINTE', 'Lille — La Brat Cave 🇫🇷', 26),
  ('44444444-4444-4444-4444-444444444444', '13/03/2025', 'EMPREINTE', 'Charleroi — Le Vecteur 🇧🇪', 27),
  ('44444444-4444-4444-4444-444444444444', '14/03/2025', 'INDICIBLE', 'Amiens — Péniche Célestine 🇫🇷', 28),
  ('44444444-4444-4444-4444-444444444444', '10/04/2025', 'KAMI NO IKARI', 'Marseille — Makeda 🇫🇷', 29),
  ('44444444-4444-4444-4444-444444444444', '03/05/2025', 'VERMICULAR INCUBATION', 'Liège — Deathtoberfest 🇧🇪', 30),
  ('44444444-4444-4444-4444-444444444444', '16/05/2025', 'KAMI NO IKARI', 'Eragny — Covent Garden 🇫🇷', 31),
  ('44444444-4444-4444-4444-444444444444', '17/05/2025', 'EMPREINTE', 'Compiègne — Ziquodrome 🇫🇷', 32),
  ('44444444-4444-4444-4444-444444444444', '23/05/2025', 'VERMICULAR INCUBATION', 'St Johan — Rock The Hell 🇨🇭', 33),
  ('44444444-4444-4444-4444-444444444444', '29/05/2025', 'VERMICULAR INCUBATION', 'Alkmaar — Hearie Metal Fest 🇳🇱', 34),
  ('44444444-4444-4444-4444-444444444444', '06/06/2025', 'IANWILL', 'Ambérieu en Bugey — Triplette Social Club 🇫🇷', 35),
  ('44444444-4444-4444-4444-444444444444', '07/06/2025', 'IANWILL', 'Grenoble — L''Ampérage 🇫🇷', 36),
  ('44444444-4444-4444-4444-444444444444', '14/06/2025', 'KAMI NO IKARI', 'Compiègne — Ziquodrome 🇫🇷', 37),
  ('44444444-4444-4444-4444-444444444444', '18/07/2025', 'VERMICULAR INCUBATION', 'Stoumont — Dim Fest 🇧🇪', 38),
  ('44444444-4444-4444-4444-444444444444', '21/08/2025', 'VERMICULAR INCUBATION', 'Aarau — Le Kiff 🇨🇭', 39),
  ('44444444-4444-4444-4444-444444444444', '22/08/2025', 'VERMICULAR INCUBATION', 'Andernach — Deathfeast 🇩🇪', 40),
  ('44444444-4444-4444-4444-444444444444', '30/08/2025', 'KAMI NO IKARI', 'Fertois — Fertois Metal Fest 🇫🇷', 41),
  ('44444444-4444-4444-4444-444444444444', '13/09/2025', 'EMPREINTE', 'Bambiderstroff — Bambi Metal Fest 🇫🇷', 42),
  ('44444444-4444-4444-4444-444444444444', '20/09/2025', 'EMPREINTE', 'Betz — Festival de la Voix Verte 🇫🇷', 43),
  ('44444444-4444-4444-4444-444444444444', '27/09/2025', 'IANWILL', 'Le Havre — Apocalypse Metal Fest 🇫🇷', 44),
  ('44444444-4444-4444-4444-444444444444', '04/10/2025', 'IANWILL', 'Quimper — Novamax 🇫🇷', 45),
  ('44444444-4444-4444-4444-444444444444', '10/10/2025', 'IANWILL', 'Nantes — Shelter 🇫🇷', 46),
  ('44444444-4444-4444-4444-444444444444', '11/10/2025', 'IANWILL', 'Bordeaux — Salem Bar 🇫🇷', 47),
  ('44444444-4444-4444-4444-444444444444', '12/11/2025', 'EMPREINTE', 'Marseille — Makeda 🇫🇷', 48),
  ('44444444-4444-4444-4444-444444444444', '13/11/2025', 'EMPREINTE', 'Montpellier — Secret Place 🇫🇷', 49),
  ('44444444-4444-4444-4444-444444444444', '22/11/2025', 'KAMI NO IKARI', 'Savigny le Temple — Charitable Fest 🇫🇷', 50),
  ('44444444-4444-4444-4444-444444444444', '28/11/2025', 'IANWILL', 'Lorient — Le Pit Dog 🇫🇷', 51),
  ('44444444-4444-4444-4444-444444444444', '05/12/2025', 'IANWILL', 'Anthony — Espace Vasarely 🇫🇷', 52),
  ('44444444-4444-4444-4444-444444444444', '12/12/2025', 'EMPREINTE', 'Amiens — Cité Carter 🇫🇷', 53),
  ('44444444-4444-4444-4444-444444444444', '12/12/2025', 'INDICIBLE', 'Amiens — Cité Carter 🇫🇷', 54),
  ('44444444-4444-4444-4444-444444444444', '22/01/2026', 'EMPREINTE', 'Lille — Brat Cave 🇫🇷', 55),
  ('44444444-4444-4444-4444-444444444444', '23/01/2026', 'IANWILL', 'Paris — La Boule Noire 🇫🇷', 56),
  ('44444444-4444-4444-4444-444444444444', '30/01/2026', 'IANWILL', 'Eragny — Covent Garden 🇫🇷', 57),
  ('44444444-4444-4444-4444-444444444444', '19/02/2026', 'EMPREINTE', 'Schaerbeek — Remifest 🇧🇪', 58),
  ('44444444-4444-4444-4444-444444444444', '21/03/2026', 'KAMI NO IKARI', 'Châteauroux — 9Cube5 🇫🇷', 59),
  ('44444444-4444-4444-4444-444444444444', '16/05/2026', 'EMPREINTE', 'Soissons — Esplanade du Mail 🇫🇷', 60),
  ('44444444-4444-4444-4444-444444444444', '30/05/2026', 'KAMI NO IKARI', 'Mulhouse — Noumatrouff (release party Smash Hit Combo) 🇫🇷', 61),
  ('44444444-4444-4444-4444-444444444444', '10/06/2026', 'IANWILL', 'Hradec Králové — Festival Rock for People 🇨🇿 (Tremplin Planetrox Europe)', 62),
  ('44444444-4444-4444-4444-444444444444', '22/06/2026', 'INDICIBLE', 'Les Passagers du Zinc, Besançon 🇫🇷', 63);
