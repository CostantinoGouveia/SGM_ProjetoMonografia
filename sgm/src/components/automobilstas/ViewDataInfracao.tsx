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
import { useQuery } from "@tanstack/react-query"
import { GET_MUNICIPIOS, GET_PAISES, GET_PROVINCIAS } from "@/routes"
import { AgenteType } from "./AgenteForm"
import { Tipoinfracao } from "@/entities/interfaces"
import { InfracaoType } from "./InfracaoForm"

interface IViewDataInfracao {
    handleClick: () => void,
    data?: IInfracao,
    handleClickCancel?: () => void
}
export interface IInfracao {
    id?: Number,
    descTipoInfracao: string,
    valorTipoInfracao: string,
}
export default function ViewDataInfracao({ data, handleClick, handleClickCancel }: IViewDataInfracao) {
    const form = useFormContext<InfracaoType>()
    
    return (
        <div>
            <Table className="bg-white mt-8  rounded-md">
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableCell>{data?.descTipoInfracao?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Nacionalidade</TableHead>
                    <TableCell>{data?.valorTipoInfracao}</TableCell>
                </TableRow>
            </Table>

                {handleClickCancel && <div className="flex justify-between mt-4"> <Button onClick={()=>handleClickCancel()} variant={"outline"}>Cancelar</Button>
                    <DialogClose><Button onClick={() => handleClick()} className="bg-green-800 font-bold">Salvar</Button></DialogClose></div>
                }
       
        </div>
    )
}