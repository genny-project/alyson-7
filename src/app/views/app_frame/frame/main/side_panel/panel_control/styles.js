import { makeStyles } from '@material-ui/core'
import { MINI_SIDEPANEL_WIDTH } from '../styles'
const useStyles = makeStyles(theme => ({
  toggleContainer: {
    borderRadius: `${theme.spacing(10)}px 0px 0px ${theme.spacing(10)}px`,
    borderWidth: theme.spacing(0.1),
    borderColor: theme.palette.grey[300],
    borderStyle: ({ sidePanelOpen }) => (sidePanelOpen ? 'none' : 'solid none solid solid'),
    position: 'fixed',
    right: MINI_SIDEPANEL_WIDTH - 1,
    bottom: theme.spacing(4),
    backgroundColor: ({ sidePanelOpen }) =>
      sidePanelOpen ? 'transparent' : theme.palette.background.paper,
    cursor: 'pointer',
    zIndex: theme.zIndex.modal,
    transition: theme.transitions.create(['borderStyle', 'backgroundColor', 'padding']),
    '&:hover': {
      color: theme.palette.primary.main,
      paddingRight: ({ sidePanelOpen }) => (sidePanelOpen ? '' : theme.spacing(1)),
      paddingLeft: ({ sidePanelOpen }) => (sidePanelOpen ? theme.spacing(1) : ''),
    },
  },
  icon: {
    margin: theme.spacing(1),
    cursor: 'pointer',
    transform: ({ sidePanelOpen }) => (sidePanelOpen ? 'rotate(180deg)' : 'rotate(0deg)'),
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}))

export default useStyles
