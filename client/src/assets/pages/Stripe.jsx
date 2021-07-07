









import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/Stripe/CheckoutForm";
import "../components/Stripe/stripe.css";
import CCInfoInput from "../components/Stripe/CCinput.jsx"


const promise = loadStripe("pk_test_51J9IXHF9OL10HIOgtFO0mvMGTJDS7Krs90HSunOA1AmT4JbWjupZfezsukkcX16dIa4MGExddp88AYBYtVphtJon00ZY3UBqfO");

export default function App() {
  return (
    <div className="App">
        <h1 className = "Input"> Trade Secret Credit Card Payment</h1>
        <div>
            <CCInfoInput/>
        </div>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

