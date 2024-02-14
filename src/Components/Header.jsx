import { LOGO } from "../Utils/Constants";

export default function Header(){
    return(
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full">
            <img 
            className="w-44"
            src={LOGO} 
            alt="netflix logo" 
            />
        </div>
    )
}