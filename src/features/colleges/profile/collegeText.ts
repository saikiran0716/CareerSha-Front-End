/** Text helpers for the college profile page. */
import { CatalogCollege } from '../../../data/catalog/types';

/** 3672207091 -> "₹367.2 Cr", 172854705 -> "₹17.3 Cr", 3500000 -> "₹35 L". */
export const rupees = (n: number) => {
  if (n >= 1e7) return `₹${+(n / 1e7).toFixed(1)} Cr`;
  if (n >= 1e5) return `₹${+(n / 1e5).toFixed(1)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

/** One sentence about a college built from its facts, for colleges without a written About text. */
export const generatedAbout = (c: CatalogCollege, place: string) => {
  const owner = c.ownership === 'Government' ? 'government' : c.ownership === 'Private' ? 'private' : '';
  const kind = c.universityType
    ? c.universityType.toLowerCase()
    : (c.collegeType ?? (c.stream !== 'Other' ? `${c.stream.toLowerCase()} institution` : 'institution')).toLowerCase();
  const words = [owner, kind].filter(Boolean).join(' ');
  const article = /^[aeiou]/i.test(words) ? 'an' : 'a';
  let text = `${c.name} is ${article} ${words}${place ? ` in ${place}` : ''}`;
  if (c.established) text += `, established in ${c.established}`;
  text += '.';
  if (c.affiliatedUniversity) text += ` It is affiliated to ${c.affiliatedUniversity.name}.`;
  if (c.locationType) text += ` The campus is in a${c.locationType === 'Urban' ? 'n urban' : ' rural'} area.`;
  return text;
};
