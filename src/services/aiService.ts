import { StudentProfile, AIResponse, College, CollegeDetail } from "../types";
import { buildApiUrl } from "./apiConfig";

// Interfaces matching the original types
export interface RankEstimation {
  predictedRank: string;
  categoryRank?: string;
  percentile: string;
  analysis: string;
  colleges?: College[];
}

export interface ChatResponse {
  text: string;
  sources: { title: string; uri: string }[];
}

export interface PageData {
  title: string;
  description: string;
  items: any[];
  type: 'college' | 'exam' | 'generic' | 'review';
  content?: string;
  faqs?: { question: string; answer: string }[];
}

// Helper for Backend AI Calls
const callBackendAI = async (endpoint: string, payload: any) => {
  const endpointUrl = buildApiUrl(`/ai/${endpoint}/`);
  console.log(`Calling Backend AI endpoint: ${endpointUrl}`);
  
  try {
    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Backend API Error: ${response.status} - ${errText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Backend call failed to ${endpoint}:`, error);
    throw error;
  }
};

export const getCareerGuidance = async (profile: StudentProfile): Promise<AIResponse> => {
  const result = await callBackendAI('career-guidance', profile);
  
  // Add fallback sources if backend doesn't provide them
  if (!result.sources) {
    result.sources = [
      { title: "NIRF 2024 Ranking", uri: "https://www.nirfindia.org" },
      { title: "Careers360 Data", uri: "https://www.careers360.com" }
    ];
  }

  return result as AIResponse;
};

export const discoverCollegesLive = async (location: string, rank: string, exam: string, category: string, page: number = 1): Promise<College[]> => {
  const results = await callBackendAI('discover-colleges', { location, rank, exam, category, page });
  return Array.isArray(results) ? results : (results.colleges || []);
};

export const estimateRank = async (exam: string, score: string, category: string, filters: string = ''): Promise<RankEstimation> => {
  return await callBackendAI('estimate-rank', { exam, score, category, filters }) as RankEstimation;
};

export const resolveLiveResultLink = async (examName: string): Promise<string> => {
  // Keeping this simple or you could add a backend endpoint for it
  try {
    // For now, redirect through our chat or a general search logic
    const data = await callBackendAI('chat', { message: `Find official result link for ${examName}` });
    return data.url || '';
  } catch (e) {
    console.error("Link resolution failed", e);
    return '';
  }
};

export const chatWithCounselor = async (history: any[], message: string, profile: StudentProfile, conversationSummary: string = ''): Promise<ChatResponse> => {
  return await callBackendAI('chat', { history, message, profile, conversationSummary }) as ChatResponse;
};

export const getFooterPageContent = async (topic: string, type: string, excludeTitles: string[] = [], count: number = 6): Promise<PageData> => {
  // Derive the year from the topic title (e.g. "CAT 2026" -> "2026"), fallback to current year
  const yearMatch = topic.match(/(20\d{2})/);
  const dataYear = yearMatch ? yearMatch[1] : new Date().getFullYear().toString();
  try {
    const data = await callBackendAI('footer-content', { topic, type, excludeTitles, count, dataYear });
    
    // Post-Processing: Deduplicate items by title against existing list and self
    if (data.items && Array.isArray(data.items)) {
      const uniqueItems = new Map();
      const normalizedExcludes = new Set(excludeTitles.map(t => t.trim().toLowerCase()));

      data.items.forEach(item => {
        const normalizedTitle = item.title.trim().toLowerCase();
        if (!uniqueItems.has(normalizedTitle) && !normalizedExcludes.has(normalizedTitle)) {
          uniqueItems.set(normalizedTitle, item);
        }
      });
      data.items = Array.from(uniqueItems.values());
    }
    return data;
  } catch (error) {
    console.error("Error fetching footer page content:", error);
    throw error;
  }
};
// NEW: College Review Generator
export const getCollegeReviews = async (collegeName: string): Promise<PageData> => {
  try {
    const data = await callBackendAI('college-reviews', { collegeName });
    return {
      title: data.title || `${collegeName} Reviews`,
      description: data.description || "Student reviews and ratings.",
      items: data.items || [],
      type: 'review',
      content: data.description
    };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return {
      title: `${collegeName} Reviews`,
      description: "Could not load reviews at this time.",
      items: [],
      type: 'review'
    };
  }
};

// NEW: College Autocomplete
export const getCollegeSuggestions = async (query: string): Promise<string[]> => {
  try {
    const data = await callBackendAI('college-suggestions', { query });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};

export const getCollegeDetails = async (collegeName: string): Promise<CollegeDetail | null> => {
  try {
    return await callBackendAI('college-details', { collegeName }) as CollegeDetail;
  } catch (error) {
    console.error("Error fetching college details:", error);
    return null;
  }
};
