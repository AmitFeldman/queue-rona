import React, {createContext, useState, useContext, useEffect} from 'react';
import {getTopSoldiers} from '../utils/api';

const SoldiersContext = createContext({
  vaccineSoldiers: [],
});

const USERS_TIMEOUT = 5000;

const SoldiersProvider = ({children}) => {
  const [vaccineSoldiers, setVaccineSoldiers] = useState([]);

  useEffect(() => {
    const updateSoldiers = () => {
      getTopSoldiers().then((res) => {
        setVaccineSoldiers(res.data);
      });
    };

    updateSoldiers();
    const intervalId = setInterval(updateSoldiers, USERS_TIMEOUT);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <SoldiersContext.Provider
      value={{
        vaccineSoldiers,
      }}>
      {children}
    </SoldiersContext.Provider>
  );
};

const useSoldiers = () => {
  const context = useContext(SoldiersContext);

  if (context === undefined) {
    throw new Error(`useSoldiers must be used within a SoldiersProvider`);
  }

  return context;
};

export {SoldiersProvider, useSoldiers};
