import React, { Component, isValidElement } from 'react';
import { array, bool, object, any, string } from 'prop-types';
// import { Menu, MenuButton, MenuItem, MenuList, MenuLink } from '@reach/menu-button';
import { withRouter } from 'react-router-dom';
import { isArray, isString, Bridge } from '../../../utils';
import { Fragment, Icon, Box, TestIdHandler, Text,
  Menu, MenuButton, MenuItem, MenuContent,
} from '../index';
import './Dropdown.css';

const styles = {
  menuButtonStyle: {
    backgroundColor: 'transparent',
    border: 0,
    // padding: 10,
    fontSize: 16,
    cursor: 'pointer',
    color: 'black',
  },
  menuListStyle: {
    // background: '#bbb',
    borderWidth: 2,
    borderColor: '#black',
    borderStyle: 'solid',
    padding: 5,
  },
  menuLinkStyle: {
    textAlign: 'right',
    padding: 15,
    color: 'black',
  },
};

class Dropdown extends Component {
  static propTypes = {
    items: array.isRequired,
    text: any,
    facingRight: bool,
    disabled: bool,
    testID: string,
    children: any,
    history: object,
    color: string,
  }

  inputs = {};

  focus() {
    if ( this.inputs && this.inputs[0] )
      this.inputs[0].focus();
  }

  blur() {
    if ( this.inputs && this.inputs[0] )
      this.input[0].blur();
  }

  handleSelect = item => () => {
    if (
      item.code &&
      item.parentCode
    ) {
      Bridge.sendFormattedEvent(
        item
      );
    }
  }

  handleNavigate = item => event => {
    event.preventDefault();

    const href = (
      item.href === 'home' ? '/'
      : item.href.startsWith( '/' ) ? item.href
      : `/${item.href}`
    );

    this.props.history.push( href );

    return false;
  }

  render() {
    const {
      items,
      text,
      // facingRight,
      disabled,
      children,
      testID,
      color,
    } = this.props;

    return (
      <Menu
        identifier={testID}
      >
        {({ isOpen }) => {
          return (
            <Fragment>
              <TestIdHandler
                testID={testID}
              >
                <MenuButton
                  disabled={disabled || !isArray( items, { ofMinLength: 1 })}
                  style={{
                    ...styles['menuButtonStyle'],
                    color,
                  }}
                  data-testid={testID}
                  testID={testID}
                >
                  <Box
                    justifyContent="space-between"
                    id={`element-${testID}`}
                  >
                    {isValidElement( children ) ? children
                    : isString( text ) ? text
                    : isArray( children )
                      ? children.map(( child ) => (
                        isValidElement( child )
                          ? child
                          : null
                      ))
                      : null
                    }
                    <Box
                      justifyContent="center"
                      transform={[
                        { rotate: isOpen ? '0deg' : '270deg' },
                      ]}
                    >
                      <Box
                        paddingTop={2}
                      >
                        <Icon
                          name="expand_more"
                          color={this.props.color || 'black'}
                          size="xs"
                        />
                      </Box>
                    </Box>
                  </Box>
                </MenuButton>
              </TestIdHandler>

              {isArray( items, { ofMinLength: 1 }) && (
                <MenuContent
                  style={{
                    ...{
                      ...styles['menuListStyle'],
                      color,
                    },
                  }}
                  ref={input => this.input = input}
                  testID={testID}
                  identifier={testID}
                >
                  {items.map(( item, index ) => {
                    return (
                      <MenuItem
                        key={item.text}
                        ref={input => this.inputs[index] = input}
                        onPress={item.href
                          ? this.handleNavigate( item )
                          : this.handleSelect( item )
                        }
                        id={index}
                      >
                        <TestIdHandler
                          testID={`${item.parentCode}:${item.code}`}
                        >
                          {isValidElement( item.children ) ? item.children
                          : isString( item.text ) ? (
                            <Text
                              text={item.text}
                              {...{
                                ...styles['menuItemStyle'],
                                color,
                                ...item.style,
                              }}
                            />
                          )
                            : isArray( item.children )
                              ? item.children.map(( child ) => (
                                isValidElement( child )
                                  ? child
                                  : null
                              ))
                              : null
                        }
                        </TestIdHandler>
                      </MenuItem>
                    );
                  })}
                </MenuContent>
              )}
            </Fragment>
          );
        }}
      </Menu>
    );
  }
}

export default withRouter( Dropdown );
