import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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
    </section>
  );
}

export default Layout;
