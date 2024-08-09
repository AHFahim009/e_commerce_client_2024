/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import UseForm from "../../../components/form/UseForm";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { TOrder } from "../../../types/dataType";
import { useCreateOrderMutation } from "../../../redux/api/endpoints/order.api";
import sendResponse from "../../../utils/sendResponse";
import { resetCart } from "../../../redux/slices/cart.slice";

const PaymentForm = () => {
  const [isCardProcessing, setIsCardProcessing] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { _id: userId } = useAppSelector((state) => state.auth.user!);
  const cart = useAppSelector((state) => state.cart);
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useAppDispatch()




  const handlePaymentSubmit = async () => {
    if (!stripe || !elements) return;

    // order data save in database
    const orderData: TOrder = {
      discount: cart.discount,
      ordersItem: cart.cartItem,
      shippingCharge: cart.shippingCharges,
      shippingInfo: cart.shippingInfo,
      subTotal: cart.subtotal,
      tax: cart.tax,
      total: cart.total,
      userId: userId,
      status: "Processing"
    };

    try {
      setIsProcessing(true);

      //  confirm stripe card info
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: "if_required",
      });

      if (error) {
        console.log("stripe", error);

        return toast.error(error.message);
      }
      if (paymentIntent.status === "succeeded") {
        const res = await createOrder(orderData);
        dispatch(resetCart())
        sendResponse(res, navigate, "/orders");

      }
    } catch (error) {
      console.log("payment page problem", error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="payment-form">
      <UseForm onSubmit={handlePaymentSubmit}>
        <PaymentElement onReady={() => setIsCardProcessing(false)} />
        {!isCardProcessing && (
          <>
            {isProcessing ? (
              <button>processing..</button>
            ) : (
              <button>Payment</button>
            )}
          </>
        )}
      </UseForm>
    </div>
  );
};
export default PaymentForm;
