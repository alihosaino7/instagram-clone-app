import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import instagramLogo from "../../public/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { CgDanger } from "react-icons/cg";
import img from "../../public/images/iphone-with-profile.webp";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoadingLayer from "../components/common/LoadingLayer";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { IUser } from "../types/types";
import { Alert } from "flowbite-react";
import { Container } from "../components";

function LoginForm() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginWithEmailAndPassword() {
    if (!(email && password)) return setError("All fields are required");

    const signInEmails = await getDocs(collection(db, "users")).then(
      (userDoc) => userDoc.docs.map((doc) => doc.data().email)
    );

    const emailNotExist = !signInEmails.includes(email);

    if (emailNotExist) {
      return setError("Email not exist");
    }

    setError("");
    setLoading(true);
    localStorage.setItem("isAuth", "true");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      await getDoc(doc(db, "users", userCredential.user.uid)).then(
        (userSnapshot) => {
          setUser(userSnapshot.data() as IUser);
        }
      );

      navigate("/");
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-[300px] sm:w-[350px] relative">
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
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Phone number, username, or email"
          className="border p-2 bg-gray-100 border-[#e2e2e2] block w-full mb-2 rounded-sm text-sm"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border p-2 bg-gray-100 border-[#e2e2e2] block w-full mb-4 rounded-sm text-sm"
        />
        <button
          onClick={loginWithEmailAndPassword}
          className="block w-full bg-blue-500 hover:bg-blue-600 rounded-md text-white font-bold py-2 mb-5"
        >
          Log in
        </button>
        <p className="font-medium text-sm text-center text-slate-700">
          Forgat password?
        </p>
      </div>
      <div className="bg-white mt-4 border border-[#e2e2e2] p-4 text-center">
        <p>
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-blue-500 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="h-screen w-full flex items-center bg-gray-50">
      <Container>
        <div className="flex justify-center items-center gap-8">
          <div className="h-[600px] hidden lg:block">
            <img src={img} className="object-cover h-full w-full" />
          </div>
          <LoginForm />
        </div>
      </Container>
    </div>
  );
}
