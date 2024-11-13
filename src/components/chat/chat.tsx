import { useState } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    console.log(messages);
    if (input.trim()) {
      // Add user's message to messages
      //   setMessages([...messages, { sender: 'user', text: input }]);
      // Add bot's auto-response
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: input },
        { sender: 'bot', text: 'Hello, User' },
      ]);
      // Clear the input field
      setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-lg mx-auto">
      <div className="flex flex-col w-full mb-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.sender === 'user'
                ? 'self-end bg-blue-500 text-white'
                : 'self-start bg-gray-200 text-gray-800'
            } px-4 py-2 rounded-lg max-w-xs break-words`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
