import { afterEach, describe, expect, it, vi } from 'vitest';
import { saveReportLocally } from './storageService';
import { EMPTY_PROFILE, toStudentProfile, userData } from './userDataService';
import { signIn } from '../test/utils';
import { AIResponse } from '../types';

const profile = toStudentProfile('Priya', EMPTY_PROFILE);
const response = { recommendations: [], summary: 'Great fit for CSE' } as unknown as AIResponse;

afterEach(() => vi.unstubAllGlobals());

describe('saveReportLocally', () => {
  it('keeps a local copy for signed-out students', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const id = await saveReportLocally(profile, response);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(userData.getReport(id)?.recommendation.summary).toBe('Great fit for CSE');
  });

  it('sends signed-in reports to the server and keeps a local copy with the server id', async () => {
    signIn();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 77 }) });
    vi.stubGlobal('fetch', fetchMock);

    const id = await saveReportLocally(profile, response);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/reports/save/'),
      expect.objectContaining({ method: 'POST' }),
    );
    expect(id).toBe('77');
    expect(userData.getReports().map((r) => r.id)).toEqual(['77']);
  });

  it('still saves locally when the server is unreachable', async () => {
    signIn();
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const id = await saveReportLocally(profile, response);

    expect(userData.getReport(id)).not.toBeNull();
  });
});
