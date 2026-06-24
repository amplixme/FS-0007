import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          AmplixMe
        </Link>

        <button
          type="button"
          className="menu-button"
          aria-label="Abrir menú de navegación"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navigation ${isMenuOpen ? "navigation-open" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Inicio
          </NavLink>

          <NavLink to="/login" onClick={closeMenu}>
            Iniciar sesión
          </NavLink>

          <NavLink to="/register" className="register-link" onClick={closeMenu}>
            Registrarse
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
