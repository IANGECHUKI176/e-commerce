import {makeStyles} from '@material-ui/core/styles'
export default makeStyles((theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
}));