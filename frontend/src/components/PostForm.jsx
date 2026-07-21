import { useState, useEffect } from "react";

import { getAll as getAllCategories } from "../services/category.service";

export default function PostForm({
  initialPost,
  onSubmit,
  isSubmitting,
  error,
  submitLabel,
  submittingLabel,
}) {
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [content, setContent] = useState(initialPost?.content ?? "");
  const [published, setPublished] = useState(initialPost?.published ?? true);
  const [validationError, setValidationError] = useState("");


  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(() => {

    if (initialPost?.categories) {
      return initialPost.categories.map((cat) => cat.id || cat);
    }
    return [];
  });


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        const cleanList = res?.data || res;
        setAvailableCategories(Array.isArray(cleanList) ? cleanList : []);
      } catch (err) {
        console.error("Error al cargar categorías en el formulario", err);
      }
    };
    fetchCategories();
  }, []);


  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryIds((prevIds) =>
      prevIds.includes(categoryId)
        ? prevIds.filter((id) => id !== categoryId)
        : [...prevIds, categoryId]
    );
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      setValidationError("El título y el contenido son obligatorios.");
      return;
    }

    setValidationError("");

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      published,

      categoryIds: selectedCategoryIds,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="mb-8">
        <input
          type="text"
          placeholder="Título del artículo"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full bg-transparent border-none p-0 text-[3.5rem] font-extrabold tracking-tight placeholder:text-on-surface-variant/30 focus:ring-0 leading-[1.1] text-on-surface"
        />
      </section>

      <article className="min-h-[400px] mb-12">
        <textarea
          placeholder="Escribe tu artículo aquí..."
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="w-full min-h-[400px] bg-transparent border-none p-0 text-[1.125rem] leading-[1.75] text-on-surface placeholder:text-outline/40 focus:outline-none resize-none"
        />
      </article>


      { }
      <section className="mb-8 p-6 bg-surface-container-low rounded-xl border border-outline-variant/15">
        <h4 className="font-bold text-on-surface mb-2">Categorías</h4>
        <p className="text-sm text-on-surface-variant mb-4">
          Selecciona una o más categorías para este artículo.
        </p>

        {availableCategories.length === 0 ? (
          <p className="text-xs text-on-surface-variant italic">No hay categorías disponibles.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {availableCategories.map((category) => {
              const isChecked = selectedCategoryIds.includes(category.id);
              return (
                <label
                  key={category.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer select-none transition-all duration-200 ${isChecked
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-outline-variant/30 hover:bg-surface-container-high text-on-surface"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryChange(category.id)}
                    className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                  />
                  <span className="text-sm font-medium">{category.name}</span>
                </label>
              );
            })}
          </div>
        )}
      </section>




      {(validationError || error) && (
        <p className="text-error text-sm mb-4">
          {validationError || error}
        </p>
      )}

      <section className="mt-20 pt-12 border-t border-outline-variant/15">
        <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-xl">
          <div>
            <h4 className="font-bold text-on-surface">
              Visibilidad y programación
            </h4>
            <p className="text-sm text-on-surface-variant">
              Configura cuándo será visible este artículo para tus lectores.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-on-surface">
              {published ? "Publicar ahora" : "Guardar borrador"}
            </span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={published}
                onChange={(event) => setPublished(event.target.checked)}
              />
              <div className="w-11 h-6 bg-outline-variant rounded-full peer-focus:outline-none peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full py-3 bg-primary text-on-primary font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-50"
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </button>
      </section>
    </form>
  );
}