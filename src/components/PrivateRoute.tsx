import {
    Outlet,
    Navigate,
  } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Navbar } from "../components";

export function PrivateRoute() {
    const { authUser } = useAuth();
  
    if (!authUser && !localStorage.getItem("isAuth")) {
      return <Navigate to="/auth/login" />;
    }
  
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }