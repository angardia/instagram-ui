import { ErrorMessage, Field, Form, Formik } from 'formik';
import { createPostSchema } from "./postCreate.schema";
import React, { useState } from 'react';
import environment from "../environment";
import { useHistory } from 'react-router-dom';
import { UserService } from "../services/user.service";
import "./PostCreate.scss";


export default function PostCreate() {
    const history = useHistory();
    const [file, setFile] = useState(null);

    function preview(e) {
        const tst = URL.createObjectURL(e.target.files[0]);
        setFile(tst);
    }

    async function submit(values) {
        const data = new FormData();
        data.append("image", values.image);
        data.append("description", values.description);

        try {
            await fetch(environment.apiUrl + "/post", {
                method: "PUT",
                body: data,
                headers: {
                    Authorization: UserService.getToken()
                }
            });
            history.push("/");
        }
        catch (e) {
            console.log(e);
        }

    }

    return (
        <div className="PostCreation" >
            <h1 className="PostCreation_Header">Create post</h1>
            <Formik
                initialValues={{ image: "", description: "" }}
                validationSchema={createPostSchema}
                onSubmit={submit}>
                {({ setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className="PostCreation_Form">

                            <div className="PostCreation_PreviewContainer">
                                <img className="PostCreation_Preview" style={file ? {display: "block"} :{display: "none"}} src={file ? file : null} alt="current img preview" />
                            </div>
                            <div className="PostCreation_Element">
                                <label for="image" className="PostCreation_Label">
                                <img className="PostCreation_CreatePostIcon" alt="create icon" src={require("../../src/styles/icons/upload.svg").default} />
                                Click to Upload</label>
                                <input name="image" className="PostCreation_Image" id="image" type="file" onChange={(e) => {
                                    preview(e);
                                    return setFieldValue("image", e.target.files[0]);
                                }} />
                                <ErrorMessage name="image" component="div" className="PostCreation_Form_Error" />
                            </div>
                            <div >
                                <Field className="PostCreation_TextArea" name="description" id="description" as="textarea" placeholder="What's on you'r mind?" />
                                <ErrorMessage name="description" component="div" className="PostCreation_Form_Error" />
                            </div>

                            <div className="PostCreation_BtnWrap" >
                                <button className="Btn PostCreation_Btn" type="submit" disabled={isSubmitting} >
                                    {isSubmitting ? "Posting..." : "Post"}</button>
                            </div>

                        </div>
                    </Form>
                )}

            </Formik>

        </div>
    );
}
