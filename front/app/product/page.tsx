"use client";

import { AppHeader } from "@/src/components/layout/AppHeader";
import { ProductDetailCard } from "@/app/product/components/product/ProductDetailCard";
import { ProductRow } from "@/app/product/components/product/ProductRow";
import { useProduct } from "@/src/hooks/product/useProduct";
import {
  CreateProductPayload,
  Product,
  ProductStatus,
} from "@/src/types/productType";
import { FormEvent, useState } from "react";
import { CreateButton } from "@/src/components/ui/CreateButton";
import { Modal } from "@/src/components/ui/Modal";

const INITIAL_FORM_STATE: CreateProductPayload = {
  name: "",
  sku: "",
  description: "",
  status: "available",
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [formData, setFormData] =
    useState<CreateProductPayload>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { useGetProducts, createProduct } = useProduct();

  const productData = useGetProducts();
  if (productData.length && !products.length) {
    setProducts(productData);
  }

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setFormData(INITIAL_FORM_STATE);
    setFormError(null);
  };

  const handleCreateProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.sku.trim()) {
      setFormError("Le nom du produit et le SKU sont obligatoires.");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const created = await createProduct({
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        description: formData.description.trim(),
        status: formData.status,
      });

      setProducts((prev) => [created, ...prev]);
      handleCloseCreateModal();
    } catch {
      setFormError(
        "Impossible de créer le produit. Vérifiez que le backend est démarré."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!productData.length && !products.length) {
    return (
      <div className="min-h-screen bg-[#F4F6F9] text-slate-900">
        <AppHeader />

        <main className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-lg border border-slate-200 bg-white p-10 text-center shadow-xs">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
            <p className="mt-3 text-sm font-medium text-slate-700">
              Chargement des produits...
            </p>
          </div>
        </main>
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      (product.sku && product.sku.toLowerCase().includes(query)) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
  });

  const handleDeleteLocal = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* En-tête de la page produit avec bouton Créer */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Product List
              </h1>
              <span className="inline-flex items-center rounded-md bg-slate-200/80 px-2.5 py-0.5 font-mono text-xs font-medium text-slate-700">
                {filteredProducts.length} / {products.length}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Consultez les références du catalogue et utilisez les actions Détail, Modifier ou Supprimer sur chaque ligne.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher nom ou SKU..."
                className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none sm:w-64"
              />
            </div>

            <CreateButton
              label="Créer"
              onClick={() => setIsCreateModalOpen(true)}
            />
          </div>
        </div>

        {/* Liste / Tableau des produits avec chaque ligne équipée de Détail, Modifier, Supprimer */}
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs">
          <div className="hidden grid-cols-12 border-b border-slate-200 bg-slate-50/80 px-6 py-3 text-xs font-medium text-slate-500 md:grid">
            <div className="col-span-2">SKU</div>
            <div className="col-span-4">Produit & Description</div>
            <div className="col-span-2">Statut</div>
            <div className="col-span-4 text-right">Actions</div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium text-slate-700">
                Aucun produit ne correspond à votre recherche.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Essayez un autre terme ou créez une nouvelle référence.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-200">
              {filteredProducts.map((product: Product) => (
                <li key={product.id}>
                  <ProductRow
                    product={product}
                    onSelect={setSelectedProduct}
                    onEdit={setSelectedProduct}
                    onDelete={handleDeleteLocal}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Modal réutilisable : affichage du détail d'un produit */}
        <ProductDetailCard
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />

        {/* Modal réutilisable : création d'un nouveau produit dans le composant parent */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          title="Créer un nouveau produit"
          subtitle="Renseignez les informations de la nouvelle référence pour l’ajouter au catalogue."
        >
          <form onSubmit={handleCreateProduct} className="space-y-4">
            {formError && (
              <div className="rounded-md border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-medium text-rose-700">
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="product-name"
                  className="block text-xs font-medium text-slate-700"
                >
                  Nom du produit
                </label>
                <input
                  id="product-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Ex. : Écran Dell 27 pouces"
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="product-sku"
                  className="block text-xs font-medium text-slate-700"
                >
                  Référence SKU
                </label>
                <input
                  id="product-sku"
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, sku: e.target.value }))
                  }
                  placeholder="Ex. : MON-02"
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="product-status"
                className="block text-xs font-medium text-slate-700"
              >
                Statut de disponibilité
              </label>
              <select
                id="product-status"
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as ProductStatus,
                  }))
                }
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
              >
                <option value="available">En stock (available)</option>
                <option value="out_of_stock">Rupture (out_of_stock)</option>
                <option value="discontinued">Arrêté (discontinued)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="product-description"
                className="block text-xs font-medium text-slate-700"
              >
                Description
              </label>
              <textarea
                id="product-description"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Décrivez les caractéristiques principales du produit..."
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={handleCloseCreateModal}
                className="cursor-pointer rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow-xs transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Enregistrement..." : "Enregistrer le produit"}
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}

