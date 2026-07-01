import type { UseFormRegisterReturn } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type InputFloatingRHFProps = {
  id: string;
  label: string;
  type?: string;
  icon?: React.ReactNode;
  register: UseFormRegisterReturn;
  error?: string;
  value?: string | number;
  list?: string;
  options?: Option[];
  disabled?: boolean;
};

export default function InputFloatingRHF({
  id,
  label,
  type = "text",
  icon,
  register,
  error,
  value,
  list,
  options = [],
  disabled = false,
}: InputFloatingRHFProps) {
  const isFilled =
  value !== undefined &&
  value !== null &&
  value.toString().trim().length > 0;
  const isDateInput = type === "date";
  const isSelectInput = type === "select";
  const hasIcon = !!icon;

  return (
    <div className=" flex flex-col w-full relative min-h-[90px]">
      {/* Wrapper input + icon */}
      <div
        className={`group relative flex items-center h-16 rounded-md border-[1.5px] bg-transparent transition-colors duration-200 ease-in-out
          ${error ? "border-error" : "border-gray-light"}
          ${disabled ? "opacity-40 cursor-not-allowed" : ""}
          focus-within:border-primary/60
        `}
      >
        {/* Icono */}
        {hasIcon && (
          <div
            className={`flex items-center justify-center px-3 border-r-[1px] border-gray text-gray transition-colors duration-200 ease-in-out
              group-focus-within:text-primary
            `}
          >
            {icon}
          </div>
        )}

        {/* Input / Select */}
        {type === "select" ? (
          <select
            id={id}
            {...register}
            disabled={disabled}
            className="peer flex-1 p-3 bg-transparent outline-none text-base"
          >
            <option value="">{label}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            type={type}
            list={list}
            placeholder=" " 
            {...register}
            disabled={disabled}
            className="peer flex-1 p-3 bg-transparent outline-none text-base"
          />
        )}

        {/* Label flotante */}
        <label
          htmlFor={id}
          className={`absolute ${hasIcon ? "left-[59px]" : "left-3"} text-gray text-base transition-all duration-200 ease-in-out
            peer-placeholder-shown:top-[19px] peer-placeholder-shown:text-base
            peer-focus:-top-2 ${hasIcon ? "peer-focus:left-[59px]" : "peer-focus:left-3"}  peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white peer-focus:px-1
            ${isFilled || isSelectInput || isDateInput ? "-top-2 left-10 text-xs text-gray bg-white px-1" : ""}
          `}
        >
          {label}
        </label>
      </div>

      {/* Error */}
      {error && <p className="text-error text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
}
