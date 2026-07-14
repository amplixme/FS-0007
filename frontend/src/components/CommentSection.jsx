import Spinner from "./common/Spinner";
import ErrorMessage from "./common/ErrorMessage";
import EmptyState from "./common/EmptyState";
import useComments from "../hooks/useComments";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const {comments, isLoading, error, loadComments, updateComment, deleteComment} = useComments(postId)

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
            <Comment comment={comment} deleteComment={deleteComment} updateComment={updateComment}/>
          ))}
        </div>
      )}
    </section>
  );
}