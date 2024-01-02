import * as yup from 'yup';

export  const formSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    surname: yup.string().required('Surname is required'),
    email: yup.string().email('Email format is not valid').required('Email is required'),
    age: yup.number().positive().integer().typeError('Age must be a number').max(40).min(18). required('Age is required'),
    tc: yup.string().required('TC is required').matches(/^[0-9]{11}$/, "TC must be 11 digits"),
    application: yup.string().required('Application is required'),
    address: yup.string().required('Address is required'),
    
})

export const adminSchema = yup.object().shape({
    email: yup.string().email("Email format is not valid").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

export const formResultSchema = yup.object().shape({
    results: yup.string().required("Results is required"),
})