import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPostById, deletePost } from "../services/post.service";
import ConfirmModal from "../components/common/ConfirmModal";
import CommentSection from "../components/CommentSection";

function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getPostById(id);
        setPost(response.data);
      } catch (err) {
        setError(err.message || "No se pudo cargar el post.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDeleteConfirm = async () => {
    try {
      setIsModalOpen(false);

      await deletePost(id);

      setToast({
        show: true,
        message: "¡Publicación eliminada con éxito!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setToast({
        show: true,
        message: err.message || "Hubo un error al intentar eliminar el post",
        type: "error",
      });
    }
  };

  if (isLoading) {
    return <p className="text-center text-slate-500">Cargando post...</p>;
  }

  if (error) {
    return (
      <section className="mx-auto max-w-3xl">
        <Link to="/" className="mb-6 inline-block text-blue-600 hover:underline">
          ← Volver a inicio
        </Link>

        <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>
      </section>
    );
  }

  if (!post) {
    return null;
  }

  const isAuthor = user?.id === post.authorId;

  return (
    <article className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-sm md:p-8">
      {toast.show && (
        <div
          className={`fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg px-4 py-3 text-white shadow-xl transition-all duration-300 ${
            toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          <span className="text-base">{toast.type === "success" ? "✅" : "❌"}</span>
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      )}

      <Link to="/" className="mb-6 inline-block text-blue-600 hover:underline">
        ← Volver a inicio
      </Link>

      <header className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">{post.title}</h1>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
          <Link to={`/profile/${post.authorId}`}>
            Por {post.author?.name || "Autor desconocido"}
          </Link>
          <span>
            {new Date(post.createdAt).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </header>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={`Portada de ${post.title}`}
          className="mb-8 w-full rounded-xl object-cover"
        />
      )}

      <div className="whitespace-pre-wrap leading-7 text-slate-700">{post.content}</div>

      {isAuthor && (
        <div className="mt-8 flex gap-3 border-t border-slate-200 pt-6">
          <button
            type="button"
            className="rounded-md border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100"
          >
            Editar
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      )}

      <CommentSection postId={post.id} />

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="¿Estás seguro de que deseas eliminar este artículo?"
        message="Esta acción no se puede deshacer y eliminará el post permanentemente."
      />
    </article>
  );
}

export default PostDetail;
