import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import UseQueryProvider from "@/components/UseQueryProvedor";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans",});

export const metadata: Metadata = {
  title: "SGM - Agentes",
  description: "Sistema para gestao de multas - Agentes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  return (
    <html lang="en">
      <body  className={cn("antialiased bg-slate-200-700 max-h-screen", inter.variable)}>
        <UseQueryProvider>
           {children}
           <ToastContainer />
        </UseQueryProvider>
      </body>
    </html>
  );
}

