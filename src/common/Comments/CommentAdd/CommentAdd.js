import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { PostService } from '../../../services/post.service';
import { UserContext } from '../../../user-context';
import Avatar from '../../Avatar/Avatar';
import "./CommentAdd.scss";

export default function CommentAdd({ postId, onCommentAdd }) {

    const { user } = useContext(UserContext);

    async function onSubmit(values) {
        try {
            const res = await PostService.addComment(postId,values);
            onCommentAdd(res);
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="CommentAdd">
            <Avatar size="sm" image={user.avatar} />
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
                                <Field className="CommentAdd_TextArea" placeholder="Add a comment..." name="content" id="content" as="textarea" />
                                <ErrorMessage name="content" component="div" className="CommentAdd_Form_Error" />
                            </div>
                            <div  className="CommentAdd_BtnWrap" >
                                <button className="Btn CommentAdd_Btn"  type="submit" disabled={isSubmitting} >
                                    {isSubmitting ? "Posting..." : "Post"}</button>
                            </div>

                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}
