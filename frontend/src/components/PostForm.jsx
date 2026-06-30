import { useState } from "react";

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