import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'overlay';
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const variantClasses = {
    default: 'relative',
    overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm'
  };

  return (
    <div className={`${variantClasses[variant]} flex items-center justify-center`}>
      <div 
        className={`
          ${sizeClasses[size]} 
          border-4 border-blue-500 
          border-t-4 border-t-blue-200 
          rounded-full 
          animate-spin
        `}
      />
    </div>
  );
};

export default Loader;