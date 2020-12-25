import React, {createContext, useState, useContext} from 'react';

const UsersContext = createContext({
  users: [],
});

const UsersProvider = ({children}) => {
  const [users, setUsers] = useState([{id: 1}, {id: 2}, {id: 3}, {id: 4}]);

  return (
    <UsersContext.Provider
      value={{
        users,
      }}>
      {children}
    </UsersContext.Provider>
  );
};

const useUsers = () => {
  const context = useContext(UsersContext);

  if (context === undefined) {
    throw new Error(`useUsers must be used within a UsersProvider`);
  }

  return context;
};

export {UsersProvider, useUsers};
