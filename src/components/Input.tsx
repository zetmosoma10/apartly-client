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
};

const Input = ({
  id,
  label,
  type = "text",
  autoFocus = false,
  placeholder,
  register,
  error,
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
            placeholder={placeholder}
            {...register}
            className={`input w-full focus:outline-none bg-base-200 rounded-lg ${
              error ? "border-error focus:border-error" : "focus:border-warning"
            }`}
          />
          {type === "password" && (
            <div
              onClick={togglePasswordVisibility}
              className="absolute cursor-pointer right-3 top-2  text-black text-opacity-70 z-20 pl-4"
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
