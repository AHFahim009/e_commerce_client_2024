/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import CartItem from "../../components/pageComponents/CartItem";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { appliedDiscount, calculate } from "../../redux/slices/cart.slice";

const Cart = () => {
  const [coupon, setCoupon] = useState("");
  const [validCoupon, setValidCoupon] = useState(false);
  const { cartItem, subtotal, total, tax, shippingCharges, discount } =
    useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  //  discount applied by only using coupon code

  const couponFetching = async (couponCode: string) => {
    try {
      const res = await fetch(
        `https://book-e-show-backend-2024-2.onrender.com/api/v1/coupon/applyDiscount?couponCode=${couponCode}`
      );

      const data = await res.json();

      if (data.discount) {
        dispatch(appliedDiscount(data.discount));
        dispatch(calculate());
        setValidCoupon(true);
      } else {
        dispatch(appliedDiscount(0));
        dispatch(calculate());
        setValidCoupon(false);
      }
    } catch (error) {
      console.error("coupon error", error);
    }
  };

  useEffect(() => {
    couponFetching(coupon);
  }, [coupon]);

  useEffect(() => {
    dispatch(calculate());
  }, [cartItem]);


  // i hope

  return (
    <div className="cart">
      <main>
        {cartItem.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              alignItems: "center",
              fontSize: "24px",
            }}
          >
            No item added
          </div>
        ) : (
          cartItem.map((item, i) => <CartItem product={item} key={i} />)
        )}
      </main>
      <aside>
        <p> Subtotal: {subtotal}</p>
        <p> Shipping Charges: {shippingCharges}</p>
        <p> Tax: {tax}</p>
        <p>
          Discount: <em className="red"> - ${discount} </em>
        </p>
        <p>
          <b> Total: {total} </b>
        </p>
        <input
          type="text"
          placeholder="coupon card"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />

        {coupon &&
          (validCoupon ? (
            <span className="green">
              ${discount} off using the <code>{coupon}</code>{" "}
            </span>
          ) : (
            <span className="red"> Invalid coupon token</span>
          ))}

        <Link to="/checkout">Checkout</Link>
      </aside>
    </div>
  );
};
export default Cart;
