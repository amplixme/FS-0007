import ProfileEditCard from "../components/ProfileEditCard";
const ProfileEdit = () => {
  return (
    <main className="grow pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* <!-- Header Section --> */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
            Editar Perfil
          </h1>
          <p className="text-on-surface-variant body-lg">
            Personaliza tu identidad digital en la plataforma.
          </p>
        </div>
        {/* <!-- Profile Edit Card --> */}

        <ProfileEditCard />

        {/* <!-- Secondary Info (Editorial Callout Style) --> */}
        <div className="mt-12 p-6 bg-secondary-fixed border-l-4 border-secondary rounded-r-lg">
          <div className="flex gap-4">
            <span
              className="material-symbols-outlined text-on-secondary-container"
              data-icon="info"
            >
              info
            </span>
            <div>
              <h4 className="text-sm font-bold text-on-secondary-container mb-1">
                Privacidad del Perfil
              </h4>
              <p className="text-sm text-on-secondary-fixed-variant leading-relaxed">
                Tu nombre y biografía serán visibles para otros usuarios. No compartas información
                sensible como direcciones o contraseñas en tu biografía.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileEdit;
