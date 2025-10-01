import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import SelectInput from "./new/SelectInput";
import UploadBox from "./new/UploadBox";

const ApartmentForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
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
        />
        <div className="grid sm:grid-cols-2 gap-3">
          <Input
            id="price"
            label="Price"
            placeholder="e.g R 4500"
            register={register("price")}
          />
          <Input
            id="bedrooms"
            label="Bedrooms"
            placeholder="e.g 2"
            register={register("bedrooms")}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input
            id="city"
            label="City"
            placeholder="e.g Cape Town"
            register={register("city")}
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
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input
            id="bathrooms"
            label="Bathrooms"
            placeholder="e.g 1"
            register={register("bathrooms")}
          />
          <SelectInput
            id="status"
            label="Status"
            options={["Available", "Maintenance", "Rented"]}
            register={register("status")}
          />
        </div>
        <Input
          id="amenities"
          label="Amenities"
          placeholder="e.g Free wifi, Mountain View, Free Parking"
          register={register("amenities")}
        />
        <Input
          id="description"
          type="textarea"
          label="Description"
          placeholder="e.g Beautiful apartment with 2-bedrooms and free wifi"
          register={register("description")}
        />
        <UploadBox />
      </div>
      <button className="btn btn-warning mt-5">Submit New Apartment</button>
    </form>
  );
};

export default ApartmentForm;
