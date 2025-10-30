import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  end?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

const MobileNavLink = ({ to, onClick, children, end = false }: Props) => {
  const baseClasses =
    "block px-3 py-2 text-sm font-medium rounded-md text-base-content hover:bg-warning hover:text-white";
  const activeClasses = "bg-warning text-white";

  return (
    <NavLink
      to={to}
      onClick={onClick}
      end={end}
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : ""}`
      }
    >
      {children}
    </NavLink>
  );
};

export default MobileNavLink;
