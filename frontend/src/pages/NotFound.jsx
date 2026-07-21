import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <h1 className="text-base font-semibold text-indigo-600">404</h1>
      <p className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
        La página que buscas no existe
      </p>
      <Link
        to="/"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
