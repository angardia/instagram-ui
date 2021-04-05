import * as yup from "yup";
import environment from "../environment";

export const registerSchema = yup.object().shape({
    username: yup.string().lowercase().min(3, "Username should be 3 chars minimum.").max(60, "Username should be 60 chars maximum.").required("Please enter a valid username.")
        .test("isUnique", "this username already exists", (value) => isUnique("username", value)),
    email: yup.string().lowercase().max(100, "cannot exceed 100 chars.").email().required("Please enter a valid email.")
        .test("isUnique", "this email already been used", (value) => isUnique("email", value)),
    password: yup.string().required("No password provided.")
        .matches(/^.*(?=.{8,26})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            `Password should be 8-26 characters,
            one uppercase, one lowercase,
            one number & one special case character.`),
    agreeToTerms: yup.mixed().oneOf([true], "Agree to terms is required."),
});

const memo = {
    email: {},
    username: {}
};

async function isUnique(field, value) {
    if (memo[field].hasOwnProperty(value)) {
        return memo[field][value];
    }
    return await fetch(environment.apiUrl + `/user/check?${field}=${value}`,
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            memo[field][value] = !res;
            return memo[field][value];
        })
}

        // {    
        //     try {
        //         const res = await fetch(`http://localhost:4000/user/check/${value}`, {
        //             headers: {
        //               "Content-Type": "application/json"
        //             }
        //           });
        //           const test = await res.json();
        //           console.log(test);
        //           return test;
        //     }
        //     catch (e) {
        //         console.log(e);
        //     }

        // }