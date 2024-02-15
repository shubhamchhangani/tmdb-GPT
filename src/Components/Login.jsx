import { useRef, useState } from "react";
import { BG_URL } from "../Utils/Constants";
import Header from "./Header";
import { checkValidData } from "../Utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/UserSlice";

export default function Login() {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);

  const email = useRef(null);

  const password = useRef(null);

  function toggleSignInForm() {
    setIsSignInForm(!isSignInForm);
  }

  function handleButtonClick() {
    //validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) {
      return;
    }
    //Sign in || Sign up
    if (!isSignInForm) {
      //Sign up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/69025204?v=4",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // ...
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // ...
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
              // ...
            });
          //on successful sign up go to browse page
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ": " + errorMessage);
          // ..
        });
    } else {
      //Sign in Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //on successful sign in go to browse page
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ": " + errorMessage);
        });
    }
  }
  return (
    <div className="w-[100vw] h-[110vh]">
      <Header />
      <div className="absolute">
        <img src={BG_URL} alt="background image of netflix" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[80vw] md:w-3/12 absolute p-12 bg-black mt-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80  mb-4"
      >
        <h1 className="text-3xl font-bold mb-5">
          {isSignInForm ? "Sign in" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="w-full rounded-md bg-gray-700 p-3 mb-3"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="w-full rounded-md bg-gray-700 p-3 mb-3"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full rounded-md bg-gray-700 p-3 mb-3"
        />
        <p className="text-lg text-red-700 font-bold py-1">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="py-3 w-full bg-red-700 text-white rounded-md my-4 font-bold text-2xl"
        >
          {isSignInForm ? "Sign in" : "Sign up"}
        </button>
        <p className="cursor-pointer pt-1 mt-2" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already a member Sign in now"}
        </p>
      </form>
    </div>
  );
}
