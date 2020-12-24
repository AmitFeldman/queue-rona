import React, {createContext, useState, useContext} from 'react';

const INITIAL_STATIONS = [
  {id: 1, name: 'א', current: undefined},
  {id: 2, name: 'ב', current: undefined},
  {id: 3, name: 'ג', current: undefined},
];

const StationsContext = createContext({
  stations: INITIAL_STATIONS,
  updateStation: () => {},
});

const StationsProvider = ({children}) => {
  const [stations, setStations] = useState(INITIAL_STATIONS);

  return (
    <StationsContext.Provider
      value={{
        stations,
        updateStation: (stationId, userId) => {
          const foundIndex = stations.findIndex((s) => s.id === stationId);
          const copyStations = [...stations];

          copyStations[foundIndex] = {...stations[foundIndex], current: userId};
          setStations(copyStations);
        },
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
