import {useFormik} from "formik";
import * as Yup from "yup";
import "./LoginCard.css";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {LOGIN_USER} from "../../gqlOperations/mutations.js";

function LoginCard() {
    const navigate = useNavigate();

    const [loginUser] = useMutation(LOGIN_USER, {
        onCompleted: (result) => {
            alert("Login Successful");
            localStorage.setItem("authToken", result.login.token);
            localStorage.setItem('userId',result.login.user.userId);
            console.log("Login successful", result);
            navigate('/listings');
        },
        onError: (error) => {
            alert("Login unsuccessful. Please check your email and password.");
            console.error("Login error", error);
        },
    })
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            loginUser({
                variables: {
                    input: {
                        email: values.email,
                        password: values.password,
                    }
                },
            }).then(r => console.log("Mutation completed"));
        },
    });
    return (
        <div className="mainCard">
            <h1>Log In</h1>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email ID*"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                ) : null}

                <label className="forgotText">FORGOT EMAIL ID?</label>

                <div className="mainCard--password">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password*"
                        required
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    <img src="public/resources/preview.svg" alt=""/>
                </div>
                {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                ) : null}

                <label className="forgotText">FORGOT PASSWORD?</label>
                <div className="rememberMe">
                    <input
                        type="checkbox"
                        id="checkBox"
                        name="rememberMe"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.rememberMe}
                    />
                    <label className="checkbox--label" htmlFor="checkBox">
                        Remember me
                    </label>
                </div>

                <button className="loginButton" type="submit">
                    LOG IN
                </button>
            </form>
            <div className="mainCard--createAccount">
                <label className="notRegistered--label">Not Registered yet?</label>
                <label className="createAccount--label" onClick={() => {
                    navigate('/register')
                }}>CREATE AN ACCOUNT</label>
            </div>
        </div>
    );
}

export default LoginCard;
