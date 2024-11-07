"use client"
import useAuthentication from "@/app/hooks/useAuthtication";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GET_PESSOA_BY_ID } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
    const idPessoa = localStorage.getItem('SGM_USER') || '';
    const { verifyToken } = useAuthentication();
    
    useEffect(() => {
        verifyToken();
      }, [verifyToken]);

    const {data, isSuccess} = useQuery ({
      queryKey: ['get-pessoa-by-id', idPessoa],
      queryFn: () =>GET_PESSOA_BY_ID(idPessoa)
  });

  if (isSuccess) {
      console.log(data);
    }
    const [res, setRes] = useState<any[]>([]);
  const [re, setRe] = useState<any[]>([]);
  useEffect(() => {
            if (data && data.titulopropriedade && data.titulopropriedade.length > 0) {
        const results = data?.titulopropriedade.filter((item: any) =>
            (item.viatura.alertaroubo.some((item: any) => item.status === ("Ativo")))
        );
        setRe(results);
    }
  if (data && data.automobilista && data.automobilista.length > 0) {
    const results = data?.automobilista[0]?.multa.filter((item: any) =>
      (item?.pagamentomulta[0]?.status === ("PENDENTE") || item?.pagamentomulta[0]?.status === ("NAO PAGO"))
    );
    setRes(results);
    }
},[data]);


    return (
        <div className="px-8">
            <div className="my-4">
            <div className="flex rounded-lg bg-slate-100 shadow-sm p-8 items-center gap-4">
                <img className="w-20 rounded-3xl" src="/images/9720027.jpg"/>
                <div>
                    {isSuccess && (
                        <ul>
                            <li><span className="font-bold">Nome:</span> {data.nome}</li>
                            <li><span className="font-bold">Nº do Bi:</span> {data.bi.numeroBI}</li>
                            <li><span className="font-bold">Nº da carta:</span> {data?.automobilista[0]?.cartaconducao.numeroCarta}</li>
                            <li><span className="font-bold">Telefone:</span> {data.contacto.contacto1}<span className="font-bold"> |</span> {data.contacto?.contacto2}</li>
                            <li><span className="font-bold">Email:</span> {data.contacto.email1} <span className="font-bold">|</span> {data.contacto?.email2}</li>
                        </ul>
                    )}
                </div>
            </div>
            </div>
            <div className="grid grid-cols-2 gap-4 itens-center">
                <Card className=" items-center justify-center pb-2">
                    <CardHeader>
                        <CardTitle className="flex flex-col text-sm md:text-2xl text-center gap-1 items-center justify-center"><AlertTriangle />Alertas Emitidos</CardTitle>
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
                        <span>{res.length}</span>
                    </CardDescription>
                </Card>
            </div>

            <div className="grid grid-cols-2 mt-8  items-end" >
                <div className="flex items-center justify-center"><img className="w-24" src="./images/logo.png"/></div>
                <div className="flex items-center justify-center"><img className="w-24" src="./images/logo.png"/></div>
            </div>
        </div>
    )
}