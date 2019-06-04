import React from 'react';
import { Text } from 'react-native';
import { oneOf, string } from 'prop-types';
import styles from './Icon.style';

const sizes = {
  xs: 16,
  sm: 18,
  smd: 20,
  md: 24,
  lg: 36,
  xl: 48,
};

const colors = {
  white: 'white',
  black: 'black',
  red: 'red',
  blue: 'blue',
  green: 'green',
  grey: 'grey',
  lightGrey: 'lightgrey',
  yellow: 'yellow',
};

const Icon = ({ name, color = 'white', size = 'md', cursor = 'auto' }) => {
  const style = {
    fontFamily: 'Material Icons',
    whiteSpace: 'nowrap',
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: sizes[size],
    direction: 'ltr',
    fontSize: sizes[size],
    color: colors[color] || color,
    cursor,
  };

  return (
    <Text
      style={[
        styles.wrapper,
        style,
      ]}
    >
   {name && name !== 'undefined' && name.includes( '-' ) ? name.replace( /-/g, '_' ) : name}

    </Text>
  );
};

Icon.propTypes = {
  name: string.isRequired,
  color: string,
  size: oneOf( ['xs', 'sm', 'md', 'lg', 'xl'] ),
  cursor: oneOf( ['default', 'none', 'auto', 'help', 'pointer', 'wait', 'text'] ),
};

export default Icon;
