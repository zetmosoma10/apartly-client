import { useLocation } from "react-router-dom";

// A small helper component to read the current URL path in tests
const DisplayLocation = () => {
  const { pathname } = useLocation();
  return <div data-testid="display-location">{pathname}</div>;
};

export default DisplayLocation;
