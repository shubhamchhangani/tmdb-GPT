import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../Utils/Constants";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../Utils/UserSlice";
import { toggleGptSearchView } from "../Utils/GptSlice";
import { changeLanguage } from "../Utils/ConfigSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    //unsubscribe when the component unmount
    return () => unsubscribe();
  }, []);

  function handleGptSearchClick() {
    //toggle gpt search
    dispatch(toggleGptSearchView());
  }
  function handleLanguageChange(e) {
    dispatch(changeLanguage(e.target.value));
  }
  return (
    <div className="absolute bg-gradient-to-b from-black z-10 w-full flex justify-between">
      <div>
        <img className="w-44" src={LOGO} alt="netflix logo" />
      </div>
      {user && (
        <div className="flex m-2">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearchClick}
            className="text-white px-4 font-bold opacity-70 rounded-lg bg-gray-500 hover:bg-gray-800"
          >
            {showGptSearch ? "Home" : "Gpt Search"}
          </button>
          <img
            className="h-12 w-12 p-1 m-2"
            src={user?.photoURL}
            alt="user icon"
          />
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white font-bold opacity-70 px-4 rounded-lg hover:bg-red-800"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
