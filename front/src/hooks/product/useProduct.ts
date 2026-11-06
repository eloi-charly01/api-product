import { productApi } from "@/src/api/productApi";
import { CreateProductPayload, Product } from "@/src/types/productType";
import { useEffect, useState } from "react";

export const useProduct = () => {
    const useGetProducts = () => {
        const [products, setProducts] = useState<Product[]>([]);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const productData = await productApi.getProducts();
                    setProducts(productData);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchProducts();
        }, []);

        return { products, isLoading };
    };

    const createProduct = async (payload: CreateProductPayload): Promise<Product> => {
        return productApi.createProduct(payload);
    };

    return { useGetProducts, createProduct };
};
