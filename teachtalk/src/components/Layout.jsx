import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Settings, LogOut } from 'lucide-react';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white">
        <div className="flex h-full flex-col">
          <div className="p-4">
            <h1 className="text-xl font-bold">Teachtalk</h1>
          </div>
          <nav className="flex-1">
            <button
              onClick={() => navigate('/chats')}
              className="flex w-full items-center space-x-2 p-4 hover:bg-gray-100"
            >
              <MessageSquare size={20} />
              <span>Chats</span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex w-full items-center space-x-2 p-4 hover:bg-gray-100"
            >
              <Settings size={20} />
              <span>Profile</span>
            </button>
          </nav>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-4 text-red-600 hover:bg-gray-100"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="flex-1 bg-white">{children}</div>
    </div>
  );
};

export default Layout;