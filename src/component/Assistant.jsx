

// import React from 'react'

// const Assistant = () => {
//   return (
//     <div className="relative z-50 p-4 bg-white text-black rounded">
//       <p>This is assistant page</p>
//       <a 
//         href="https://agri-connect-by-gireesh.streamlit.app/" 
//         target="_blank" 
//         rel="noopener noreferrer"
//          className="flex-1 w-full border rounded-lg shadow"      >
//         Open Agri-Connect App
//       </a>
//     </div>
//   );
// };


// export default Assistant



import {React,useState,useRef,useEffect} from "react";


const Assistant = () => {

  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I'm your AgriBot assistant. How can I help you with your farming needs today?",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const userId = "user_123"; // Replace this with dynamic user ID if needed

  const sendMessage = async () => {
  if (!inputText.trim()) return;

  const userMessage = { sender: 'user', text: inputText };
  setMessages((prev) => [...prev, userMessage]);
  setInputText('');
  setIsTyping(true); // <-- Start typing

  try {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('question', inputText);

    const response = await fetch('http://127.0.0.1:8004/ask', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    const botReply = {
      sender: 'bot',
      text: data.answer || 'Sorry, I could not find an answer.',
    };

    setMessages((prev) => [...prev, botReply]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      { sender: 'bot', text: 'Error contacting the assistant. Please try again.' },
    ]);
    console.error('Chat error:', error);
  } finally {
    setIsTyping(false); // <-- Stop typing
  }
};


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

 


  return (
    <div className="p-4 h-screen flex flex-col">
      <p className="mb-4 text-lg font-semibold">This is assistant page</p>

      {/* Embed the Streamlit app directly */}
      <iframe
        src="https://agri-connect-by-gireesh.streamlit.app/"
        title="Agri-Connect App"
        className="flex-1 w-full rounded-lg shadow border"
        style={{ minHeight: "80vh" }}
      />
    </div>
  );
};

export default Assistant;

