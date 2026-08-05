import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PostForm from "../components/PostForm";
import { getPostById, updatePost } from "../services/post.service";

export default function EditPost() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError("");

        const { data } = await getPostById(id);

        if (user?.id !== data.authorId) {
          navigate(`/posts/${id}`, { replace: true });
          return;
        }

        setPost(data);
      } catch (err) {
        setError(err.message || "No se pudo cargar el post.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate, user]);

  const handleUpdatePost = async (postData) => {
    try {
      setIsSubmitting(true);
      setError("");

      const { data } = await updatePost(id, postData);
      navigate(`/posts/${data.id}`);
    } catch (err) {
      setError(err.message || "No se pudo actualizar el post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className="text-center text-slate-500">Cargando publicación...</p>;
  }

  if (error && !post) {
    return (
      <section className="max-w-3xl mx-auto">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Volver a inicio
        </Link>

        <p className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</p>
      </section>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <main className="pt-32 pb-40 px-6 max-w-[800px] mx-auto">
      <PostForm
        key={post.id}
        initialPost={post}
        onSubmit={handleUpdatePost}
        isSubmitting={isSubmitting}
        error={error}
        submitLabel="Guardar cambios"
        submittingLabel="Guardando cambios..."
      />
    </main>
  );
}
