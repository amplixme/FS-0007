import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PostForm from "../components/PostForm";
import { createPost } from "../services/post.service";

export default function CreatePost() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "TuProyecto - Crear publicación";
  }, []);

  const handleCreatePost = async (postData) => {
    if (!user) {
      setError("Debes iniciar sesión para crear una publicación.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const { data } = await createPost(postData);
      // navigate(`/posts/${data.id}`);
    } catch (err) {
      setError(err.message || "Ocurrió un error al crear la publicación.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-40 px-6 max-w-[800px] mx-auto">
      <PostForm
        onSubmit={handleCreatePost}
        isSubmitting={isSubmitting}
        error={error}
        submitLabel="Publicar"
        submittingLabel="Publicando..."
      />
    </main>
  );
}