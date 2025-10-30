import { useSearchParams } from "react-router-dom";
import _ from "lodash";

const Heading = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  return (
    <>
      {params.search ? (
        <h2 className="mb-7">Search results for '{params.search}'</h2>
      ) : (
        <h2 className="mb-7">
          {params.type || ""} {_.capitalize(params.status) || ""} Apartments
        </h2>
      )}
    </>
  );
};

export default Heading;
