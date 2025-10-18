type Props = {
  value: string;
  paramKey: string;
  defaultOption: string;
  options: string[] | number[];
  handleFilterChange: (key: string, value: string) => void;
};

const SelectFilter = ({
  value,
  options,
  paramKey,
  defaultOption,
  handleFilterChange,
}: Props) => {
  return (
    <select
      className="select select-xs md:select-sm focus:select-warning  bg-base-200 text-nowrap"
      value={value}
      onChange={(e) => handleFilterChange(paramKey, e.target.value)}
    >
      <option value="">{defaultOption}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectFilter;
