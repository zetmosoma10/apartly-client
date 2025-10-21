import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";

const AccountPage = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  const { register } = useForm();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="min-h-screen px-4 max-container">
      <BackButton />
      <div className="max-w-3xl p-8 mx-auto bg-white border shadow-lg rounded-2xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-32 h-32">
            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              className="object-cover w-full h-full border-4 rounded-full shadow-md border-warning"
            />

            {/* Upload button (no external icon lib used) */}
            <label
              htmlFor="profileImage"
              className="absolute p-2 text-white transition rounded-full shadow cursor-pointer bottom-1 right-1 bg-warning"
              title="Upload profile picture"
            >
              <span className="text-xs font-bold">📸</span>
              <input
                type="file"
                id="profileImage"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <h2 className="mt-4 text-2xl font-bold">John Doe</h2>
          <p className="text-sm opacity-70">Landlord</p>
        </div>

        {/* Info Section */}
        <div className="mt-8 space-y-3">
          <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
            <Input
              id="firstName"
              label="FirstName"
              placeholder="e.g John"
              disabled={!editing}
              register={register("firstName")}
            />
            <Input
              id="lastName"
              label="LastName"
              placeholder="e.g Doe"
              disabled={!editing}
              register={register("lastName")}
            />
          </div>
          <Input
            id="email"
            label="Email"
            placeholder="e.g johndoe@gmail.com"
            disabled={!editing}
            register={register("email")}
          />
          <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
            <Input
              id="phone"
              label="Phone Number"
              placeholder="e.g 0860010111"
              disabled={!editing}
              register={register("phone")}
            />
            <Input
              id="joined"
              label="Joined"
              placeholder="e.g March 25"
              disabled={true}
              register={register("joined")}
            />
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row">
          {!editing ? (
            <button
              className="px-6 btn btn-neutral"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                className="px-6 text-white btn bg-warning border-warning"
                onClick={() => setEditing(false)}
              >
                Save Changes
              </button>
              <button
                className="px-6 border btn btn-ghost"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </>
          )}

          <button className="px-6 text-white btn btn-error">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
