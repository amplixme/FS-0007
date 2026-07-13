import { useEffect, useState } from "react";
import { getByPostId } from "../services/comment.service";
import Spinner from "./common/Spinner";
import ErrorMessage from "./common/ErrorMessage";
import EmptyState from "./common/EmptyState";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

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
              className="group"
            >
              <div className="flex gap-4">
                <img alt="User" className="w-10 h-10 rounded-full"
                  data-alt="portrait of a woman with curly hair and creative style in soft natural lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmo4xfx_1W1_yNG7os5cBH9tVTveN1vQiYqkZ8o-HnaI8ChyJlzw0tAk_R5-nab0hdVUeoJKC6jLQjS8-U9LRjGaQYcozUSXGKuYzyM08QkwYKr93T2KeiNcWybg_l2zV3m2cNWoAIjbJTVdKIZWkG1SOoVR9XvaZtHcyuS1D8Jr7yFcHntlBpA7_HqngIx2lcNwSCpVjltIAjDuX5yYnWZhPqahd_QVjcV64xvjzJ1Tj6SWLCpFzT7nSPf13on4rSA_9uFZDAdpRB" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-on-surface">{comment.author?.name || "Autor desconocido"}</span>
                      <span className="text-xs text-on-surface-variant">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: es })}</span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-on-surface-variant hover:text-primary"><span
                        className="material-symbols-outlined text-[18px]">edit</span></button>
                      <button className="text-on-surface-variant hover:text-error"><span
                        className="material-symbols-outlined text-[18px]">delete</span></button>
                    </div>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed">{comment.content}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}