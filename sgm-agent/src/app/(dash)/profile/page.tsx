"use client"
import useAuthentication from "@/app/hooks/useAuthtication";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { GET_PESSOA_BY_ID } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {

    const router = useRouter();
    const { verifyToken } = useAuthentication();
    
    useEffect(() => {
        verifyToken();
      }, [verifyToken]);

    const idPessoa =localStorage.getItem('SGM_USER') || '';
    const {data, isSuccess} = useQuery ({
        queryKey: ['get-pessoa-by-id', idPessoa],
        queryFn: () =>GET_PESSOA_BY_ID(idPessoa)
    });

    return (
        <div className="p-8 flex flex-col gap-2">
            <div className="flex rounded-lg bg-slate-100 shadow-sm p-8 items-center gap-4">
                <img className="w-20 rounded-l-lg" src="./images/policia.avif"/>
                <div>
                    {isSuccess && (
                        <ul>
                            <li><span className="font-bold">Nome:</span> {data.nome}</li>
                            <li><span className="font-bold"> Nº de Agente:</span> {data.funcionario[0]?.numeroAgente}</li>
                            <li><span className="font-bold">Provincia:</span> {data.endereco.municipio.provincia.provincia}</li>
                            <li><span className="font-bold">Morada:</span> {data.endereco.municipio.municipio}, {data.endereco.descricaoEndereco}</li>
                        </ul>
                    )}
                </div>
            </div>

        </div>
    )
}