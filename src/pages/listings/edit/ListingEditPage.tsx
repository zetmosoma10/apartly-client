import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { Response } from "../../../entities/Response";
import type { Apartment } from "../../../entities/Apartment";
import ApartmentForm from "../ApartmentForm";
import BackButton from "../../../components/BackButton";

const ListingEditPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const query = queryClient.getQueryData<Response<Apartment>>([
    "apartments",
    id,
  ]);

  const apartment = query?.results;
  return (
    <section className="max-container">
      <BackButton />
      <h2>Edit Apartment: {apartment?.title}</h2>
      <div>
        <ApartmentForm apartment={apartment} />
      </div>
    </section>
  );
};

export default ListingEditPage;
