export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  const getPageNumbers = () => {
    const delta = 2; // páginas a cada lado de la actual
    const range = [];
    const rangeWithDots = [];
    let lastAdded = null;

    for (let i = 1; i <= totalPages; i++) {
      const isEdge = i === 1 || i === totalPages;
      const isInRange = i >= page - delta && i <= page + delta;

      if (isEdge || isInRange) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (lastAdded !== null && i - lastAdded > 1) {
        rangeWithDots.push("...");
      }
      rangeWithDots.push(i);
      lastAdded = i;
    }

    return rangeWithDots;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
      aria-label="Paginación de publicaciones"
    >
      <button
        type="button"
        onClick={handlePrevious}
        disabled={page === 1}
        className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Anterior
      </button>

      {pages.map((pageNumber, index) =>
        pageNumber === "..." ? (
          <span key={`dots-${index}`} className="px-2 text-sm font-medium text-slate-400">
            ...
          </span>
        ) : (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            aria-current={pageNumber === page ? "page" : undefined}
            className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
              pageNumber === page
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {pageNumber}
          </button>
        )
      )}

      <button
        type="button"
        onClick={handleNext}
        disabled={page === totalPages}
        className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Siguiente
      </button>
    </nav>
  );
}
