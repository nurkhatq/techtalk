import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { mockAPI } from '../services/mockAPI';
import { Send } from 'lucide-react';

const ChatRoom = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const msgs = await mockAPI.getMessages(id);
        setMessages(msgs);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      username: user.username,
      message: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="border-b bg-white p-4">
        <h2 className="text-lg font-semibold">Chat Room #{id}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isOwnMessage = msg.username === user.username;
            return (
              <div
                key={msg.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    isOwnMessage
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-900 shadow'
                  }`}
                >
                  {!isOwnMessage && (
                    <p className="mb-1 text-sm font-semibold">{msg.username}</p>
                  )}
                  <p className="break-words">{msg.message}</p>
                  <p
                    className={`mt-1 text-right text-xs ${
                      isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t bg-white p-4">
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-3 pr-12 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              rows="1"
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="absolute bottom-2 right-2 rounded-full p-2 text-blue-600 hover:bg-blue-50 disabled:text-gray-400"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;