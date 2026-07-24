import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          AmplixMe
        </Link>

        <button
          type="button"
          className="menu-button"
          aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          id="main-navigation"
          className={`navigation ${isMenuOpen ? "navigation-open" : ""}`}
          aria-label="Navegación principal"
        >
          {isAuthenticated ? (
            <>
              {user.role === "ADMIN" && (
                <NavLink to="/admin" onClick={closeMenu}>
                  Panel de Administración
                </NavLink> 
              )}

              <span>{user.name}</span>

              <NavLink to="/crear" onClick={closeMenu}>
                Crear Post
              </NavLink>

              <button type="button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/" onClick={closeMenu}>
                Inicio
              </NavLink>

              <NavLink to="/login" onClick={closeMenu}>
                Iniciar sesión
              </NavLink>

              <NavLink to="/register" className="register-link" onClick={closeMenu}>
                Registrarse
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
