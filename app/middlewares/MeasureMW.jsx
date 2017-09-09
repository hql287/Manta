const MeasureMW = ({ dispatch, getState }) => next => action => {
  console.time(action.type);
  next(action);
  console.timeEnd(action.type);
};

export default MeasureMW;
