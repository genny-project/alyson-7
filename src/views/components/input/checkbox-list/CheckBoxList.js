import React from 'react';
import { array, bool, number } from 'prop-types';
import { Box, Text } from '../../index';
import { isArray } from '../../../../utils';
import BaseCheckBox from '../base-checkbox';

class InputCheckBoxNewNew extends React.Component {
  static defaultProps = {
    items: [],
    value: [],
    multiSelect: false,
    numberOfColumns: 1,
  };

  static propTypes = {
    value: array,
    numberOfColumns: number,
    items: array,
    multiSelect: bool,
  };

  state = {
    data: [],
  };

  componentDidMount() {
    console.warn( this.props.items, 'items' );
    console.warn( this.props.value, 'values' );
    const data = this.constructInitialValues();
    const noSelectedItems = this.setNumberOFSelectedItemsAtStart();

    console.warn({ noSelectedItems });

    this.setState({
      data,
      noOfSelectedItems: noSelectedItems,
    });
  }

  // this method returns number of selected items of the value
  setNumberOFSelectedItemsAtStart() {
    const data = this.constructInitialValues();
    // const numberOFSelectedItems = data.reduce(( acc, currentVal ) => {
    //   if ( currentVal.checkBoxStatus === true ) {
    //     return acc + 1;
    //   }
    // }, 0 );

    let count = 0;

    data.forEach( v => v.checkBoxStatus === true && count++ );

    return count;
  }

  // This will add an extra field called checkbox status
  // It checks whether the passed items are a part of initial values
  constructInitialValues() {
    const { items, value } = this.props;

    if ( isArray( items, { ofMinLength: 1 })) {
      const newValues = items.map( val => ({
        ...val,
        checkBoxStatus: value.includes( val.value ) ? true : false,
      }));

      return newValues;
    }

    return [];
  }

  handlePress = value => () => {
    const { multiSelect } = this.props;

    let dataToModify;

    if ( multiSelect === true ) {
      dataToModify = this.state.data.find( item => value === item.value );

      console.warn({ dataToModify });

      const modifiedBoolean = !dataToModify.checkBoxStatus;

      dataToModify.checkBoxStatus = modifiedBoolean;

      console.warn({ dataToModify }, 'modified' );
    }

    if ( multiSelect === false ) {
      dataToModify = this.state.data.find( item => value === item.value );

      console.warn({ dataToModify });

      const modifiedBoolean = !dataToModify.checkBoxStatus;

      dataToModify.checkBoxStatus = modifiedBoolean;

      console.warn({ dataToModify }, 'modified' );
    }

    this.setState(
      state => {
        if ( multiSelect === true ) {
          return { data: [...state.data, ...dataToModify] };
        }

        return { data: state.data };
      },
      () => {
        console.log( this.state );
      }
    );
  };

  // select icons depending upon the Check box or Radio Item

  render() {
    const { numberOfColumns } = this.props;

    const { data } = this.state;

    return (
      <Box
        flexDirection="row"
        flexWrap="wrap"
      >
        {isArray( data, { ofMinLength: 1 }) ? (
          data.map( item => (
            <Box
              width={`${100 / numberOfColumns}%`}
              key={item.value}
            >
              <BaseCheckBox
                onPress={this.handlePress( item.value )}
                key={item.value}
                checkBoxStatus={item.checkBoxStatus}
                ID={item.value}
                label={item.label}
              />
            </Box>
          ))
        ) : (
          <Text>
No Items to Show
          </Text>
        )}
      </Box>
    );
  }
}

export default InputCheckBoxNewNew;
