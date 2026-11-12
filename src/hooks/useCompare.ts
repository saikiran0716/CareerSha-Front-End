import { useEffect, useState } from 'react';
import { compareService } from '../services/compareService';

/** Slugs currently picked for comparison; updates everywhere when the list changes. */
export const useCompare = (): string[] => {
  const [list, setList] = useState<string[]>(compareService.list);
  useEffect(() => compareService.subscribe(() => setList(compareService.list())), []);
  return list;
};
