import { Link, useNavigate } from "react-router-dom";
import UseForm from "../../components/form/UseForm";
import UseInput from "../../components/form/UseInput";
import { FaArrowLeft } from "react-icons/fa";
import UseSelect from "../../components/form/UseSelect";
import { FieldValues } from "react-hook-form";
import { useCreatePaymentMutation } from "../../redux/api/endpoints/payment.api";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { saveShippingCharge } from "../../redux/slices/cart.slice";
import { TShippingInfo } from "../../types/dataType";
import { TGenericError } from "../../types/global.type";
import { toast } from "sonner";

const countryOptions = ["Bangladesh", "Pakistan", "India"];

const Checkout = () => {
  const total = useAppSelector((state) => state.cart.total);
  const dispatch = useAppDispatch();
  console.log(total);

  const navigate = useNavigate();

  const [createPayment, { isLoading: isCreating }] = useCreatePaymentMutation();
  const handleSubmit = async (payload: FieldValues) => {
    console.log(payload.pinCode);

    // store shipping address in cart slice . name: shippingAddress
    dispatch(saveShippingCharge(payload as TShippingInfo));
    // create stripe client secret

    try {
      const res = await createPayment({ amount: total });
      console.log({ amount: total });

      if ("data" in res) {
        console.log(res);

        navigate("/payment", {
          state: res.data?.clientSecret,
        });
      } else {
        const error = res.error as TGenericError;
        toast.error(error.message);
      }
    } catch (error) {
      console.log("checkout page", error);
    }
  };

  return (
    <div className="checkout">
      <Link className="backArrow" to="/product-cart">
        <FaArrowLeft />
      </Link>
      <UseForm
        onSubmit={handleSubmit}

      >
        <h1>CHECKOUT</h1>
        <UseInput name="address" type="text" placeholder="write your address" required={true} />
        <UseInput name="city" type="text" placeholder="write your city" required={true} />
        <UseInput
          name="pinCode"
          type="number"
          placeholder="write your pin code" required={true} />
        <UseSelect
          name="country"
          options={countryOptions}
          placeholder="PICK YOUR COUNTRY"
          required={true}
        />

        {isCreating ? (
          <button>Creating...</button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </UseForm>
    </div>
  );
};
export default Checkout;
