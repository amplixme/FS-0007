import { useCategories } from "../hooks/useCategories";

export default function CategoryFilter({ activeSlug, onChange }) {
  const { categories, loading, error } = useCategories();

  if (loading) return <CategoryFilterSkeleton />;
  if (error) return <p className="text-sm text-red-500">{error}</p>;

  const items = [{ id: "all", name: "Todas", slug: null }, ...categories];

  return (
    <nav className="px-4 py-6" aria-label="Filtro de categorías">
      {/* Mobile: chips horizontales scrolleables */}
      <div className="flex gap-2 overflow-x-auto pb-2 md:hidden -mx-4 px-4">
        {items.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.slug)}
            aria-current={activeSlug === cat.slug ? "true" : undefined}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeSlug === cat.slug
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Desktop: sidebar lateral */}
      <div className="hidden md:block mt-4">
        <div className="flex items-center justify-between px-4 mb-4">
          <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-700">
            Categorías
          </h3>
        </div>
        <ul className="flex flex-col gap-1">
          {items.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => onChange(cat.slug)}
                aria-current={activeSlug === cat.slug ? "true" : undefined}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSlug === cat.slug
                    ? "bg-primary text-on-primary font-medium"
                    : "hover:bg-surface-container text-on-surface-variant"
                }`}
              >
                <span className="font-medium">{cat.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function CategoryFilterSkeleton() {
  return (
    <div className="flex gap-2 md:flex-col">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-8 w-24 md:w-full rounded-full md:rounded-md bg-surface-container animate-pulse"
        />
      ))}
    </div>
  );
}
