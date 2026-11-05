import { ProductStatusBadge } from "@/app/product/components/product/ProductStatusBadge";
import { Modal } from "@/src/components/ui/Modal";
import { Product } from "@/src/types/productType";

type ProductDetailCardProps = {
  product: Product | null;
  onClose: () => void;
};

export function ProductDetailCard({
  product,
  onClose,
}: ProductDetailCardProps) {
  return (
    <Modal
      isOpen={Boolean(product)}
      onClose={onClose}
      title={product?.name ?? "Détail du produit"}
      subtitle={product ? `Référence SKU : ${product.sku || "SANS-SKU"}` : undefined}
      footer={
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Fermer
        </button>
      }
    >
      {product && (
        <div className="space-y-4 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2.5">
            <div>
              <span className="text-xs font-medium text-slate-500">SKU</span>
              <p className="font-mono text-xs font-semibold text-slate-900">
                {product.sku || "SANS-SKU"}
              </p>
            </div>
            <div>
              <span className="text-xs font-medium text-slate-500">Statut</span>
              <div className="mt-0.5">
                <ProductStatusBadge status={product.status} />
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">Description</p>
            <p className="mt-1 leading-relaxed text-slate-700">
              {product.description || "Aucune description renseignée."}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <p className="font-mono text-[11px] text-slate-400">
              ID : {product.id}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
