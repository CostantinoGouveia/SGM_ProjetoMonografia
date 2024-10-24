"use client";
import { GET_PAISES } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuthentication() {
  const router = useRouter();
  const { data, isSuccess } = useQuery({
    queryKey: ['get-Pais'],
    queryFn: GET_PAISES,
  });

  // Função de verificação do token
  function verifyToken() {
    const token = window.localStorage.getItem('SGM_');
    if (!token || !isSuccess) {
      router.push('/auth/entrar');
    }
  }
  return { verifyToken };
}