import { createContext, useContext, useMemo, useState } from 'react';

const UserContext = createContext();

// Export a "mock" context that provides the ability to set the user manually
// instead of pulling the user data from the server
const UserProvider = ({ mockUser, children }) => {
  const [user, setUser] = useState(
    mockUser ? { id: mockUser.id, email: mockUser.email } : {}
  );

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export { UserContext, UserProvider, useUser };
