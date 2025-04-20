import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "outline" | "ghost";
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = ({
  children,
  variant = "default",
  padding = "md",
  className,
  ...props
}: CardProps) => {
  const baseStyles = "rounded-lg";

  const variantStyles = {
    default: "bg-white border border-gray-200 shadow-sm",
    outline: "bg-transparent border border-gray-200",
    ghost: "bg-transparent",
  };

  const paddingStyles = {
    none: "p-0",
    sm: "p-3",
    md: "p-5",
    lg: "p-8",
  };

  const combinedClassName = twMerge(
    baseStyles,
    variantStyles[variant],
    paddingStyles[padding],
    className
  );

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = ({
  children,
  className,
  ...props
}: CardHeaderProps) => {
  return (
    <div className={twMerge("mb-4", className)} {...props}>
      {children}
    </div>
  );
};

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const CardTitle = ({
  children,
  className,
  ...props
}: CardTitleProps) => {
  return (
    <h3 className={twMerge("text-xl font-semibold", className)} {...props}>
      {children}
    </h3>
  );
};

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const CardDescription = ({
  children,
  className,
  ...props
}: CardDescriptionProps) => {
  return (
    <p className={twMerge("text-gray-600 text-sm", className)} {...props}>
      {children}
    </p>
  );
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardContent = ({
  children,
  className,
  ...props
}: CardContentProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardFooter = ({
  children,
  className,
  ...props
}: CardFooterProps) => {
  return (
    <div className={twMerge("mt-4 flex items-center", className)} {...props}>
      {children}
    </div>
  );
};
