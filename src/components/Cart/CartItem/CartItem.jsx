import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";

const CartItem = ({ item, onUpdateCartQuantity, onRemoveFromCart }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        image={item.image.url}
        title={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant='h5'>{item.name}</Typography>
        <Typography variant='h5'>
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions>
        <div className={classes.buttons}>
          <Button
            size='small'
            type='button'
            variant='contained'
            className={classes.button}
            onClick={() =>
              item.quantity > 1
                ? onUpdateCartQuantity(item.id, item.quantity - 1)
                : onRemoveFromCart(item.id)
            }
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            size='small'
            type='button'
            variant='contained'
            className={classes.button}
            onClick={() => onUpdateCartQuantity(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => onRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
