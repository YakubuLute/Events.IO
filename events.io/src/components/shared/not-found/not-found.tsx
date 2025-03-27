import React from 'react';

import { IconSearch, IconExclamationCircle  } from '@tabler/icons-react';

interface NotFoundProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  actionButton?: {
    text: string;
    onClick: () => void;
  };
}

const NotFound: React.FC<NotFoundProps> = ({
  title = 'Nothing Found',
  message = 'We couldn\'t find any results matching your search.',
  icon = <IconSearch stroke={2} className="w-24 h-24 text-blue-500 opacity-70" />,
  actionButton
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <div className="relative">
        {icon}
        <IconExclamationCircle stroke={2} 
          className="absolute -top-2 -right-2 w-8 h-8 text-red-500 bg-white rounded-full shadow-lg" 
        />
      </div>
      
      <h2 className="mt-6 text-2xl font-bold text-gray-800">
        {title}
      </h2>
      
      <p className="mt-3 text-gray-600 max-w-md">
        {message}
      </p>
      
      {actionButton && (
        <button 
          onClick={actionButton.onClick}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md 
                     hover:bg-blue-600 transition-colors duration-300 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {actionButton.text}
        </button>
      )}
    </div>
  );
};

export default NotFound;