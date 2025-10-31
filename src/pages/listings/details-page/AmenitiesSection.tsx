const AmenitiesSection = ({ amenities }: { amenities?: string[] }) => {
  return (
    <div className="mt-6">
      <h3>Amenities</h3>
      <ul className="flex flex-wrap items-center gap-3 mt-3">
        {amenities?.map((item, index) => (
          <li
            key={index}
            className="px-2 py-1 text-xs border rounded-lg border-warning text-warning-content"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AmenitiesSection;
