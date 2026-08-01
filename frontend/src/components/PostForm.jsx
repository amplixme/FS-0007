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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialPost?.image || null);
  const [published, setPublished] = useState(initialPost?.published ?? true);
  const [validationError, setValidationError] = useState("");

  const [modalCategoriesOpen, setModalCategoriesOpen] = useState(false);

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

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
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

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="mb-12 group">
        <label className="relative w-full aspect-[21/9] rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-lowest flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary-fixed transition-all duration-300 overflow-hidden">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="Vista previa"
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeImage();
                }}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/75 text-white flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-4xl text-outline mb-3 group-hover:text-primary">
                image
              </span>

              <p className="text-on-surface-variant font-medium">
                Arrastra una imagen o haz clic para subir
              </p>

              <p className="text-xs text-outline mt-1 uppercase tracking-widest">
                Recomendado: 1920x1080px
              </p>
            </>
          )}
        </label>
      </section>
      <section className="mb-8">
        <input
          type="text"
          placeholder="Título del artículo"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full bg-transparent border-none p-0 text-[3.5rem] font-extrabold tracking-tight placeholder:text-on-surface-variant/30 focus:ring-0 leading-[1.1] text-on-surface"
        />
      </section>
      <section className="mb-12 flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {selectedCategoryIds.map((categoryId) => (
            <span
              key={categoryId}
              className="flex items-center gap-2 px-3 py-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-full text-xs font-semibold"
            >
              {availableCategories.find((cat) => cat.id === categoryId)?.name || categoryId}

              <button
                type="button"
                onClick={() => handleCategoryChange(categoryId)}
                className="hover:text-primary"
              >
                <span className="material-symbols-outlined text-sm">
                  close
                </span>
              </button>
            </span>
          ))}
          {availableCategories.length !== selectedCategoryIds.length && (
            <button
              className="flex items-center gap-1 px-3 py-1.5 border border-outline-variant rounded-full text-xs font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
              type="button"
              onClick={() => setModalCategoriesOpen(true)}>
              <span className="material-symbols-outlined text-sm">add</span>
              Añadir categoría
            </button>
          )}
        </div>
      </section>
      <article className="min-h-[400px]">
        <textarea
          placeholder="Escribe tu artículo aquí..."
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="w-full min-h-[400px] bg-transparent border-none p-0 text-[1.125rem] leading-[1.75] text-on-surface placeholder:text-outline/40 focus:outline-none resize-none"
        />
      </article>


      {
        (validationError || error) && (
          <p className="text-error text-sm mb-4">{validationError || error}</p>
        )
      }

      <section className="mt-20 pt-12 border-t border-outline-variant/15">
        <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-xl">
          <div>
            <h4 className="font-bold text-on-surface">Visibilidad y programación</h4>
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
      {modalCategoriesOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface-container-lowest rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-on-surface">Seleccionar categoría</h3>
              <button
                type="button"
                onClick={() => setModalCategoriesOpen(false)}
                className="material-symbols-outlined text-2xl text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors"
                aria-label="Cerrar"
              >
                close
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableCategories
                .filter((category) => !selectedCategoryIds.includes(category.id))
                .map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      handleCategoryChange(category.id);
                      setModalCategoriesOpen(false);
                    }}
                    className="px-3 py-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-full text-xs font-semibold hover:bg-secondary-fixed/80 transition-colors"
                  >
                    {category.name}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </form >
  );
}
