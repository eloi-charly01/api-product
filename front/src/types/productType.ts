export type Product = {
  id: string;
  name: string;
  description: string;
  sku: string;
  status: "available" | "unavailable";
};