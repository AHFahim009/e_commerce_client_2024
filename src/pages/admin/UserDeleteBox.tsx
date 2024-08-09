
import sendResponse from "../../utils/sendResponse";
import { useDeleteAUserMutation } from "../../redux/api/endpoints/user.api";

type TProps = {
  userId: string;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>
}


const UserDeleteBox = ({ userId, setIsDelete }: TProps) => {
  const [deleteAUser] = useDeleteAUserMutation()

  const handleCancel = () => {
    setIsDelete(false)
  }
  const handleConfirm = async () => {
    const res = await deleteAUser(userId)
    sendResponse(res)
    setIsDelete(false)
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
export default UserDeleteBox