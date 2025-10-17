import type { Status } from "../entities/Apartment";

const statusStyles: Record<Status, string> = {
  available: "bg-emerald-100 text-emerald-700 border border-emerald-300",
  rented: "bg-rose-100 text-rose-700 border border-rose-300",
  maintenance: "bg-amber-100 text-amber-700 border border-amber-300",
};

const Badge = ({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) => {
  return (
    <div
      className={`badge font-medium capitalize ${statusStyles[status]} ${className}`}
    >
      {status}
    </div>
  );
};

export default Badge;
