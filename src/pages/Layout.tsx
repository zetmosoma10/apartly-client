import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/navigation/NavBar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

function Layout() {
  return (
    <section>
      <header className="max-container">
        <NavBar />
      </header>
      <Toaster />
      <main className="min-h-screen pb-20 bg-base-200">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </section>
  );
}

export default Layout;
