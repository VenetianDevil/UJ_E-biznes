import React, { useEffect, useState } from 'react';
import { Elements, PaymentElement, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import usePayment from '../_hooks/usePayment';
import { LoaderComponent } from '../_components/LoaderComponent';
import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import useAuth from '../_hooks/useAuth';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51LBMlnHPJpcoxKcTa3jagJFnMtADnAvKA90FSlUAZu42TlBKJ0pHjsBwYLhjGnKTmDT91hRnJNR56p0ulAkSrN0M00fU8bCj8v');

function Payment(props) {

  const { getSecret } = usePayment();
  const [isLoading, setLoading] = useState(true);
  const { amount } = useParams();
  const [options, setOptions] = useState(
    { clientSecret: "" }
  );

  useEffect(() => {
    if (isLoading) {
      console.log('getAll cart prods');
      getSecret(amount).then(data => {

        // passing the client secret obtained from the server
        setOptions({ clientSecret: data.client_secret });
        setLoading(false);
      })
    }
  }, [isLoading])

  if (!!isLoading) {
    return (<LoaderComponent></LoaderComponent>)
  }

  if (options.clientSecret != "") {
    console.log(options);
    return (
      <div>
        <h2>Pay for your order</h2>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>

      </div>
    );
  } else {
    console.log(options);
    return (
      <div>
        <h2>Pay for your order</h2>
        <h3>Error</h3>
      </div>
    );
  }

}

export default Payment;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { placeOrder } = usePayment();
  const { currentUserValue } = useAuth();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    console.log('submit');
    
    if (!stripe || !elements) {
      console.log('err out of submit');
      
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://ebiz.azurewebsites.net/cart/ordered",
      },
    }).then(async () =>{
      console.log('success');
      await placeOrder(currentUserValue().ID);
    });

    console.log(result);

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.error(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <CardElement /> */}
      <PaymentElement />
      <Button type='submit' disabled={!stripe} className="mt-4" onClick={handleSubmit}>Submit</Button>
    </form>
  )
};