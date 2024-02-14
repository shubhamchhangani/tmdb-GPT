import { useRef, useState } from "react";
import { BG_URL } from "../Utils/Constants";
import Header from "./Header";
import { checkValidData } from "../Utils/validate";

export default function Login(){
    const[isSignInForm, setIsSignInForm] = useState(true);
    const[errorMessage, setErrorMessage] = useState(null);

    const email = useRef(null);

    const password = useRef(null);

    function toggleSignInForm(){
        setIsSignInForm(!isSignInForm);
    }

    function handleButtonClick(){
        //validate the form data
        const message = checkValidData(email.current.value, password.current.value);
        console.log(message);
        setErrorMessage(message);

        //Sign in || Sign up
    }
    return(
        <div className="w-[100vw] h-[110vh]">
            <Header />
            <div className="absolute">
                <img src={BG_URL} alt="background image of netflix" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-[80vw] md:w-3/12 absolute p-12 bg-black mt-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80  mb-4">
                <h1 className="text-3xl font-bold mb-5">{isSignInForm ? "Sign in" : "Sign Up"}</h1>
                {!isSignInForm && 
                    <input type="text" placeholder="Full Name" className="w-full rounded-md bg-gray-700 p-3 mb-3" />
                }
                <input ref={email} type="text" placeholder="Email" className="w-full rounded-md bg-gray-700 p-3 mb-3" />
                <input ref={password} type="password" placeholder="Password" className="w-full rounded-md bg-gray-700 p-3 mb-3" />
                <p className="text-lg text-red-700 font-bold py-1">{errorMessage}</p>
                <button onClick={handleButtonClick} className="py-3 w-full bg-red-700 text-white rounded-md my-4 font-bold text-2xl">{isSignInForm ? "Sign in" : "Sign up"}</button>
                <p className="cursor-pointer pt-1 mt-2" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already a member Sign in now"}</p>
            </form>
        </div>
    )
}