import React, { useState } from 'react';
import { map, prop } from 'ramda';
import { Button, Menu, MenuItem } from '@material-ui/core';

const HeaderMenu = ({ group, setViewing, parentCode }) => {
  const [menu, setMenu] = useState(null);

  return (
    <div>
      <Button
        color="inherit"
        variant="outlined"
        style={{ marginRight: '1rem' }}
        onClick={event => setMenu(event.currentTarget)}
      >
        ADD
      </Button>
      <Menu open={!!menu} anchorEl={menu} onClose={() => setMenu(null)}>
        {map(item => (
          <MenuItem
            key={`menuItem${prop('questionCode', item)}`}
            onClick={() => {
              setMenu(null);
              setViewing({
                code: prop('questionCode', item),
                parentCode,
                targetCode: prop('targetCode', item),
              });
            }}
          >
            {prop('name', item || {})}
          </MenuItem>
        ))(prop('childAsks', group) || [])}
      </Menu>
    </div>
  );
};

export default HeaderMenu;