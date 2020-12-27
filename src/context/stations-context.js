import React, {createContext, useState, useContext, useEffect} from 'react';
import {getStages} from '../utils/api';

const StationsContext = createContext({
  vaccineStations: [],
});

const STATIONS_TIMEOUT = 5000;

const StationsProvider = ({children}) => {
  const [vaccineStations, setVaccineStations] = useState([]);

  useEffect(() => {
    const updateStations = () => {
      getStages().then((res) => {
        setVaccineStations(res.data);
      });
    };

    updateStations();
    const intervalId = setInterval(updateStations, STATIONS_TIMEOUT);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <StationsContext.Provider
      value={{
        vaccineStations,
      }}>
      {children}
    </StationsContext.Provider>
  );
};

const useStations = () => {
  const context = useContext(StationsContext);

  if (context === undefined) {
    throw new Error(`useStations must be used within a StationsProvider`);
  }

  return context;
};

export {StationsProvider, useStations};
