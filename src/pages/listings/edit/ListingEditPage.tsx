import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { Response } from "../../../entities/Response";
import type { Apartment } from "../../../entities/Apartment";
import ApartmentForm from "../ApartmentForm";

const ListingEditPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const query = queryClient.getQueryData<Response<Apartment>>([
    "apartment",
    id,
  ]);

  const apartment = query?.results;
  return (
    <section className="w-full mx-auto md:max-w-5xl">
      <h2>Edit Apartment: {apartment?.title}</h2>
      <div>
        <ApartmentForm apartment={apartment} />
      </div>
    </section>
  );
};

export default ListingEditPage;
