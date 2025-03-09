"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: { username: string } | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decoded: { username: string } = jwtDecode(token);
                setUser({ username: decoded.username });
            } catch (error) {
                console.error("Invalid token:", error);
                logout();
            }
        }
    }, []);


    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user]);

    const login = (token: string) => {
        localStorage.setItem("accessToken", token);
        const decoded: { username: string } = jwtDecode(token);
        setUser({ username: decoded.username });


        setTimeout(() => router.push("/dashboard"), 0);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
