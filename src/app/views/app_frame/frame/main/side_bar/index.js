import React from 'react'
import { map, filter, compose, includes, prop, pickBy, values, path, head, sortBy } from 'ramda'
import { Drawer, List, Typography, Container } from '@material-ui/core'
import Image from 'material-ui-image'
import NavigationItem from './navigation_item'

import { getLinksFrom } from '../helpers/get-components'
import { getIsMobile } from '../utils'

import useStyles from './styles'

const MainSideBar = ({
  projectName,
  items,
  asks,
  frames,
  viewing,
  setViewing,
  attributes,
  open,
  setOpen,
}) => {
  const components = compose(
    map(map(code => prop(code, asks))),
    map(filter(includes('QUE'))),
    map(({ code }) => getLinksFrom(code, frames)),
  )(items)

  const targetCode = path(['FRM_LOGO', 0, 'targetCode'], components)

  if (!targetCode) {
    return <div />
  }

  const logoUrl = path([targetCode, 'PRI_LOGO', 'value'], attributes)
  const poweredBy = path([targetCode, 'PRI_POWERED_BY', 'value'], attributes)

  const classes = useStyles({ projectName })

  const dropDowns = compose(
    sortBy(prop('childAsks')),
    map(head),
    values,
    pickBy((val, key) => includes('TREE', key)),
  )(components)

  return (
    <Drawer
      variant={getIsMobile() ? 'temporary' : 'permanent'}
      anchor="left"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
      open={open}
      onClose={() => setOpen(false)}
      ModalProps={{ keepMounted: true }}
    >
      {logoUrl ? (
        <Image
          color="transparent"
          aspectRatio={projectName === 'INTERNMATCH' ? 791 / 236 : 1}
          src={logoUrl}
          disableSpinner
          className={classes.logo}
        />
      ) : null}
      <List>
        {map(({ name, questionCode, childAsks }) => (
          <NavigationItem
            key={`navItem${name}`}
            name={name}
            questionCode={questionCode}
            childAsks={childAsks}
            currentViewing={prop('code', viewing)}
            setViewing={setViewing}
          />
        ))(dropDowns)}
      </List>
      <div className={classes.grow} />
      <Container className={classes.poweredBy}>
        <Typography variant="caption" color="inherit">
          {'Powered By'}
        </Typography>
      </Container>
      <Container className={classes.poweredName}>
        <Typography variant="caption" color="inherit">
          {poweredBy}
        </Typography>
      </Container>
    </Drawer>
  )
}

export default MainSideBar
