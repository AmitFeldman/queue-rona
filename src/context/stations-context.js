import React, {createContext, useState, useContext, useEffect} from 'react';
import {getStages} from '../utils/api';

const StationsContext = createContext({
  stations: [],
});

const STATIONS_TIMEOUT = 5000;

const StationsProvider = ({children}) => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getStages().then((res) => {
        setStations(res.data);
      });
    }, STATIONS_TIMEOUT);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <StationsContext.Provider
      value={{
        stations,
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
