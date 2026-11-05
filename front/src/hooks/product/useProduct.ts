import { productApi } from "@/src/api/productApi";
import { CreateProductPayload, Product } from "@/src/types/productType";
import { useEffect, useState } from "react";

export const useProduct = () => {
    const useGetProducts = () => {
        const [products, setProducts] = useState<Product[]>([]);

        useEffect(() => {
            const fetchProducts = async () => {
                const productData = await productApi.getProducts();
                setProducts(productData);
            };

            fetchProducts();
        }, []);

        return products;
    };

    const createProduct = async (payload: CreateProductPayload): Promise<Product> => {
        return productApi.createProduct(payload);
    };

    return { useGetProducts, createProduct };
};
