type Props = {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "textarea";
};

const Input = ({ id, label, type = "text", placeholder }: Props) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      {type === "text" ? (
        <input
          name={id}
          type={type}
          placeholder={placeholder}
          className="input w-full focus:outline-none focus:border-warning bg-base-200 rounded-lg"
        />
      ) : (
        <textarea
          name={id}
          placeholder={placeholder}
          className="input w-full h-32 resize-none focus:outline-none focus:border-warning bg-base-200 rounded-lg p-2"
        />
      )}
    </div>
  );
};

export default Input;
