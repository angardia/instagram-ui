import React, { useContext, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Cookies from "js-cookie";
import { Link, useHistory } from 'react-router-dom';
import { loginSchema } from "../Login/login.schema";
import "./Login.scss";
import { UserService } from '../services/user.service';
import { UserContext } from '../user-context';


export default function Login() {

    const history = useHistory();
    const { setUser } = useContext(UserContext);
    const [showError, setShowError] = useState(false);

    async function submit(values) {
        setShowError(false);
        //reset the error
        const res = await UserService.login(values);
        if (res.status !== 200) {
            setShowError(true);
            return;
        }
        const json = await res.json();
        Cookies.set("insta-user", json.token, { expires: 30 });

        const user = await UserService.me();
        setUser(user);
        history.push("/");
    }


    return (
        <div className="Login">
            <h2>Login</h2>
            { showError && <div>incorrect username or password</div>}
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={submit}>
                <Form>
                    <div className="form">
                        <div>
                            <label htmlFor="username" className="Form-label">Username</label>
                            <Field name="username" className="Form-input" id="username" />
                            <ErrorMessage name="username" component="div" />
                        </div>
                        <div>
                            <label htmlFor="password" className="Form-label">password</label>
                            <Field name="password" className="Form-input" id="password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </Form>
            </Formik>
            <div>
                <Link to="/register" >
                <p>New to GameShot? Register now!</p>
                </Link>
            </div>

        </div>
    )
}
