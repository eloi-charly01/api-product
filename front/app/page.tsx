"use client";

import { useProduct } from "@/src/hooks/product/useProduct";
import { Product } from "@/src/types/productType";
import { useState } from "react";
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const { useGetProducts } = useProduct();

  const productData = useGetProducts();
  if (productData.length && !products.length) {
    setProducts(productData);
  }

  console.log(productData)


  return (
   <div>
    <h1>Product List</h1>
    <ul>
      {products.map((product: Product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
   </div>
  );
}
