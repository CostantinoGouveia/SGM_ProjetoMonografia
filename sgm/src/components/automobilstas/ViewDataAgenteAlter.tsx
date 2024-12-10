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

interface IViewDataAgente {
    handleClick: () => void,
    data?: IAgente1,
    handleClickCancel?: () => void
}
export interface IAgente1 {
    numeroAgente: string,
    tipoUsuario: string,
    idPessoa: string,
}
export default function ViewDataAgenteAlter({ data, handleClick, handleClickCancel }: IViewDataAgente) {
    const form = useFormContext<AgenteType>()
    const { data:dataPais, isSuccess:isSuccessPais } = useQuery({
        queryKey: ['get-pais'],
        queryFn: () => GET_PAISES()
    });
    return (
        <div>
            <Table className="bg-white mt-8  rounded-md">
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableCell>{data?.idPessoa?? ""}</TableCell>
                </TableRow>
                
                <TableRow>
                    <TableHead>NIP</TableHead>
                    <TableCell >{data?.numeroAgente?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Tipo de usuario</TableHead>
                    <TableCell >{data?.tipoUsuario?? ""}</TableCell>
                </TableRow>
            </Table>

                {handleClickCancel && <div className="flex justify-between mt-4"> <Button onClick={()=>handleClickCancel()} variant={"outline"}>Cancelar</Button>
                    <DialogClose><Button onClick={() => handleClick()} className="bg-green-800 font-bold">Salvar</Button></DialogClose></div>
                }
       
        </div>
    )
}