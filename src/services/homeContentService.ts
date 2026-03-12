import { CarouselItem, carouselData } from '../assets/carousel/data';
import { buildApiUrl } from './apiConfig';

type CarouselApiItem = {
  id: number;
  image: string;
  link: string;
};

export const getHomepageCarouselItems = async (): Promise<CarouselItem[]> => {
  try {
    const response = await fetch(buildApiUrl('/content/homepage-carousel/'));
    if (!response.ok) {
      throw new Error(`Failed to fetch homepage carousel: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      return carouselData;
    }

    return data.map((item: CarouselApiItem, index: number) => {
      const fallbackItem = carouselData[index % carouselData.length];

      return {
        id: item.id,
        title: fallbackItem?.title || 'CAREERSHA',
        subtitle: fallbackItem?.subtitle || 'CareerSha Story',
        description: fallbackItem?.description || 'Explore the latest featured guidance on CareerSha.',
        image: item.image,
        link: item.link,
        buttonText: fallbackItem?.buttonText || 'Explore Now',
      };
    });
  } catch (error) {
    console.error('Failed to load homepage carousel items:', error);
    return carouselData;
  }
};