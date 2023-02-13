import * as Yup from 'yup';
export const validateSchema = Yup.object().shape({
    userName: Yup.string()
        .min(1, 'Your name must have from 1-30 character')
        .max(30, 'Your name must have from 1-30 character'),
    phone: Yup.string().max(10, 'Invalid phone number').min(10, 'Invalid phone number'),
    pass: Yup.string().min(6, 'Your password has at least 6 characters'),
    cfmpassword: Yup.string().oneOf([Yup.ref('pass'), null], 'Passwords must match'),
});
