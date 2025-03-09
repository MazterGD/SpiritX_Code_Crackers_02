import axios from "axios";
import { useRouter } from "next/navigation";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080"
});

export const userLogin = async (formData: { username: string; password: string; }, router: ReturnType<typeof useRouter>) => {
    try {
        const response = await api.post("/auth/login", {
            username: formData.username,
            password: formData.password
        });

        if (response.status === 200) {
            const token = response.data.accessToken;
            localStorage.setItem("accessToken", token);
            console.log("Login Successful");


            return { success: true };
        }
    } catch (error: any) {
        console.error("Login failed:", error);
        return { success: false, message: error.response?.data?.message || "Invalid username or password" };
    }
};

export const userSignUp = async (
    formData: { username: string; password: string; confirmPassword: string; },
    router: ReturnType<typeof useRouter>
) => {
    try {
        const response = await api.post("/auth/signup", {
            username: formData.username,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        });

        if (response.status === 200) {
            const token = response.data.accessToken;
            if (token) {
                localStorage.setItem("accessToken", token);
                console.log("Login Successful, Token Saved!");


                return { success: true, token };
            }
        }
    } catch (error: any) {
        console.error("SignUp failed:", error);
        return { success: false, message: error.response?.data?.message || "Signup failed" };
    }
};
