import React, {createContext, useState, useContext} from 'react';

const INITIAL_STATIONS = [
  {id: 1, name: 'א', current: undefined},
  {id: 2, name: 'ב', current: undefined},
  {id: 3, name: 'ג', current: undefined},
  {id: 4, name: 'גגגג', current: undefined},
  {id: 5, name: 'גגגגגגג', current: undefined},
  {id: 6, name: 'גגגגגגגגגג', current: undefined},
];

const StationsContext = createContext({
  stations: INITIAL_STATIONS,
});

const StationsProvider = ({children}) => {
  const [stations, setStations] = useState(INITIAL_STATIONS);

  React.useEffect(() => {
    setTimeout(() => {
      const [first, ...rest] = INITIAL_STATIONS;
      first.current = 11233;
      setStations([first, ...rest]);
    }, 5000);
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
