
import config from "../config/config";
import { getHeaders, handleApiResponse } from "../helpers/apiHelpers";

const API_BASE_URL: string = `${config.BACK_URL}/products`; 

export const productApi = {
    getProducts: async () => {
        const url = API_BASE_URL;
        
        return fetchProducts(url);
    }
};

const fetchProducts = async (url : string, options?: RequestInit) => {
    const response = await fetch(`${url}`, {
        headers: getHeaders(),
        ...options
    });

    return handleApiResponse(response);
};