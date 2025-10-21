import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

type Props = {
  id: string;
  label: string;
  placeholder: string;
  autoFocus?: boolean;
  type?: "text" | "textarea" | "password";
  register: UseFormRegisterReturn;
  error?: string;
  disabled?: boolean;
};

const Input = ({
  id,
  label,
  placeholder,
  register,
  error,
  type = "text",
  disabled = false,
  autoFocus = false,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const typeOfTextInput = type === "password" && showPassword ? "text" : type;

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      {type !== "textarea" ? (
        <div className="relative">
          <input
            id={id}
            type={typeOfTextInput}
            autoFocus={autoFocus}
            disabled={disabled}
            placeholder={placeholder}
            {...register}
            className={`input w-full focus:outline-none bg-base-200 rounded-lg ${
              error ? "border-error focus:border-error" : "focus:border-warning"
            }`}
          />
          {type === "password" && (
            <div
              onClick={togglePasswordVisibility}
              className="absolute z-20 pl-4 text-black cursor-pointer right-3 top-2 text-opacity-70"
            >
              {showPassword ? (
                <MdVisibilityOff size={24} />
              ) : (
                <MdVisibility size={24} />
              )}
            </div>
          )}
        </div>
      ) : (
        <textarea
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          {...register}
          className={`textarea w-full h-32 resize-none focus:outline-none  bg-base-200 rounded-lg p-2 ${
            error ? "border-error focus:border-error" : "focus:border-warning"
          }`}
        />
      )}
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};

export default Input;
