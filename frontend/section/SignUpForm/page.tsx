"use client";

import React, { FormEvent, useState } from "react";
import InputField from "@/components/InputField/InputField";
import CustomButton from "@/components/Button/CustomButton";
import { userSignUp } from "@/apis/authAPI";
import { SignupSchema } from "@/schema/signupSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AlertDialogComponent from "@/components/AlertDialog/AlertDialog";

interface SignUpFormValues {
    username: string;
    password: string;
    confirmPassword: string;
}

const SignupForm = () => {
    const [formData, setFormData] = useState<SignUpFormValues>({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [passwordMatchProgress, setPasswordMatchProgress] = useState(0);

    const router = useRouter();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        value: keyof SignUpFormValues
    ) => {
        setFormData({ ...formData, [value]: e.target.value });

        if (value === "password") {
            evaluatePasswordStrength(e.target.value);
        }
        if (value === "confirmPassword") {
            evaluatePasswordMatch(formData.password, e.target.value);
        }

        // Remove error message when user starts typing
        setErrors((prevErrors) => ({ ...prevErrors, [value]: "" }));
    };

    const evaluatePasswordStrength = (password: string) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

        if (password.length < 8) {
            setPasswordStrength("Weak");
        } else if (hasUpperCase && hasLowerCase && hasSpecialChar) {
            setPasswordStrength("Strong");
        } else {
            setPasswordStrength("Moderate");
        }
    };


    const evaluatePasswordMatch = (password: string, confirmPassword: string) => {
        if (!confirmPassword) {
            setPasswordMatchProgress(0);
        } else if (password.startsWith(confirmPassword)) {
            const matchPercentage = (confirmPassword.length / password.length) * 100;
            setPasswordMatchProgress(matchPercentage);
        } else {
            setPasswordMatchProgress(10); // Slight progress if there's no match
        }
    };

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        if (passwordStrength === "Weak") {
            setErrors({ password: "Password is too weak. Please use a stronger password." });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match." });
            return;
        }

        const validation = SignupSchema.safeParse(formData);

        if (!validation.success) {
            const fieldErrors: Record<string, string> = {};
            validation.error.errors.forEach((err) => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setLoading(true);
        try {
            await userSignUp(formData, router);
            setShowAlert(true);
            setFormData({ username: "", password: "", confirmPassword: "" });
            setPasswordMatchProgress(0);

        } catch (error) {
            setErrors({ general: "Signup failed. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-pink-50">
            {/* Left Section */}
            <div className="w-1/2 flex flex-col items-center justify-center">
                <img className="h-124 w-auto" src="/auth.png" alt="SignUp Image" />
            </div>

            {/* Right Section (SignUp Form) */}
            <div className="w-1/2 flex items-center justify-center">
                <div className="bg-white p-10 rounded-lg shadow-lg w-3/4">
                    <div className="flex items-center justify-center mb-6">
                        <h2 className="text-4xl font-bold">Sign Up</h2>
                    </div>

                    <form onSubmit={handleSignUp}>
                        {/* Username Field */}
                        <div className="mb-4">
                            <InputField
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) => handleInputChange(e, "username")}
                                icon={undefined}
                                label={false}
                                labelName="username"
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="mb-4">
                            <InputField
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => handleInputChange(e, "password")}
                                icon={undefined}
                                label={false}
                                labelName="password"
                            />
                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="mt-2">
                                    <p className="text-sm">Password Strength:</p>
                                    <div
                                        className={`h-2 mt-1 rounded-lg ${
                                            passwordStrength === "Weak"
                                                ? "bg-red-500"
                                                : passwordStrength === "Moderate"
                                                    ? "bg-yellow-500"
                                                    : "bg-green-500"
                                        }`}
                                        style={{ width: passwordStrength === "Weak" ? "33%" : passwordStrength === "Moderate" ? "66%" : "100%" }}
                                    />
                                    <p className="text-sm mt-1 font-semibold text-gray-700">
                                        {passwordStrength}
                                    </p>
                                </div>
                            )}
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="mb-4">
                            <InputField
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange(e, "confirmPassword")}
                                icon={undefined}
                                label={false}
                                labelName="confirmPassword"
                            />
                            {/* Password Match Progress Indicator */}
                            {formData.confirmPassword && (
                                <div className="mt-2">
                                    <p className="text-sm">Password Match:</p>
                                    <div
                                        className={`h-2 mt-1 rounded-lg ${
                                            passwordMatchProgress < 50
                                                ? "bg-red-500"
                                                : passwordMatchProgress < 100
                                                    ? "bg-yellow-500"
                                                    : "bg-green-500"
                                        }`}
                                        style={{ width: `${passwordMatchProgress}%` }}
                                    />
                                    <p className="text-sm mt-1 font-semibold text-gray-700">
                                        {passwordMatchProgress < 100 ? "Incomplete" : "Matched"}
                                    </p>
                                </div>
                            )}
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Sign Up Button */}
                        <div className="mt-6">
                            <CustomButton
                                buttonLabel={loading ? "Signing up..." : "Sign Up"}
                                buttonClassName="w-full h-10 py-3 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-lg"
                            />
                        </div>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-500">
                            Already Registered?{" "}
                            <Link className="text-blue-600 font-semibold" href="../../login">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* Alert Dialog for Success */}
            {showAlert && (
                <AlertDialogComponent
                    title="Sign Up Successful!"
                    description="You will be redirected to the login page."
                    onConfirm={() => router.push("/login")}
                />
            )}
        </div>
    );
};

export default SignupForm;
