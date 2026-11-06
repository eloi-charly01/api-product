"use client";

import Link from "next/link";
import { AppHeader } from "@/src/components/layout/AppHeader";
import { ProductDetailCard } from "@/app/product/components/product/ProductDetailCard";
import { ProductRow } from "@/app/product/components/product/ProductRow";
import { StatCard } from "@/src/components/ui/StatCard";
import { useProduct } from "@/src/hooks/product/useProduct";
import { Product } from "@/src/types/productType";
import { useState } from "react";
import { CreateButton } from "@/src/components/ui/CreateButton";

export default function Home() {
  const { useGetProducts } = useProduct();
  const { products: productData } = useGetProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const totalProducts = productData.length;
  const availableCount = productData.filter(
    (p) => p.status === "available"
  ).length;
  const outOfStockCount = productData.filter(
    (p) => p.status === "out_of_stock" || p.status === "unavailable"
  ).length;
  const discontinuedCount = productData.filter(
    (p) => p.status === "discontinued"
  ).length;

  const stats = [
    {
      label: "Total produits",
      value: totalProducts,
      subtitle: "Références enregistrées",
      valueClassName: "text-slate-900",
    },
    {
      label: "Disponibles",
      value: availableCount,
      subtitle: "Prêts à l’expédition",
      valueClassName: "text-emerald-700",
    },
    {
      label: "En rupture",
      value: outOfStockCount,
      subtitle: "Réapprovisionnement requis",
      valueClassName: "text-amber-700",
    },
    {
      label: "Arrêtés",
      value: discontinuedCount,
      subtitle: "Archivés du catalogue",
      valueClassName: "text-rose-700",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* En-tête de page */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Product Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Vue d’ensemble des références en stock, de leur disponibilité et des accès rapides au catalogue.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span>API synchronisée ({totalProducts} réf.)</span>
          </div>
        </div>

        {/* Bandeau de métriques en grille unifiée */}
        <section
          aria-label="Indicateurs du catalogue"
          className="mb-8 grid grid-cols-2 divide-x divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs md:grid-cols-4 md:divide-y-0"
        >
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              subtitle={stat.subtitle}
              valueClassName={stat.valueClassName}
            />
          ))}
        </section>

        {/* Aperçu rapide des produits avec actions */}
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-6 py-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Références récentes
              </h2>
              <p className="text-xs text-slate-500">
                Consultez rapidement une fiche ou ouvrez la liste complète des produits pour la gérer.
              </p>
            </div>
            <Link
              href="/product"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Gérer tous les produits
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          {productData.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium text-slate-700">
                Chargement ou aucune référence disponible pour le moment.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Rendez-vous sur la page Produits pour créer ou gérer vos articles.
              </p>
              <div className="mt-4">
                <CreateButton href="/product" />
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              <div className="hidden grid-cols-12 bg-slate-50/80 px-6 py-3 text-xs font-medium text-slate-500 md:grid">
                <div className="col-span-2">SKU</div>
                <div className="col-span-4">Produit & Description</div>
                <div className="col-span-2">Statut</div>
                <div className="col-span-4 text-right">Actions</div>
              </div>
              {productData.slice(0, 5).map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                  actionHref="/product"
                />
              ))}
            </div>
          )}
        </section>

        <ProductDetailCard
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </main>
    </div>
  );
}

