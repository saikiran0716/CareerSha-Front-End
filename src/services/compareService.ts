/** Colleges picked for comparison (max 4), kept in this browser and shared across pages. */

const KEY = 'careersha:compare';
export const MAX_COMPARE = 4;

const listeners = new Set<() => void>();

const read = (): string[] => {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(list) ? list.slice(0, MAX_COMPARE) : [];
  } catch {
    return [];
  }
};

const write = (list: string[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l());
};

export const compareService = {
  list: read,
  has: (slug: string) => read().includes(slug),
  /** Adds or removes a college. Returns false if the list is full. */
  toggle(slug: string): boolean {
    const list = read();
    if (list.includes(slug)) {
      write(list.filter((s) => s !== slug));
      return true;
    }
    if (list.length >= MAX_COMPARE) return false;
    write([...list, slug]);
    return true;
  },
  remove: (slug: string) => write(read().filter((s) => s !== slug)),
  set: (slugs: string[]) => write([...new Set(slugs)].slice(0, MAX_COMPARE)),
  clear: () => write([]),
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
