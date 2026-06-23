import { useLocation } from "react-router-dom";

function Login() {
  const location = useLocation();
  const successMessage = location.state?.successMessage || "";
  return (
    <main>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <h1>Iniciar sesión</h1>
    </main>
  );
}

export default Login;