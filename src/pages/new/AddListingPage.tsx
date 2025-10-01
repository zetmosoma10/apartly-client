import Input from "../../components/Input";
import SelectInput from "./SelectInput";

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
          <div className="w-full">
            <label
              htmlFor="images"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-base-100 hover:bg-base-200"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                <svg
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4m0 0l-2-2m2 2l2-2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  & drop
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, JPEG (max 5MB)
                </p>
              </div>
              <input id="images" type="file" className="hidden" multiple />
            </label>
          </div>
        </div>
        <button className="btn btn-warning mt-5">Submit New Apartment</button>
      </form>
    </section>
  );
};

export default AddListingPage;
