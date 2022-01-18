import { Typography, Button, Divider } from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Review from "./Review";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentForm = ({
  checkoutToken,
  backStep,
  shippingData,
  onCaptureCheckout,
  nextStep,
  timeOut
}) => {
  const StripeCheckoutForm = () => {
    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!elements || !stripe) return;
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      if (error) {
        console.log(error.message);
      } else {
        const orderData = {
          line_items: checkoutToken.live.line_items,
          customer: {
            firstname: shippingData.firstName,
            lastname: shippingData.lastName,
            email: shippingData.email,
          },
          shipping: {
            name: "Primary",
            street: shippingData.address1,
            town_city: shippingData.city,
            county_state: shippingData.shippingSubdivision,
            postal_zip_code: shippingData.zip,
            country: shippingData.shippingCountry,
          },
          fulfillment: { shipping_method: shippingData?.shippingOption },
          payment: {
            gateway: "stripe",
            stripe: {
              payment_method_id: paymentMethod.id,
            },
          },
        };
       onCaptureCheckout(checkoutToken?.id, orderData)
       timeOut()
        nextStep();
        
      }
    };
    return (
      <form onSubmit={handleSubmit}>
        <CardElement />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant='outlined' onClick={backStep}>
            Back
          </Button>
          <Button type='submit' color='primary' variant='contained'>
            Pay {checkoutToken.live.subtotal.formatted_with_symbol}
          </Button>
        </div>
      </form>
    );
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' style={{ margin: "20px 0" }}>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <StripeCheckoutForm />
      </Elements>
    </>
  );
};

export default PaymentForm;
