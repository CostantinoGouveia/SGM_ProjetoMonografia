"use client"
import useAuthentication from "@/app/hooks/useAuthtication";
import HandleDownload from "@/components/pdfMulta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectValue,SelectTrigger } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GET_MULTA_BY_ID, GET_PESSOA_BY_ID } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Aplicar() {
  const router = useRouter();
  const [itemsipu, setItemsInp] = useState<string>('');
  const [searchIp, setSearchIP] = useState<any[]>([]);
    const { verifyToken } = useAuthentication();
    useEffect(() => {
        verifyToken();
      }, []);

      const [items, setItems] = useState<string>('');
     // const [items1, setItems1] = useState<string>('');
   const [search, setSearch] = useState<any[]>([]);
   
 const idPessoa =localStorage.getItem('SGM_USER') || '';
  const {data, isSuccess} = useQuery ({
    queryKey: ['get-pessoa-by-id', idPessoa],
    queryFn: () =>GET_PESSOA_BY_ID(idPessoa)
});



useEffect(() => {
  if (data && data.funcionario && data.funcionario.length > 0) {
    if (items !== "" && items !== " ") {
      const results = data.funcionario[0].multa.filter((item: any) =>
        (item?.pagamentomulta[0]?.status.toLowerCase() == (items.toLowerCase()))
      );
      setSearch(results);
    } else {
      
      setSearch(data.funcionario[0].multa); // Mostra todos os resultados se o termo de pesquisa estiver vazio
    }
  } else {
    setSearch([]); // Se não houver dados, define search como array vazio
}
}, [items, data]);

useEffect(() => {
  if (Array.isArray(search) && search.length > 0 && itemsipu !== "" && itemsipu !== " ") {
    const results = search.filter((item) =>
      item.automobilista.pessoa.nome.toLowerCase().includes(itemsipu.toLowerCase())
    );
    setSearchIP(results);
  } else {
    setSearchIP(search); // Mostra todos os resultados se o termo de pesquisa estiver vazio
  }
}, [search, itemsipu]);

    return(
        <div className="flex flex-col p-8 gap-2">
            <div className="grid grid-cols-2 gap-4">
            <Select  onValueChange={(e) => setItems(e)} >
             <SelectTrigger>
               <SelectValue placeholder="Estado" />
               <SelectContent>
                 <SelectItem value=" " >selecione</SelectItem>
                 <SelectItem value="PAGO">Pago</SelectItem>
                 <SelectItem value="PENDENTE">Pendente</SelectItem>
                 <SelectItem value="NAO_PAGO">Não paga</SelectItem>
               </SelectContent>
             </SelectTrigger>
           </Select>
           <form className="flex">
                <Input placeholder="Procurar pelo nome automobilista" value={itemsipu} onChange={(e) => setItemsInp(e.target.value)} className="rounded-r-none" />
                <Button className="rounded-l-none" disabled variant={"secondary"}><Search /></Button>
            </form>
            </div>
           <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>
                              Data
                            </TableHead>
                            <TableHead>
                              Nº de infracoes
                            </TableHead>
                            <TableHead>
                              Total
                            </TableHead>
                            <TableHead>
                              Situção
                            </TableHead>
                            <TableHead>
                              Estado
                            </TableHead>
                            <TableHead>
                              Acção
                            </TableHead>
                            <TableHead>
                              Recibo
                            </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                          { Array.isArray(searchIp) && searchIp.length > 0? searchIp.slice().reverse().map((multas: any) => (
                            <TableRow key={multas.codMulta}>
                                <TableCell>{multas.automobilista.pessoa.nome}</TableCell>
                                <TableCell>{new Date(multas.data).toISOString().split("T")[0]}</TableCell>
                                <TableCell>{multas.infracao.length}</TableCell>
                                <TableCell>{multas.valorMulta} kz</TableCell>
                                <TableCell>{multas.statusTribunal == true? "R/Tribunal":""}</TableCell>
                                <TableCell><Badge className={ `${multas.pagamentomulta[0]?.status === "PENDENTE"? "bg-orange-500": multas.pagamentomulta[0]?.status === "PAGO"? "bg-green-500" :"bg-red-500"}`}>{(multas.pagamentomulta[0]?.status === "Nao Pago")? "N/PAGO": multas.pagamentomulta[0]?.status}</Badge></TableCell>
                                <TableCell><PagamentoMulta idMulta={multas.codMulta} /></TableCell>
                                <TableCell ><HandleDownload id={multas.codMulta}></HandleDownload> </TableCell>
                            </TableRow>
                          )):   
                            <TableRow>
                              <TableCell colSpan={5} className="items-center text-center text-red-500">
                                Nenhum resultado encontrado
                              </TableCell>
                              </TableRow>
                          }                    
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="flex gap-1">VER</Button>
      </DialogTrigger>
      <DialogContent id="cont-modal" className="max-h-lvh overflow-y-auto">
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
                  value={new Date(data.data)?.toISOString().split("T")[0]}
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