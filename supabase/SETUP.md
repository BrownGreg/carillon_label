# Configuration Supabase — Carillon Label

## 1. Créer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com) et créer un compte (gratuit)
2. Créer un nouveau projet ("New project")
3. Choisir un nom (ex: `carillon-label`) et un mot de passe DB fort

## 2. Créer le schéma de base de données

1. Dans Supabase : aller dans **SQL Editor** > "New query"
2. Coller le contenu de `schema.sql`
3. Cliquer **Run**

## 3. Importer les données existantes

1. Dans le SQL Editor, "New query"
2. Coller le contenu de `seed.sql`
3. Cliquer **Run**

## 4. Créer le bucket Storage (pour les médias)

1. Aller dans **Storage** > "New bucket"
2. Nom : `media`
3. Cocher "Public bucket"
4. Cliquer "Save"

## 5. Configurer les variables d'environnement

### En local (développement)
1. Dans Supabase : **Settings** > **API**
2. Copier "Project URL" et "anon public" key
3. Copier `app/.env.local.example` en `app/.env.local`
4. Remplir les valeurs

### Sur Cloudflare Pages (production)
1. Cloudflare Dashboard → **Pages** → ton projet → **Settings** → **Environment Variables**
2. Cliquer "Add variable" pour chaque variable (dans les deux environnements : Production et Preview) :
   - `VITE_SUPABASE_URL` = URL de votre projet
   - `VITE_SUPABASE_ANON_KEY` = clé anon publique
3. Déclencher un nouveau déploiement (push ou "Retry deployment")

## 6. Créer le compte admin

1. Dans Supabase : **Authentication** > **Users** > "Invite user"
2. Entrer l'email du label (ex: `maud@studiocarillon.fr`)
3. Elle recevra un email pour créer son mot de passe

## 7. Accéder à l'admin

- URL : `carillonlabel.fr/admin`
- Se connecter avec l'email + mot de passe créé à l'étape 6

---

## Structure des pages

| URL | Source de données |
|-----|-------------------|
| `/roster` | Supabase si configuré, sinon données statiques |
| `/artiste/empreinte` | Page hardcodée (existante) |
| `/artiste/:slug` | Supabase (nouveaux artistes) |
| `/epk/empreinte` | Page hardcodée (existante) |
| `/epk/:slug` | Supabase (nouveaux EPKs) |
| `/admin` | Interface d'administration |

## Migration des artistes existants

Une fois Supabase configuré et le seed exécuté, les artistes existants
(Empreinte, Indicible, Feuillette) auront leur data en base.

Pour basculer vers les pages dynamiques, dans `App.jsx` :
- Supprimer les routes `ArtistEmpreintePage`, `ArtistIndiciblePage`, etc.
- Les routes `/artiste/:slug` et `/epk/:slug` prendront le relais automatiquement.

---

## Migrations (à passer dans l'ordre, SQL Editor)

Tous les scripts ci-dessous sont à exécuter **une seule fois**. Les deux derniers
sont ré-exécutables sans risque : ils ne modifient jamais une donnée existante
(contenu édité par le client depuis l'admin préservé).

| # | Fichier | État prod (18/11/2026) |
|---|---------|------------------------|
| 1 | `schema.sql` | ✅ appliqué |
| 2 | `seed.sql` | ✅ appliqué — **ne plus relancer** (écraserait les artistes) |
| 3 | `homepage_slides.sql` | ✅ appliqué — ne plus relancer |
| 4 | `artist_hero_focus.sql` | ✅ appliqué |
| 5 | `epk_dates_groupe.sql` | ✅ appliqué — **ne plus relancer** (dupliquerait les dates) |
| 6 | `about_page.sql` | ⏳ à passer |
| 7 | `roster_header.sql` | ⏳ à passer **avant** de déployer le front (sinon la sauvegarde d'un artiste échoue : colonne `kind` manquante) |
| 8 | `contact_page.sql` | ⏳ à passer (bandeau « Écris-nous » éditable — sans lui, le site garde la photo par défaut) |
