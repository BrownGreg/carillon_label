-- ============================================================
-- CARILLON LABEL — Données initiales (artistes existants)
-- Coller dans l'éditeur SQL après avoir exécuté schema.sql
-- ============================================================

DO $$
DECLARE
  empreinte_id  uuid := '11111111-1111-1111-1111-111111111111';
  indicible_id  uuid := '22222222-2222-2222-2222-222222222222';
  feuillette_id uuid := '44444444-4444-4444-4444-444444444444';
BEGIN

-- ============================================================
-- ARTISTES (roster)
-- ============================================================

INSERT INTO artists (id, slug, roster_num, name, tag, photo_url, photo_focus, status, has_artist_page, has_epk, sort_order)
VALUES
  (empreinte_id,  'empreinte',       '01', 'EMPREINTE',   'Modern Metal',          '/epk/empreinte-pic1.jpg', 'center 40%',  'active', true,  true,  1),
  (indicible_id,  'indicible',       '02', 'INDICIBLE',   'Death · Groove · Slam', '/artist-indicible.jpg',   'center center','active', true,  true,  2),
  (feuillette_id, 'felix-feuillette','03', 'F. FEUILLETTE','Batteur · Session',    '/artist-feuillette.jpg',  'center center','active', false, true,  3);

-- ============================================================
-- PAGES ARTISTES (infos)
-- ============================================================

INSERT INTO artist_info (artist_id, hero_photo_url, genre, origin, since_year, lineup, epk_slug)
VALUES
  (empreinte_id, '/epk/empreinte-pic1.jpg', 'Modern Metal',     'Amiens', '2018', 'Yannis · Lylian · Félix',           'empreinte'),
  (indicible_id, '/artist-indicible.jpg',   'Death Metal',       'Amiens', '2026', 'Gabriel · Bob · Arthur · Félix',    'indicible');

-- ============================================================
-- PLATEFORMES STREAMING
-- ============================================================

-- Empreinte
INSERT INTO artist_platforms (artist_id, name, url, sort_order) VALUES
  (empreinte_id, 'SPOTIFY',     'https://open.spotify.com/intl-fr/artist/3hcdgniIdgtEd1H12o7pTE?si=eZInclMwT6alQmFAJk7dxw', 1),
  (empreinte_id, 'APPLE MUSIC', 'https://music.apple.com/fr/artist/empreinte/370074605', 2),
  (empreinte_id, 'DEEZER',      'https://www.deezer.com/fr/artist/60331862', 3),
  (empreinte_id, 'YOUTUBE',     'https://www.youtube.com/@EMPREINTEBAND', 4);

-- Indicible
INSERT INTO artist_platforms (artist_id, name, url, sort_order) VALUES
  (indicible_id, 'SPOTIFY',     'https://open.spotify.com/artist/3LBtYgHczsHAqcBhB1OSsD', 1),
  (indicible_id, 'APPLE MUSIC', 'https://music.apple.com/fr/artist/indicible/1691747034', 2),
  (indicible_id, 'DEEZER',      'https://www.deezer.com/fr/artist/377169231', 3),
  (indicible_id, 'YOUTUBE',     'https://www.youtube.com/@indicible80', 4);

-- ============================================================
-- DISCOGRAPHIE
-- ============================================================

-- Empreinte
INSERT INTO artist_releases (artist_id, name, meta, cover_url, tilt, sort_order, tracks) VALUES
  (empreinte_id, 'VERTIGO inst.', '2026 · EP · 22:40', '/cover-vertigo-inst.jpg', '1', 1,
   '[{"name":"Dream – Instrumental","duration":"3:41"},{"name":"Ice Cold Knives – Instrumental","duration":"3:52"},{"name":"The Surface – Instrumental","duration":"4:21"},{"name":"Satellite – Instrumental","duration":"3:45"},{"name":"Madness – Instrumental","duration":"3:20"},{"name":"Shattered Memories – Instrumental","duration":"3:39"}]'),
  (empreinte_id, 'VERTIGO', '2025 · EP · 22:40', 'https://i.scdn.co/image/ab67616d00001e02a237f6a4309d334cd9689c4a', '2', 2,
   '[{"name":"Dream","duration":"3:41"},{"name":"Ice Cold Knives","duration":"3:52"},{"name":"The Surface","duration":"4:21"},{"name":"Satellite","duration":"3:45"},{"name":"Madness","duration":"3:20","feat":"feat. Clem Richard From Ashen"},{"name":"Shattered Memories","duration":"3:39","feat":"feat. Flo From Averses"}]'),
  (empreinte_id, 'Satellite', '2025 · Single', '/cover-satellite.jpg', '1', 3,
   '[{"name":"Satellite","duration":"3:45"}]'),
  (empreinte_id, 'Ice Cold Knives', '2024 · Single', '/cover-ice-cold-knives.jpg', '2', 4,
   '[{"name":"Ice Cold Knives","duration":"3:52"}]'),
  (empreinte_id, 'Void', '2021 · EP · 19:36', '/cover-void.jpg', '1', 5,
   '[{"name":"Degenerate","duration":"2:56"},{"name":"Burning Paradise","duration":"3:58"},{"name":"Far Away","duration":"4:01"},{"name":"Not So Great","duration":"4:11"},{"name":"The Other World","duration":"4:28"}]');

-- Indicible
INSERT INTO artist_releases (artist_id, name, meta, cover_url, tilt, sort_order, tracks) VALUES
  (indicible_id, 'L''Ordre du Temple Solaire', '2024 · EP · 17:31', '/cover-ordre-temple.jpg', '1', 1,
   '[{"name":"The Well","duration":"2:53"},{"name":"L''Ordre du Temple Solaire","duration":"4:40"},{"name":"The Blasted Heath","duration":"4:45"},{"name":"Melted","duration":"5:12"}]'),
  (indicible_id, 'Melted', '2024 · Single', '/cover-melted.jpg', '2', 2,
   '[{"name":"Melted","duration":"5:12"}]'),
  (indicible_id, 'Indicible', '2023 · EP · 17:52', '/cover-indicible-ep.jpg', '1', 3,
   '[{"name":"Indicible","duration":"1:18"},{"name":"The Ring","duration":"3:48"},{"name":"Pure Horror","duration":"5:31"},{"name":"Light''s Bane","duration":"3:34"},{"name":"Shame","duration":"3:39"}]'),
  (indicible_id, 'Shame', '2023 · Single', '/cover-shame.jpg', '2', 4,
   '[{"name":"Shame","duration":"3:39"}]');

-- ============================================================
-- PAGES EPK
-- ============================================================

INSERT INTO epk_pages (artist_id, hero_photo_url, secondary_photo_url, tagline, quote, quote_source, bio, stats, booking_email, booking_contact, booking_label_name, genre_display, city_display)
VALUES
  (empreinte_id,
   '/epk/empreinte-pic1.jpg',
   '/epk/empreinte-pic2.jpg',
   'Du métal moderne qui frappe au casque comme sur scène — un rouleau compresseur d''énergie, vibrante, vivante.',
   'Premier uppercut de la soirée. Un set percutant, lourd et intense. Le groupe local a directement mis la barre très haut.',
   'Ben — BGP Music Live',
   'EMPREINTE poursuit sa route en 2026 avec un nouveau line-up : Yannis au chant, Lylian à la guitare et Félix à la batterie.

Le groupe reste déterminé à toujours proposer une musique originale et impactante, du métal moderne à écouter tantôt au casque pour une introspection partagée et centrée sur les thèmes abordés (le mal-être, la dépression…), tantôt en live pour se laisser embarquer dans un rouleau compresseur d''énergie, vibrante, vivante, comme un défouloir.

Premier album en préparation, prévu pour début 2027.

Dans la lignée de Northlane, Bad Omens.',
   '{"founded":"2018","years":"7","releases":"14","album":"2027"}',
   'contact@studiocarillon.fr',
   'Maud · 06 45 30 94 93',
   'Carillon · carillonlabel.fr',
   'Métal moderne',
   'Amiens, France'),

  (indicible_id,
   '/artist-indicible.jpg',
   '/epk/indicible-pic1.jpg',
   'Death Metal brutal et tranchant, entre groove dévastateur et slam impitoyable.',
   null, null,
   'INDICIBLE naît en 2023 à Amiens avec une volonté de proposer un Death Metal intense et percutant. Mêlant groove dévastateur, riffs brutaux et passages slam impitoyables, le groupe impose rapidement son identité sur la scène metal du nord de la France.',
   '{"founded":"2023","years":"3","releases":"4"}',
   'contact@studiocarillon.fr',
   'Maud · 06 45 30 94 93',
   'Carillon · carillonlabel.fr',
   'Death · Groove · Slam',
   'Amiens, France'),

  (feuillette_id,
   '/artist-feuillette.jpg',
   null,
   'Batteur professionnel · Session · Metal extrême',
   null, null,
   'Félix Feuillette est batteur de session spécialisé métal extrême. Actif depuis 2004, il cumule plus de 100 concerts et une tournée européenne en 2025.',
   '{"founded":"2004","years":"20+","releases":"100+"}',
   'contact@studiocarillon.fr',
   'Maud · 06 45 30 94 93',
   'Carillon · carillonlabel.fr',
   'Metal extrême · Session',
   'Amiens, France');

-- ============================================================
-- MEMBRES
-- ============================================================

INSERT INTO epk_members (artist_id, role, name, sort_order) VALUES
  (empreinte_id, 'Chant',    'YANNIS', 1),
  (empreinte_id, 'Guitare',  'LYLIAN', 2),
  (empreinte_id, 'Batterie', 'FELIX',  3),
  (indicible_id, 'Chant saturé & Guitare', 'GABRIEL D.', 1),
  (indicible_id, 'Guitare',  'BOB D.',    2),
  (indicible_id, 'Basse',    'ARTHUR D.', 3),
  (indicible_id, 'Batterie', 'FÉLIX F.',  4);

-- ============================================================
-- DATES DE CONCERT
-- ============================================================

-- Empreinte
INSERT INTO epk_dates (artist_id, date_str, lieu, sort_order) VALUES
  (empreinte_id, '05.02.2025', 'Lyon — La Pente', 1),
  (empreinte_id, '06.03.2025', 'Orléans — Le Dropkick', 2),
  (empreinte_id, '07.03.2025', 'Limoges — Le Dropkick', 3),
  (empreinte_id, '09.03.2025', 'Lille — La Brat Cave', 4),
  (empreinte_id, '13.03.2025', 'Charleroi — Le Vecteur (Belgique)', 5),
  (empreinte_id, '17.05.2025', 'Compiègne — Ziquodrome · avec Ashen & Alternight', 6),
  (empreinte_id, '13.09.2025', 'Bambiderstroff — Bambi Metal Fest', 7),
  (empreinte_id, '20.09.2025', 'Betz — Festival de la Voix Verte', 8),
  (empreinte_id, '12.11.2025', 'Marseille — Makeda', 9),
  (empreinte_id, '13.11.2025', 'Montpellier — Secret Place', 10),
  (empreinte_id, '12.12.2025', 'Amiens — Cité Carter', 11),
  (empreinte_id, '22.01.2026', 'Lille — Brat Cave', 12),
  (empreinte_id, '19.02.2026', 'Schaerbeek — Remifest', 13),
  (empreinte_id, '16.05.2026', 'Soissons — Esplanade du Mail — 1ère partie Ultra Vomit', 14);

-- Indicible
INSERT INTO epk_dates (artist_id, date_str, lieu, sort_order) VALUES
  (indicible_id, '25/05/2023', 'Beer Square, Lille', 1),
  (indicible_id, '03/06/2023', 'Jules Vernes Metal Days, Amiens', 2),
  (indicible_id, '10/06/2023', 'Kraken, St Quentin', 3),
  (indicible_id, '22/11/2023', 'Lune des Pirates, Amiens', 4),
  (indicible_id, '23/02/2024', 'Covent Garden, Eragny', 5),
  (indicible_id, '08/03/2024', '3 Pièces, Rouen', 6),
  (indicible_id, '06/04/2024', 'Reload Gaming Bar, Douai', 7),
  (indicible_id, '20/04/2024', 'Viry-Châtillon', 8),
  (indicible_id, '09/05/2024', 'Yeti Bar, Lille', 9),
  (indicible_id, '19/05/2024', 'Accueil Froid Nuke', 10),
  (indicible_id, '13/09/2024', '1001 Bières, Amiens — Release Party ODTS', 11),
  (indicible_id, '09/11/2024', 'McDaid''s, Le Havre', 12),
  (indicible_id, '10/11/2024', 'No Man''s Land Industry, Nantes', 13),
  (indicible_id, '11/11/2024', 'Dropkick Bar, Limoges', 14),
  (indicible_id, '22/11/2024', '3 Pièces, Rouen', 15),
  (indicible_id, '06/12/2024', 'Canadian Café, Tours', 16),
  (indicible_id, '07/12/2024', 'Dropkick, Orléans', 17),
  (indicible_id, '14/03/2025', 'Péniche Célestine, Amiens', 18),
  (indicible_id, '12/12/2025', 'Cité Carter, Amiens', 19),
  (indicible_id, '10/04/2026', '1001 Bières, Amiens', 20),
  (indicible_id, '22/05/2026', 'Les Passagers du Zinc, Besançon', 21);

-- ============================================================
-- CLIPS / MUSIC VIDEOS
-- ============================================================

INSERT INTO epk_clips (artist_id, title, feat, url, sort_order) VALUES
  (empreinte_id, 'SHATTERED MEMORIES', 'feat. Flo from Averses',          'https://bfan.link/shattered-memories-1', 1),
  (empreinte_id, 'MADNESS',             'feat. Clem Richard from ASHEN',   'https://www.youtube.com/watch?v=AcB1ULW5Q7k', 2),
  (empreinte_id, 'ICE COLD KNIVES',     null,                              'https://www.youtube.com/watch?v=fr7aAd8it9E', 3),
  (empreinte_id, 'SATELLITE',           null,                              'https://www.youtube.com/watch?v=Nzv9FKUQgMk', 4),
  (indicible_id, 'SHAME',               'Single · Official Music Video',   'https://www.youtube.com/watch?v=KSEu7m4QuDs', 1),
  (indicible_id, 'LIGHT''S BANE',       'Playthrough Guitar & Bass',       'https://www.youtube.com/watch?v=X3iDHfGpYTM', 2),
  (indicible_id, 'O.D.T.S.',            'Full EP 2024',                    'https://www.youtube.com/watch?v=DH2n81ECapY', 3);

-- ============================================================
-- TÉLÉCHARGEMENTS EPK
-- ============================================================

INSERT INTO epk_downloads (artist_id, label, file_type, file_url, sort_order) VALUES
  (empreinte_id, 'Press Kit 2025',      'PDF · 13 MB',  '/epk/downloads/empreinte-presskit-2025.pdf', 1),
  (empreinte_id, 'Rider d''accueil',    'PDF · 778 KB', '/epk/downloads/empreinte-rider-2025.pdf', 2),
  (empreinte_id, 'Fiche technique son', 'PDF · 413 KB', '/epk/downloads/empreinte-fiche-technique-son-2025.pdf', 3);

-- ============================================================
-- PHOTOS CARROUSEL EPK
-- ============================================================

INSERT INTO epk_photos (artist_id, photo_url, sort_order) VALUES
  (empreinte_id, '/carrousel/P1029864-600x600.jpg', 1),
  (empreinte_id, '/carrousel/P1090027-600x600.jpg', 2),
  (empreinte_id, '/carrousel/YANNIS-600x600.jpg',   3),
  (empreinte_id, '/carrousel/YANNIS2-600x600.jpg',  4),
  (indicible_id, '/epk/indicible-pic1.jpg', 1),
  (indicible_id, '/epk/indicible-pic2.jpg', 2),
  (indicible_id, '/epk/indicible-pic3.jpg', 3);

-- ============================================================
-- DISTINCTIONS
-- ============================================================

INSERT INTO epk_badges (artist_id, label, description) VALUES
  (empreinte_id, 'Trioffs 2024 — Espoir Booster',
   'Empreinte a su convaincre l''ensemble du jury par son identité marquée, son énergie live et sa capacité à faire vibrer une scène.');

END $$;
