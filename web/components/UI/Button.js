import { theme } from "../../config/theme";

export default function Button({
  children,
  onClick,
  variant = "primary", // "primary" | "secondary" | "gold"
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${theme.button[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
