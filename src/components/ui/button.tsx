import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "danger";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  isFullWidth = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400",
    outline:
      "border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-900",
    link: "bg-transparent underline text-blue-600 hover:text-blue-700 p-0 h-auto",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  };

  const sizeStyles = {
    xs: "text-xs px-2 py-1 rounded",
    sm: "text-sm px-3 py-1.5 rounded",
    md: "text-base px-4 py-2 rounded-md",
    lg: "text-lg px-5 py-2.5 rounded-md",
    xl: "text-xl px-6 py-3 rounded-lg",
  };

  const widthStyles = isFullWidth ? "w-full" : "";

  const combinedClassName = twMerge(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    widthStyles,
    className
  );

  return (
    <button
      className={combinedClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
