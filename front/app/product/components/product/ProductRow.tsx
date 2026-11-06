import Link from "next/link";
import { ProductStatusBadge } from "@/app/product/components/product/ProductStatusBadge";
import { Product } from "@/src/types/productType";

type ProductRowProps = {
  product: Product;
  onSelect: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  actionHref?: string;
  isShowButtons?: boolean;
};

export function ProductRow({
  product,
  onSelect,
  onEdit,
  onDelete,
  actionHref = "/product",
  isShowButtons = true,
}: ProductRowProps) {
  return (
    <div className="grid grid-cols-1 items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50/80 md:grid-cols-12">
      {/* Colonne SKU */}
      <div className="md:col-span-2">
        <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-medium text-slate-700">
          {product.sku || "SANS-SKU"}
        </span>
      </div>

      {/* Colonne Nom + Description */}
      <div className="md:col-span-4">
        <p className="text-sm font-semibold text-slate-900">{product.name}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
          {product.description || "Aucune description fournie"}
        </p>
      </div>

      {/* Colonne Statut */}
      <div className="md:col-span-2">
        <ProductStatusBadge status={product.status} />
      </div>

      {/* Colonne Actions : Détail, Modifier, Supprimer */}
      {isShowButtons && (
        <div className="flex flex-wrap items-center justify-start gap-2 md:col-span-4 md:justify-end">
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
        >
          <svg
            className="h-3.5 w-3.5 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          Détail
        </button>

        {onEdit ? (
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50/70 px-3 py-1.5 text-xs font-medium text-blue-700 shadow-2xs transition-colors hover:bg-blue-100 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <svg
              className="h-3.5 w-3.5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Modifier
          </button>
        ) : (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50/70 px-3 py-1.5 text-xs font-medium text-blue-700 shadow-2xs transition-colors hover:bg-blue-100 hover:text-blue-800"
          >
            <svg
              className="h-3.5 w-3.5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Modifier
          </Link>
        )}

        {onDelete ? (
          <button
            type="button"
            onClick={() => onDelete(product.id)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-rose-200 bg-rose-50/70 px-3 py-1.5 text-xs font-medium text-rose-700 shadow-2xs transition-colors hover:bg-rose-100 hover:text-rose-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          >
            <svg
              className="h-3.5 w-3.5 text-rose-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            Supprimer
          </button>
        ) : (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-1.5 rounded-md border border-rose-200 bg-rose-50/70 px-3 py-1.5 text-xs font-medium text-rose-700 shadow-2xs transition-colors hover:bg-rose-100 hover:text-rose-800"
          >
            <svg
              className="h-3.5 w-3.5 text-rose-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            Supprimer
          </Link>
        )}
      </div>
      )}
    </div>
  );
}
