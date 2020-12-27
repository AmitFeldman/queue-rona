const PERCENTAGE_DONE = 100;

const isSoldierDone = ({wasArrivedToCPRStation, waintingPrecentage}) => {
  const cprDone = Boolean(wasArrivedToCPRStation);
  const timeDone = waintingPrecentage === PERCENTAGE_DONE;
  return timeDone && cprDone;
};

export {isSoldierDone, PERCENTAGE_DONE};
