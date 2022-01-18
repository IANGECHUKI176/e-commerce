import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/commerce.png";
import useStyles from "./styles";
const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <AppBar position='fixed' color='inherit' className={classes.appBar}>
        <Toolbar>
          <Typography
            component={Link}
            to='/'
            variant='h6'
            color='inherit'
            className={classes.title}
          >
            <img src={logo} alt='commerce.js' className={classes.image} />
            Ochako Inc.
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
            {location.pathname === "/" && (
              <IconButton
                component={Link}
                to='/cart'
                aria-label='show cart items'
                color='inherit'
              >
                <Badge badgeContent={totalItems} color='secondary'>
                  <ShoppingCart />
                </Badge>
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Navbar;
