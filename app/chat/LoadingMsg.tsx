import React from 'react'

function LoadingMsg() {
  return (
    <div
      className='flex justify-start mb-4'
    >
        <div className='p-3 rounded-lg max-w-screen-sm bg-gray-300 text-gray-900 '>
        <div className='flex space-x-1 justify-start items-center bg-gray-300'>
            <div className='h-1.5 w-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-1.5 w-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-1.5 w-1.5 bg-black rounded-full animate-bounce'></div>
        </div>
    
</div>
    </div>
  )
}

export default LoadingMsg