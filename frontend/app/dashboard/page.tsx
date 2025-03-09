"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import CustomButton from "@/components/Button/CustomButton";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const [username, setUsername] = useState("");

    const router = useRouter();

    useEffect(() => {
        const fetchUsername = () => {
            try {
                const token = localStorage.getItem("accessToken");

                if (!token) {
                    console.warn("No token found in localStorage.");
                    return;
                }


                const decoded: any = jwtDecode(token);
                console.log("Decoded Token:", decoded);

                const extractedUsername = decoded.name;

                setUsername(extractedUsername);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        };

        fetchUsername();
    }, []);

    const handleLogout = () =>{
        localStorage.removeItem("accessToken");
        router.push("/login");
    }

    return (
        <ProtectedRoute>
            <div className="flex flex-col items-center justify-center p-6">
                <h1 className="text-4xl font-bold py-32">Hello, {username}</h1>

                <CustomButton
                    buttonLabel={"LogOut"}
                    buttonClassName="w-1/4 py-3 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-lg h-10"
                    onClick={handleLogout}
                />
            </div>
        </ProtectedRoute>
    );
};

export default Dashboard;
