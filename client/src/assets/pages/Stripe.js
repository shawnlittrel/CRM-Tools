import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "../components/Stripe/stripe.css";


const promise = loadStripe("pk_test_51J9IXHF9OL10HIOgtFO0mvMGTJDS7Krs90HSunOA1AmT4JbWjupZfezsukkcX16dIa4MGExddp88AYBYtVphtJon00ZY3UBqfO");

export default function App() {
  return (
    <div className="App">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

