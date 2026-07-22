import Spinner from "./common/Spinner";
import ErrorMessage from "./common/ErrorMessage";
import EmptyState from "./common/EmptyState";
import useComments from "../hooks/useComments";
import Comment from "./Comment";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CommentForm from "./CommentForm";

export default function CommentSection({ postId }) {
  const { comments, isLoading, error, loadComments, updateComment, deleteComment } =
    useComments(postId);
  const { isAuthenticated } = useAuth();
  return (
    <section className="mt-10 border-t border-slate-200 pt-8">
      <h2 className="mb-6 text-2xl font-semibold text-slate-900">Comentarios</h2>

      {isLoading && <Spinner />}

      {!isLoading && error && <ErrorMessage message={error} onRetry={loadComments} />}

      {!isLoading && !error && comments.length === 0 && (
        <EmptyState message="Aún no hay comentarios. ¡Sé el primero!" />
      )}

      {!isLoading && !error && comments.length > 0 && (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Comment
              comment={comment}
              deleteComment={deleteComment}
              updateComment={updateComment}
            />
          ))}
        </div>
      )}
      {}
      <div className="mt-8 pt-6 border-t border-slate-100">
        {isAuthenticated ? (
          <CommentForm postId={postId} onCommentSuccess={loadComments} />
        ) : (
          <div className="p-4 bg-slate-50 rounded-xl text-center border border-slate-200/60">
            <p className="text-sm text-slate-600">
              ¿Quieres dar tu opinión?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Inicia sesión para comentar
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
