// Libellé automatique du nombre d'artistes : "2 groupes + 1 artiste"
// (kind = 'groupe' | 'artiste' ; défaut 'groupe' si la colonne n'existe pas encore)
export function rosterCountLabel(artists = []) {
  const groupes = artists.filter(a => (a.kind || 'groupe') === 'groupe').length
  const solos = artists.length - groupes
  const parts = []
  if (groupes) parts.push(`${groupes} groupe${groupes > 1 ? 's' : ''}`)
  if (solos) parts.push(`${solos} artiste${solos > 1 ? 's' : ''}`)
  return parts.join(' + ')
}

export const ROSTER_PAGE_DEFAULTS = {
  count_text: '',          // vide = calcul automatique
  styles: 'Metalcore / Death / Hardcore',
  tagline: 'Des artistes aux profils différents partageant les mêmes valeurs',
}
