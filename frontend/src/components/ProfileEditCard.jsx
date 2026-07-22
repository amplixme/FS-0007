import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/common/Spinner";
import ImageUpload from "../components/common/ImageUpload";
import { useNavigate } from "react-router-dom";

const ProfileEditCard = () => {
  const { user, updateUser } = useAuth();
  const { profile, isLoading, updateProfile } = useProfile(user?.id);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      name: "",
      bio: "",
      avatarUrl: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name ?? "",
        bio: profile.bio ?? "",
        avatarUrl: profile.avatarUrl ?? "",
      });
    }
  }, [profile, reset]);

  const bio = watch("bio");

  const onSubmit = async (data) => {
    await updateProfile(data);
    navigate(`/profile/${user.id}`);
    updateUser({ ...user, name: profile.name });
    console.log(user, profile);
  };

  if (isLoading) {
    return (
      <section className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-[0_20px_40px_rgba(17,24,39,0.05)]">
        <Spinner />
      </section>
    );
  }

  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-[0_20px_40px_rgba(17,24,39,0.05)]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Avatar */}

        <div className="flex flex-col items-center gap-4">
          <label className="block text-sm font-semibold text-on-surface-variant">
            Imagen de Perfil
          </label>

          <ImageUpload
            onUpload={(url) => {
              setValue("avatarUrl", url);
            }}
          />
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface-variant">
              Nombre completo
            </label>

            <input
              {...register("name")}
              className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="block text-sm font-semibold text-on-surface-variant">Bio</label>

              <span className="text-xs">{bio.length} / 200</span>
            </div>

            <textarea
              {...register("bio")}
              rows={4}
              className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="px-8 py-3 bg-primary rounded-full text-white">
            Guardar cambios
          </button>

          <button type="button" className="px-8 py-3 border rounded-full">
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfileEditCard;
