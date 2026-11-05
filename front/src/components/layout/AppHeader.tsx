"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AppHeaderProps = {
  onCreateClick?: () => void;
};

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/product", label: "Produits" },
];

export function AppHeader({
}: AppHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200/80 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-slate-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 font-mono text-xs font-semibold text-white">
              AP
            </span>
            <span>Registre Produits</span>
          </Link>

          <nav className="flex items-center gap-1 text-sm">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive
                      ? "rounded-md bg-slate-100 px-3 py-1.5 font-medium text-slate-900 transition-colors"
                      : "rounded-md px-3 py-1.5 font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
            <Link
              href="/product"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-xs transition-colors hover:bg-slate-50"
            >
              Voir le catalogue
            </Link>
        </div>
      </div>
    </header>
  );
}
