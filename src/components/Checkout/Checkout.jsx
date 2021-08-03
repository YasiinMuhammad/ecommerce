import {
  CircularProgress,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { commerece } from "../../lib/commerce";
import AddressFrom from "./AddressFrom";
import Payment from "./Payment";
import useStyles from "./styles";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, error, order, onCaptureCheckout }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const classes = useStyles();
  const [shippingData, setShippinData] = useState({});

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerece.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActivestep) => prevActivestep + 1);
  const backStep = () => setActiveStep((prevActivestep) => prevActivestep - 1);

  const next = (data) => {
    setShippinData(data);
    nextStep();
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          {" "}
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}{" "}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            {" "}
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home Page
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  if (error) {
    <>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home Page
      </Button>
    </>;
  }

  const From = () =>
    activeStep === 0 ? (
      <AddressFrom checkoutToken={checkoutToken} next={next} />
    ) : (
      <Payment
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        shippingData={shippingData}
      />
    );

  return (
    <>
      <div className={classes.toolbar}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Confirmation />
            ) : (
              checkoutToken && <From />
            )}
          </Paper>
        </main>
      </div>
    </>
  );
};
export default Checkout;
