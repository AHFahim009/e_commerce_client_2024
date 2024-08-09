import UseForm from "../../components/form/UseForm"
import UseInput from "../../components/form/UseInput";
import UseSelect from "../../components/form/UseSelect";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FieldValues } from "react-hook-form";
import { auth } from "../../firebase/firebase";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { userExit } from "../../redux/slices/auth.slice";
import { useCreateUserMutation } from "../../redux/api/endpoints/user.api";
import { TGenericError } from "../../types/global.type";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [createUser, { isLoading }] = useCreateUserMutation()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()


  // submit form
  const handleSubmit = async (data: FieldValues) => {

    if (user) {
      navigate("/")
      return toast.success("Already login")
    }
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      const userData = {
        name: result.user.displayName!,
        email: result.user.email!,
        photo: result.user.photoURL!, // todo: photo url doesn't save in data base
        gender: data.gender,
        dataOfBirth: data.dateOfBirth,
        role: "admin",
      }

      const res = await createUser(userData)
      if ("data" in res) {
        toast.success(res.data?.message)
        res?.data && dispatch(userExit(res?.data)!)
        navigate("/")
      }
      else {
        const error = res.error as FetchBaseQueryError
        const message = (error.data as TGenericError).errorReason
        toast.error(message)
      }

    } catch (error) {
      toast.warning("check your internet connection")
      console.error("internal", error);
    }

  }
  return (
    <div className="login">
      <main>
        <h1> LOGIN </h1>
        <UseForm onSubmit={handleSubmit} >
          <UseSelect name="gender" options={["male", "female"]} placeholder="Pick your gender" />
          <UseInput name="dateOfBirth" type="date" label="Date of Birth" />
          <button type="submit" disabled={isLoading}>
            <FaGoogle />
            <span>sign with google</span>
          </button>
        </UseForm>

      </main>
    </div >
  )
}
export default Login