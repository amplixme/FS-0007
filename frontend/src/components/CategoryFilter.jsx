import { useState, useEffect } from "react";
import { useCategories } from "../hooks/useCategories";

export default function CategoryFilter({ activeSlug, onChange }) {
  const { categories, loading, error } = useCategories();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (loading) return <CategoryFilterSkeleton />;
  if (error) return <p className="text-sm text-red-500">{error}</p>;

  const items = [{ id: "all", name: "Todas", slug: null }, ...categories];

  const handleSelect = (slug) => {
    onChange(slug);
    setMobileOpen(false);
  };

  return (
    <>
      <div className="lg:hidden mb-6">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="fixed bottom-8 right-8 z-40 lg:hidden w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Filtrar por categoría"
        >
          <span className="material-symbols-outlined">tune</span>
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 lg:hidden flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-surface-container-high">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 tight-tracking">
              Categorías
            </h3>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Cerrar"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            {items.map((cat) => (
              <button
                key={cat.id}
                type="button"
                aria-current={activeSlug === cat.slug ? "true" : undefined}
                onClick={() => handleSelect(cat.slug)}
                className={`flex items-center justify-between gap-3 rounded-xl p-4 text-left transition-all ${activeSlug === cat.slug
                  ? "bg-primary text-on-primary font-medium"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
              >
                <span className="font-medium">{cat.name}</span>
                {activeSlug === cat.slug && (
                  <span className="material-symbols-outlined">check</span>
                )}
              </button>
            ))}
          </nav>
        </div>
      )}

      <aside className="h-screen sticky top-24 w-64 hidden lg:flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4 tight-tracking">
            Categorías
          </h3>
          <nav className="flex flex-col gap-2">
            {items.map((cat) => (
              <button
                key={cat.id}
                type="button"
                aria-current={activeSlug === cat.slug ? "true" : undefined}
                className={`flex items-center justify-between gap-3 rounded-xl p-3 shadow-sm transition-all hover:translate-x-1 ${activeSlug === cat.slug
                  ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                onClick={() => onChange(cat.slug)}
              >
                <span className="font-medium">{cat.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

function CategoryFilterSkeleton() {
  return (
    <div className="flex gap-2 lg:flex-col">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-8 w-24 lg:w-full rounded-full lg:rounded-md bg-surface-container animate-pulse"
        />
      ))}
    </div>
  );
}