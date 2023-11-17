import React, { useState } from 'react';
import AdminLayout from '../../../../components/layout/AdminLayout'

function AddManager() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, e.g., send data to the server.
    };

    return (
        <AdminLayout>
            <div className='flex flex-col bg-[#EFF6F9] w-full  h-[90vh] px-6 py-10 md:px-20'>
            <div className="p-10 mx-auto mt-8  bg-white text-black w-full">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="flex">
                            <div className="w-1/2 pr-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className="w-1/2 pl-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                    <button type='submit' className='bg-[#012B6D] px-10 py-3 text-white font-[500] rounded-md' >
                            Create
                        </button>
                    </div>
                </form>
            </div>

            </div>

        </AdminLayout>
    );
}

export default AddManager;
