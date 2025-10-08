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
      <main className="bg-base-200 min-h-screen py-7 px-2">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}

export default Layout;
