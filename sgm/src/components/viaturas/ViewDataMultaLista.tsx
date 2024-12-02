"use client"
import { useFormContext } from "react-hook-form"
import { AutomobilistaType } from "../automobilstas/AutomobilistaForm"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Badge, Eye } from "lucide-react"
import { IStep } from "../automobilstas/FirstForm"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Multa, Viatura } from "@/entities/interfaces"
import { GET_MULTA_BY_ID } from "@/routes"
import { useQuery } from "@tanstack/react-query"

interface IViewDataMulta {
    handleClick: () => void,
    data?: Multa,
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
export default function ViewDataMultaLista({ data, handleClick, handleClickCancel }: IViewDataMulta) {
    const form = useFormContext<Multa>()
    return (
        <div>
            <h1 className="font-bold text-1xl  text-blue-600">Dados da Multa</h1>
            <Table className="bg-white mt-8  rounded-md">
                <TableRow>
                    <TableHead>Data de Aplicação</TableHead>
                    <TableCell>{format(data?.data?? "", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Aplicado a</TableHead>
                    <TableCell>{data?.viatura === null? "Individuo" : data?.viatura?.numeroMatricula?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Quantidade de Infrações</TableHead>
                    <TableCell><> <label className="p-1 rounded">  {data?.infracao.length} </label>
                    <InfracaoLista tipoInfracao={data?.infracao} /></></TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data de Emissão</TableHead>
                    <TableCell >{data?.dataPagamento == null? "": format(data?.dataPagamento??"", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Reclamação</TableHead>
                    <TableCell >{Array.isArray(data?.reclamacao) && data?.reclamacao.length > 0 ? (
                    <>
                      <label className={`font-semibold text-white p-1 rounded ${data?.reclamacao[0]?.status === "Pendente" ? "bg-orange-500" : data?.reclamacao[0]?.status === "Aceite" ? "bg-green-500" : data?.reclamacao[0]?.status === "Analise" ? "bg-blue-500" : "bg-red-500"}`}>{data?.reclamacao[0]?.status}</label>
                      <VerReclamacao idMulta={String(data?.codMulta)} />
                    </>
                  ) : (
                    data?.pagamentomulta[0].status == "PAGO" && data?.reclamacao.length > 0 ? (
                      <>
                        <label className={`font-semibold text-white p-1 rounded ${data?.reclamacao[0]?.status === "Pendente" ? "bg-orange-500" : data?.reclamacao[0]?.status === "Aceite" ? "bg-green-500" : data?.reclamacao[0]?.status === "Analise" ? "bg-blue-500" : "bg-red-500"}`}>{data?.reclamacao[0]?.status}</label>
                        <VerReclamacao idMulta={String(data?.codMulta)} />
                      </>
                    ) : (
                      <label className="font-semibold text-white bg-red-200 p-1 rounded">Sem Reclamação</label>
                    )
                  )}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableCell >{data?.descMulta?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={5}>
                        <h2 className="font-bold text-1xl  text-blue-600">Pagamentos</h2>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Referência de Pagamento</TableHead>
                    <TableCell >{data?.pagamentomulta[0]?.referencia?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Valor (Kz)</TableHead>
                    <TableCell >{data?.pagamentomulta[0]?.valorPago?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Data do Pagamento</TableHead>
                    <TableCell >{(data?.dataPagamento == undefined)? "" : format( data?.dataPagamento?? "", "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Status</TableHead>
                    <TableCell ><label className={`font-semibold text-white p-1 rounded ${data?.pagamentomulta[0]?.status === "PENDENTE" ? "bg-orange-500" : data?.pagamentomulta[0]?.status === "PAGO" ? "bg-green-500" : "bg-red-500"}`}>{(data?.pagamentomulta[0]?.status === "NAO_PAGO") ? "NÃO PAGO" : data?.pagamentomulta[0]?.status}</label></TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Hora do Pagamento</TableHead>
                    <TableCell >{(data?.dataPagamento == undefined)? "" :format(data?.dataPagamento?? "", "pp", { locale: ptBR })}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Numero de transação</TableHead>
                    <TableCell >{data?.pagamentomulta[0]?.descCodigoDeposito?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={5}>
                     <h2 className="font-bold text-1xl  text-blue-600">Dados do Agente</h2>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Nome do Agente</TableHead>
                    <TableCell >{data?.funcionario?.pessoa.nome?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Genero (Titular)</TableHead>
                    <TableCell >{data?.funcionario?.pessoa?.genero?? ""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Numero de Agente (NIP)</TableHead>
                    <TableCell >{data?.funcionario?.numeroAgente?? ""}</TableCell>
                </TableRow>
            </Table>

                {handleClickCancel && <div className="flex justify-between mt-4"> 
                    <DialogClose><Button onClick={() => handleClickCancel()} className="bg-green-800 font-bold">Cancelar</Button></DialogClose></div>
                }
       
        </div>
    )
}

function InfracaoLista({ tipoInfracao }: { tipoInfracao: any }) {

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"} className="flex gap-1">Listar</Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader className="relative">
            <DialogTitle><span className="text-slate-700">Infrações</span></DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
  
                <TableHead>
                  Nº
                </TableHead>
                <TableHead>
                  Tipo de Infração
                </TableHead>
                <TableHead>
                  Valor
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tipoInfracao?.map((tipo: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{tipo.tipoinfracao.descTipoInfracao}</TableCell>
                  <TableCell>{tipo.tipoinfracao.valorInfracao} UCF </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    )
  }

  export function VerReclamacao({ idMulta }: { idMulta: string }) {
    const { data, isSuccess } = useQuery({
      queryKey: ["multa_id2", idMulta],
      queryFn: () => GET_MULTA_BY_ID(idMulta),
    })
  
    console.log("ewewd", data);
    console.log(data?.viatura === null ? "N/A" : "asdasd");
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"} className="flex gap-1">VER <Eye className="w-5 h-5 " /></Button>
        </DialogTrigger>
        <DialogContent id="cont-modal" className="max-h-96 overflow-y-auto">
          <DialogHeader className="relative">
            <DialogTitle><span className="text-slate-700">Reclamação</span></DialogTitle>
          </DialogHeader>
          {isSuccess && (
  
            <div>
              <h1 className=" font-bold text-1xl text-blue-600">Detalhes da Reclamação</h1>
              <div className="grid grid-cols-12">
                <div className="my-2 col-span-6">
                  <label htmlFor="numeroMatricula" className="block m-2 font-semibold ">Data Feita</label>
                  <input
                    disabled
                    type="text"
                    id="numeroMatricula"
                    name="numeroMatricula"
                    value={data.reclamacao[0]?.dataReclamacao?.split("T")[0]}
                  />
                </div>
  
                <div className="my-2 col-span-6">
                  <label htmlFor="status" className="block m-2 font-semibold">Status</label>
                  <label className={`font-semibold text-white rounded p-1 ${data.reclamacao[0]?.status === "Pendente" ? "bg-orange-500" : data.reclamacao[0]?.status === "Aceite" ? "bg-green-500" : data.reclamacao[0]?.status === "Analise" ? "bg-blue-500" : "bg-red-500"}`}>{data.reclamacao[0]?.status}</label>
                </div>
              </div>
  
              <div className="grid grid-cols-12">
                <div className="my-2 col-span-12">
                  <label htmlFor="descricao" className="block m-2 font-semibold">Motivo</label>
                  <textarea
                    disabled
                    id="motivo"
                    name="motivo"
                    value={data.reclamacao[0].motivo}
                    className="w-full h-36"
                  />
                </div>
              </div>
              <h1 className=" font-bold text-1xl text-blue-600">Resposta a Reclamação</h1>
              <div className="grid grid-cols-12">
                <div className="my-2 col-span-12">
                  <label htmlFor="descricao" className="block m-2 font-semibold">Observação</label>
                  <textarea
                    disabled
                    id="motivo"
                    name="motivo"
                    value={data.reclamacao[0]?.observacao ? data.reclamacao[0]?.observacao : "Sem Observação"}
                    className="w-full h-36"
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
  }