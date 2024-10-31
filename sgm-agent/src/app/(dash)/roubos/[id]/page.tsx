"use client";

import useAuthentication from "@/app/hooks/useAuthtication";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { GET_ALERTA_ROUBO_BY_ID, GET_ALERTAS_ROUBO, GET_AUTOMOBILISTA_BY_ID, GET_INFRACOES, GET_TIPOSINFRACAO, GET_VIATURA_BY_ID } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";


export default function Automobilista() {
    const router = useRouter();
    const { verifyToken } = useAuthentication();
    const { id } = useParams()

    useEffect(() => {
        verifyToken();
    }, [id]);

    const { data, isSuccess } = useQuery({
        queryKey: ['get-slertaroubo_by_id', id],
        queryFn: () => GET_ALERTA_ROUBO_BY_ID(id)
    })

    useEffect(() => {
        if (data && data.error) {
            router.push('/404')
        }
    }, [data])

    return (
        <div className="p-8">
            <div className="flex rounded-lg bg-slate-100 shadow-sm p-8 items-center gap-4">
                <Image alt="" width={104} height={124} src="/images/9720027.jpg" />
                <div>
                    {isSuccess && (
                        <ul>
                            <li><span className="font-bold">Nome:</span> {data.viatura.titulopropriedade[0].pessoa.nome}</li>
                            <li><span className="font-bold">Nº do Bi:</span> {data.viatura.titulopropriedade[0].pessoa.bi.numeroBI}</li>
                            <li><span className="font-bold">Nº da carta:</span> {data.automobilista.cartaconducao.numeroCarta}</li>
                            <li><span className="font-bold">Telefone:</span> {data.viatura.titulopropriedade[0].pessoa.contacto.contacto1}<span className="font-bold"> |</span> {data.viatura.titulopropriedade[0].pessoa.contacto.contacto2}</li>
                            <li><span className="font-bold">Email:</span> {data.viatura.titulopropriedade[0].pessoa.contacto.email1} <span className="font-bold">|</span>{data.viatura.titulopropriedade[0].pessoa.contacto.email2} </li>

                        </ul>
                    )}
                </div>
            </div>
            <h1 className="font-bold text-lg py-4">DADOS DA VIATURA</h1>
            {isSuccess && (
                <div className="">
                    <div className="grid grid-cols-12 py-3">
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Nº de Matricula</div>
                            <span className="font-semibold">{data.viatura.numeroMatricula}</span>
                        </div>
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Cor</div>
                            <span className="font-semibold">{data.viatura.corViatura}</span>
                        </div>

                    </div>
                    <div className="grid grid-cols-12 py-3">
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Marca</div>
                            <span className="font-semibold">{data.viatura.marca.descMarca}</span>
                        </div>
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Modelo</div>
                            <span className="font-semibold">{data.viatura.modelo}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 py-3">
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Lotação</div>
                            <span className="font-semibold">{data.viatura.lotacao}</span>
                        </div>
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Combustivel</div>
                            <span className="font-semibold">{data.viatura.conbustivel}</span>
                        </div>

                    </div>
                    <div className="grid grid-cols-12 py-3">
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Cilindarada</div>
                            <span className="font-semibold">{data.viatura.cilindrada}</span>
                        </div>
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Nº Cilindro</div>
                            <span className="font-semibold">{data.viatura.numeroCilindro}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 py-3">
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Distançia dos Eixos</div>
                            <span className="font-semibold">{data.viatura.distanciaEixo}</span>
                        </div>
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Caixa</div>
                            <span className="font-semibold">{data.viatura.tipoCaixa}</span>
                        </div>

                    </div>
                    <div className="grid grid-cols-12 py-3">
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Medidas Pneumaticas</div>
                            <span className="font-semibold">{data.viatura.MedidasPneumaticos}</span>
                        </div>
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Peso</div>
                            <span className="font-semibold">{data.viatura.peso}</span>
                        </div>
                    </div>
                    <h1 className="font-bold text-lg py-4">DADOS DO ROUBO</h1>
                    <div className="grid grid-cols-12 py-2">
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Data do Roubo</div>
                            <span className="font-semibold">{new Date(data.dataRoubo).toISOString().split("T")[0]}</span>
                        </div>
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Data do Alerta</div>
                            <span className="font-semibold">{new Date(data.dataFeita).toISOString().split("T")[0]}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 py-2">
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Tipo de Roubo</div>
                            <span className="font-semibold">{data.tiporoubo.descTipoRoubo}</span>
                        </div>
                        <div className="col-span-6 ">
                            <div className="font-bold text-2xl text-blue-800 pb-2">Status</div>
                            <span className={`font-semibold rounded-lg p-2 text-white ${data.status === "Cancelado" ? "bg-orange-500" : data.status === "Ativo" ? "bg-green-500" : "bg-red-500"}`}>{data.status}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-12">
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Detalhes do Roubo</div>
                            <span className="font-semibold">{data.descRoubo}</span>
                        </div>
                        <div className="col-span-6">
                            <div className="font-bold text-2xl text-blue-800">Local do Roubo</div>
                            <span className="font-semibold">Provincia: {data.endereco.municipio.provincia.provincia} / Municipio: {data.endereco.municipio.municipio} / {data.endereco.descricaoEndereco}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}