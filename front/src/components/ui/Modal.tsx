"use client";

import { ReactNode, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidthClassName?: string;
};

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidthClassName = "max-w-lg",
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Arrière-plan (Backdrop) */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-[1px] transition-opacity"
        onClick={onClose}
      />

      {/* Contenu du modal */}
      <div
        className={`relative z-10 w-full ${maxWidthClassName} overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl`}
      >
        {/* En-tête du modal */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <div>
            <h2
              id="modal-title"
              className="text-lg font-semibold tracking-tight text-slate-900"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre"
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Corps du modal */}
        <div className="px-6 py-5">{children}</div>

        {/* Pied de page optionnel */}
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/70 px-6 py-3.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
