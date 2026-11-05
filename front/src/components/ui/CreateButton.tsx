import Link from "next/link";

type CreateButtonProps = {
  label?: string;
  href?: string;
  onClick?: () => void;
};

const baseClassName =
  "inline-flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-xs transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

function PlusIcon() {
  return (
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
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

export function CreateButton({
  label = "Créer un produit",
  href,
  onClick,
}: CreateButtonProps) {
  if (href) {
    return (
      <Link href={href} className={baseClassName}>
        <PlusIcon />
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClassName}>
      <PlusIcon />
      {label}
    </button>
  );
}
