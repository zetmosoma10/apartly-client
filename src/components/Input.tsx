import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "textarea";
  register: UseFormRegisterReturn;
};

const Input = ({ id, label, type = "text", placeholder, register }: Props) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      {type === "text" ? (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          className="input w-full focus:outline-none focus:border-warning bg-base-200 rounded-lg"
        />
      ) : (
        <textarea
          id={id}
          placeholder={placeholder}
          {...register}
          className="input w-full h-32 resize-none focus:outline-none focus:border-warning bg-base-200 rounded-lg p-2"
        />
      )}
    </div>
  );
};

export default Input;
