import React from 'react';

function ChatsFallback() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className='bg-gray-300 rounded-lg p-2 mb-2'>
          <div className="h-1 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-1 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      ))}
    </>
  );
}

export default ChatsFallback;
