import React from "react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  className, 
  size = "md", 
  text = "Yuklanmoqda..." 
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div 
        className={cn(
          "animate-spin rounded-full border-b-2 border-primary",
          sizeClasses[size]
        )}
      ></div>
      {text && (
        <p className="text-gray-400 mt-2 text-sm">{text}</p>
      )}
    </div>
  );
};

interface ProductSkeletonProps {
  count?: number;
  className?: string;
}

export const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ 
  count = 8, 
  className 
}) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", className)}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-[#1E243D] rounded-xl animate-pulse">
          <div className="h-48 bg-gray-600 rounded-lg mb-4"></div>
          <div className="px-4 pb-4 space-y-3">
            <div className="h-6 bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
            <div className="h-8 bg-gray-600 rounded w-1/2"></div>
            <div className="h-10 bg-gray-600 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Xatolik yuz berdi",
  message = "Ma'lumotlarni yuklashda muammo bo'ldi",
  onRetry,
  className
}) => {
  return (
    <div className={cn("text-center py-10", className)}>
      <div className="mb-4">
        <svg 
          className="w-16 h-16 text-red-400 mx-auto mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z" 
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-red-400 mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        >
          Qayta urinish
        </button>
      )}
    </div>
  );
};
