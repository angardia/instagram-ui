import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import "./Register.scss";
import { registerSchema } from './register.schema';
import { useHistory } from 'react-router-dom';
import { UserService } from '../services/user.service';

export default function Register(props) {

    const history = useHistory();
    const [showSuccess, setSuccess] = useState(false);


    async function submit(values) {

        const res = await UserService.register(values);
        if (res.status === 201) {
            setSuccess(true);
            history.push("/login");
            return;
        }
        console.log("bad!");
    }

    return (
        <div className="Register">

            <Formik
                initialValues={{ username: "", email: "", password: "", agreeToTerms: false }}
                validationSchema={registerSchema}
                onSubmit={submit}>
                {({ isSubmitting }) => (
                    <Form className="Register_Form">
                        <h2 className="Register_Header" >Registration</h2>
                        <div className="Register_Form_Element">
                            <label htmlFor="username" className="Register_Form_Label">Username</label>
                            <Field name="username" className="Register_Form_Input" id="username"/>
                            <ErrorMessage name="username" className="Register_Form_Input_Error" component="div" />
                        </div>
                        <div className="Register_Form_Element">
                            <label htmlFor="password" className="Register_Form_Label">Password</label>
                            <Field type="password" name="password" className="Register_Form_Input" id="password" />
                            <ErrorMessage name="password" component="div" className="Register_Form_Input_Error" />
                        </div>
                        <div className="Register_Form_Element">
                            <label htmlFor="email" className="Register_Form_Label">Email address</label>
                            <Field type="email" name="email" className="Register_Form_Input" id="email" />
                            <ErrorMessage name="email" component="div" className="Register_Form_Input_Error" />
                        </div>

                        <div className="Register_Form_Element">
                            <div className="Register_Form_Radio">
                                <Field type="checkbox" name="agreeToTerms" className="Register_Form_Radio_Input" id="agreeToTerms" />
                                <label className="Register_Form_Radio_Label" htmlFor="agreeToTerms">
                                    <span className="Register_Form_Radio_Btn"></span>
                                agree to terms</label>
                                <ErrorMessage name="agreeToTerms" component="div" className="Register_Form_Input_Error" />
                            </div>
                        </div>
                        <div className="form-group my-3">
								{ showSuccess
									? <div className="alert alert-success Register_success"><b>Success!</b> Wait for transfer...</div>
									: <button type="submit" className="Btn Register_Btn"  disabled={isSubmitting}>Submit</button>
								}
							</div>
                        
                    </Form>
                )}
            </Formik>

        </div>
    )
}
