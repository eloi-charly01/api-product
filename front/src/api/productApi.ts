
import config from "../config/config";
import { getHeaders, handleApiResponse } from "../helpers/apiHelpers";
import { CreateProductPayload, Product } from "../types/productType";

const API_BASE_URL: string = `${config.BACK_URL}/products`; 

export const productApi = {
    getProducts: async (): Promise<Product[]> => {
        const url = API_BASE_URL;
        
        return fetchProducts(url);
    },
    createProduct: async (payload: CreateProductPayload): Promise<Product> => {
        return fetchProducts(API_BASE_URL, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },
};

const fetchProducts = async (url : string, options?: RequestInit) => {
    const response = await fetch(`${url}`, {
        headers: getHeaders(),
        ...options
    });

    return handleApiResponse(response);
};