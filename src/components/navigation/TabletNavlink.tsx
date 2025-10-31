import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  to: string;
  end?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

const TabletNavlink = ({
  to,
  end = false,
  children,
  className,
  onClick,
}: Props) => {
  const baseClasses = `text-black hover:text-warning ${className}`;
  const activeClasses = "text-warning";

  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) => (isActive ? activeClasses : baseClasses)}
    >
      {children}
    </NavLink>
  );
};

export default TabletNavlink;
