/* eslint-disable @typescript-eslint/no-unused-vars */
import { MdDelete } from "react-icons/md";
import {

  handleDecrement,
  handleIncrement,
  removeToCart,
  TCartItem,
} from "../../redux/slices/cart.slice";
import { useAppDispatch } from "../../redux/store/hooks";

const CartItem = ({ product }: { product: TCartItem }) => {
  const { productId, photo, name, price, quantity } = product;
  const dispatch = useAppDispatch();
  const handleRemoveItem = () => {
    dispatch(removeToCart(productId));
  };

  const handleDecrementQuantity = () => {
    if (quantity === 1) {
      return;
    }
    dispatch(handleDecrement({ productId: productId }));
  };
  const handleIncrementQuantity = () => {
    if (quantity === product.stock) {
      return;
    }
    dispatch(handleIncrement({ productId: productId }));
  };

  return (
    <div className="cartItem">
      <img src={photo} alt={name} />
      <article>
        <p>{name}</p>
        <span>${price}</span>
      </article>
      <div>
        <button onClick={handleDecrementQuantity}>-</button>
        <p>{quantity}</p>
        <button onClick={handleIncrementQuantity}>+</button>
      </div>
      <button onClick={handleRemoveItem}>
        <MdDelete />
      </button>
    </div>
  );
};
export default CartItem;
