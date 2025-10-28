import { FaPhoneAlt, FaEnvelope, FaUserCircle } from "react-icons/fa";
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

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col lg:flex-row items-center gap-4 border">
      {/* Avatar */}
      {user?.avatar ? (
        <img
          src={user.avatar.url}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-20 h-20 rounded-full object-cover border"
        />
      ) : (
        <FaUserCircle className="text-gray-400 text-6xl" />
      )}

      {/* Content */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-semibold text-base-content">
          {user?.firstName} {user?.lastName}
        </h3>
        <p className={`badge badge-soft ${roleColors[roles]}`}>{user?.role}</p>

        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p className="flex items-center justify-center sm:justify-start gap-2">
            <FaEnvelope className="text-gray-500" /> {user?.email}
          </p>
          {user?.phone && (
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <FaPhoneAlt className="text-gray-500" /> {user.phone}
            </p>
          )}
        </div>

        <p className="text-xs text-black text-opacity-50 mt-3">
          Joined {dayjs(user?.createdAt).format("DD MMM YYYY")}
        </p>
      </div>

      {/* Button */}
      <div className="grid gap-2 w-full lg:w-auto">
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
          className="btn btn-sm bg-error text-white border-error"
        >
          Delete User
        </button>
      </div>
    </div>
  );
}
