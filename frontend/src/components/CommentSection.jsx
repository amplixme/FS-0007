import { useEffect, useState } from "react";
import { getByPostId } from "../services/comment.service";
import Spinner from "./common/Spinner";
import ErrorMessage from "./common/ErrorMessage";
import EmptyState from "./common/EmptyState";

const getRelativeDate = (date) => {
  const now = new Date();
  const commentDate = new Date(date);
  const diffInSeconds = Math.floor((now - commentDate) / 1000);

  if (diffInSeconds < 60) {
    return "hace unos segundos";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} min`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `hace ${diffInHours} h`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) {
    return `hace ${diffInDays} día${diffInDays === 1 ? "" : "s"}`;
  }

  return commentDate.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadComments = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getByPostId(postId);
      setComments(response.data || []);
    } catch (err) {
      setError(err.message || "No se pudieron cargar los comentarios.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!postId) return;

    loadComments();
  }, [postId]);

  return (
    <section className="mt-10 border-t border-slate-200 pt-8">
      <h2 className="mb-6 text-2xl font-semibold text-slate-900">
        Comentarios
      </h2>

      {isLoading && <Spinner />}

      {!isLoading && error && (
        <ErrorMessage message={error} onRetry={loadComments} />
      )}

      {!isLoading && !error && comments.length === 0 && (
        <EmptyState message="Aún no hay comentarios. ¡Sé el primero!" />
      )}

      {!isLoading && !error && comments.length > 0 && (
        <div className="space-y-4">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-medium text-slate-900">
                  {comment.author?.name || "Autor desconocido"}
                </h3>

                <span className="text-sm text-slate-500">
                  {getRelativeDate(comment.createdAt)}
                </span>
              </div>

              <p className="whitespace-pre-wrap text-slate-700">
                {comment.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}