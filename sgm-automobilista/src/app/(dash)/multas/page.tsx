"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GET_MULTA_BY_ID, GET_PESSOA_BY_ID } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";


export default function Aplicar() {
  const idPessoa = localStorage.getItem('SGM_USER') || '';

  const { data, isSuccess } = useQuery({
    queryKey: ["pessoa_id", idPessoa],
    queryFn: () => GET_PESSOA_BY_ID(idPessoa),
  })

  return (
    <div className="flex flex-col p-8 gap-2 text-[12px]">
      <div className="grid grid-cols-2 gap-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
            <SelectContent>
              <SelectItem value="hoje">Papo</SelectItem>
              <SelectItem value="hoje">Pendente</SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar as multas" />
            <SelectContent>
              <SelectItem value="hoje">Hoje</SelectItem>
              <SelectItem value="hoje">Essa semana</SelectItem>
              <SelectItem value="hoje">Esse mes</SelectItem>
              <SelectItem value="hoje">Esse ano</SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>

              <TableHead>
                Data de emissao
              </TableHead>
              <TableHead>
                Data de vencimento
              </TableHead>
              <TableHead>
                Nº de infracoes
              </TableHead>
              <TableHead>
                Total
              </TableHead>
              <TableHead>
                Estado
              </TableHead>
              <TableHead>
                Ação
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSuccess && data.automobilista[0].multa.map((multa: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{new Date(multa.data).toISOString().split("T")[0]}</TableCell>
                <TableCell>{new Date(multa.dataPagamento).toISOString().split("T")[0]}</TableCell>
                <TableCell>{multa.infracao.length}</TableCell>
                <TableCell>{multa.valorMulta}kz</TableCell>
                <TableCell><Badge className={`font-semibold text-white ${multa.pagamentomulta[0]?.status === "PENDENTE" ? "bg-orange-500" : multa.pagamentomulta[0]?.status === "PAGO" ? "bg-green-500" : "bg-red-500"}`}>{(multa.pagamentomulta[0]?.status === "NAO_PAGO") ? "NÃO PAGO" : multa.pagamentomulta[0]?.status}</Badge></TableCell>
                <TableCell><PagamentoMulta idMulta={multa.codMulta} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function PagamentoMulta({ idMulta }: { idMulta: string }) {
  const { data, isSuccess } = useQuery({
    queryKey: ["multa_id", idMulta],
    queryFn: () => GET_MULTA_BY_ID(idMulta),
  })

  console.log("ewewd", data);
  console.log(data?.viatura === null? "N/A" : "asdasd");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="flex gap-1">VER</Button>
      </DialogTrigger>
      <DialogContent id="cont-modal" className="max-h-96 overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle><span className="text-slate-700">Multa</span></DialogTitle>
        </DialogHeader>
        {isSuccess && (

          <div>
            <h1 className=" font-bold text-1xl text-blue-600">Detalhes da Multa</h1>
            <div className="grid grid-cols-12">
              <div className="my-2 col-span-6">
                <label htmlFor="numeroMatricula" className="block m-2 font-semibold ">Data de Aplicação</label>
                <input
                  disabled
                  type="text"
                  id="numeroMatricula"
                  name="numeroMatricula"
                  value={data.data.split("T")[0]}
                />
              </div>
              <div className="my-2 col-span-6">
                <label htmlFor="numeroMatricula" className="block m-2 font-semibold ">Aplicado a</label>
                <Badge className="p-2 bg-slate-400">  {data?.viatura === null? "Individuo" : data?.viatura.numeroMatricula} </Badge>
              </div>
            </div>

            <div className="grid grid-cols-12">

              <div className="my-2 col-span-6">
                <label htmlFor="valor" className="block m-2 font-semibold">Quantidade de Infrações</label>
                <div className="flex gap-3">
                 <Badge className="" variant="outline">  {data.infracao.length} </Badge>
                 <InfracaoLista tipoInfracao={data.infracao} />
                </div>
              </div>

              <div className="my-2 col-span-6">
                <label htmlFor="dataEmissao" className="block m-2 font-semibold">Data de Emissão</label>
                <input
                  disabled
                  type="text"
                  id="dataEmissao"
                  name="dataEmissao"
                  value={data.dataPagamento?.split("T")[0]}

                />
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="my-2 col-span-12">
                <label htmlFor="descricao" className="block m-2 font-semibold">Descrição</label>
                <textarea
                  disabled
                  id="descricao"
                  name="descricao"
                  value={data.descMulta}
                  className="w-full h-36"
                />
              </div>

            </div>

            <h2 className="font-bold text-1xl  text-blue-600">Pagamentos</h2>
            <div className="grid grid-cols-12">
              <div className="my-2 col-span-6">
                <label htmlFor="referencia" className="block m-2 font-semibold">Referência de Pagamento</label>
                <input
                  disabled
                  type="text"
                  id="referencia"
                  name="referencia"
                  value={data.pagamentomulta[0]?.referencia}
                />
              </div>

              <div className="my-2 col-span-6">
                <label htmlFor="valorPago" className="block m-2 font-semibold">Valor (Kz)</label>
                <input
                  disabled
                  type="text"
                  id="valorPago"
                  name="valorPago"
                  value={data.pagamentomulta[0]?.valorPago}
                />
              </div>
            </div>
            <div className="grid grid-cols-12">

              <div className="my-2 col-span-6">
                <label htmlFor={`dataCriacao-${idMulta}`} className="block m-2 font-semibold">Data do Pagamento</label>
                <input
                  disabled
                  type="text"
                  id={`dataCriacao-${idMulta}`}
                  name="dataCriacao"
                  value={data.pagamentomulta[0]?.dataCriacao.split("T")[0]}
                />
              </div>

              <div className="my-2 col-span-6">
                <label htmlFor="status" className="block m-2 font-semibold">Status</label>
                <Badge className={`font-semibold text-white ${data.pagamentomulta[0]?.status === "PENDENTE" ? "bg-orange-500" : data.pagamentomulta[0]?.status === "PAGO" ? "bg-green-500" : "bg-red-500"}`}>{(data.pagamentomulta[0]?.status === "NAO_PAGO") ? "NÃO PAGO" : data.pagamentomulta[0]?.status}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-12">

              <div className="my-2 col-span-6">
                <label htmlFor={`dataCriacao-${idMulta}`} className="block m-2 font-semibold">Hora do Pagamento</label>
                <input
                  disabled
                  type="text"
                  id={`dataCriacao-${idMulta}`}
                  name="dataCriacao"
                  value={data.pagamentomulta[0]?.dataCriacao.split("T")[1].split(".")[0]}
                />
              </div>

              <div className="my-2 col-span-6">
                <label htmlFor={`status-${idMulta}`} className="block m-2 font-semibold">Numero de transação</label>
                <input
                  disabled
                  type="text"
                  id={`status-${idMulta}`}
                  name="status"
                  value={data.pagamentomulta[0]?.descCodigoDeposito}
                />
              </div>
            </div>
            <h2 className="font-bold text-1xl  text-blue-600">Dados do Agente</h2>
            <div className="grid grid-cols-12">

              <div className="my-2 col-span-6">
                <label htmlFor={`dataCriacao-${idMulta}`} className="block m-2 font-semibold">Nome do Agente</label>
                <input
                  disabled
                  type="text"
                  id={`dataCriacao-${idMulta}`}
                  name="dataCriacao"
                  value={data.funcionario?.pessoa.nome}
                />
              </div>

              <div className="my-2 col-span-6">
                <label htmlFor={`status-${idMulta}`} className="block m-2 font-semibold">NIP</label>
                <input
                  disabled
                  type="text"
                  id={`status-${idMulta}`}
                  name="status"
                  value={data.funcionario?.numeroAgente}
                />
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function InfracaoLista({ tipoInfracao }: { tipoInfracao: any }) {
console.log("tipoInfracao", tipoInfracao);

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