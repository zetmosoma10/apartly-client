import ApartmentForm from "../ApartmentForm";

const AddListingPage = () => {
  return (
    <section className="max-container">
      <h2>Create New Listing</h2>
      <p className="mt-1 text-sm sm:text-base md:mt-2 opacity-70 ">
        Fill in the details below to add new apartment to your listings
      </p>
      <ApartmentForm />
    </section>
  );
};

export default AddListingPage;
