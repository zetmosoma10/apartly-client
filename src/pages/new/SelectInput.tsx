type Props = {
  id: string;
  label: string;
  options: string[];
};

const SelectInput = ({ label, id, options }: Props) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className="select focus:select-warning w-full bg-base-200"
      >
        <option disabled selected>
          --Choose--
        </option>
        {options.map((item, idx) => (
          <option key={idx}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
