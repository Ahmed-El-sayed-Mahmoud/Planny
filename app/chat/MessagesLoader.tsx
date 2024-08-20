export default function MessagesLoader() {
    return (
      <>
        {Array.from({ length: 8 }).map((_, i) => (
          <Template key={i} sender={i % 2 === 0 ? 'user' : 'bot'} width={Math.random() * (360 - 100) + 100} />
        ))}
      </>
    );
  }
  
  export function Template({ sender, width }: { sender: string; width: number }) {
    return (
      <div
        className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
      >
        <div
          className={`p-3 rounded-lg max-w-screen-sm ${
            sender === 'user'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-900'
          }`}
        >
          <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4 animate-pulse"></div>
          <div
            className="h-1 bg-gray-200 rounded-full dark:bg-gray-200 animate-pulse"
            style={{ width: `${width}px` }}
          ></div>
        </div>
      </div>
    );
  }
  