import * as yup from "yup";

export const loginSchema = yup.object().shape({
    username: yup.string().required("Please enter a valid username."),
    password: yup.string().required("No password provided.")
    .matches( /^.*(?=.{8,26})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Wrong username or password."),
});