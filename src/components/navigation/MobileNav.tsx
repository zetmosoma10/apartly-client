import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import useAuthStore from "../../store";
import ProfileLink from "./ProfileLink";
import MobileNavLink from "./MobileNavLink";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const { user } = useAuthStore();

  const openNav = () => setOpen(true);
  const closeNav = () => setOpen(false);

  // * keyboard handling (close on ESC)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNav();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  //* focus and body-scroll lock
  useEffect(() => {
    if (open) {
      // * prevent body scroll
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      //* focus the close button so keyboard users have a clear starting point
      closeBtnRef.current?.focus();

      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      {/* Hamburger trigger */}
      <button
        onClick={openNav}
        className="p-2 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-warning"
      >
        <GiHamburgerMenu />
      </button>

      {/* Backdrop - Overlay */}
      <div
        onClick={closeNav}
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      />

      {/* Slide-in panel */}
      <aside
        aria-hidden={!open}
        className={`fixed top-0 right-0 h-full z-50 w-[82%] max-w-xs bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-base-300">
          <div className="text-lg font-semibold">Menu</div>
          <button
            ref={closeBtnRef}
            onClick={closeNav}
            aria-label="Close menu"
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-warning"
          >
            <IoClose />
          </button>
        </div>

        {/* Nav links */}
        <nav className="px-4 py-6 space-y-2">
          <MobileNavLink to="/" onClick={closeNav}>
            Home
          </MobileNavLink>
          <MobileNavLink end={true} to="/apartments" onClick={closeNav}>
            Apartments
          </MobileNavLink>
          {user && user.role !== "landlord" && (
            <MobileNavLink to="/apartments/listings" onClick={closeNav}>
              Listings
            </MobileNavLink>
          )}
          {user && user.role === "admin" && (
            <MobileNavLink to="/admin" onClick={closeNav}>
              Admin
            </MobileNavLink>
          )}
          {user && (
            <MobileNavLink to="/account" onClick={closeNav}>
              Account
            </MobileNavLink>
          )}
        </nav>

        {/* Optional footer actions */}
        <div className="px-4 py-4 mt-auto border-t border-base-300">
          {user ? (
            <ProfileLink />
          ) : (
            <Link to="/auth" onClick={closeNav} className="w-full btn-main">
              Login / Register
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
