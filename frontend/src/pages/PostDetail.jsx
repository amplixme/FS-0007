import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPostById } from "../services/post.service";

function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (isLoading) {
    return <p className="text-center text-slate-500">Cargando post...</p>;
  }

  if (error) {
    return (
      <section className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-block mb-6 text-blue-600 hover:underline"
        >
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
    <article className="max-w-3xl mx-auto rounded-xl bg-white p-6 shadow-sm md:p-8">
      <Link
        to="/"
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        ← Volver a inicio
      </Link>

      <header className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">{post.title}</h1>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
          <span>Por {post.author?.name || "Autor desconocido"}</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </header>

      <div className="whitespace-pre-wrap leading-7 text-slate-700">
        {post.content}
      </div>

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
            className="rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      )}
    </article>
  );
}

export default PostDetail;