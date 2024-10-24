"use client"
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

export default function ProtectedRoute({children}: {children:ReactNode}) {
    const token = localStorage.getItem("token")
    const router = useRouter()
    useEffect(() => {
        if (!token) {
            router.replace("/auth/entrar")
         }
    },[token])
   
    return (
        <div>
            {children}
        </div>
    )
}