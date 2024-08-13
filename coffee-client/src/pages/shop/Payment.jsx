import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../hooks/useCart";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);
const Payment = () => {
  const [cart] = useCart();
  //   console.log(stripePromise);
  //   console.log(import.meta.env.VITE_Stripe_PK);
  console.log(cart);

  //calculate the checkout prices
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  //   console.log(cartTotal);

  const totalPrice = parseFloat(cartTotal.toFixed(2));
  //   console.log(totalPrice);
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-7 px-4 py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart} />
      </Elements>
    </div>
  );
};

export default Payment;
