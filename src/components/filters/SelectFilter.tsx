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
      className="select focus:select-warning w-full bg-base-200"
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
