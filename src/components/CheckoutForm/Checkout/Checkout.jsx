import {
  Stepper,
  StepLabel,
  Step,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import AddressForm from "../AddressForm.jsx";
import PaymentForm from "../PaymentForm.jsx";
import useStyles from "./styles.js";
import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import { commerce } from "../../../lib/commerce";
const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
 const navigate=useNavigate()
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished,setIsFinished]=useState(false)
  const steps = ["Shipping Address", "Payment Details"];

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {
        navigate('/')
      }
    };
    generateToken();
  }, [cart]);
const timeOut=()=>{
  setTimeout(()=>{
    setIsFinished(true)
  },3000)
}
  const Confirmation = () =>
    order.customer ? (
      <>
        <Typography variant='h5'>
          Thank you for your purchase {order.customer.firstname}{" "}
          {order.customer.lastname}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant='subtitle2'>
          Order ref: {order.customer_reference}
        </Typography>
        <br />
        <Button component={Link} to='/' variant='outlined' type='button'>
          Back to home
        </Button>
      </>
    ) : isFinished ? (
      <>
        <Typography variant='h5'>Thank you for your purchase </Typography>
        <Divider className={classes.divider} />
        <br />
        <Button component={Link} to='/' variant='outlined' type='button'>
          Back to home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  if(error){
    <>
      <Typography variant='h5'>Error: {error}</Typography>
      <br />
      <Button component={Link} to='/' variant='outlined' type='button'>
        Back to home
      </Button>
    </>;
  }
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };
  const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
  const backStep = () => setActiveStep((prevState) => prevState - 1);
  const Form = () =>
    activeStep == 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
        timeOut={timeOut}
      />
    );
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            <>{checkoutToken && <Form />}</>
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
