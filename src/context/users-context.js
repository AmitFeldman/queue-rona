import React, {createContext, useState, useContext, useEffect} from 'react';
import {getTopSoldiers} from '../utils/api';

const UsersContext = createContext({
  users: [],
});

const USERS_TIMEOUT = 5000;

const UsersProvider = ({children}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getTopSoldiers().then((res) => {
        setUsers(res.data);
      });
    }, USERS_TIMEOUT);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
