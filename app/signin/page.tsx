// SignInPage.jsx
"use client"
import React from 'react';
import Logo from '../app-components/logo';
import { useAuth } from "@crossmint/client-sdk-react-ui";
import UserCard from '../app-components/UserCard';


const SignInPage = () => {
    const { login, logout, user, jwt } = useAuth();



    return (
        <div className="flex h-screen">
            {/* Left side - Sign in button */}
            <div className="flex flex-col  w-2/3">
                <div className="flex flex-col gap-4 justify-center items-center h-full  ">
                    <Logo />
                    <UserCard />
                </div>
            </div>

            {/* Right side - Image */}
            <div className="w-1/3">
                <img
                    src="/login-banner.jpg"
                    alt="Sign In Illustration"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default SignInPage;
