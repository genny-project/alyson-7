import React from 'react';
import { View, Platform } from 'react-native';
import { any, oneOf, oneOfType, string, number, array, func, bool, object, shape } from 'prop-types';
import { isString } from '../../../utils';

/** Ensure the props we're going to use were indeed passed through. */
function filterOutUnspecifiedProps( props ) {
  const keys = Object.keys( props );

  return keys.reduce(( filteredProps, prop ) => {
    if ( props[prop] != null )
      filteredProps[prop] = props[prop];

    return filteredProps;
  }, {});
}

function Box({
  children,
  justifyContent,
  alignItems,
  alignSelf,
  height,
  minHeight,
  maxHeight,
  width,
  minWidth,
  maxWidth,
  flex,
  flexBasis,
  flexGrow,
  flexShrink,
  flexDirection = 'row',
  flexWrap,
  padding,
  paddingTop,
  paddingRight,
  paddingLeft,
  paddingBottom,
  paddingX,
  paddingY,
  margin,
  marginX,
  marginY,
  marginTop,
  marginRight,
  marginLeft,
  marginBottom,
  backgroundColor,
  // position, // TODO value = 'initial', needed for fullscreen, wrong proptype
  position,
  top,
  right,
  bottom,
  left,
  zIndex, // TODO value = 'auto', needed for fullscreen, wrong proptype
  transform,
  transitionDuration,
  transitionProperty,
  transitionTimingFunction,
  transitionDelay,
  opacity,
  accessible,
  accessibilityRole,
  accessibilityLabel,
  borderTopWidth,
  borderRightWidth,
  borderBottomWidth,
  borderLeftWidth,
  borderWidth,
  borderColor,
  borderStyle,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
  borderBottomLeftRadius,
  shadowColor,
  shadowOpacity,
  shadowRadius,
  shadowOffset,
  fullHeightOnWeb,
  __dangerouslySetStyle = {},
  overflow,
  overflowX,
  overflowY,
  display = 'flex',
  overscrollBehavior,
  overscrollBehaviorX,
  overscrollBehaviorY,
  onLayout,
  onBlur,
  boxSizing,
  onRef,
  componentID,
  componentCode,
  ...restProps
}) {
  const boxStyle = filterOutUnspecifiedProps({
    padding,
    paddingTop,
    paddingRight,
    paddingLeft,
    paddingBottom,
    paddingHorizontal: paddingX,
    paddingVertical: paddingY,
    margin,
    marginHorizontal: marginX,
    marginVertical: marginY,
    marginTop,
    marginRight,
    marginLeft,
    marginBottom,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderWidth,
    display,
    shadowColor,
    shadowOpacity,
    shadowRadius,
    shadowOffset,
    justifyContent,
    alignItems,
    alignSelf,
    height: Platform.OS === 'web' && fullHeightOnWeb ? '100vh' : height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    flex,
    flexBasis,
    flexGrow,
    flexShrink,
    flexDirection,
    flexWrap,
    backgroundColor,
    position: (
      (
        position === 'sticky' &&
        Platform.OS !== 'web'
      )
        ? 'relative'
        : position
    ),
    top,
    right,
    bottom,
    left,
    zIndex,
    transform,
    opacity,
    borderColor,
    borderStyle,
    borderRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
    borderTopRightRadius,
    borderTopLeftRadius,
    overflow,
    overflowX,
    overflowY,
    overscrollBehavior,
    overscrollBehaviorX,
    overscrollBehaviorY,
    boxSizing,
    ...__dangerouslySetStyle,
  });

  const webStyle = Platform.OS !== 'web' ? {} : filterOutUnspecifiedProps({
    // accessibilityRole,
    overflow,
    overflowX,
    overflowY,
    transitionDuration,
    transitionProperty,
    transitionTimingFunction,
    transitionDelay,
  });

  return (
    <View
      {...restProps}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      style={[
        boxStyle,
        webStyle,
      ]}
      onLayout={onLayout}
      onBlur={onBlur}
      ref={onRef}
      data-component-type="BOX"
      data-component-id={isString( componentID, { ofMinLength: 1 }) ? componentID : null}
      data-component-code={isString( componentCode, { ofMinLength: 1 }) ? componentCode : null}
    >
      {children}
    </View>
  );
}

Box.propTypes = {
  children: any,
  justifyContent: oneOf(
    ['flex-start', 'flex-end', 'center', 'space-between', 'space-around']
  ),
  alignItems: oneOf(
    ['flex-start', 'flex-end', 'center', 'space-between', 'space-around']
  ),
  alignSelf: oneOf(
    ['normal', 'auto', 'center', 'flex-start', 'flex-end']
  ),
  height: oneOfType(
    [string, number]
  ),
  minHeight: oneOfType(
    [string, number]
  ),
  maxHeight: oneOfType(
    [string, number]
  ),
  width: oneOfType(
    [string, number]
  ),
  minWidth: oneOfType(
    [string, number]
  ),
  maxWidth: oneOfType(
    [string, number]
  ),
  flexDirection: oneOf(
    ['row', 'row-reverse', 'column', 'column-reverse']
  ),
  flexWrap: oneOf(
    ['nowrap', 'wrap', 'wrap-reverse']
  ),
  flex: number,
  flexBasis: oneOfType(
    [string, number]
  ),
  flexGrow: number,
  flexShrink: number,
  padding: number,
  paddingTop: number,
  paddingRight: number,
  paddingLeft: number,
  paddingBottom: number,
  paddingX: number,
  paddingY: number,
  margin: oneOfType(
    [number, string]
  ),
  marginX: oneOfType(
    [number, string]
  ),
  marginY: oneOfType(
    [number, string]
  ),
  marginTop: oneOfType(
    [number, string]
  ),
  marginRight: oneOfType(
    [number, string]
  ),
  marginBottom: oneOfType(
    [number, string]
  ),
  marginLeft: oneOfType(
    [number, string]
  ),
  backgroundColor: string,
  position: oneOf(
    ['fixed', 'absolute', 'relative', 'static', 'sticky']
  ),
  top: oneOfType(
    [number, string]
  ),
  right: oneOfType(
    [number, string]
  ),
  bottom: number,
  left: oneOfType(
    [number, string]
  ),
  zIndex: number,
  transform: oneOfType(
    [array, string]
  ),
  transitionDuration: string,
  transitionProperty: string,
  transitionTimingFunction: string,
  transitionDelay: string,
  opacity: number,
  onLayout: func,
  onPress: func,
  onBlur: func,
  accessible: bool,
  accessibilityRole: string,
  accessibilityLabel: string,
  borderTopWidth: number,
  borderRightWidth: number,
  borderBottomWidth: number,
  borderLeftWidth: number,
  borderWidth: number,
  borderColor: string,
  borderStyle: string,
  borderRadius: oneOfType(
    [number, string]
  ),
  borderTopLeftRadius: oneOfType(
    [number, string]
  ),
  borderTopRightRadius: oneOfType(
    [number, string]
  ),
  borderBottomRightRadius: oneOfType(
    [number, string]
  ),
  borderBottomLeftRadius: oneOfType(
    [number, string]
  ),
  fullHeightOnWeb: bool,
  __dangerouslySetStyle: object,
  overflow: string,
  overflowX: string,
  overflowY: string,
  display: string,
  overscrollBehavior: oneOf(
    ['auto', 'contain', 'none']
  ),
  overscrollBehaviorX: oneOf(
    ['auto', 'contain', 'none']
  ),
  overscrollBehaviorY: oneOf(
    ['auto', 'contain', 'none']
  ),
  shadowColor: string,
  shadowOpacity: oneOfType(
    [string, number]
  ),
  shadowRadius: oneOfType(
    [string, number]
  ),
  shadowOffset: shape({
    width: oneOfType(
      [string, number]
    ),
    height: oneOfType(
      [string, number]
    ),
  }),
  boxSizing: oneOf(
    ['content-box', 'border-box']
  ),
  onRef: func,
  componentID: string,
  componentCode: string,
};

export default Box;
