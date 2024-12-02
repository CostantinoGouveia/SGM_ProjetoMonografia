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
import { Automobilista, Funcionario } from "@/entities/interfaces"

interface IViewDataAgente {
    handleClick: () => void,
    data?: Funcionario,
    handleClickCancel?: () => void
}
export interface IAutomobilista {
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
export default function ViewDataAgenteLista({ data, handleClick, handleClickCancel }: IViewDataAgente) {
    const form = useFormContext<Funcionario>()
    return (
        <div>
            <Table className="bg-white mt-8  rounded-md">
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableCell>{data?.pessoa.nome?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Nacionalidade</TableHead>
                    <TableCell>{data?.pessoa.pais?.pais?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data de Nascimento</TableHead>
                    <TableCell>{format(data?.pessoa.dataNascimento?? "", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>BI</TableHead>
                    <TableCell >{data?.pessoa.bi.numeroBI?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data de emissâo do bi</TableHead>
                    <TableCell >{format(data?.pessoa.bi.dataEmicaoBi?? "", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data de validade do bi</TableHead>
                    <TableCell >{format(data?.pessoa.bi.dataValidacaoBi?? "", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableCell >{data?.pessoa.contacto?.email1?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Email alternativo</TableHead>
                    <TableCell >{data?.pessoa.contacto?.email2?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Telefone</TableHead>
                    <TableCell >{data?.pessoa.contacto?.contacto1?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Telefone alternativo</TableHead>
                    <TableCell >{data?.pessoa.contacto?.contacto2?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Provincia</TableHead>
                    <TableCell >{data?.pessoa.endereco?.municipio?.provincia?.provincia?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Municipio</TableHead>
                    <TableCell >{data?.pessoa.endereco?.municipio?.municipio?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Endereco</TableHead>
                    <TableCell >{data?.pessoa.endereco?.descricaoEndereco?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>NIP</TableHead>
                    <TableCell >{data?.numeroAgente?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Tipo de usuario</TableHead>
                    <TableCell >{data?.pessoa?.usuario[0]?.tipoUsuario?? ""}</TableCell>
                </TableRow>
            </Table>

                {<div className="flex justify-between mt-4"><DialogClose><Button className="bg-zinc-600 font-bold">Fechar</Button></DialogClose></div>
                }
       
        </div>
    )
}