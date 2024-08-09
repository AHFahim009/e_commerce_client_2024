/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaPlus, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/hooks";
import { addToCart } from "../../redux/slices/cart.slice";
type TProductCard = {
  _id: string;
  photo: string;
  name: string;
  stock: number;
  price: number;
};

const ProductCard = ({ _id, photo, name, price, stock }: TProductCard) => {
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: _id,
        photo: photo,
        name: name,
        stock: stock,
        price: price,
        quantity: 1,
      })
    );
  };

  return (

    <div className="productCard">
      <img loading="lazy" src={photo} alt={name} />
      <p>{name.length > 15 ? name.slice(0, 15) + ".." : name}</p>
      <span>${price}</span>

      {stock < 1 && <div className="unavailable-overlay">Out of stock </div>}
      {stock >= 1 && (
        <div className="overlay">
          <Link to={""} onClick={handleAddToCart}>
            <FaPlus />
          </Link>
          <Link to={`/view/${_id}`}>
            <FaEye />
          </Link>
        </div>
      )}
    </div>
  );
};
export default ProductCard;
