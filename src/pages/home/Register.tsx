import UseForm from "../../components/form/UseForm";
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

const Register = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  // submit form
  const handleSubmit = async (data: FieldValues) => {
    // safe checking
    if (user) {
      navigate("/");
      return toast.success("Already login");
    }
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // if user signUp with google provider
      if (result) {
        if (!data.gender && !data.dateOfBirth) {
          return toast.error("Fill up gender and date of birth field")
        }
        const userData = {
          name: result.user.displayName!,
          email: result.user.email!,
          photo: result.user.photoURL!, // todo: photo url doesn't save in data base
          gender: data.gender,
          dataOfBirth: data.dateOfBirth,
          role: "user",
        };

        const res = await createUser(userData);

        if ("data" in res) {
          toast.success(res.data?.message);
          res?.data && dispatch(userExit(res?.data)!);
          navigate("/");
        } else {
          const error = res.error as FetchBaseQueryError;
          const message = (error.data as TGenericError).errorReason;
          toast.error(message);
        }
      } else {

        if (!data.name || !data.email || !data.gender || !data.dataOfBirth) {
          return toast.message("provide all input field")
        }
        const userData = {
          name: data.name,
          email: data.email,
          photo: data.photo, // todo: photo url doesn't save in data base
          gender: data.gender,
          dataOfBirth: data.dateOfBirth,
          role: "user", // default property
        };
        const res = await createUser(userData);

        if ("data" in res) {
          toast.success(res.data?.message);
          res?.data && dispatch(userExit(res?.data)!);
          navigate("/");
        } else {
          const error = res.error as FetchBaseQueryError;
          const message = (error.data as TGenericError).errorReason;
          toast.error(message);
        }
      }

    } catch (error) {
      toast.warning("check your internet connection");
      console.error("internal", error);
    }
  };
  return (
    <div className="register">
      <main>
        <h1> Register </h1>
        <UseForm onSubmit={handleSubmit}>
          <UseInput name="name" type="text" placeholder="Write your name" label="Your name" />
          <UseInput name="email" type="text" placeholder="Write your email" label="Your name email" />
          <UseInput name="password" type="password" placeholder="Give your password" label="Your password" />
          <div className="rowField">
            <UseSelect
              label="Pick your gender"
              name="gender"
              options={["male", "female"]}
              placeholder="Pick your gender"
            />
            <UseInput name="dateOfBirth" type="date" label="Date of Birth" />
          </div>
          <button>Submit</button>
          <div className="or">or</div>
          <div className="divider"></div>
          <button disabled={isLoading}>
            <FaGoogle />
            <span>sign with google</span>
          </button>
        </UseForm>
      </main>
    </div>
  );
};
export default Register;
