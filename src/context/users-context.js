import React, {createContext, useState, useContext} from 'react';

const UsersContext = createContext({
  users: [],
  addUser: () => {},
});

const UsersProvider = ({children}) => {
  const [users, setUsers] = useState([]);

  return (
    <UsersContext.Provider
      value={{
        users,
        addUser: (id) => {
          setUsers((oldUsers) => [...oldUsers, {id}]);
        },
        popUser: () => {
          const [first, ...rest] = users;
          setUsers(rest);
          return first;
        },
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
