"use client";

import React, { FormEvent, useState } from "react";
import InputField from "@/components/InputField/InputField";
import CustomButton from "@/components/Button/CustomButton";
import { forgotPassword } from "@/apis/AuthAPIs/auth";
import { ForgotPasswordSchema } from "@/schema/AuthSchema/ForgotPasswordSchema";
import { useRouter } from "next/navigation";

interface ForgotPasswordFormValues {
    email: string;
}

const ForgotPasswordFrom = () => {

    const [formData, setFormData] = useState<ForgotPasswordFormValues>({
        email: ''
    });

    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: keyof ForgotPasswordFormValues) => {
        setFormData({
            ...formData,
            [value]: e.target.value
        });
    }

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        const validation = ForgotPasswordSchema.safeParse(formData);

        if (!validation.success) {
            setErrors(validation.error.errors[0]?.message || "Invalid input");
            return;
        }
        setLoading(true);
        try {
            await forgotPassword(formData, router);
            setFormData({
                email: '',
            });
            localStorage.setItem("userEmail", JSON.stringify(formData.email));

        } catch (error: unknown) {
            console.log(error);
            setErrors("Invalid input");
        } finally {
            setLoading(false);
        }


    }

    const cancelSubmit = () => {
        setFormData({
            email: '',
        });
        router.push('/auth/login');
    }

    return (
        <div className="flex min-h-screen bg-pink-50">
            {/* Left Section */}
            <div className="w-1/2 flex flex-col items-center justify-center">
                <h4 className="text-center text-2xl font-semibold font-['Schoolbell'] mb-6">
                    Crisp Deals, Every Day
                </h4>
                <img className="h-18 w-auto" src="/LoginPhoto.png" alt="Shopping girl" />
            </div>

            {/* Right Section (Login Form) */}
            <div className="w-1/2 flex items-center justify-center">
                <div className="bg-white p-10 rounded-lg shadow-lg w-3/4">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-4xl font-bold">Forgot</h2>
                            <p className="text-gray-500">your password ?</p>
                        </div>
                        <img className="h-16" src="/CripsyLogo.png" alt="Cripsy Logo" />
                    </div>

                    <form onSubmit={handleSignUp}>
                        {/* Input Fields */}
                        <div className="my-8">

                            <div className="flex items-center justify-between mb-6 font-semibold">
                                <p className="text-center mt-6 mb-4">
                                    Enter your email address associated with your account and
                                    we will send you an OTP to reset your password.
                                </p>
                            </div>

                            <div className="mb-4 mt-4">
                                <InputField
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email || ''}
                                    onChange={(e) => handleInputChange(e, 'email')}
                                    icon={undefined}
                                    label={false}
                                    labelName="email"

                                />
                            </div>

                        </div>


                        {/* Submit and Cancel Buttons */}
                        <div className="mt-4">
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

export default ForgotPasswordFrom;
