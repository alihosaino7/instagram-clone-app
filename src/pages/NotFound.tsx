import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

export default function NotFound() {
  return (
    <div
      className="absolute left-[50%] top-[50%]"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div className="text-center">
        <h2 className="font-bold text-6xl">404</h2>
        <h2 className="font-bold text-6xl my-6">Page not found</h2>
        <Link
          to="/"
          className="flex items-center w-full justify-center py-3 text-white font-semibold bg-blue-500 hover:bg-blue-600 text-3xl rounded-md"
        >
          <span className="mr-2 text-white text-3xl">
            <AiFillHome />
          </span>
          Go to home page
        </Link>
      </div>
    </div>
  );
}
