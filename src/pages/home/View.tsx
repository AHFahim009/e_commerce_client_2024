import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useAppDispatch } from "../../redux/store/hooks";
import { addToCart } from "../../redux/slices/cart.slice";
import { useGetSingleProductQuery } from "../../redux/api/endpoints/product.api";
import { toast } from "sonner";
import SkeltonLoading from "../../shared/SkeltonLoading";



const View = () => {

  const dispatch = useAppDispatch()
  const productId = useParams();
  const [quantity, setQuantity] = useState(1)
  const { data: product, isError, isLoading } = useGetSingleProductQuery(productId.id)
  if (isError) return toast.error("failed to load data")



  const handleDecrement = () => {
    if (quantity <= 1) return
    setQuantity((pre) => pre - 1)

  }
  const handleIncrement = () => {
    if (quantity === product?.data?.stock) return
    setQuantity((pre) => pre + 1)
  }

  const handleAddToCart = () => {
    //  for fresh add to cart
    if (product?.data) {
      const { _id, name, photo, price, stock } = product.data
      dispatch(addToCart({
        productId: _id,
        name: name,
        photo: photo,
        price: price,
        quantity: quantity,
        stock: stock
      }))

    }

  }

  return (
    <div className="viewPage">
      {
        isLoading ? <SkeltonLoading length={10} /> :
          <>
            {product && product.data ? <section>
              <figure className="imgDiv">
                <img src={product.data.photo} alt="name" />
              </figure>
              <div className="infoCol">
                <p>{product.data.name}</p>
                <p>Author: {product.data.authorName}</p>
                <p>category: {product.data.category}</p>
                <p>price: ${product.data.price}</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit veniam ab necessitatibus, doloribus pariatur hic omnis dolore! Numquam.</p>
                <div className="quantity">
                  <button className="btn" onClick={handleDecrement}>-</button>
                  <p>{quantity}</p>
                  <button className="btn" onClick={handleIncrement}>+</button>
                  <button className="addBtn" onClick={handleAddToCart}>
                    <FaShoppingCart /> Add To Cart
                  </button>
                </div>
              </div>
            </section> : "null"}
          </>
      }
    </div>
  );
};
export default View;
