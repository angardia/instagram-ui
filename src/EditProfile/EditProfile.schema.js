import * as yup from "yup";

export const profileSchema = yup.object().shape({
    email: yup.string().lowercase().max(100, "cannot exceed 100 chars.").email()
        .test("isUnique", "this email already been used", (value) => isUnique("email", value)),
    password: yup.string().matches(/^.*(?=.{8,26})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            `Password should be 8-26 characters,
            one uppercase, one lowercase,
            one number & one special case character.`),
});
const memo = {
    email: {},
};

async function isUnique(field, value) {
    if (memo[field].hasOwnProperty(value)) {
        return memo[field][value];
    }
    return await fetch(`http://localhost:4000/user/check?${field}=${value}`,
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            memo[field][value] = !res;
            return memo[field][value];
        })
}
