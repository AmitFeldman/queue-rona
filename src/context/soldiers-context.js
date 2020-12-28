import React, {createContext, useState, useContext, useEffect} from 'react';
import {getTopSoldiers, getCPRSoldiers} from '../utils/api';

const SoldiersContext = createContext({
  vaccineSoldiers: [],
  cprSoldiers: [],
});

const USERS_TIMEOUT = 5000;

const SoldiersProvider = ({children}) => {
  const [vaccineSoldiers, setVaccineSoldiers] = useState([]);
  const [cprSoldiers, setCPRSoldiers] = useState([]);

  useEffect(() => {
    const updateSoldiers = () => {
      getTopSoldiers().then((res) => {
        setVaccineSoldiers(res.data);
      });

      getCPRSoldiers().then((res) => {
        setCPRSoldiers(res.data);
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
        cprSoldiers,
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
