import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <section>
      <header>
        <NavBar />
      </header>
      <Toaster />
      <main className="bg-base-200 min-h-screen py-7 px-2">
        <Outlet />
      </main>
    </section>
  );
}

export default Layout;
