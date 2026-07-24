import { useEffect, useState } from "react";
import { getAll } from "../services/category.service";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAll()
      .then((data) => setCategories(data.data))
      .catch(() => setError("No se pudieron cargar las categorías"))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}
