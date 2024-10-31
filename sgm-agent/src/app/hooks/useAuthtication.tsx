"use client";
import { GET_PAISES } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuthentication() {
  const router = useRouter();


  // Função de verificação do token
  function verifyToken() {
    const token = window.localStorage.getItem('SGM_');
    if (!token) {
      router.push('/auth/entrar');
    }
  }
  return { verifyToken };
}