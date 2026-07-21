import { useState } from "react";
import { createComment } from "../services/comment.service"; 

export default function CommentForm({ postId, onCommentSuccess }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
     
      await createComment(postId, { content: content.trim() });
      
      setContent(""); 
      onCommentSuccess(); 
    } catch (err) {
      console.error("Error al publicar comentario:", err);
      setSubmitError(err.message || "No se pudo publicar tu comentario. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-700">Deja un comentario</h3>
      
      <div>
        <textarea
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe lo que piensas de este artículo..."
          disabled={isSubmitting}
          className="w-full rounded-xl border border-slate-300 p-3 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 resize-none"
        />
      </div>

      {submitError && (
        <p className="text-xs text-red-600 font-medium">{submitError}</p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="px-5 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:opacity-95 transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
        >
          {isSubmitting ? (
            <>
              {}
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Comentando...
            </>
          ) : (
            "Comentar"
          )}
        </button>
      </div>
    </form>
  );
}