import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "white" | "gray";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6", 
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const variantClasses = {
  primary: "border-primary/30 border-t-primary",
  white: "border-white/30 border-t-white",
  gray: "border-gray-300 border-t-gray-600",
};

export default function LoadingSpinner({ 
  size = "md", 
  variant = "primary",
  className 
}: LoadingSpinnerProps) {
  return (
    <div className={cn(
      "animate-spin rounded-full border-2",
      sizeClasses[size],
      variantClasses[variant],
      className
    )} />
  );
}
