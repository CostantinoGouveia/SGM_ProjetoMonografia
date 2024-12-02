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
import { Viatura } from "@/entities/interfaces"

interface IViewDataAutomobilista {
    handleClick: () => void,
    data?: Viatura,
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
export default function ViewDataViaturaLista({ data, handleClick, handleClickCancel }: IViewDataAutomobilista) {
    const form = useFormContext<Viatura>()
    return (
        <div>
            <Table className="bg-white mt-8  rounded-md">
                <TableRow>
                    <TableHead>Numero de Matricula</TableHead>
                    <TableCell>{data?.numeroMatricula?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Marca</TableHead>
                    <TableCell>{data?.marca?.descMarca?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Modelo</TableHead>
                    <TableCell>{data?.modelo?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Cor</TableHead>
                    <TableCell >{data?.corViatura?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Lotacao</TableHead>
                    <TableCell >{data?.lotacao?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Combustivel</TableHead>
                    <TableCell >{data?.conbustivel?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Distancia dos eixos</TableHead>
                    <TableCell >{data?.distanciaEixo?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Numero do Quadro</TableHead>
                    <TableCell >{data?.numeroQuadro?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Numero de Cilindros</TableHead>
                    <TableCell >{data?.numeroCilindro?? ""}</TableCell>
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
                    <TableCell className="font-bold"><span className="text-blue-600">Dados do Titular</span></TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Titular (nome)</TableHead>
                    <TableCell >{data?.titulopropriedade[0]?.pessoa.nome?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Genero (Titular)</TableHead>
                    <TableCell >{data?.titulopropriedade[0]?.pessoa.genero?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Numero do BI (Titular)</TableHead>
                    <TableCell >{data?.titulopropriedade[0]?.pessoa.bi.numeroBI?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data do primeiro Registro</TableHead>
                    <TableCell >{format(data?.titulopropriedade[0]?.dataPrimeiroRegistro?? "", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>

                <TableRow>
                    <TableHead>Local de emissâo</TableHead>
                    <TableCell >{format(data?.titulopropriedade[0]?.dataEmissao?? "", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>data de emissâo</TableHead>
                    <TableCell >{data?.titulopropriedade[0]?.numeroEmissao?? ""}</TableCell>
                </TableRow>
            </Table>

                {handleClickCancel && <div className="flex justify-between mt-4"> <Button onClick={()=>handleClickCancel()} variant={"outline"}>Cancelar</Button>
                    <DialogClose><Button onClick={() => handleClick()} className="bg-green-800 font-bold">Salvar</Button></DialogClose></div>
                }
       
        </div>
    )
}