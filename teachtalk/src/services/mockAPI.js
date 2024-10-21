export const mockAPI = {
    login: async (email, password) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, user: { id: 1, username: 'TestUser', email } });
        }, 1000);
      });
    },
    register: async (username, email, password) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, user: { id: 1, username, email } });
        }, 1000);
      });
    },
    getChatRooms: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: 'General Chat', lastMessage: 'Hello everyone!' },
            { id: 2, name: 'Tech Support', lastMessage: 'How can I help?' },
            { id: 3, name: 'Random', lastMessage: 'Anyone here?' }
          ]);
        }, 500);
      });
    },
    getMessages: async (roomId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, username: 'Alice', message: 'Hey there!', timestamp: '2024-02-01T10:00:00' },
            { id: 2, username: 'Bob', message: 'How are you?', timestamp: '2024-02-01T10:01:00' },
            { id: 3, username: 'Alice', message: 'Great, thanks!', timestamp: '2024-02-01T10:02:00' }
          ]);
        }, 500);
      });
    }
  };