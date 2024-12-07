"use client";

import React, { FormEvent, useEffect, useState } from "react";
import CustomButton from "@/components/Button/CustomButton";
import { verifyOTP } from "@/apis/AuthAPIs/auth";
import { InputOTP, InputOTPGroup, InputOTPItem } from "keep-react";
import { useRouter } from "next/navigation";

const VerifyOtpFrom = () => {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');

    const router = useRouter();

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email) {
            setEmail(JSON.parse(email));
        }
    }, []);


    const handleOtpVerification = async (e: FormEvent) => {
        e.preventDefault();

        console.log("opt: ", value);
        console.log("Email: ", email);


        if (!email) {
            setErrors("Email not found. Please try again.");
            return;
        }

        if (value.length !== 6) {
            setErrors("Please enter a valid 6-digit OTP.");
            return;
        }

        setLoading(true);
        try {
            await verifyOTP(email, value, router);
            setValue("")
            setErrors("");
        } catch (error: unknown) {
            console.log(error);
            setErrors("Invalid input");
        } finally {
            setLoading(false);
        }
    };

    const cancelSubmit = () => {
        setEmail('')
        router.push('/auth/login');
    }

    return (
        <div className="flex min-h-screen bg-pink-50">
            {/* Left Section */}
            <div className="w-1/2 flex flex-col items-center justify-center">
                <h4 className="text-center text-2xl font-semibold font-['Schoolbell'] mb-6">
                    Crisp Deals, Every Day
                </h4>
                <img className="h-14 w-auto" src="/LoginPhoto.png" alt="Shopping girl" />
            </div>

            {/* Right Section (Login Form) */}
            <div className="w-1/2 flex items-center justify-center">
                <div className="bg-white p-10 rounded-lg shadow-lg w-3/4">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-4xl font-bold">OTP</h2>
                            <p className="text-gray-500">Verification</p>
                        </div>
                        <img className="h-16" src="/CripsyLogo.png" alt="Cripsy Logo" />
                    </div>

                    <form onSubmit={handleOtpVerification}>
                        {/* Input Fields */}
                        <div className="my-8">

                            <div className="flex items-center justify-between mb-6">
                                <p className="text-center mt-6 mb-4">
                                    Please check your email and enter the OTP below to proceed.
                                </p>
                            </div>

                            {/* OTP Input */}
                            <div className="mb-4 mt-4">
                                <div className="mb-6 flex flex-col items-center">
                                    <InputOTP value={value} onChange={(newValue) => setValue(newValue)} maxLength={6}>
                                        <InputOTPGroup>
                                            {[...Array(6)].map((_, index) => (
                                                <InputOTPItem
                                                    key={index}
                                                    index={index}
                                                    className="otp-box border-red-500 border-2 rounded-lg p-3 text-center text-xl w-12 h-12 sm:w-16 sm:h-16 mx-2"
                                                    inputMode="numeric"
                                                />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                            </div>
                        </div>


                        {/* Submit and Cancel Buttons */}
                        <div className="mt-6">
                            <CustomButton
                                buttonLabel={loading ? "Submitting..." : "Submit"}
                                buttonClassName="w-full py-3 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-lg h-10"
                            />
                            <CustomButton
                                buttonLabel={"Cancel"}
                                buttonClassName="w-full bg-['#EAEAEA'] py-3 text-black mt-2 rounded-lg h-10 hover:text-white hover:bg-gray-700 border"
                                onClick={cancelSubmit}
                            />
                        </div>
                    </form>

                    {/* Error Message */}
                    {errors && <p className="text-red-500 text-center mt-4">{errors}</p>}

                </div>
            </div>
        </div>
    );
};

export default VerifyOtpFrom;
