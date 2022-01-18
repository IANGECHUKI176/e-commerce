import {makeStyles} from  '@material-ui/core/styles'
const drawerWidth=0
export default makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    textDecoration: "none",
  },
  grow: {
    flexGrow: 1,
  },
  image: {
    marginRight: "5px",
    height: "50px",
    padding: "10px 20px",
    [theme.breakpoints.down("sm")]: {
    padding:'5px 2px',
    },
  },
}));