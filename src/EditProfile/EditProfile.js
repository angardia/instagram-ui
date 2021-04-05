import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import environment from '../environment';
import { UserService } from '../services/user.service';
import { UserContext } from "../user-context";
import { profileSchema } from "./EditProfile.schema";
import "./EditProfile.scss";


export default function Profile() {

    const { user, setUser } = useContext(UserContext);
    const [file, setFile] = useState(null);

    function preview(e) {
        const tst = URL.createObjectURL(e.target.files[0]);
        setFile(tst);
    }

    async function submit(values) {

        const imageInfo = JSON.stringify({
            fileName: values.image.name,
            type: values.image.type,
            size: values.image.size
        }, null, 2);
        console.log(imageInfo);

        const data = new FormData();
        data.append("image", values.image);
        data.append("password", values.password);
        data.append("email", values.email);
        data.append("bio", values.bio);

        try {
            const test = await fetch(environment.apiUrl + `/user/edit/${user._id}`,
                {
                    method: "POST",
                    body: data,
                    headers: {
                        Authorization: UserService.getToken()
                    }
                });
            const editedUser = await test.json();
            return setUser(editedUser);
        }
        catch (e) {
            console.log("fail to edit");
        }

    }



    return (
        <div className="Profile">
            <h1 className="Profile_Header">Edit Profile : {user.username}</h1>
            {user.username &&
                <Formik
                    initialValues={{ image: "", password: "", email: "", bio: "" }}
                    enableReinitialize={true}
                    validationSchema={profileSchema}
                    onSubmit={submit}>
                    {({ setFieldValue, isSubmitting }) => (
                        <Form >
                            <div className="Profile_Form">
                                <div className="Profile_Form_Element">
                                    <div className="Profile_PreviewHolder">
                                        <img className="Profile_Preview" src={file ? file : user.avatar} alt="user avatar" />
                                    </div>
                                </div>
                                <div>
                                    <label for="image" className="PostCreation_Label">
                                        <img className="PostCreation_CreatePostIcon" alt="create icon" src={require("../../src/styles/icons/upload.svg").default} /></label>
                                    <input name="image" className="" id="image" type="file" onChange={(e) => {
                                        preview(e);
                                        return setFieldValue("image", e.target.files[0]);
                                    }} />
                                    <ErrorMessage name="image" component="div" className="Profile_Form_Error" />
                                </div>

                                <div className="Profile_Form_Element">
                                    <label htmlFor="password" className="Profile_Form_Label">New Password:</label>
                                    <Field name="password" id="password" className="Profile_Form_Input" />
                                    <ErrorMessage name="password" component="div" className="Profile_Form_Error" />
                                    <div className="Profile_Test"></div>
                                </div>
                                <div className="Profile_Form_Element">
                                    <label htmlFor="email" className="Profile_Form_Label">Email address:</label>
                                    <Field type="email" name="email" className="Profile_Form_Input" id="email" />
                                    <ErrorMessage name="email" component="div" className="Profile_Form_Input-Error" />
                                </div>
                                <div className="Profile_Form_Element">
                                    <label htmlFor="bio" className="Profile_Form_Label">{user.username}'s Bio</label>
                                    <Field name="bio" id="bio" as="textarea" className="Profile_Form_TextArea" />
                                    <ErrorMessage name="bio" component="div" className="Profile_Form_Input-Error" />
                                </div>
                                <div className="Profile_Form_BtnWrap" >
                                <button type="submit" className="Btn Profile_Form_Btn" disabled={isSubmitting}>Submit</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            }

        </div>
    )
}
