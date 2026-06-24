import FormRegister from "../components/FormRegister";
function Register() {
  return (
    <main className="w-full max-w-[420px] mx-auto bg-white md:rounded-[16px] shadow-xl md:shadow-slate-200/50 overflow-hidden flex flex-col">
      <div className="px-8 pt-10 pb-6 text-center">
        <h1 className="md:hidden text-2xl font-extrabold tracking-tighter text-slate-900 mb-6">TuProyecto</h1>
        <h2 className="text-2xl font-bold tracking-tight text-on-surface">Crear cuenta</h2>
        <p className="text-slate-500 mt-2 text-sm">Únete a la comunidad</p>
      </div>

      <FormRegister />

      <div className="bg-slate-50 py-6 px-8 text-center border-t border-slate-100">
        <p className="text-sm text-slate-600">
          ¿Ya tienes cuenta?
          <a className="text-[#3A6BFF] font-bold hover:underline" href="/login">Inicia sesión</a>
        </p>
      </div>
    </main>
  );
}

export default Register;