import { StudentProfile, AIResponse } from '../types';
import { authService } from './authService';
import { buildApiUrl } from './apiConfig';
import { userData } from './userDataService';

/**
 * Saves a career report. Signed-in users' reports are also sent to the backend;
 * a copy is always kept locally so it shows up under "My Reports".
 */
export const saveReportLocally = async (profile: StudentProfile, response: AIResponse) => {
  const user = authService.getCurrentUser();
  let id: string | undefined;

  if (user?.token) {
    try {
      const res = await fetch(buildApiUrl('/reports/save/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${user.token}` },
        body: JSON.stringify({ profile, recommendation: response }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.id !== undefined) id = String(data.id);
      }
    } catch (e) {
      console.error('Failed to save report to the server; keeping a local copy:', e);
    }
  }

  return userData.addReport(profile, response, id).id;
};
