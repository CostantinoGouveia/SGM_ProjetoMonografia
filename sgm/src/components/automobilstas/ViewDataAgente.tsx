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
    data?: IAgente,
    handleClickCancel?: () => void
}
export interface IAgente {
    id?: Number,
    name: string,
    email: string,
    email_alternativo: string,
    telemovel: string,
    telemovel_alternativo?: string | undefined,
    bi: string,
    data_nascimento: Date,
    data_emissao_bi: Date,
    data_validade_bi: Date,
    numeroAgente: string,
    tipoUsuario: string,
    pais: string,
    municipio: string,
    province: string,
    endereco: string,
    sexo: string
}
export default function ViewDataAgente({ data, handleClick, handleClickCancel }: IViewDataAgente) {
    const form = useFormContext<AgenteType>()
    const { data:dataPais, isSuccess:isSuccessPais } = useQuery({
        queryKey: ['get-pais'],
        queryFn: () => GET_PAISES()
    });
    const { data: dataProv, isSuccess: isSuccessProv } = useQuery({
        queryKey: ['get-provincias'],
        queryFn: GET_PROVINCIAS
    });
    const { data: dataMuni, isSuccess: isSuccessMuni } = useQuery({
        queryKey: ['get-municipios'],
        queryFn: GET_MUNICIPIOS
    });

    return (
        <div>
            <Table className="bg-white mt-8  rounded-md">
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableCell>{data?.name?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Nacionalidade</TableHead>
                    <TableCell>{isSuccessPais && data?.pais? dataPais.find((country: any) => country.idPais === Number(data?.pais))?.pais : "Selecione a nacionalidade"}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data de Nascimento</TableHead>
                    <TableCell>{format(data?.data_nascimento?? "", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>BI</TableHead>
                    <TableCell >{data?.bi?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data de emissâo do bi</TableHead>
                    <TableCell >{format(data?.data_emissao_bi?? "", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data de validade do bi</TableHead>
                    <TableCell >{format(data?.data_validade_bi?? "", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableCell >{data?.email?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Email alternativo</TableHead>
                    <TableCell >{data?.email_alternativo?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Telefone</TableHead>
                    <TableCell >{data?.telemovel?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Telefone alternativo</TableHead>
                    <TableCell >{data?.telemovel_alternativo?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Provincia</TableHead>
                    <TableCell >{isSuccessProv && data?.province? dataProv.find((country: any) => country.idProvincia === Number(data?.province))?.provincia : ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Municipio</TableHead>
                    <TableCell >{isSuccessMuni && data?.municipio? dataMuni.find((country: any) => country.idMunicipio === Number(data?.municipio))?.municipio : ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Endereco</TableHead>
                    <TableCell >{data?.endereco?? ""}</TableCell>
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