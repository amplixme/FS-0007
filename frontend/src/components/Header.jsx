import { NavLink } from "react-router-dom";
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
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm dark:shadow-none">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center w-full">
        <div className="flex items-center gap-8">
          <a className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tight-tracking" href="/">AmplixMe</a>
          <nav className="hidden md:flex gap-6">
            {isAuthenticated && (
              <>
                <span>{user.name}</span>

                <NavLink to="/crear" onClick={closeMenu}>
                  New Post
                </NavLink>

                {user.role === "ADMIN" && (
                  <NavLink to="/admin" onClick={closeMenu}>
                    Admin
                  </NavLink>
                )}
              </>
            )}
          </nav>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <button type="button" onClick={logout}>
              Logout
            </button>
            <NavLink to={`/profile/${user.id}`} onClick={closeMenu} className="hidden md:block">
              <img
                alt="User profile"
                className="w-10 h-10 rounded-full object-cover"
                src={
                  user.avatarUrl
                    ? user.avatarUrl
                    : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                }
              />
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <NavLink to="/login" onClick={closeMenu}
              className="hidden md:block px-5 py-2 text-slate-600 font-medium hover:bg-slate-50 transition-colors duration-200 rounded-full">
              log in
            </NavLink>

            <NavLink to="/register"
              className="px-6 py-2 bg-primary text-on-primary font-bold rounded-full hover:shadow-lg transition-transform active:scale-95 duration-200"
              onClick={closeMenu}>
              Registrarse
            </NavLink>
          </div>
        )}
      </div>
    </header >
  );
}

export default Header;