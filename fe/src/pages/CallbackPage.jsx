// import axios from "axios";
import { useEffect } from "react";
import sendCode from "../util/sendCode";
import { useNavigate } from "react-router-dom"
import { useOutletContext } from "react-router-dom";


const CallbackPage = () => {

    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn, movieList, setMovieList] = useOutletContext()

    useEffect(() => {

        const urlSearchParams = new URLSearchParams(window.location.search)
        const code = urlSearchParams.get("code")
        console.log(code)
        const init = async () => {
            const data = await sendCode(code)
            localStorage.setItem("token", data.sessionToken) // sub-ot, name-et ebbol kiszedni decode-utan
            localStorage.setItem("user", data.username) // ez nem kell
            setIsLoggedIn(true)
            navigate("/")
        }
        init()
    }, []);


    return (
        <>
            <h2>Callback Page</h2>
        </>
    );
}

export default CallbackPage;