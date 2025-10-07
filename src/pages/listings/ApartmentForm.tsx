import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apartmentSchema } from "./validationSchemas";
import { z } from "zod";
import type { Apartment } from "../../entities/Apartment";
import Input from "../../components/Input";
import SelectInput from "./new/SelectInput";
import UploadBox from "./new/UploadBox";
import toast from "react-hot-toast";
import useCreateApartment from "../../hooks/useCreateApartment";

type FormData = z.infer<typeof apartmentSchema>;

const ApartmentForm = ({ apartment }: { apartment?: Apartment }) => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(apartmentSchema),
    defaultValues: id
      ? {
          title: apartment?.title ?? "",
          description: apartment?.description ?? "",
          address: apartment?.address ?? "",
          city: apartment?.city ?? "",
          price: apartment?.price ? Number(apartment.price) : undefined,
          bedrooms: apartment?.bedrooms
            ? Number(apartment.bedrooms)
            : undefined,
          bathrooms: apartment?.bathrooms
            ? Number(apartment.bathrooms)
            : undefined,
          status: apartment?.status ?? "available",
          amenities: apartment?.amenities ? apartment.amenities.join(", ") : "",
          type: apartment?.type ?? "other",
        }
      : undefined,
  });

  // * file + image preview state
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // * handle upload image-file
  const onImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    // * validate images
    const validFiles = selectedFiles.filter((file) => {
      // * file type should be image
      if (!file.type.startsWith("image/")) {
        toast.error(`file: ${file} , is not an image. it will be removed`);
        return false;
      }

      const MAX_MB_SIZE = 10;
      // * validate size
      if (file.size > MAX_MB_SIZE * 1024 * 1024) {
        console.log();
        toast.error(
          `file: ${file}, too large (max : ${MAX_MB_SIZE}). It will be removed`
        );
        return false;
      }

      return true;
    });

    setFiles(validFiles);
    setPreviews(validFiles.map((file) => URL.createObjectURL(file)));
  };

  useEffect(() => {
    return () => {
      previews.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [previews]);

  // * Submit the form
  const { mutate, isPending } = useCreateApartment();

  const onSubmit = (data: FormData) => {
    const formData = new FormData();

    if (files.length === 0) {
      toast.error("Please upload one or more image(s)");
      return;
    }

    // * append normal text fields
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    // * append files
    files.forEach((file) => {
      formData.append("images", file);
    });

    mutate(formData, {
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 mt-6 border shadow-md rounded-xl bg-base-100"
    >
      <div className="space-y-3">
        <Input
          id="title"
          label="Title"
          placeholder="e.g 2-bedrooms apartment with mountain view"
          register={register("title")}
          error={errors.title?.message}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            id="price"
            label="Price"
            placeholder="e.g 4500"
            register={register("price")}
            error={errors.price?.message}
          />
          <Input
            id="bedrooms"
            label="Bedrooms"
            placeholder="e.g 2"
            register={register("bedrooms")}
            error={errors.bedrooms?.message}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            id="city"
            label="City"
            placeholder="e.g Cape Town"
            register={register("city")}
            error={errors.city?.message}
          />
          <SelectInput
            id="type"
            label="Type"
            options={[
              "bachelor",
              "1-bedroom",
              "2-bedrooms",
              "3-bedrooms",
              "studio",
              "other",
            ]}
            register={register("type")}
            error={errors.type?.message}
          />
        </div>
        <div>
          <Input
            id="address"
            label="Address"
            placeholder="e.g 31 goblet street Springs"
            register={register("address")}
            error={errors.address?.message}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            id="bathrooms"
            label="Bathrooms"
            placeholder="e.g 1"
            register={register("bathrooms")}
            error={errors.bathrooms?.message}
          />
          <SelectInput
            id="status"
            label="Status"
            options={["available", "maintenance", "rented"]}
            register={register("status")}
            error={errors.status?.message}
          />
        </div>
        <Input
          id="amenities"
          label="Amenities"
          placeholder="e.g Free wifi, Mountain View, Free Parking"
          register={register("amenities")}
          error={errors.amenities?.message}
        />
        <Input
          id="description"
          type="textarea"
          label="Description"
          placeholder="e.g Beautiful apartment with 2-bedrooms and free wifi"
          register={register("description")}
          error={errors.description?.message}
        />
        {!id && <UploadBox onImageFileChange={onImageFileChange} />}
      </div>

      {/* Image previews */}
      {!id && (
        <div>
          {previews.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-4 sm:grid-cols-3">
              {previews.map((src, i) => (
                <div key={i} className="relative">
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    className="object-cover w-full h-32 rounded-lg"
                  />
                  <span className="absolute px-1 text-xs text-white bg-black bg-opacity-50 rounded top-1 right-1">
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <button disabled={isPending} className="mt-5 btn btn-warning">
        {id ? "Update Apartment" : "Submit New Apartment"}
        {isPending && (
          <span className="loading loading-spinner loading-sm text-warning"></span>
        )}
      </button>
    </form>
  );
};

export default ApartmentForm;
