import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import PaymentForm from "./PaymentForm";




const PaymentPage = () => {
  const location = useLocation();
  const clientSecret: string | undefined = location.state
  console.log(clientSecret);


  if (!clientSecret) return <Navigate to="/checkout" />;

  const stripePromise = loadStripe(
    "pk_test_51NHmFWF9BSLrI1ak2rsIfK91iPb71e23Uzi7QrJRP139xy30VZGPIDSvHRHiBPmnD7hQEWFLgTmSi6cju5anxznT00bzovYzby"
  );
  return (
    <section className="paymentPage" >
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: clientSecret
        }}
      >
        <PaymentForm />

      </Elements>
    </section>
  );
};
export default PaymentPage;
