import dlv from 'dlv';
import find from './find';

export default ( data, options, allData ) => {
  const completeData = options.basePath
    ? dlv( allData, options.basePath )
    : allData;

  const allDataArray = (
    completeData &&
    completeData instanceof Array &&
    completeData.length
      ? completeData
      : Object.keys( completeData ).map( key => completeData[key] )
  );

  const { as, ...restOptions } = options;

  return data.length
    ? data.map( item => ({
      ...item,
      ...as
        ? { [as]: find( allDataArray, { ...restOptions, context: item }) }
        : find( allDataArray, { ...restOptions, context: item }),
    }))
    : {
      ...data,
      ...as
        ? { [as]: find( allDataArray, { ...restOptions, context: data }) }
        : find( allDataArray, { ...restOptions, context: data }),
    };
};
