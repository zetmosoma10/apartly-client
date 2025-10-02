import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apartmentSchema } from "./validationSchemas";
import { z } from "zod";
import Input from "../../components/Input";
import SelectInput from "./new/SelectInput";
import UploadBox from "./new/UploadBox";

type FormData = z.infer<typeof apartmentSchema>;

const ApartmentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(apartmentSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
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
        <UploadBox />
      </div>
      <button className="btn btn-warning mt-5">Submit New Apartment</button>
    </form>
  );
};

export default ApartmentForm;
