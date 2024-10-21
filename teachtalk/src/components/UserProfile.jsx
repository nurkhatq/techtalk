import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, Bell, Lock, Trash, Phone, Video } from 'lucide-react';
import Switch from './Switch';
import Avatar from './Avatar';

const UserProfile = () => {
    const [username, setUsername] = useState('TestUser');
    const [email, setEmail] = useState('dnurhat140@gmail.com');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOnlineStatus, setShowOnlineStatus] = useState(true);
    const [receiveNotifications, setReceiveNotifications] = useState(true);
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setUsername(user.username);
        setEmail(user.email || '');
        setShowOnlineStatus(user.showOnlineStatus || true);
        setReceiveNotifications(user.receiveNotifications || true);
        setBlockedUsers(user.blockedUsers || []);
      }
    }, []);
  
    const handleSave = async () => {
      setLoading(true);
      setSaved(false);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        user.username = username;
        user.email = email;
        user.showOnlineStatus = showOnlineStatus;
        user.receiveNotifications = receiveNotifications;
        user.blockedUsers = blockedUsers;
        localStorage.setItem('user', JSON.stringify(user));
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
      setLoading(false);
    };
  
    const handleBlockUser = (username) => {
      setBlockedUsers([...blockedUsers, username]);
    };
  
    const handleUnblockUser = (username) => {
      setBlockedUsers(blockedUsers.filter(user => user !== username));
    };
  
    const handleAudioCall = () => {
      navigate('/call/audio', { state: { username, email } });
    };
  
    const handleVideoCall = () => {
      navigate('/call/video', { state: { username, email } });
    };
  
    return (
      <div className="flex justify-center">
        <div className="mx-auto max-w-2xl p-8 space-y-8">
          <div className="text-center">
            <div className="group relative mx-auto mb-4 h-32 w-32">
              <Avatar username={username} size="lg" />
              <button className="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <Camera size={20} className="text-gray-600" />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
          </div>

          <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>

            <div className="space-y-4 rounded-lg bg-gray-50 p-4">
              <h3 className="font-medium text-gray-900">Change Password</h3>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
            </div>

            <div className="space-y-4 rounded-lg bg-gray-50 p-4">
              <h3 className="font-medium text-gray-900">Notifications and Privacy</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell size={20} className="text-gray-400" />
                  <span>Receive Notifications</span>
                </div>
                <Switch
                  checked={receiveNotifications}
                  onChange={setReceiveNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User size={20} className="text-gray-400" />
                  <span>Show Online Status</span>
                </div>
                <Switch
                  checked={showOnlineStatus}
                  onChange={setShowOnlineStatus}
                />
              </div>
            </div>

            <div className="space-y-4 rounded-lg bg-gray-50 p-4">
              <h3 className="font-medium text-gray-900">Blocked Users</h3>
              {blockedUsers.length > 0 ? (
                <div className="space-y-2">
                  {blockedUsers.map((username, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar username={username} size="sm" />
                        <span>{username}</span>
                      </div>
                      <button
                        onClick={() => handleUnblockUser(username)}
                        className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No blocked users</p>
              )}
              <button
                onClick={() => handleBlockUser('newUser')}
                className="w-full rounded-lg bg-gray-200 p-3 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Block a User
              </button>
            </div>

            <div className="space-y-4 rounded-lg bg-gray-50 p-4">
              <h3 className="font-medium text-gray-900">Calls</h3>
              <div className="flex items-center justify-between">
                <button
                  onClick={handleAudioCall}
                  className="flex items-center space-x-3 rounded-lg bg-white p-3 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Phone size={20} className="text-gray-400" />
                  <span>Audio Call</span>
                </button>
                <button
                  onClick={handleVideoCall}
                  className="flex items-center space-x-3 rounded-lg bg-white p-3 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Video size={20} className="text-gray-400" />
                  <span>Video Call</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4">
              {saved && (
                <span className="text-sm text-green-600">
                  Profile updated successfully!
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={loading}
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserProfile;
