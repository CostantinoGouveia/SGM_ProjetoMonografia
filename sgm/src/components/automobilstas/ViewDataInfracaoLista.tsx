"use client"
import { useFormContext } from "react-hook-form"
import { AutomobilistaType } from "./AutomobilistaForm"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Eye } from "lucide-react"
import { IStep } from "./FirstForm"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { DialogClose } from "../ui/dialog"
import { Automobilista, Funcionario, Tipoinfracao } from "@/entities/interfaces"

interface IViewDataInfracao {
    handleClick: () => void,
    data?: Tipoinfracao,
    handleClickCancel?: () => void
}
export interface IInfracao {
    id?: Number,
    descTipoInfracao: string,
    valorTipoInfracao: string,
}
export default function ViewDataAInfracaoLista({ data, handleClick, handleClickCancel }: IViewDataInfracao) {
    const form = useFormContext<Tipoinfracao>()
    return (
        <div>
            <Table className="bg-white mt-8  rounded-md">
                <TableRow>
                    <TableHead>Infração</TableHead>
                    <TableCell>{data?.descTipoInfracao?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Valor em UCF</TableHead>
                    <TableCell>{data?.valorInfracao?? ""}</TableCell>
                </TableRow>
            </Table>

                {<div className="flex justify-between mt-4"><DialogClose><Button className="bg-zinc-600 font-bold">Fechar</Button></DialogClose></div>
                }
       
        </div>
    )
}