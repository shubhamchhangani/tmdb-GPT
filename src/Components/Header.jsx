import { LOGO, USER_AVATAR } from "../Utils/Constants";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  }
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
      <div>
        <img className="w-44" src={LOGO} alt="netflix logo" />
      </div>
      {user && (
        <div className="flex p-2">
          <img
            className="h-12 w-12 p-1 m-1"
            src={user?.photoURL}
            alt="user icon"
          />
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white font-bold p-4 m-1 rounded-lg"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
