import {makeStyles} from '@material-ui/core/styles'
export default makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));