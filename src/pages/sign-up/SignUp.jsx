import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
// import Wrapper from '../../components/shared/Wrapper';
import { Link } from 'react-router-dom';
import * as Yup from "yup";

import { useNavigate } from 'react-router-dom';

import { auth, db } from "../../Firebase/firebase.js";

import { notification } from "antd";

import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification
} from "firebase/auth";

import { signInWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {

    const navigate = useNavigate();


    let user;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isUser, setIsUser] = useState(true); // Default as a user
    const [isManager, setIsManager] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUserChange = () => {
        setIsUser(!isUser);
        setIsManager(false);
    };

    const handleManagerChange = () => {
        setIsManager(!isManager);
        setIsUser(false);
    };


    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required("First Name is required")
            .test("not-email", "First Name cannot be an email", (value) => {
                // Check if the value does not look like an email address
                return !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            })
            .test("not-number", "First Name cannot be a number", (value) => {
                // Check if the value is not a number
                return isNaN(Number(value));
            }),
        lastName: Yup.string()
            .required("Last Name is required")
            .test("not-email", "Last Name cannot be an email", (value) => {
                // Check if the value does not look like an email address
                return !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            })
            .test("not-number", "Last Name cannot be a number", (value) => {
                // Check if the value is not a number
                return isNaN(Number(value));
            }),
        email: Yup.string().email("Invalid email").required("Email is required"),

        password: Yup.string()
            .required("Password is required")
            .min(6, "Password should be at least 6 characters"),
        confirmPassword: Yup.string()
            .required("Password confirmation is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });
            console.log("Form data is valid:", formData);
            setLoading(true);

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            user = userCredential?.user;
            console.log("userID", user?.uid);

            // Send email verification
            await sendEmailVerification(user);

            const collectionRef = collection(db, "Users");
            const docRef = doc(collectionRef, user?.uid);



            // You can remove the automatic sign-in if you want to enforce email verification first
            // await signInWithEmailAndPassword(auth, formData.email, formData.password);

            notification.open({
                type: "success",
                message: "Please check your email for verification.",
                placement: "top",
            });

            // Redirect user to another page or display a message instructing them to check their email  // Redirect user to another page or display a message instructing them to check their email
            const values = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                role: isUser ? "User" : "Manager",
            };

            await setDoc(docRef, values, { merge: true });
            // Use onAuthStateChanged to listen for changes in authentication state

            navigate('/sign-in');


            setLoading(false);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const newErrors = {};
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
                console.log("VALIDATION ERROR", newErrors);

                setErrors(newErrors);
                setLoading(false);
            } else {
                const message = error.message;
                if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                    notification.open({
                        type: "error",
                        message: "Email already in use!",
                        placement: "top",
                    });
                    setErrors("");
                } else {
                    var modifiedText = message.replace("Firebase:", "");
                    setErrors("");

                    notification.open({
                        type: "error",
                        message: modifiedText,
                        placement: "top",
                    });
                }

                console.log(error.message);

                setLoading(false);
            }
        }
    };
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //         if (user && user.emailVerified) {
    //             navigate('/sign-in');
    //         }
    //     });

    //     // Cleanup the listener when the component unmounts
    //     return () => unsubscribe();
    // }, [navigate]); 
    // Add navigate to the dependencies


    return (
        <div>
            <Navbar />
            <div>
                <div className='  justify-center flex items-center bg-[#EFF6F9] w-full p-5 md:p-20'>
                    <div className='max-w-screen-xl mx-auto mb-10 md:mb-0 mt-32 md:mt-0'>
                        <div className='bg-white md:w-[1240px] w-[320px] p-5 md:p-10 shadow-xl '>
                            <form onSubmit={handleSubmit} className="">
                                <div className="md:mb-12 mb-5 flex md:flex-row flex-col gap-5 md:gap-0">
                                    <div className="w-full md:w-1/2 md:mr-2">
                                        <label className="block text-gray-700 text-[16px] font-bold mb-2" htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                                            id="firstName"
                                            type="text"
                                            placeholder="First Name"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                        {errors.firstName && (
                                            <div className="  px-1 justify-start text-[red] flex items-center mt-5  whitespace-nowrap rounded-lg  text-[black] mb-1 mt-1  mt-0">
                                                {errors.firstName}
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-full md:w-1/2 md:ml-2">
                                        <label className="block text-gray-700 text-[16px] font-bold mb-2" htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                                            id="lastName"
                                            type="text"
                                            placeholder="Last Name"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                        {errors.lastName && (
                                            <div className="  px-1 justify-start text-[red] flex items-center mt-5  whitespace-nowrap rounded-lg  text-[black] mb-1 mt-1  mt-0">
                                                {errors.lastName}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-5 md:mb-12">
                                    <label className="block text-gray-700 text-[16px] font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <div className="  px-1 justify-start text-[red] flex items-center mt-5  whitespace-nowrap rounded-lg  text-[black] mb-1 mt-1  mt-0">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="md:mb-12 md:flex-row flex-col flex gap-5 md:gap-0">
                                    <div className="md:w-1/2 md:mr-2 w-full">
                                        <label className="block text-gray-700 text-[16px] font-bold mb-2" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password && (
                                            <div className="  px-1 justify-start text-[red] flex items-center mt-5  whitespace-nowrap rounded-lg  text-[black] mb-1 mt-1  mt-0">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-full md:w-1/2 md:ml-2">
                                        <label className="block text-gray-700 text-[16px] font-bold mb-2" htmlFor="confirmPassword">
                                            Confirm Password
                                        </label>
                                        <input
                                            className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                        {errors.confirmPassword && (
                                            <div className="  px-1 justify-start text-[red] flex items-center mt-5  whitespace-nowrap rounded-lg  text-[black] mb-1 mt-1  mt-0">
                                                {errors.confirmPassword}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <label className="block text-gray-700 text-[16px] font-bold md:mt-0 mt-5 mb-4">User Type</label>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="user"
                                            name="userType"
                                            checked={isUser}
                                            onChange={handleUserChange}
                                            className='w-[20px] h-[20px] rounded'
                                        />
                                        <label htmlFor="user" className="ml-2">Signup as a User</label>
                                    </div>
                                    <div className="flex items-center mt-3">
                                        <input
                                            type="checkbox"
                                            id="manager"
                                            name="userType"
                                            checked={isManager}
                                            onChange={handleManagerChange}
                                            className='w-[20px] h-[20px] rounded'
                                        />
                                        <label htmlFor="manager" className="ml-2">Signup as a Manager</label>
                                    </div>
                                </div>

                                <div className="text-center md:text-left mt-10 md:mt-28">
                                    {/* {loading ? <div class="loader"></div> :  */}
                                    <button
                                        className="w-[216px] h-[50px] text-[18px] md:text-[20px] font-[500] flex-shrink-0 rounded-md bg-[#012B6D] text-white hover:bg-blue-800 focus:outline-none focus:-outline"
                                        type="submit"
                                    >
                                        {loading ? "Loading..." : "Create"}
                                    </button>
                                    {/* } */}
                                </div>
                                <p className='text-gray-700 text-center mt-3 md:mt-0'>Already have an account?  <Link to="/sign-in" className='hover:underline text-[#012B6D]'>Login here</Link> </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SignUp;
