import LoginHeader from "../../components/LoginHeader/LoginHeader.jsx"
import LoginCard from "../../components/LoginCard/LoginCard.jsx";
import "./Login.css"
import LoginFooter from "../../components/LoginFooter/LoginFooter.jsx";

function Login() {

    return (
        <div className="mainDiv">
            <LoginHeader/>
            <LoginCard/>
            <LoginFooter/>
        </div>
    )
}

export default Login
