"use client"

import useAuthentication from "@/app/hooks/useAuthtication";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GET_ALERTAS_ROUBO, GET_PESSOA_BY_ID } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, LucideNotebook, Notebook, NotebookIcon, NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
    const router = useRouter();
    const { verifyToken } = useAuthentication();
    useEffect(() => {
        verifyToken();
    }, [verifyToken]);
    const idPessoa = localStorage.getItem('SGM_USER') || '';

    const { data, isSuccess } = useQuery({
        queryKey: ['get-pessoa-by-id', idPessoa],
        queryFn: () => GET_PESSOA_BY_ID(idPessoa)
    });
    const { data: dataAlerta, isSuccess: successAlert } = useQuery({
        queryKey: ['get-alerta'],
        queryFn: () => GET_ALERTAS_ROUBO()
    });

    if (isSuccess) {
        console.log(data);
    }
    function isSameDay(data1: any, data2: any) {
        return (
          data1.getFullYear() === data2.getFullYear() &&
          data1.getMonth() === data2.getMonth() &&
          data1.getDate() === data2.getDate()
        );
      }
    const [res, setRes] = useState<any[]>([]);
    const [re, setRe] = useState<any[]>([]);
    useEffect(() => {
        if (dataAlerta && dataAlerta.length > 0) {
            const resss = dataAlerta?.filter((item: any) => item.status === ("Ativo"));
            setRe(resss);
        }
        if (data && data?.funcionario && data?.funcionario[0]?.multa.length > 0) {
            const results = data?.funcionario[0]?.multa.filter((item: any) =>
                (isSameDay(new Date(item.data), new Date()) && item?.pagamentomulta[0].status !== ("PAGO"))
            );
            setRes(results);
            console.log(results);
        }
    }, [data, dataAlerta]);

    return (
        <div className="px-8">
            <div className="my-4">
                <Input placeholder="Procurar..." />
            </div>
            <div className="grid grid-cols-3 gap-4 itens-center">
                <Card className=" items-center justify-center pb-2">
                    <CardHeader>
                        <CardTitle className="flex flex-col text-sm md:text-2xl text-center gap-1 items-center justify-center"><Notebook />Multa Diária</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-center text-2xl font-bold">
                        <span>{res.length}</span>
                    </CardDescription>
                </Card>
                <Card className=" items-center justify-center pb-2">
                    <CardHeader>
                        <CardTitle className="flex flex-col text-sm md:text-2xl text-center gap-1 items-center justify-center"><AlertTriangle />Alertas de Roubos</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-center text-2xl font-bold">
                        <span>{re.length}</span>
                    </CardDescription>
                </Card>
                <Card className=" items-center justify-center pb-2">
                    <CardHeader>
                        <CardTitle className="flex flex-col text-sm md:text-2xl gap-1 items-center justify-center text-center"><NotebookPen />Total de multas</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-center text-2xl font-bold">
                        <span>{data?.funcionario[0]?.multa.length}</span>
                    </CardDescription>
                </Card>
            </div>

            <div className="grid grid-cols-3 mt-8  items-end" >
                <div className="flex items-center justify-center"><img className="w-24" src="./images/logo.png" /></div>
                <div className="flex items-center justify-center"><img className="w-24" src="./images/logo.png" /></div>
                <div className="flex items-center justify-center"><img className="w-24" src="./images/logo.png" /></div>
            </div>
        </div>
    )
}