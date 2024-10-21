import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockAPI } from '../services/mockAPI';
import { Search } from 'lucide-react';

const ChatList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const rooms = await mockAPI.getChatRooms();
        setChatRooms(rooms);
      } catch (error) {
        console.error('Failed to fetch chat rooms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChatRooms();
  }, []);

  const filteredRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto p-4">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => navigate(`/chat/${room.id}`)}
            className="cursor-pointer rounded-lg p-4 transition-colors hover:bg-gray-50 active:bg-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                {room.name.charAt(0)}
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-semibold text-gray-900">{room.name}</h3>
                <p className="truncate text-sm text-gray-500">{room.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;