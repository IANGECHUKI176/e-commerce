import {makeStyles} from '@material-ui/core/styles'
export default makeStyles((theme) => ({
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  buttons:{
      display:'flex',
      alignItems:"center",
      flex:1
  },
  button:{
      margin:theme.spacing(1)
  }
}));