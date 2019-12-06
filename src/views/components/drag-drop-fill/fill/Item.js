import React from 'react';
import { useDrag } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { Fragment } from '../..';

const knightStyle = {
  fontWeight: 'bold',
  cursor: 'move',
};

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
  float: 'left',
  color: 'black',
};

export const Item = ({ label = 'Item' }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      label,
      type: ItemTypes.KNIGHT,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Fragment>
      <div
        ref={drag}
        style={{
          ...knightStyle,
          opacity: isDragging ? 0.5 : 1,
          ...style,
        }}
      >
        {label}
      </div>
    </Fragment>
  );
};
