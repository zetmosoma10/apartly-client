import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apartmentSchema } from "./validationSchemas";
import { z } from "zod";
import Input from "../../components/Input";
import SelectInput from "./new/SelectInput";
import UploadBox from "./new/UploadBox";
import React, { useEffect, useState } from "react";

type FormData = z.infer<typeof apartmentSchema>;

const ApartmentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(apartmentSchema),
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
        console.log(`file: ${file} , is not an image`);
        return false;
      }

      const MAX_MB_SIZE = 10;
      // * validate size
      if (file.size > MAX_MB_SIZE * 1024 * 1024) {
        console.log(`file: ${file}, too large (max : ${MAX_MB_SIZE})`);
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

  const onSubmit = (data: FormData) => {
    const formData = new FormData();

    if (files.length === 0) {
      alert("upload images");
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

    //* here you would send with axios
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(key, value.name, value.size, value.type);
      } else {
        console.log(key, value);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border rounded-xl mt-6 p-6 bg-base-100"
    >
      <div className="space-y-3">
        <Input
          id="title"
          label="Title"
          placeholder="e.g 2-bedrooms"
          register={register("title")}
          error={errors.title?.message}
        />
        <div className="grid sm:grid-cols-2 gap-3">
          <Input
            id="price"
            label="Price"
            placeholder="e.g R 4500"
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
        <div className="grid sm:grid-cols-2 gap-3">
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
              "1-bedrooms",
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
        <div className="grid sm:grid-cols-2 gap-3">
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
        <UploadBox onImageFileChange={onImageFileChange} />
      </div>

      {/* Image previews */}
      <div>
        {previews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {previews.map((src, i) => (
              <div key={i} className="relative">
                <img
                  src={src}
                  alt={`preview-${i}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <span className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="btn btn-warning mt-5">Submit New Apartment</button>
    </form>
  );
};

export default ApartmentForm;
