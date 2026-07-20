import React from "react";
import { Spinner } from "../Loaders/Spinner";
import { Link } from "react-router-dom";
// Componente para renderizar botones por variantes(colores y estilos), funciones(onClick), estados(disabled, loading...) o tipos(submit, button...)

type Variant = "primary" | "white" | "secondary" | "outline" | "ghost" | "danger" | "plain";
type Radius = "md" | "full";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: Variant;
  radius?: Radius;
  to?: string;
};

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-strong",
  white: "bg-white text-primary hover:bg-white-strong shadow-sm hover:shadow-md",
  secondary: "bg-gray text-white hover:bg-gray-dark",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "text-primary hover:text-primary-strong hover:bg-primary-soft",
  plain: "text-dark hover:text-primary-strong hover:bg-primary-soft",
  danger: "bg-error text-white hover:bg-error-strong",
};
const disabledStyles =
  "bg-gray bg-opacity-30 text-white cursor-not-allowed pointer-events-none";

const radiusStyles: Record<Radius, string> = {
  md: "rounded-md",
  full: "rounded-full",
};

export const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  className = "",
  variant = "primary",
  radius = "md",
  to,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const styles = `
    inline-flex items-center justify-center gap-2
    px-4 py-2

    ${radiusStyles[radius]}

    font-semibold
    no-underline
    transition-all duration-300 ease-out
    
    ${isDisabled ? disabledStyles : variants[variant]}

    ${className}
  `;

  // Si tiene "to", renderiza Link
  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    );
  }

  // Si no, renderiza button normal
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={styles}
    >
      {children}

      {loading && <Spinner size="sm" bg="white" />}
    </button>
  );
};
