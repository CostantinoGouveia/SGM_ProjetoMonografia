"use client"
// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const AuthContext = createContext({});
interface User{
    token: string
}
export const AuthProvider = ({ children } : {children: ReactNode}) => {
    
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Você pode decodificar o token aqui para obter os dados do usuário
            setUser({ token });
        }
    }, []);

    const login = (token:string) => {
        localStorage.setItem('token', token);
        setUser({ token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
