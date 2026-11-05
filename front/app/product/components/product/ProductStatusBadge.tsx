import { ProductStatus } from "@/src/types/productType";

type StatusBadgeStyle = {
  label: string;
  dot: string;
  bg: string;
  text: string;
  ring: string;
};

export const STATUS_BADGE: Record<ProductStatus, StatusBadgeStyle> = {
  available: {
    label: "En stock",
    dot: "bg-emerald-600",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    ring: "ring-emerald-600/20",
  },
  out_of_stock: {
    label: "Rupture",
    dot: "bg-amber-600",
    bg: "bg-amber-50",
    text: "text-amber-800",
    ring: "ring-amber-600/20",
  },
  discontinued: {
    label: "Arrêté",
    dot: "bg-rose-600",
    bg: "bg-rose-50",
    text: "text-rose-800",
    ring: "ring-rose-600/20",
  },
  unavailable: {
    label: "Indisponible",
    dot: "bg-slate-500",
    bg: "bg-slate-100",
    text: "text-slate-700",
    ring: "ring-slate-500/20",
  },
};

export const getProductStatusMeta = (status: string): StatusBadgeStyle => {
  return (
    STATUS_BADGE[status as ProductStatus] ?? STATUS_BADGE.unavailable
  );
};

type ProductStatusBadgeProps = {
  status: ProductStatus | string;
};

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  const statusStyle = getProductStatusMeta(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyle.bg} ${statusStyle.text} ${statusStyle.ring}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
      {statusStyle.label}
    </span>
  );
}
