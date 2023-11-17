import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Wrapper from '../../components/shared/Wrapper';
import { Link } from 'react-router-dom';
import { auth, db } from "../../Firebase/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as Yup from 'yup';
import {
    notification, Input
} from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});


    const [isUser, setIsUser] = useState(true); // Default as a user
    const [isManager, setIsManager] = useState(false);


    const validationSchema = Yup.object().shape({

        email: Yup.string().email('Invalid email').required('Email is required'),

        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password should be at least 6 characters'),


    });


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your form submission logic here

        try {

            await validationSchema.validate(formData, { abortEarly: false });
            console.log('Form data is valid:', formData);
            setLoading(true);

            await signInWithEmailAndPassword(auth, formData.email, formData.password);

            const ref = collection(db, "Users")
            const q = query(ref, where("email", "==", formData?.email))
            const res = await getDocs(q);
            const user = res.forEach((doc) => {
                const userData = doc?.data();
                if (userData) {
                    localStorage.setItem('role', 'user')
                }
            })
            console.log({ user })

            if (!user) {
                const ref = collection(db, "Sellers")
                const q = query(ref, where("email", "==", formData?.email))
                const res = await getDocs(q);
                const user = res.forEach((doc) => {
                    console.log(doc?.data())
                    localStorage.setItem('role', 'seller')
                })
                console.log({ user })
            }

            notification.open({
                type: "success",
                message: "Successfully Logged In!",
                placement: "top",
            });

            // router.push('/');
            navigate("/")

            setLoading(false);



        } catch (error) {

            if (error instanceof Yup.ValidationError) {
                const newErrors = {};
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
                console.log("VALIDATION ERROR", newErrors)

                setErrors(newErrors);
                setLoading(false);

            }
            else {
                if (error.message === "Firebase: Error (auth/wrong-password).") {
                    notification.open({
                        type: "error",
                        message: "Wrong Password",
                        placement: "top",
                    });

                }
                else if (error.message === "Firebase: Error (auth/user-not-found).") {
                    notification.open({
                        type: "error",
                        message: "User not found",
                        placement: "top",
                    });
                }
                else if (error.message === "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).") {
                    notification.open({
                        type: "error",
                        message: "too many attempts try later! ",
                        placement: "top",
                    });

                }
                else if (error.message === "Firebase: Error (auth/invalid-login-credentials).") {
                    notification.open({
                        type: "error",
                        message: "Invalid Email/Password ",
                        placement: "top",
                    });

                }
                else {
                    console.log("MESSAGE", error.message)
                    const message = error.message
                    var modifiedText = message.replace("Firebase:", '');
                    setErrors("");

                    notification.open({
                        type: "error",
                        message: modifiedText,
                        placement: "top",
                    });
                }
                console.log(error)
                setLoading(false);
            }
        }

    };

    return (
        <div>
            <Navbar />
            <div>
                <div className='  justify-center flex items-center bg-[#EFF6F9] w-full p-5 md:p-20'>
                    <div className='max-w-screen-xl mx-auto mb-10 md:mb-0 mt-32 md:mt-0'>
                        <div className='bg-white md:w-[1240px] w-[320px] p-5 md:p-10 shadow-xl '>
                            <form onSubmit={handleSubmit} className="">


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
                                    {errors.email && <div className="  px-1 justify-start text-[red] flex items-center  whitespace-nowrap rounded-lg  text-[black] mb-1 ">{errors.email}</div>}

                                </div>

                                <div className="md:mb-12 md:flex-row flex-col flex gap-5 md:gap-0">
                                    <div className=" md:mr-2 w-full">
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
                                        {errors.password && <div className="  px-1 justify-start text-[red] flex items-center  whitespace-nowrap rounded-lg  text-[black] mb-1 ">{errors.password}</div>}

                                    </div>

                                </div>

                                {/* <div className="mb-5">
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
                                        <label htmlFor="user" className="ml-2">Signin as a User</label>
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
                                        <label htmlFor="manager" className="ml-2">Signin as a Manager</label>
                                    </div>
                                </div> */}

                                <div className="text-center md:text-left mt-10 md:mt-10">
                                    <button
                                        className="w-[216px] h-[50px] text-[18px] md:text-[20px] font-[500] flex-shrink-0 rounded-md bg-[#012B6D] text-white hover:bg-blue-800 focus:outline-none focus:-outline"
                                        type="submit"
                                    >
                                        {loading ? "Loading..." : "Login"}
                                    </button>
                                </div>
                                <p className='text-gray-700 text-center mt-3 md:mt-0'>Don't have an account?  <Link to="/sign-up" className='hover:underline text-[#012B6D]'>Register here</Link> </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Signin;
