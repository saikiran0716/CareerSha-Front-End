import { describe, expect, it } from 'vitest';
import { pageNumbers } from './Pagination';

describe('pageNumbers', () => {
  it('lists every page when there are few', () => {
    expect(pageNumbers(1, 3)).toEqual([1, 2, 3]);
    expect(pageNumbers(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('keeps the first, last and a window around the current page', () => {
    expect(pageNumbers(1, 13)).toEqual([1, 2, 3, 4, 5, '…', 13]);
    expect(pageNumbers(7, 13)).toEqual([1, '…', 6, 7, 8, '…', 13]);
    expect(pageNumbers(13, 13)).toEqual([1, '…', 9, 10, 11, 12, 13]);
  });

  it('never hides a single page behind "…"', () => {
    expect(pageNumbers(4, 13)).toEqual([1, 2, 3, 4, 5, '…', 13]);
    expect(pageNumbers(10, 13)).toEqual([1, '…', 9, 10, 11, 12, 13]);
  });
});
