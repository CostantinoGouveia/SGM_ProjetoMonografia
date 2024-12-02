"use client"
import { useFormContext } from "react-hook-form"
import { AutomobilistaType } from "../automobilstas/AutomobilistaForm"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Eye } from "lucide-react"
import { IStep } from "../automobilstas/FirstForm"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { DialogClose } from "../ui/dialog"
import { Alertaroubo, Viatura } from "@/entities/interfaces"

interface IViewDataAlerta {
    handleClick: () => void,
    data?: Alertaroubo,
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
export default function ViewDataAlertaLista({ data, handleClick, handleClickCancel }: IViewDataAlerta) {
    const form = useFormContext<Alertaroubo>()
    return (
        <div>
            <Table className="bg-white mt-8  rounded-md">
            <TableRow>
                    <TableCell className="font-bold"><span className="text-blue-600">Dados da viatura</span></TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Numero de Matricula</TableHead>
                    <TableCell>{data?.viatura?.numeroMatricula?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Marca</TableHead>
                    <TableCell>{data?.viatura?.marca?.descMarca?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Modelo</TableHead>
                    <TableCell>{data?.viatura?.modelo?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Cor</TableHead>
                    <TableCell >{data?.viatura?.corViatura?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold"><span className="text-blue-600">Dados do Alerta</span></TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Estado</TableHead>
                    <TableCell ><label className={` text-white p-1 rounded ${data?.status === "Ativo" ? "bg-green-500" : "bg-red-500"}`}>{data?.status}</label></TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data do Roubo</TableHead>
                    <TableCell >{format(data?.dataRoubo?? "", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data do Alerta</TableHead>
                    <TableCell >{format(data?.dataFeita?? "", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Hora do Alerta</TableHead>
                    <TableCell >{format(data?.horaFeita?? "", "aaa", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Tipo de Roubo</TableHead>
                    <TableCell >{data?.tiporoubo?.descTipoRoubo?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Descricão do roubo</TableHead>
                    <TableCell >{data?.descRoubo?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold"><span className="text-blue-600">Dados do Titular</span></TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Titular (nome)</TableHead>
                    <TableCell >{data?.viatura?.titulopropriedade[0]?.pessoa.nome?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Genero (Titular)</TableHead>
                    <TableCell >{data?.viatura?.titulopropriedade[0]?.pessoa.genero?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Numero do BI (Titular)</TableHead>
                    <TableCell >{data?.viatura?.titulopropriedade[0]?.pessoa.bi.numeroBI?? ""}</TableCell>
                </TableRow>
            </Table>

                {handleClickCancel && <div className="flex justify-between mt-4"> <Button onClick={()=>handleClickCancel()} variant={"outline"}>Cancelar</Button>
                    <DialogClose><Button onClick={() => handleClick()} className="bg-green-800 font-bold">Salvar</Button></DialogClose></div>
                }
       
        </div>
    )
}