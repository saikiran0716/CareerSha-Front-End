import { buildApiUrl } from './apiConfig';

export const getTestMessage = async () => {
    try {
        const response = await fetch(buildApiUrl('/test/'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
};
