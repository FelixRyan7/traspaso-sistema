type Size = "sm" | "md" | "lg";
type Color = "primary" | "primary-strong" | "white" | "dark";
type Bg = "gray-light" | "gray" | "gray-dark" | "white";

type SpinnerProps = {
  size?: Size;
  color?: Color;
  bg?: Bg;
};

const sizes: Record<Size, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-[3.5px]",
};

const colors: Record<Color, string> = {
  primary: "border-t-primary",
  "primary-strong": "border-t-primary-strong",
  white: "border-t-white",
  dark: "border-t-dark",
};

const backgrounds: Record<Bg, string> = {
  "gray-light": "border-neutral-200",
  gray: "border-neutral-300",
  "gray-dark": "border-neutral-600",
  white: "border-white/30",
};

export const Spinner = ({
  size = "md",
  color = "primary",
  bg = "gray-light",
}: SpinnerProps) => {
  return (
    <div
      className={`
        ${sizes[size]}
        ${backgrounds[bg]}
        ${colors[color]}
        rounded-full
        animate-spin
        ease-linear
      `}
    />
  );
};
