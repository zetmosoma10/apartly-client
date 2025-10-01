import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function Layout() {
  return (
    <section>
      <header>
        <NavBar />
      </header>
      <main className="bg-base-200 h-screen pt-7 px-2">
        <Outlet />
      </main>
    </section>
  );
}

export default Layout;
