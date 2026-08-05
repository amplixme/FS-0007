import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Header />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-6">{children}</main>

      <Footer />
    </div>
  );
}

export default Layout;
