import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/AIChat.css';

function AIChat({ isOpen, onClose }) {
  const [userQuestion, setUserQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const chatBoxRef = useRef(null);
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

  const handleAskSubmit = async () => {
    if (!userQuestion.trim() || userQuestion.trim().length > 500) {
      setChatHistory(prev => [...prev, { type: 'error', message: 'Message too long. Please limit to 500 characters.' }]);
      return;
    }

    setLoadingChat(true);
    setChatHistory(prev => [...prev, { type: 'user', message: userQuestion }]);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, { message: userQuestion });
      const aiResponse = response.data?.response || 'Invalid response structure or no response found';
      setChatHistory(prev => [...prev, { type: 'ai', message: aiResponse }]);
      setUserQuestion('');
    } catch (error) {
      const errorMessage = error.response?.status === 429 ? 'Rate limit exceeded. Please try again later.' :
                           error.response?.status === 500 ? 'Server error. Please try again later.' :
                           error.response?.data?.error || 'Error: Unable to get a response. Please try again.';
      setChatHistory(prev => [...prev, { type: 'error', message: errorMessage }]);
    } finally {
      setLoadingChat(false);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [chatHistory]);

  return isOpen && (
    <div className="ai-chat-box-popup">
      <div className="ai-chat-box-content">
        <span className="ai-chat-close-btn" onClick={onClose}>×</span>
        <h3 className="ai-chat-title">Ask Me Anything!</h3>
        <div className="ai-chat-history" ref={chatBoxRef} aria-live="polite">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`ai-chat-message ${chat.type}`}>
              <div className="ai-chat-avatar">
                <img src={`/images/${chat.type === 'user' ? 'user' : chat.type === 'ai' ? 'ai' : 'error'}-avatar.png`} alt={chat.type} />
              </div>
              <div className="ai-chat-text">{chat.message}</div>
            </div>
          ))}
          {loadingChat && <div className="ai-chat-loading"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Thinking...</div>}
        </div>
        <textarea className="ai-chat-textarea" value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} placeholder="Type your question here..." rows={3} disabled={loadingChat} />
        <button className="ai-chat-submit-btn" onClick={handleAskSubmit} disabled={loadingChat || !userQuestion.trim()}>
          {loadingChat ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Ask'}
        </button>
      </div>
    </div>
  );
}

export default AIChat;
