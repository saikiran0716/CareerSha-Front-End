import { getJson, mediaUrl } from './catalogService';

export type MaterialKind = 'question-paper' | 'answer-key' | 'solution' | 'sample-paper' | 'syllabus';

/** A question paper, answer key, solution, sample paper or syllabus (from GET /api/study-materials/). */
export interface StudyMaterial {
  id: number;
  title: string;
  exam: string;
  examSlug: string;
  stream: string;
  kind: MaterialKind;
  kindLabel: string;
  year: number | null;
  session: string;
  subject: string;
  language: string;
  source: string;
  /** Uploaded PDF on CareerSha, or a direct link to the official file/page. */
  url: string;
  isUpload: boolean;
}

export interface MaterialFacets {
  streams: { id: string; label: string; count: number }[];
  exams: { slug: string; name: string; stream: string; count: number }[];
  kinds: { id: MaterialKind; label: string; count: number }[];
  years: number[];
}

export interface MaterialQuery {
  stream?: string;
  exam?: string;
  kind?: string;
  year?: number | string;
  q?: string;
  page?: number;
  pageSize?: number;
}

export interface MaterialList {
  count: number;
  page: number;
  pageSize: number;
  results: StudyMaterial[];
  facets: MaterialFacets;
}

export const MATERIALS_PAGE_SIZE = 30;

export const materialQueryString = (query: MaterialQuery): string => {
  const params = new URLSearchParams();
  (['stream', 'exam', 'kind', 'year', 'q'] as const).forEach((key) => {
    const value = query[key];
    if (value !== undefined && value !== null && String(value).trim() !== '') params.set(key, String(value).trim());
  });
  if (query.page && query.page > 1) params.set('page', String(query.page));
  params.set('page_size', String(query.pageSize ?? MATERIALS_PAGE_SIZE));
  return params.toString();
};

export const listStudyMaterials = async (query: MaterialQuery = {}): Promise<MaterialList> => {
  const data = await getJson<MaterialList>(`/study-materials/?${materialQueryString(query)}`);
  if (!data) throw new Error('Study material not found');
  return { ...data, results: data.results.map((item) => ({ ...item, url: mediaUrl(item.url) })) };
};

/** True when the link is a PDF file (uploaded or ending in .pdf), so the button can say "Download PDF". */
export const isPdf = (item: Pick<StudyMaterial, 'url' | 'isUpload'>) =>
  item.isUpload || /\.pdf($|[?#])/i.test(item.url);
