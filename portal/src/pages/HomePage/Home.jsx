import './Home.css'
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`/login`)
    }, [navigate])
    return (
        <div>Redirecting To Login..</div>
    )
}


export default Home
