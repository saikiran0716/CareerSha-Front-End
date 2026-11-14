/**
 * Sample-data sources for the college list pages (/eng/hyd, /mbbs/india, /mba/delhi, …).
 * collegeListService combines these into one list per page; when the backend is ready only
 * the service changes (see docs/api/college-lists-api.md).
 */
import { PageItem } from '../types';
import { ALL_ENGG } from '../engineering/engData';
import { ENG_BANGALORE } from '../engineering/engDataBangalore';
import { ENG_DELHI } from '../engineering/engDataDelhi';
import { ENG_HYDERABAD } from '../engineering/engDataHyderabad';
import { ENG_IITS } from '../engineering/engDataIITs';
import { ENG_INDIA } from '../engineering/engDataIndia';
import { ENG_MTECH } from '../engineering/engDataMTech';
import { ENG_MUMBAI } from '../engineering/engDataMumbai';
import { ENG_NITS } from '../engineering/engDataNITs';
import { ALL_MBA } from '../mba/mbaData';
import { MBA_BANGALORE } from '../mba/mbaDataBangalore';
import { MBA_DELHI } from '../mba/mbaDataDelhi';
import { MBA_DISTANCE } from '../mba/mbaDataDistance';
import { MBA_EXECUTIVE } from '../mba/mbaDataExecutive';
import { MBA_IIMS } from '../mba/mbaDataIIMs';
import { MBA_INDIA } from '../mba/mbaDataIndia';
import { MBA_MUMBAI } from '../mba/mbaDataMumbai';
import { MBA_ONLINE } from '../mba/mbaDataOnline';
import { MED_INDIA } from '../medical/medDataIndia';
import { MED_AIIMS } from '../medical/medDataAIIMS';
import { MED_PG } from '../medical/medDataPG';
import { ALL_BDS } from '../medical/bdsData';
import { ALL_PHARMA } from '../medical/pharmaData';
import { ALL_NURSING } from '../medical/nursingData';
import { ALL_PARAMEDICAL } from '../medical/paramedicalData';

export type ListStream =
  | 'Engineering'
  | 'Management'
  | 'Medical'
  | 'Dental'
  | 'Pharmacy'
  | 'Nursing'
  | 'Paramedical'
  | 'Design'
  | 'Law'
  | 'Commerce'
  | 'Hospitality';

/** Every sample college of a stream (used for city pages and to fill thin lists). */
export const STREAM_POOLS: Record<ListStream, PageItem[]> = {
  Engineering: [
    ...ENG_INDIA,
    ...ENG_IITS,
    ...ENG_NITS,
    ...ALL_ENGG,
    ...ENG_HYDERABAD,
    ...ENG_BANGALORE,
    ...ENG_DELHI,
    ...ENG_MUMBAI,
  ],
  Management: [...MBA_INDIA, ...MBA_IIMS, ...ALL_MBA, ...MBA_DELHI, ...MBA_BANGALORE, ...MBA_MUMBAI],
  Medical: [...MED_INDIA, ...MED_AIIMS],
  Dental: ALL_BDS,
  Pharmacy: ALL_PHARMA,
  Nursing: ALL_NURSING,
  Paramedical: ALL_PARAMEDICAL,
  Design: [],
  Law: [],
  Commerce: [],
  Hospitality: [],
};

/** Page slug prefix → stream. `city-` pages cover every stream. */
export const PREFIX_STREAM: Record<string, ListStream> = {
  eng: 'Engineering',
  iits: 'Engineering',
  nits: 'Engineering',
  btech: 'Engineering',
  mba: 'Management',
  med: 'Medical',
  mbbs: 'Medical',
  aiims: 'Medical',
  bds: 'Dental',
  pharma: 'Pharmacy',
  nursing: 'Nursing',
  paramedical: 'Paramedical',
  design: 'Design',
  law: 'Law',
  commerce: 'Commerce',
  hospitality: 'Hospitality',
};

/** Pages with their own curated list (shown first, in this order). */
export const CURATED: Record<string, PageItem[]> = {
  'eng-india': ENG_INDIA,
  'btech-india': ENG_INDIA,
  'eng-top-colleges': ENG_INDIA,
  'eng-cse': ENG_INDIA,
  'eng-ece': ENG_INDIA,
  'eng-mechanical': ENG_INDIA,
  'iits-india': ENG_IITS,
  'nits-india': ENG_NITS,
  'eng-mtech': ENG_MTECH,
  'eng-hyd': ENG_HYDERABAD,
  'eng-hyderabad': ENG_HYDERABAD,
  'eng-bangalore': ENG_BANGALORE,
  'eng-delhi': ENG_DELHI,
  'eng-new-delhi': ENG_DELHI,
  'eng-mumbai': ENG_MUMBAI,
  'mba-india': MBA_INDIA,
  'mba-top-colleges': MBA_INDIA,
  'mba-iims': MBA_IIMS,
  'mba-delhi': MBA_DELHI,
  'mba-new-delhi': MBA_DELHI,
  'mba-bangalore': MBA_BANGALORE,
  'mba-mumbai': MBA_MUMBAI,
  'mba-executive': MBA_EXECUTIVE,
  'mba-distance': MBA_DISTANCE,
  'mba-online': MBA_ONLINE,
  'med-india': MED_INDIA,
  'mbbs-india': MED_INDIA,
  'med-top-colleges': MED_INDIA,
  'med-government': MED_INDIA,
  'aiims-colleges': MED_AIIMS,
  'med-pg': MED_PG,
  'bds-india': ALL_BDS,
  'pharma-india': ALL_PHARMA,
  'nursing-india': ALL_NURSING,
  'paramedical-india': ALL_PARAMEDICAL,
};

/** Pages that only list one kind of ownership. */
export const OWNERSHIP_ONLY: Record<string, 'Government'> = { 'med-government': 'Government' };

/** Slug spellings → the city names used in the data. */
export const CITY_ALIASES: Record<string, string[]> = {
  hyd: ['hyderabad', 'secunderabad', 'gachibowli', 'kukatpally', 'sangareddy'],
  hyderabad: ['hyderabad', 'secunderabad', 'gachibowli', 'kukatpally', 'sangareddy'],
  'new-delhi': ['delhi', 'new delhi'],
  delhi: ['delhi', 'new delhi'],
  bangalore: ['bangalore', 'bengaluru'],
  gurgaon: ['gurgaon', 'gurugram'],
  noida: ['noida', 'greater noida'],
  mumbai: ['mumbai', 'powai', 'bombay'],
};
