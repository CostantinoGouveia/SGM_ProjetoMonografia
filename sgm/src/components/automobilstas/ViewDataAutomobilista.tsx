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

interface IViewDataAutomobilista {
    handleClick: () => void,
    data?: IAutomobilista,
    handleClickCancel?: () => void
}
interface IAutomobilista {
    id?: Number,
    name: string,
    email: string,
    email_alternativo: string,
    telemovel: string,
    telemovel_alternativo: string,
    bi: string,
    data_nascimento: Date,
    data_emissao_bi: Date,
    data_validade_bi: Date,
    data_validade_carta: Date,
    data_emissao_carta_conducao: Date,
    data_primeira_emissao_carta: Date,
    local_emissao: string,
    numero_carta: string,
    numero_via: string,
    pais: string,
    municipio: string,
    province: string,
    endereco: string,
    categoria: string,
    sexo: string
}
export default function ViewDataAutomobilista({ data, handleClick, handleClickCancel }: IViewDataAutomobilista) {
    const form = useFormContext<AutomobilistaType>()
    return (
        <div>
            <Table className="bg-white mt-8  rounded-md">
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableCell>{data!.name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Nacionalidade</TableHead>
                    <TableCell>{data?.pais}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data de Nascimento</TableHead>
                    <TableCell>{format(data!.data_nascimento, "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>BI</TableHead>
                    <TableCell >{data?.bi}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data de emissâo do bi</TableHead>
                    <TableCell >{format(data!.data_emissao_bi, "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data de validade do bi</TableHead>
                    <TableCell >{format(data!.data_validade_bi, "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableCell >{data?.email}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Email alternativo</TableHead>
                    <TableCell >{data?.email_alternativo}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Telefone</TableHead>
                    <TableCell >{data?.telemovel}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Telefone alternativo</TableHead>
                    <TableCell >{data?.telemovel_alternativo}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Provincia</TableHead>
                    <TableCell >{data?.province}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Municipio</TableHead>
                    <TableCell >{data?.municipio}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Endereco</TableHead>
                    <TableCell >{data?.endereco}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>N da carta</TableHead>
                    <TableCell >{data?.numero_carta}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>N da via</TableHead>
                    <TableCell >{data?.numero_via}</TableCell>
                </TableRow>

                <TableRow>
                    <TableHead>Local de emissâo</TableHead>
                    <TableCell >{data?.local_emissao}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>data de emissâo</TableHead>
                    <TableCell >{format(data!.data_emissao_carta_conducao, "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>data de validade</TableHead>
                    <TableCell >{format(data!.data_validade_carta, "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Categoria</TableHead>
                    <TableCell >{data?.categoria}</TableCell>
                </TableRow>
            </Table>

                {handleClickCancel && <div className="flex justify-between mt-4"> <Button onClick={()=>handleClickCancel()} variant={"outline"}>Cancelar</Button>
                    <DialogClose><Button onClick={() => handleClick()} className="bg-green-800 font-bold">Salvar</Button></DialogClose></div>
                }
       
        </div>
    )
}