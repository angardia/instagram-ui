import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import environment from '../../../environment';
import { UserService } from '../../../services/user.service';
import { UserContext } from '../../../user-context';
import Avatar from '../../Avatar/Avatar';
import "./CommentAdd.scss";

export default function CommentAdd({ postId, onCommentAdd }) {

    const { user } = useContext(UserContext);

    async function onSubmit(values) {
        //    console.log(values);
        try {
            const res = await fetch(environment.apiUrl + `/post/${postId}/comment`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: UserService.getToken()
                },
                body: JSON.stringify(values)
            });
            const comment = await res.json();
            onCommentAdd(comment);
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="CommentAdd">
            <Avatar image={user.avatar} />
            <Formik
                initialValues={{ content: "" }}
                onSubmit={(values, { resetForm }) => {
                    onSubmit(values)
                    resetForm()
                }}>
                {({ isSubmitting }) => (
                    <Form  className="CommentAdd_FormWrap">
                        <div className="CommentAdd_Form">
                            <div>
                                <Field className="CommentAdd_TextArea"  name="content" id="content" as="textarea" />
                                <ErrorMessage name="content" component="div" className="CommentAdd_Form_Error" />
                            </div>
                            <div>
                                <button type="submit" disabled={isSubmitting} >
                                    {isSubmitting ? "Posting..." : "Post"}</button>
                            </div>

                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}
