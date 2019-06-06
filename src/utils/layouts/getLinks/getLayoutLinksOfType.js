import dlv from 'dlv';
import { isArray, isString, isObject } from '../../index';

const getLayoutLinksOfType = ( baseEntityCodes, layoutData, linkType ) => {
  if ( !isArray( baseEntityCodes ) || !isString( linkType ) || !isObject( layoutData )) return [];

  if ( !isArray( baseEntityCodes, { ofMinLength: 1 })) return [];

  return baseEntityCodes.filter(
    link =>
      link.type === linkType &&
      ( link.type === 'sublayout' || dlv( layoutData, `${link.type}s.${link.code}` ) != null )
  );
};

export default getLayoutLinksOfType;
