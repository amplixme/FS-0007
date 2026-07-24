import { useCallback, useEffect, useState } from "react";
import { getProfile, updateProfile as update } from "../services/user.service.js";

export const useProfile = (userId) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProfile = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      return;
    }
    try {
      setError("");
      setIsLoading(true);

      const response = await getProfile(userId);

      setProfile(response.data || null);
    } catch (err) {
      setError(err.message || "No se puedo encontrar al usuario");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    loadProfile();
  }, [loadProfile]);

  const updateProfile = async (data) => {
    try {
      setError("");
      setIsLoading(true);
      await update(data);
      await loadProfile();
    } catch (err) {
      setError(err.message || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    profile,
    loadProfile,
    isLoading,
    error,
    updateProfile,
  };
};
