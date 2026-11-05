export type ProductStatus = "available" | "out_of_stock" | "discontinued" | "unavailable";

export type Product = {
  id: string;
  name: string;
  description: string;
  sku: string;
  status: ProductStatus;
};

export type CreateProductPayload = Omit<Product, "id">;