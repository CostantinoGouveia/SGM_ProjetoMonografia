"use client"
import { useFormContext } from "react-hook-form"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { DialogClose } from "../ui/dialog"
import { viaturaType } from "./ViaruraForm"
import { useQuery } from "@tanstack/react-query"
import { GET_AUTOMOBILISTAS, GET_MARCAS } from "@/routes"

interface IViewDataViatura {
    handleClick: () => void,
    data?: IViatura,
    handleClickCancel?: () => void
}
export interface IViatura {
    MedidasPneumaticos: string,
    lotacao: string,
    cilindrada: string,
    numeroCilindro: string,
    conbustivel: string,
    peso: string,
    tara: string,
    tipoCaixa: string,
    distanciaEixo: string,
    modelo: string,
    numeroMatricula: string,
    marca: string,
    codPessoa: Number,
    codViatura: Number,
    codServico: Number,
    dataEmissao: Date,
    dataPrimeiroRegistro: Date,
    numeroQuadro: string,
    numeroEmissao: string,
    corViatura: string
}
export default function ViewDataViatura({ data, handleClick, handleClickCancel }: IViewDataViatura) {
    const form = useFormContext<viaturaType>()
    const { data: dataAutomo, isSuccess: isSuccessAutomo } = useQuery({
        queryKey: ['get-automobilistas'],
        queryFn: GET_AUTOMOBILISTAS

    });
    const { data: dataMarca, isSuccess: isSuccessMarca } = useQuery({
        queryKey: ['get-marcas'],
        queryFn: GET_MARCAS

    });
    return (
        <div>
            <Table className="bg-white mt-8  rounded-md">
                <TableRow>
                    <TableHead>Nº de matricula</TableHead>
                    <TableCell>{data?.numeroMatricula?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Marca</TableHead>
                    <TableCell>{isSuccessMarca && data?.marca ? dataMarca.find((country: any) => country.codMarca === Number(data?.marca))?.descMarca : ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Modelo</TableHead>
                    <TableCell>{data?.modelo?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Cor</TableHead>
                    <TableCell>{data?.corViatura?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Combustivel</TableHead>
                    <TableCell >{data?.conbustivel?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>numero do Quadro</TableHead>
                    <TableCell >{data?.numeroQuadro?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>numero de Cilindro</TableHead>
                    <TableCell >{data?.numeroCilindro?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Cilindrada</TableHead>
                    <TableCell >{data?.cilindrada?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Peso</TableHead>
                    <TableCell >{data?.peso?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Tara</TableHead>
                    <TableCell >{data?.tara?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Tipo de Caixa</TableHead>
                    <TableCell >{data?.tipoCaixa?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Distancia dos Eixos</TableHead>
                    <TableCell >{data?.distanciaEixo?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Titular</TableHead>
                    <TableCell >{isSuccessAutomo && data?.codPessoa ? dataAutomo.find((country: any) => country.pessoa.codPessoa === Number(data.codPessoa))?.pessoa.nome : ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data do primeiro registro</TableHead>
                    <TableCell >{format(data?.dataPrimeiroRegistro?? "", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data Emissão</TableHead>
                    <TableCell >{format(data?.dataEmissao?? "", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Nº de Emissão</TableHead>
                    <TableCell >{data?.numeroEmissao?? ""}</TableCell>
                </TableRow>
            </Table>

                {handleClickCancel && <div className="flex justify-between mt-4"> <Button onClick={()=>handleClickCancel()} variant={"outline"}>Cancelar</Button>
                    <DialogClose><Button onClick={() => handleClick()} className="bg-green-800 font-bold">Salvar</Button></DialogClose></div>
                }
       
        </div>
    )
}