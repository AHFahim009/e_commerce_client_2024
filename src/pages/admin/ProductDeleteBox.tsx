import { useNavigate } from "react-router-dom";
import { useProductDeleteMutation } from "../../redux/api/endpoints/product.api";
import sendResponse from "../../utils/sendResponse";

type TProps = {
  productId: string;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>
}


const ProductDeleteBox = ({ productId, setIsDelete }: TProps) => {
  const [deleteProduct] = useProductDeleteMutation()
  const navigate = useNavigate()
  const handleCancel = () => {
    setIsDelete(false)
  }
  const handleConfirm = async () => {
    const res = await deleteProduct(productId)
    sendResponse(res, navigate, "/admin/inventory")
  }


  return (
    <div className="deleteBox">
      <p>Are you sure to delete this?</p>
      <div className="actionBox">
        <button className="confirmBtn" onClick={handleConfirm}>Confirm</button>
        <button onClick={handleCancel} className="cancelBtn">Cancel</button>
      </div>
    </div>
  )
}
export default ProductDeleteBox