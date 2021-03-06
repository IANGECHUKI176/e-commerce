import {Typography,List,ListItem,ListItemText,ListItemAvatar,Avatar,Divider} from '@material-ui/core'
const Review = ({checkoutToken}) => {

    return (
      <>
        <Typography variant='h6' gutterBottom>
          {" "}
          Order Summary
        </Typography>
        <List disablePadding>
          {checkoutToken.live.line_items.map((product) => (
            <>
              <ListItem key={product.name} style={{ padding: "10px 0" }}>
                <ListItemAvatar>
                  <Avatar src={product.image.url} />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={`Quantity: ${product.quantity}`}
                />
                <Typography variant='body2'>
                  {product.line_total.formatted_with_symbol}
                </Typography>
              </ListItem>
              <Divider/>
            </>
          ))}
          <ListItem style={{ padding: "10px 0" }}>
            <ListItemText primary='Total' />
            <Typography variant='subtitle1' style={{ fontWeight: 700 }}>
              {checkoutToken.live.subtotal.formatted_with_symbol}
            </Typography>
          </ListItem>
        </List>
      </>
    );
}

export default Review
