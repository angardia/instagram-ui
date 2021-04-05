import * as yup from "yup";

export const createPostSchema = yup.object().shape({
image: yup.mixed().required("Image required"),
description: yup.string().max(2000, " desc")
});