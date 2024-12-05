interface BaseURL {
    header: string;
}

let baseURL: BaseURL | null = null;

export async function getBaseURL(): Promise<BaseURL|null> {
    if (baseURL) return baseURL;
    try {
        const response = await fetch('/baseURL');
        baseURL = await response.json();
    } catch (error) {
        console.error('Error fetching baseURL:', error);
        throw error;
    }
   
    return baseURL;
}