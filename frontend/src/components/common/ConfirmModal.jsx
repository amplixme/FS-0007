import { useEffect, useRef } from "react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  message = "Esta acción no se puede deshacer.",
}) => {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    cancelButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-modal-title" className="text-xl font-bold text-slate-900">
          {title}
        </h2>

        <p
          id="confirm-modal-description"
          className="mt-3 text-sm leading-relaxed text-slate-700"
        >
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onClose}
            className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;