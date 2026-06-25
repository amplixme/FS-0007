function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>© {currentYear} AmplixMe. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
