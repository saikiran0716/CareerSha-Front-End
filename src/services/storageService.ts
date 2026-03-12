import { StudentProfile, AIResponse } from "../types";
import { authService } from "./authService";
import { buildApiUrl } from "./apiConfig";

export interface SavedReport {
  id: string; // ID from DB or temp
  studentName: string;
  profile: StudentProfile;
  recommendation: AIResponse;
  createdAt: string;
}

/**
 * Saves a student's profile and recommendation to the Database (via Backend API).
 * Fallback to local storage if not logged in or error.
 */
export const saveReportLocally = async (profile: StudentProfile, response: AIResponse) => {
  const user = authService.getCurrentUser();

  if (user && user.token) {
    try {
      const res = await fetch(buildApiUrl('/reports/save/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${user.token}`
        },
        body: JSON.stringify({
          profile: profile,
          recommendation: response
        })
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Report saved to database:", data.id);
        return data.id;
      }
    } catch (e) {
      console.error("Failed to save to DB, falling back to local:", e);
    }
  }

  // Fallback / Guest Mode
  try {
    const REPORTS_KEY = 'edupath_reports';
    const reportsStr = localStorage.getItem(REPORTS_KEY);
    const reports: SavedReport[] = reportsStr ? JSON.parse(reportsStr) : [];

    const newReport: SavedReport = {
      id: crypto.randomUUID(),
      studentName: profile.name,
      profile: profile,
      recommendation: response,
      createdAt: new Date().toISOString(),
    };

    reports.unshift(newReport);
    localStorage.setItem(REPORTS_KEY, JSON.stringify(reports.slice(0, 10)));
    console.log("Report saved locally (Guest).");
    return newReport.id;
  } catch (e) {
    console.error("Local storage error:", e);
    return null;
  }
};
