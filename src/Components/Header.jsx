import { LOGO, USER_AVATAR } from "../Utils/Constants";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../Utils/UserSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        // ...
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
        // ...
      }
    });
  }, []);
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
