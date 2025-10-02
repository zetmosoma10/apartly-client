import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  options: string[];
  register: UseFormRegisterReturn;
  error?: string;
};

const SelectInput = ({ label, id, options, register, error }: Props) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        {...register}
        defaultValue=""
        className={`select focus:select-warning w-full bg-base-200 ${
          error && "border-error"
        }`}
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
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};

export default SelectInput;
