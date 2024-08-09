import { FaArrowLeft } from "react-icons/fa";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteOrderMutation,
  useProcessOrderMutation,
  useSingleOrderQuery,
} from "../../redux/api/endpoints/order.api";
import { MdDelete } from "react-icons/md";
import sendResponse from "../../utils/sendResponse";
import { toast } from "sonner";

export type TOrderItem = {
  id: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
};
export type TOrder = {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  pinCode: number;
  status: "processing" | "shipped" | "delivered";
  quantity: number;
  subtotal: number;
  shippingCharge: number;
  tax: number;
  discount: number;
  orderItems: TOrderItem[];
};

const TransactionManagement = () => {
  const { id: orderId } = useParams();
  const { data: orderData, isError } = useSingleOrderQuery(orderId!);
  const [transactionDelete] = useDeleteOrderMutation();
  const [processTransaction, { isLoading }] = useProcessOrderMutation();
  const navigate = useNavigate()
  if (isError) {
    return <Navigate to={"/404"} />;
  }
  const handleTransitionUpdate = async (orderId: string) => {
    if (orderData?.data?.status === "Delivered") {
      return toast.warning("Order placement is on the way");
    }
    try {
      const res = await processTransaction(orderId);
      sendResponse(res);
    } catch (error) {
      console.log("Transaction management internal problem", error);
    }
  };
  const handleTransitionDelete = async (orderId: string) => {
    try {
      const res = await transactionDelete(orderId);
      sendResponse(res, navigate, "/admin/transaction");
    } catch (error) {
      console.log("Transaction management internal problem", error);
    }
  };

  return (
    <div className="transactionManagementPage">
      <Link className="backArrow" to="/admin/transaction">
        <FaArrowLeft />
      </Link>

      <section className="section-one">
        <h1>Order Items</h1>
        {orderData?.data?.ordersItem.map((item) => (
          <TransactionCard
            key={1}
            name={item.name}
            photo={item.photo}
            price={item.price}
            quantity={item.quantity}
            id={item.productId}
          />
        ))}
      </section>
      <section className="orderInfo">
        <h1>Order Info</h1>
        <div>
          <h2>User Info</h2>
          <p>Name: {orderData?.data?.userId.name}</p>
          <p>Address: {orderData?.data?.shippingInfo.address}</p>
        </div>
        <div>
          <h2>Account Info</h2>
          <p>Subtotal: {orderData?.data?.subTotal}</p>
          <p>Shipping Charge: {orderData?.data?.shippingCharge}</p>
          <p>Tax: {orderData?.data?.tax}</p>
          <p>Discount:{orderData?.data?.discount}</p>
          <p>Total: {orderData?.data?.total}</p>
        </div>
        <div>
          <h2>Status Info</h2>
          <p>
            Status: {""}
            <span
              className={
                orderData?.data?.status === "Processing"
                  ? "red"
                  : orderData?.data?.status === "Delivered"
                    ? "purple"
                    : "green"
              }
            >
              {orderData?.data?.status}
            </span>{" "}
          </p>
        </div>

        {isLoading ? (
          <button>Loading...</button>
        ) : (
          <button
            onClick={() => {
              handleTransitionUpdate(orderId!);
            }}
          >
            Process Status
          </button>
        )}

        <div className="transitionDelete">
          <button>
            <MdDelete
              onClick={() => {
                handleTransitionDelete(orderId!);
              }}
            />
          </button>
        </div>
      </section>
    </div>
  );
};

const TransactionCard = ({ name, photo, price, quantity }: TOrderItem) => {
  return (
    <div className="transactionCard">
      <img src={photo} alt="" />
      <p>{name}</p>
      <span>
        ${price} X {quantity} = ${price * quantity}
      </span>
    </div>
  );
};

export default TransactionManagement;
