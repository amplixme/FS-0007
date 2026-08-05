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
    const delta = 2;
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
        className="p-2 rounded-lg text-outline hover:bg-surface-container-low transition-colors"
        type="button"
        onClick={handlePrevious}
        disabled={page === 1}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      {pages.map((pageNumber, index) =>
        pageNumber === "..." ? (
          <span key={`dots-${index}`} className="px-2 text-outline">
            ...
          </span>
        ) : (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            aria-current={pageNumber === page ? "page" : undefined}

            className={`w-10 h-10 rounded-lg
              ${pageNumber === page
                ? "bg-primary text-on-primary font-bold shadow-md"
                : "w-10 h-10 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors"
              }`}>
            {pageNumber}
          </button>
        )
      )}
      <button
        className="p-2 rounded-lg text-outline hover:bg-surface-container-low transition-colors"
        type="button"
        onClick={handleNext}
        disabled={page === totalPages}>
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </nav>
  );
}
