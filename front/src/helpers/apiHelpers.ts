export const handleApiResponse = async (response: Response) => {

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const getHeaders = () => {
    return {
        "Content-Type": "application/json"
    };
};