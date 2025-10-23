import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BackButton from "../../components/BackButton";
import Input from "../../components/Input";
import useGetUser from "../../hooks/useGetUser";
import accountSchema from "./accountSchema";
import dayjs from "dayjs";
import useUpdateMe from "../../hooks/useUpdateMe";
import _ from "lodash";
import LoadingSpinner from "../../components/loadingIndicators/LoadingSpinner";
import AccountLoadingSkeleton from "../../components/loadingIndicators/AccountLoadingSkeleton";
import Modal from "./Modal";
import useUploadAvatar from "../../hooks/useUploadAvatar";
import toast from "react-hot-toast";
import useAuthStore from "../../store";

type FormData = z.infer<typeof accountSchema>;

const AccountPage = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  const { userDetail } = useAuthStore();

  // * MODAL HANDLERS
  const onOpen = () => {
    ref.current?.showModal();
  };

  const onClose = () => {
    ref.current?.close();
  };

  // * TANSTACK HOOKS
  const { data, isLoading } = useGetUser();
  const user = data?.results;
  const { mutate: updateUser, isPending: isUpdating } = useUpdateMe();
  const { mutate } = useUploadAvatar();

  // * REACT-HOOK-FORM
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
      email: user?.email,
      joined: dayjs(user?.createdAt).format("DD MMM YYYY") || undefined,
    },
  });

  // * Sync form inputs with fetched user data
  useEffect(() => {
    if (user) {
      reset({
        firstName: user?.firstName,
        lastName: user?.lastName,
        phone: user?.phone,
        email: user?.email,
        joined: dayjs(user?.createdAt).format("DD MMM YYYY") || undefined,
      });
    }
  }, [user, reset]);

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

  // * FORM SUBMIT
  const onSubmit = (data: FormData) => {
    const userData = _.pick(data, ["lastName", "firstName", "phone", "email"]);

    updateUser(userData, {
      onSuccess: () => setEditing(false),
    });
  };

  return (
    <div className="min-h-screen px-4 max-container">
      <BackButton />
      {!isLoading ? (
        <div className="max-w-3xl p-8 mx-auto bg-white border shadow-lg rounded-2xl">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-32 h-32">
              <img
                src={
                  preview ||
                  userDetail?.avatar.url ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="object-cover w-full h-full border-4 rounded-full shadow-md border-warning"
              />

              {/* Upload button */}
              <label
                htmlFor="avatar"
                className="absolute p-2 text-white transition rounded-full shadow cursor-pointer bottom-1 right-1 bg-warning"
                title="Upload profile picture"
              >
                <span className="text-xs font-bold">📸</span>
                <input
                  type="file"
                  id="avatar"
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
          </div>

          {/* Info Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-3">
            <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
              <Input
                id="firstName"
                label="FirstName"
                placeholder="e.g John"
                disabled={!editing}
                register={register("firstName")}
                error={errors.firstName?.message}
              />
              <Input
                id="lastName"
                label="LastName"
                placeholder="e.g Doe"
                disabled={!editing}
                register={register("lastName")}
                error={errors.lastName?.message}
              />
            </div>
            <Input
              id="email"
              label="Email"
              placeholder="e.g johndoe@gmail.com"
              disabled={!editing}
              register={register("email")}
              error={errors.email?.message}
            />
            <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
              <Input
                id="phone"
                label="Phone Number"
                placeholder="e.g 0860010111"
                disabled={!editing}
                register={register("phone")}
                error={errors.phone?.message}
              />
              <Input
                id="joined"
                label="Joined"
                placeholder="e.g March 25"
                disabled={true}
                register={register("joined")}
                error={errors.joined?.message}
              />
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row">
              {!editing ? (
                <button
                  className="px-6 btn btn-neutral"
                  type="button"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    className="px-6 text-white btn bg-warning border-warning disabled:border-none disabled:text-black"
                    type="submit"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Saving" : "Save Changes"}
                    {isUpdating && <LoadingSpinner />}
                  </button>
                  <button
                    className="px-6 border btn btn-ghost disabled:text-black"
                    type="reset"
                    disabled={isUpdating}
                    onClick={() => {
                      reset({
                        firstName: user?.firstName,
                        lastName: user?.lastName,
                        phone: user?.phone,
                        email: user?.email,
                        joined:
                          dayjs(user?.createdAt).format("DD MMM YYYY") ||
                          undefined,
                      });

                      setEditing(false);
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}

              <button
                type="button"
                disabled={isUpdating}
                className="px-6 text-white btn btn-error disabled:text-black"
                onClick={onOpen}
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      ) : (
        <AccountLoadingSkeleton />
      )}

      {/* DELETE ACCOUNT MODAL */}
      <Modal ref={ref} onClose={onClose} />
    </div>
  );
};

export default AccountPage;
