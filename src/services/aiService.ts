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
  const prevYear = (parseInt(dataYear) - 1).toString();

  const systemPrompt = `You are an Expert Educational Counselor with access to a verified ${dataYear} database of Indian Colleges and Exams. 
  
  CRITICAL INSTRUCTIONS:
  1.  **REAL DATA ONLY**: You must provide ACTUAL, verifiably correct college names, specific locations, and REALISTIC fee structures (in INR Lakhs) and cutoffs (Percentiles/Ranks). 
  2.  **NO PLACEHOLDERS**: Do not use "TBD", "Varies", or generic text. Use ${dataYear} data; if not yet official, estimate based on ${prevYear} trends.
  3.  **Specifics**: For "Top Colleges", include the latest NIRF Rankings where applicable.
  4.  **NO DUPLICATES**: Do NOT include any of the following colleges: ${JSON.stringify(excludeTitles)}.
  
  Structure Output strictly as JSON:
  {
    "title": "string (e.g., 'Top 10 MBA Colleges in India (${dataYear})')",
    "description": "string (A professional, authoritative summary of the current landscape)",
    "items": [
      {
        "title": "string (Full Official Name of College)",
        "subtitle": "string (City, State | Affiliation/Accreditation)",
        "tags": ["string (e.g., 'NIRF Rank #1', 'Public', 'Avg Pkg: 35 LPA')"],
        "stats": [
           {"label": "Fees", "value": "string (e.g., '₹25 L')"},
           {"label": "Cutoff", "value": "string (e.g., '99.8%ile')"}
        ],
        "image": "string (Valid URL for logo/campus from wikipedia/commons or generic academic placeholder)",
        "link": "string (Official website URL)"
      }
    ],
    "content": "html string with h3, p, ul tags describing the topic in depth (min 300 words). Include admission process and key dates for ${dataYear}.",
    "faqs": [{"question": "string", "answer": "string (Detailed answer with ${dataYear} specifics)"}]
  }`;

  const isTop50 = topic.toLowerCase().includes('top 50');

  let promptContext = `List EXACTLY ${count} DISTINCT and UNIQUE top-tier institutions.`;
  let itemRequirements = `
  - ABOSLUTELY NO DUPLICATES from this list: ${JSON.stringify(excludeTitles)}.
  - THIS IS BATCH LOADING. Provide the NEXT ${count} best colleges that are NOT in the exclusion list.
  - Provide SPECIFIC ${dataYear} details. DO NOT use ${prevYear} data.
  - Stats MUST be: {"label": "Avg Pkg", "value": "₹XX LPA"}, {"label": "Fees", "value": "₹XX L"}
  - Tags MUST include NIRF Rank (if any) and Ownership (Public/Private).
  - IMPORTANT: Provide the **OFFICIAL WEBSITE URL** (e.g., 'iima.ac.in') for the 'link' field. This is CRITICAL for fetching the college logo.
  `;

  if (type === 'exam') {
    promptContext = `List EXACTLY ${count} critical details/sections or related exams for "${topic}". If the topic is a specific exam (e.g., "CAT ${dataYear}"), list key modules, preparation stages, or top colleges accepting it.`;
    itemRequirements = `
    - Focus on useful, actionable items related to the exam (e.g., "Quantitative Ability", "Verbal", "IIM Ahmedabad (Accepts CAT)", "Mock Tests").
    - Stats should be: {"label": "Date/Deadline", "value": "..."}, {"label": "Difficulty", "value": "..."}
    - Link to official exam portals.
    `;
  } else if (type === 'generic' || type === 'tool') {
    promptContext = `List EXACTLY ${count} useful resources, tools, or tips related to "${topic}".`;
    itemRequirements = `
    - Provide practical tools or sub-topics (e.g., "EMI Calculator", "Scholarship Portal", "Comparison Tool").
    - Stats: {"label": "Utility", "value": "High"}, {"label": "Cost", "value": "Free/Paid"}
    - Link to real, useful tools or pages.
    `;
  }

  const userPrompt = `Generate a comprehensive, data-rich guide for "${topic}" (Type: ${type}). 
  Target Audience: Indian Students aiming for ${dataYear} admissions.
  IMPORTANT: Only use ${dataYear} data. Do NOT use ${prevYear} or older data.
  Requirements:
  - ${promptContext}
  ${itemRequirements}
  - For 'image', you can leave it empty or use a high-confidence Wikipedia URL.
  `;

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
  const prompt = `Generate 6 DISTINCT student reviews for "${collegeName}" (India) from 6 DIFFERENT STUDENT PERSONAS.
    
    CRITICAL: YOU MUST ADOPT THESE 6 SPECIFIC PERSONAS for the reviews to ensure they are unique:
    1.  **The "Academic Topper"**: Focuses ONLY on labs, professors, huge library, and strict attendance. (Name: nerdier/studious name)
    2.  **The "Hosteler"**: Focuses on mess food, late night canteen (give specific name if known), room size, and freedom. (Name: casual name)
    3.  **The "Placement Hunter"**: Obsessed with ROI, average package, and which specific companies visited. (Name: corporate sounding)
    4.  **The "Fest Coordinator"**: Focuses on the cultural fest (Name specific fest!), clubs, and campus vibes.
    5.  **The "Critical Senior"**: A balanced, slightly cynical view. Mentions what is OVERHYPE vs what is actually good.
    6.  **The "Sports Enthustiast"**: Focuses on the cricket ground, gym, and sports facilities.

    MANDATORY: Mention SPECIFIC REAL-WORLD DETAILS for ${collegeName} (e.g., specific building names, local hangouts, specific companies).

    Output JSON keys: 
    - title ("${collegeName}")
    - description (A summary verdict of the college)
    - items (Array of 6 reviews corresponding to the persosnas above: { title: "Persona-based title", subtitle: "Name, Stream 'Year", content: "Review text matching the persona.", rating: "1-5" })
    - stats (Array: [{label: "Placements", value: "x/5"}, {label: "Campus", value: "x/5"}, {label: "Vibe", value: "x/5"}])
    `;

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
  const prompt = `User is typing: "${query}".
    Suggest up to 5 popular Indian colleges that match this prefix/query.
    Examples:
    "II" -> ["IIT Bombay", "IIT Delhi", "IIIT Hyderabad", "IIM Ahmedabad", "IISC Bangalore"]
    "BITS" -> ["BITS Pilani", "BITS Goa", "BITS Hyderabad"]
    
    Output strictly a JSON array of strings. No text.
    `;

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
