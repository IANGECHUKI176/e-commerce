import { Typography, Container, Button, Grid } from "@material-ui/core";
import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";
import { Link } from "react-router-dom";
const Cart = ({
  cart,
  handleUpdateCartQuantity,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography>
      You have no items in your cart,start adding some!
      <Link to='/' className={classes.link}>
        Start adding some
      </Link>
    </Typography>
  );
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
      
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQuantity={handleUpdateCartQuantity}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
        <div className={classes.cartDetails}>
          <Typography variant='h4'>
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div className={classes.buttonGroup}>
            <Button
              variant='contained'
              color='secondary'
              size='large'
              type='button'
              className={classes.emptyButton}
              onClick={() => handleEmptyCart()}
            >
              Empty Cart
            </Button>
            <Button
              variant='contained'
              color='primary'
              size='large'
              type='button'
              className={classes.checkoutButton}
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </div>
        </div>
      </Grid>
    </>
  );
  if (!cart.line_items) return "Loading...";
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography variant='h3' className={classes.title} gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
