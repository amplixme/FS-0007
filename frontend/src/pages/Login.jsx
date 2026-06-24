import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import FormLogin from "../components/FormLogin";

function Login() {
  const location = useLocation();
  const successMessage = location.state?.successMessage || "";
  useEffect(() => {
    document.title = "TuProyecto - Iniciar sesión";
  }, []);
  return (
    <main>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <div className="bg-surface-container-lowest w-full min-h-screen md:min-h-fit md:rounded-[16px] ambient-shadow overflow-hidden transition-all duration-300">

        <div className="h-1.5 w-full bg-gradient-to-r from-primary to-secondary-container"></div>
        <div className="px-8 pt-12 pb-10 md:px-10">
          <div className="mb-10 text-center md:text-left">
            <span className="text-2xl font-extrabold tracking-tighter text-primary">TuProyecto</span>
          </div>
          <header className="mb-10 text-center md:text-left">
            <h1 className="text-[28px] font-bold text-on-surface leading-tight tracking-tight mb-2">
              Iniciar sesión
            </h1>
            <p className="text-on-surface-variant body-lg">
              Ingresa a tu cuenta para continuar
            </p>
          </header>
          <FormLogin />
          <div className="my-8 flex items-center gap-4 no-line-separator">
            <span className="text-sm font-medium text-outline-variant bg-surface-container-lowest px-2">o</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <button
              className="flex items-center justify-center gap-3 w-full py-3 px-6 bg-surface-container-low border border-outline-variant/10 rounded-full hover:bg-surface-container-high transition-colors text-on-surface font-medium">
              <img alt="Google Logo" className="w-5 h-5"
                data-alt="Official Google G color logo icon on transparent background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfECi-RUlWaa0602E8qzH-FeowJKr4O3C-A0ZGDvurrU1LO7pc3Yb9LTyAsx5HwX8-AZ1bjcOu9F3h_JsicbwQSv_WUy93h4M3o0h6PAkGqO-hk7BZFqZe1dmpkcG0aeAaVUrUUbGMfyFRvw304pPaBz-nVdAuswTMsdvyV0nDxUK5M25oDyjPpXxcwhcNhDWfX05VL2t-ZtHPz6ml7WFktVZVqaBrFfA70QbIBvwI_vQiUXu4AxFo8h1o9IyRqh_vy-dLeKKK-4Se" />
              Continuar con Google
            </button>
          </div>
          <footer className="mt-10 text-center">
            <p className="text-on-surface-variant font-medium">
              ¿No tienes cuenta?
              <a className="text-primary font-bold hover:underline underline-offset-4 decoration-2 ml-1" href="/register">
                Regístrate
              </a>
            </p>
          </footer>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-6 px-4 md:px-0 opacity-60">
        <p className="text-xs font-medium text-outline uppercase tracking-widest">© 2024 TuProyecto</p>
        <div className="flex gap-4">
          <a className="text-xs font-semibold text-outline hover:text-primary transition-colors" href="/privacy">
            Privacidad
          </a>
          <a className="text-xs font-semibold text-outline hover:text-primary transition-colors" href="/terms">
            Términos
          </a>
        </div>
      </div>
    </main>
  );
}

export default Login;