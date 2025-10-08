import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "textarea" | "password";
  register: UseFormRegisterReturn;
  error?: string;
};

const Input = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
}: Props) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      {type !== "textarea" ? (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          className={`input w-full focus:outline-none bg-base-200 rounded-lg ${
            error ? "border-error focus:border-error" : "focus:border-warning"
          }`}
        />
      ) : (
        <textarea
          id={id}
          placeholder={placeholder}
          {...register}
          className={`input w-full h-32 resize-none focus:outline-none  bg-base-200 rounded-lg p-2 ${
            error ? "border-error focus:border-error" : "focus:border-warning"
          }`}
        />
      )}
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};

export default Input;
