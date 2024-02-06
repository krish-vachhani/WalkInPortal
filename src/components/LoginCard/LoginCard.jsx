import "./LoginCard.css"

function LoginCard() {
    return (
        <div className="mainCard">
            <h1>Log In</h1>
            <form>
                <input type="email" id="email" name="email" placeholder="Email ID*" required/>
                <label className="forgotText">FORGOT EMAIL ID?</label>

                <div className="mainCard--password">
                    <input type="password" id="password" name="password" placeholder="Password*" required/>
                    <img className="showPasswordIcon" src="public/resources/icons/preview.svg" alt=""/>
                </div>
                <label className="forgotText">FORGOT PASSWORD?</label>
                <div className="rememberMe">
                    <input type="checkbox" id="checkBox" name="rememberMe"/>
                    <label className="checkbox--label" htmlFor="checkBox">Remember me</label>
                </div>
                <button className="loginButton" type="submit">LOG IN</button>
            </form>
            <div className="mainCard--createAccount">
                <label className="notRegistered--label">Not Registered yet?</label>
                <label className="createAccount--label">CREATE AN ACCOUNT</label>
            </div>
        </div>
    )
}

export default LoginCard