import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  options: string[];
  register: UseFormRegisterReturn;
};

const SelectInput = ({ label, id, options, register }: Props) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        {...register}
        defaultValue=""
        className="select focus:select-warning w-full bg-base-200"
      >
        <option disabled value="">
          --Choose--
        </option>
        {options.map((item, idx) => (
          <option key={idx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
