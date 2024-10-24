"use client";

import useAuthentication from "@/app/hooks/useAuthtication";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { GET_ALERTAS_ROUBO, GET_AUTOMOBILISTA_BY_ID, GET_INFRACOES, GET_TIPOSINFRACAO, GET_VIATURA_BY_ID } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";


export default function Automobilista() {
    const router = useRouter();
    const { verifyToken } = useAuthentication();


    const { id } = useParams()
     const idValue = Array.isArray(id) ? id[0] : id;
    useEffect(() => {
        verifyToken();
    }, [id]);

    const { data, isSuccess } = useQuery({
        queryKey: ['get-viatura', idValue],
        queryFn: () => GET_VIATURA_BY_ID(idValue)
    })

    useEffect(() => {
        if (data && data.error) {
            router.push('/404')
        }
     }, [data])


 console.log(data);
    return (
        <div className="p-8">
            <div className="flex rounded-lg bg-slate-100 shadow-sm p-8 items-center gap-4">
                <Image alt="" width={104} height={124} src="/images/avatar.png" />
                <div>
                    {
                        data && !data.error && (
                            <ul>
                                <li>< span className="font-bold">Nome:</span> {data?.titulopropriedade[0]?.pessoa.nome}</li>
                                <li><span className="font-bold">Nº do Bi:</span> {data?.titulopropriedade[0]?.pessoa.bi.numeroBI}</li>
                                <li><span className="font-bold">Nº da carta:</span> {data?.titulopropriedade[0]?.pessoa.automobilista[0].cartaconducao.numeroCarta}</li>
                                <li><span className="font-bold">Telefone:</span> {data?.titulopropriedade[0]?.pessoa.contacto.contacto1}<span className="font-bold"> |</span> {data.titulopropriedade[0].pessoa.contacto.contacto2}</li>
                                <li><span className="font-bold">Email:</span> {data?.titulopropriedade[0]?.pessoa.contacto.email1} <span className="font-bold">|</span> {data.titulopropriedade[0].pessoa.contacto.email2}</li>
                            </ul>
                        )
                    }
                </div>
                <div className="">
                    <Button onClick={()=> {router.replace(`/automobilistas/${data?.titulopropriedade[0]?.pessoa.automobilista[0].codAutomobilista}/${idValue}`)}} className="bg-blue-700">Aplicar multa</Button>
                </div>
            </div>
            <h1 className="font-bold text-lg py-4">DADOS DA VIATURA</h1>
            {isSuccess && (
                <div className="">
                    <div className="grid grid-cols-12 py-3">

                        <div className="col-span-4">
                            <div className="font-bold text-2xl text-blue-800">Nº de Matricula</div>
                            <span className="font-semibold">{data.numeroMatricula}</span>
                        </div>
                        <div className="col-span-2">
                            <div className="font-bold text-2xl text-blue-800">Cor</div>
                            <span className="font-semibold">{data.corViatura}</span>
                        </div>
                        <div className="col-span-3">
                            <div className="font-bold text-2xl text-blue-800">Marca</div>
                            <span className="font-semibold">{data.marca?.descMarca}</span>
                        </div>
                        <div className="col-span-2">
                            <div className="font-bold text-2xl text-blue-800">Modelo</div>
                            <span className="font-semibold">{data.modelo}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 py-3">
                        <div className="col-span-4">
                            <div className="font-bold text-2xl text-blue-800">Lotação</div>
                            <span className="font-semibold">{data.lotacao}</span>
                        </div>
                        <div className="col-span-4">
                            <div className="font-bold text-2xl text-blue-800">Combustivel</div>
                            <span className="font-semibold">{data.conbustivel}</span>
                        </div>
                        <div className="col-span-4">
                            <div className="font-bold text-2xl text-blue-800">Nº Cilindro</div>
                            <span className="font-semibold">{data.numeroCilindro}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 py-3">
                        <div className="col-span-5">
                            <div className="font-bold text-2xl text-blue-800">Distançia dos Eixos</div>
                            <span className="font-semibold">{data.distanciaEixo}</span>
                        </div>
                        <div className="col-span-2">
                            <div className="font-bold text-2xl text-blue-800">Caixa</div>
                            <span className="font-semibold">{data.tipoCaixa}</span>
                        </div>
                        <div className="col-span-2">
                            <div className="font-bold text-2xl text-blue-800">Peso</div>
                            <span className="font-semibold">{data.peso}</span>
                        </div>
                        <div className="col-span-3">
                            <div className="font-bold text-2xl text-blue-800">Cilindarada</div>
                            <span className="font-semibold">{data.cilindrada}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-12">
                        <div className="col-span-3">
                            <div className="font-bold text-2xl text-blue-800">Tara</div>
                            <span className="font-semibold">{data.tara}</span>
                        </div>
                        <div className="col-span-3">
                            <div className="font-bold text-2xl text-blue-800">Servico</div>
                            <span className="font-semibold">{data.livrete && data?.livrete[0]?.serivicoviatura.descServico}</span>
                        </div>
                        <div className="col-span-5">
                            <div className="font-bold text-2xl text-blue-800">Medidas Pneumaticas</div>
                            <span className="font-semibold">{data.MedidasPneumaticos}</span>
                        </div>
                    </div>

                </div>

            )}
        </div>
    )
} 