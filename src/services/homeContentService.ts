import { buildApiUrl, SERVER_ROOT } from './apiConfig';
import { CoursoalItem, coursoalData } from '../assets/coursoal/data';

const toImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SERVER_ROOT}${normalizedPath}`;
};

type CarouselApiItem = {
  id: number;
  image: string;
  link: string;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
};

export const getHomepageCarouselItems = async (): Promise<CoursoalItem[]> => {
  try {
    const response = await fetch(buildApiUrl('/content/homepage-carousel/'));
    if (!response.ok) {
      throw new Error(`Failed to fetch homepage carousel: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      return coursoalData;
    }

    return data.map((item: CarouselApiItem) => {
      return {
        id: item.id,
        title: item.title || '',
        subtitle: item.subtitle || '',
        description: item.description || '',
        image: toImageUrl(item.image),
        link: item.link,
        buttonText: item.buttonText || 'Click Here',
      };
    });
  } catch (error) {
    console.error('Failed to load homepage carousel items:', error);
    return coursoalData;
  }
};