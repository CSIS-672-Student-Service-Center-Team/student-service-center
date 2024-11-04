import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
}) => {
  const baseClasses =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
  const variantClasses = {
    default: "bg-[#BFA87C] text-white",
    secondary: "bg-gray-100 text-gray-800",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};
