// pages/reset-password.js

import React, { useState } from 'react';
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";
import { notification } from 'antd';
import { Button, Modal, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../../Firebase/firebase.js";

import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
export default function ResetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const success = () => {
        Modal.success({
            content: 'Email has been sent open inbox and reset your password !',

            onOk() {
                navigate('/sign-in')
            },
        });
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();


        try {
            // Attempt to send the password reset email
            await sendPasswordResetEmail(auth, email);
            // Password reset email sent!
            success();
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/user-not-found') {
                // Email address not found in the registered accounts
                notification.open({
                    type: "error",
                    message: "This Email address not found",
                    placement: "top",
                });
            } else {
                // Handle other errors, e.g., display a notification to the user
                console.error(error);
            }
        }
    };

    return (<>
        <Navbar />
        <div className='flex justify-center px-6  items-center h-[80vh]'>
            <div class="w-full p-6 bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md sm:p-8">
                <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-[#000] md:text-2xl ">
                    Reset Password
                </h2>
                <form onSubmit={(e) => { handleResetPassword(e) }} class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-[#000]">Your email*</label>
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} name="email" id="email" className="block xl:w-96 w-72 mt-1 mb-6 xl:mb-0 rounded-md p-2 bg-[#B4C7ED0D] border-[#2668E826]  border-2"
                            placeholder="name@company.com" required="" />
                    </div>

                    <button className="w-[216px] h-[50px] text-[18px] md:text-[20px] font-[500] flex-shrink-0 rounded-md bg-[#012B6D] text-white hover:bg-blue-800 focus:outline-none focus:-outline"
                        type="submit">Reset passwod</button>

                </form>
            </div>
        </div>
        <Footer />
    </>
    );
}
