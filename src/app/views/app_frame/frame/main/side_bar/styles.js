import { makeStyles } from '@material-ui/core'

const DRAWER_WIDTH = 180
import { APP_BAR_HEIGHT } from '../app_bar/styles'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    overflowY: 'scroll',
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    overflowY: 'scroll',
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    paddingTop: theme.spacing(1),
  },
  poweredBy: {
    marginBottom: theme.spacing(1),
  },
  poweredName: {
    marginBottom: theme.spacing(1),
  },
  logo: {
    padding: theme.spacing(1),
  },
}))

export default useStyles

export { DRAWER_WIDTH }
