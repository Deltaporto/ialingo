import React from 'react';
import { useRouter } from 'next/router';

const ReferenceGuideButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/reference')}
      className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
      </svg>
      <span>Guia de Referência</span>
    </button>
  );
};

export default ReferenceGuideButton; 