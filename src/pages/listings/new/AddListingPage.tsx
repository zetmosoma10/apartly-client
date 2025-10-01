import ApartmentForm from "../ApartmentForm";

const AddListingPage = () => {
  return (
    <section className="w-full md:max-w-xl lg:max-w-4xl mx-auto">
      <h2>Create New Listing</h2>
      <p className="text-sm sm:text-base mt-1 md:mt-2 opacity-70 ">
        Fill in the details below to add new apartment to your listings
      </p>
      <ApartmentForm />
    </section>
  );
};

export default AddListingPage;
