import { Container } from "./common/Container";
import { useAuth } from "../contexts/AuthContext";
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { FiPlusSquare } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { modalUiActions } from "../features/modal/modalSlice";
import { useAppDispatch } from "../app/hooks";

import instagramLogo from "../../public/images/logo.png";
import CustomAvatar from "./common/CustomAvatar";
import SkeletonElement from "./skeletons/SkeletonElement";

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  async function logout() {
    try {
      localStorage.clear();
      await signOut(auth);
      navigate("/auth/signup");
    } catch (error) {
      alert(error);
    }
  }

  function handleHomeIconClick() {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  }

  return (
    <nav className="bg-white py-2 sm:py-3 shadow-[0px_3px_2px_0_rgba(0,0,0,0.1)] w-full">
      <Container className="relative h-full">
        <div className="flex items-center">
          <img src={instagramLogo} className="w-[80px] sm:w-[100px]" />
          <div className="flex items-center sm:gap-2 ml-auto">
            <button
              onClick={handleHomeIconClick}
              className="text-lg sm:text-2xl w-[30px] h-[30px] sm:w-[40px] md:h-[40px] rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              <HiOutlineHome />
            </button>

            <button
              onClick={() => dispatch(modalUiActions.openCreatePostModal())}
              className="text-lg sm:text-2xl w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              <FiPlusSquare />
            </button>

            <button
              className="text-lg sm:text-2xl w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-full hover:bg-gray-100 flex items-center justify-center"
              onClick={() => {
                dispatch(
                  modalUiActions.openConfirmLogoutModal({
                    onConfirm: logout,
                    warningTitle: "Are you sure you want to logout?",
                  })
                );
              }}
            >
              <HiOutlineLogout />
            </button>

            {user ? (
              <Link to="/profile">
                <CustomAvatar
                  img={user?.userImage}
                  className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] ml-2 sm:ml-0"
                />
              </Link>
            ) : (
              <div className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] ml-2 sm:ml-0">
                <SkeletonElement type="avatar" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};
