'use client'
import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

type MessageProps = {
  text: string;
  sender: string;
  id: number;
  last_id: number;
};

const Message: React.FC<MessageProps> = ({ text, sender, id, last_id }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      setIndex((prev) => prev + 1);
    }, 15);

    if (index >= text.length) {
      clearInterval(typingInterval);
    }

    return () => clearInterval(typingInterval);
  }, [index, text]);

  return (
    <div className={`flex flex-col ${sender === 'user' ? 'items-end' : 'items-start'} mb-2`}>
      <div
        className={`p-3 rounded-lg max-w-screen-sm ${
          sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900'
        }`}
      >
        <div className="text-sm">
          <Markdown>{id === last_id && sender !== 'user' ? displayedText : text}</Markdown>
        </div>
      </div>
     
    </div>
  );
};

export default Message;
