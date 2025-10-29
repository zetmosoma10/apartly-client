import { useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "../../store";
import useUploadAvatar from "../../hooks/user/useUploadAvatar";
import useDeleteAvatar from "../../hooks/user/useDeleteAvatar";

const Avatar = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const { mutate, isPending } = useUploadAvatar();
  const { user } = useAuthStore();

  // * HANDLE FILES (IMAGE)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // * Validate File
    if (!file.type.startsWith("image/")) {
      toast.error("Only image file allowed");
      return;
    }

    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error(`Image too large. max size ${MAX_SIZE}mb`);
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    const url = URL.createObjectURL(file);
    setPreview(url);

    mutate(formData);
  };

  const { mutate: deleteAvatar } = useDeleteAvatar();

  const avatarUrl =
    preview ||
    user?.avatar?.url ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <img
          src={avatarUrl}
          alt="profile"
          className="object-cover w-full h-full border-4 rounded-full shadow-md border-warning"
        />
        <label
          htmlFor="profileImage"
          className="absolute p-2 text-white transition rounded-full shadow cursor-pointer bottom-1 right-1 bg-warning"
          title="Upload profile picture"
        >
          {isPending ? (
            <span className="text-xs font-bold animate-pulse">⏳</span>
          ) : (
            <span className="text-xs font-bold">📸</span>
          )}
          <input
            type="file"
            id="profileImage"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>

      <h2 className="mt-4 text-2xl font-bold">
        {user?.firstName} {user?.lastName}
      </h2>
      <p className="text-sm opacity-70">{user?.role}</p>

      {user?.avatar?.url && (
        <button
          onClick={() => deleteAvatar()}
          className="mt-3 text-sm text-error hover:underline"
        >
          Remove Avatar
        </button>
      )}
    </div>
  );
};

export default Avatar;
