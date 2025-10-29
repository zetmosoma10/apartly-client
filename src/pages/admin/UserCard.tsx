import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { User } from "../../entities/User";
import dayjs from "dayjs";

interface Props {
  user: User | null;
  onSelectedUser: (user: User | null) => void;
  onOpen: () => void;
}

export default function UserCard({ user, onSelectedUser, onOpen }: Props) {
  const navigate = useNavigate();

  const handleViewApartments = () => {
    if (user?.role === "landlord") {
      navigate(`/admin/users/${user._id}/apartments`, {
        state: `${user.firstName} ${user.lastName}`,
      });
    }
  };

  const roleColors = {
    landlord: "badge-warning",
    tenant: "badge-neutral",
    admin: "badge-error",
  };

  const roles = user?.role as "admin" | "landlord" | "tenant";

  const avatarUrl =
    user?.avatar?.url ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="flex flex-col items-center gap-4 p-5 transition-all bg-white border shadow-md rounded-2xl hover:shadow-lg lg:flex-row">
      {/* Avatar */}
      <img
        src={avatarUrl}
        alt={`${user?.firstName} ${user?.lastName}`}
        className="object-cover w-20 h-20 border rounded-full"
      />

      {/* Content */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-semibold text-base-content">
          {user?.firstName} {user?.lastName}
        </h3>
        <p className={`badge badge-soft ${roleColors[roles]}`}>{user?.role}</p>

        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p className="flex items-center justify-center gap-2 sm:justify-start">
            <FaEnvelope className="text-gray-500" /> {user?.email}
          </p>
          {user?.phone && (
            <p className="flex items-center justify-center gap-2 sm:justify-start">
              <FaPhoneAlt className="text-gray-500" /> {user.phone}
            </p>
          )}
        </div>

        <p className="mt-3 text-xs text-black text-opacity-50">
          Joined {dayjs(user?.createdAt).format("DD MMM YYYY")}
        </p>
      </div>

      {/* Button */}
      <div className="grid w-full gap-2 lg:w-auto">
        {user?.role === "landlord" && (
          <button
            onClick={handleViewApartments}
            className="btn btn-sm btn-neutral"
          >
            View Apartments
          </button>
        )}
        <button
          onClick={() => {
            onSelectedUser(user);
            onOpen();
          }}
          className="text-white btn btn-sm bg-error border-error"
        >
          Delete User
        </button>
      </div>
    </div>
  );
}
