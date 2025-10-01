import Input from "../../components/Input";
import SelectInput from "./SelectInput";
import UploadBox from "./UploadBox";

const AddListingPage = () => {
  return (
    <section className="w-full md:max-w-xl lg:max-w-4xl mx-auto">
      <h2>Create New Listing</h2>
      <p className="text-sm sm:text-base mt-1 md:mt-2 opacity-70 ">
        Fill in the details below to add new apartment to your listings
      </p>
      <form className="border rounded-xl mt-6 p-6 bg-base-100">
        <div className="space-y-3">
          <Input id="title" label="Title" placeholder="e.g 2-bedrooms" />
          <div className="grid sm:grid-cols-2 gap-3">
            <Input id="price" label="Price" placeholder="e.g R 4500" />
            <Input id="bedrooms" label="Bedrooms" placeholder="e.g 2" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input id="city" label="City" placeholder="e.g Cape Town" />
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
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input id="bathrooms" label="Bathrooms" placeholder="e.g 1" />
            <SelectInput
              id="status"
              label="Status"
              options={["Available", "Maintenance", "Rented"]}
            />
          </div>
          <Input
            id="amenities"
            label="Amenities"
            placeholder="e.g Free wifi, Mountain View, Free Parking"
          />
          <Input
            id="description"
            type="textarea"
            label="Description"
            placeholder="e.g Beautiful apartment with 2-bedrooms and free wifi"
          />
          <UploadBox />
        </div>
        <button className="btn btn-warning mt-5">Submit New Apartment</button>
      </form>
    </section>
  );
};

export default AddListingPage;
