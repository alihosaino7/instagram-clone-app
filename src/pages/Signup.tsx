import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import instagramLogo from "../../public/images/logo.png";
import LoadingLayer from "../components/common/LoadingLayer";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { IUser } from "../types/types";
import { Alert } from "flowbite-react";
import { CgDanger } from "react-icons/cg";
import { Container } from "../components";

function SignupForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser, setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    fullName: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }

  async function signUpWithEmailAndPassword() {
    const { email, password, username, fullName } = formData;

    if (!(email && password && username && fullName)) {
      return setError("All fields are required");
    }

    const signInEmails = await getDocs(collection(db, "users")).then(
      (userDoc) => userDoc.docs.map((doc) => doc.data().email)
    );

    const isEmailExist = signInEmails.includes(email);

    if (isEmailExist) {
      return setError("Email is already in use");
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (userCredential) => {
        setAuthUser(userCredential.user);

        localStorage.setItem("isAuth", "true");

        const newUser: IUser = {
          followers: [],
          following: [],
          userImage: "",
          username: formData.username,
          userId: userCredential.user.uid,
          email: formData.email,
          fullName: formData.fullName,
        };

        await setDoc(doc(db, "users", userCredential.user.uid), newUser);
        setUser(newUser);

        // setLoading(false);
        navigate("/");
      })
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className="flex flex-col w-[350px] relative">
      {/* {error && (
        <p className="capitalize">
          {error["code"].split("/")[1].split("-").join(" ")}
        </p>
      )} */}
      {loading && <LoadingLayer />}
      <div className="bg-white p-8 pb-5 border border-[#e2e2e2]">
        <div className="w-full mb-8">
          <img src={instagramLogo} alt="" className="w-[150px] mx-auto" />
        </div>
        {error && (
          <Alert color="red" icon={CgDanger} className="mb-4">
            <p className="text-base">{error}</p>
          </Alert>
        )}
        <p className="text-gray-600 text-center mb-4 text-xl font-semibold">
          Sign up to see photos and videos from your friends.
        </p>
        <input
          onChange={handleInputChange}
          name="email"
          type="text"
          placeholder="Email"
          className="border p-2 bg-gray-100 border-[#e2e2e2] block w-full mb-2 rounded-sm text-sm"
        />
        <input
          onChange={handleInputChange}
          name="fullName"
          type="text"
          placeholder="Full Name"
          className="border p-2 bg-gray-100 border-[#e2e2e2] block w-full mb-2 rounded-sm text-sm"
        />
        <input
          onChange={handleInputChange}
          name="username"
          type="text"
          placeholder="Username"
          className="border p-2 bg-gray-100 border-[#e2e2e2] block w-full mb-2 rounded-sm text-sm"
        />
        <input
          onChange={handleInputChange}
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 bg-gray-100 border-[#e2e2e2] block w-full mb-4 rounded-sm text-sm"
        />
        <button
          onClick={signUpWithEmailAndPassword}
          className="block w-full bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold py-2 mb-5"
        >
          Sign up
        </button>
      </div>
      <div className="bg-white mt-4 border border-[#e2e2e2] p-4 text-center">
        <p>
          Have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function Signup() {
  return (
    <div className="h-screen flex items-center">
      <Container>
        <div className="flex justify-center">
          <SignupForm />
        </div>
      </Container>
    </div>
  );
}
