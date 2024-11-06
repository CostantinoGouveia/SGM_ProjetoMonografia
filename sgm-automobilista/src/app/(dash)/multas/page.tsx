"use client"
import HandleDownload from "@/components/pdfMulta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GET_MULTA_BY_ID, GET_PESSOA_BY_ID, GET_RECLAMACAO_BY_ID, POST_RECLAMACAO } from "@/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Aplicar() {
  const idPessoa = localStorage.getItem('SGM_USER') || '';

  const { data, isSuccess } = useQuery({
    queryKey: ["pessoa_id", idPessoa],
    queryFn: () => GET_PESSOA_BY_ID(idPessoa),
  })

  const [items, setItems] = useState<string>('');
  // const [items1, setItems1] = useState<string>('');
  const [search, setSearch] = useState<any[]>([]);
  useEffect(() => {
    if (data && data.automobilista && data.automobilista.length > 0) {
      if (items !== "" && items !== " ") {
        const results = data?.automobilista[0]?.multa.filter((item: any) =>
          (item?.pagamentomulta[0]?.status.toLowerCase() == (items.toLowerCase()))
        );
        setSearch(results);
      } else {

        // console.log("fre",data);
        setSearch(data.automobilista[0].multa); // Mostra todos os resultados se o termo de pesquisa estiver vazio
      }
    } else {
      setSearch([]); // Se não houver dados, define search como array vazio
    }
  }, [items, data]);

  return (
    <div className="flex flex-col p-8 gap-2 text-[12px]">
      <div className="grid grid-cols-2 gap-4">
        <Select onValueChange={(e) => setItems(e)} >
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
                Situação
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
              <TableHead>
                Recibo
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(search) && search.length > 0 ? search.map((multa: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{new Date(multa.data).toISOString().split("T")[0]}</TableCell>
                <TableCell>{new Date(multa.dataPagamento).toISOString().split("T")[0]}</TableCell>
                <TableCell>{multa.statusTribunal == true ? "R/Tribunal" : ""}</TableCell>
                <TableCell>{multa.valorMulta}kz</TableCell>
                <TableCell><Badge className={`font-semibold text-white ${multa.pagamentomulta[0]?.status === "PENDENTE" ? "bg-orange-500" : multa.pagamentomulta[0]?.status === "PAGO" ? "bg-green-500" : "bg-red-500"}`}>{(multa.pagamentomulta[0]?.status === "Nao Pago") ? "N/Pago" : multa.pagamentomulta[0]?.status}</Badge></TableCell>
                <TableCell><PagamentoMulta idMulta={multa.codMulta} /></TableCell>
                <TableCell ><HandleDownload id={multa.codMulta}></HandleDownload> </TableCell>
              </TableRow>
            )) :
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

  console.log("ewewd", data);
  console.log(data?.viatura === null ? "N/A" : "asdasd");
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
                  value={new Date(data.data).toISOString().split("T")[0]}
                />
              </div>
              <div className="my-2 col-span-6">
                <label htmlFor="numeroMatricula" className="block m-2 font-semibold ">Aplicado a</label>
                <Badge className="p-2 bg-slate-400">  {data?.viatura === null ? "Individuo" : data?.viatura.numeroMatricula} </Badge>
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
              <div className="my-2 col-span-7">
                <label htmlFor="valor" className="block m-2 font-semibold">Reclamação</label>
                <div className="flex gap-3">
                  {data.reclamacao.length > 0 ? (
                    <>
                      <Badge className={`font-semibold text-white ${data.reclamacao[0]?.status === "Pendente" ? "bg-orange-500" : data.reclamacao[0]?.status === "Aceite" ? "bg-green-500" : data.reclamacao[0]?.status === "Analise" ? "bg-blue-500" : "bg-red-500"}`}>{data.reclamacao[0]?.status}</Badge>
                      <VerReclamacao idMulta={idMulta} />
                    </>
                  ) : (
                    data.pagamentomulta[0].status == "PAGO" && data.reclamacao.length > 0 ? (
                      <>
                        <Badge className={`font-semibold text-white ${data.reclamacao[0]?.status === "Pendente" ? "bg-orange-500" : data.reclamacao[0]?.status === "Aceite" ? "bg-green-500" : data.reclamacao[0]?.status === "Analise" ? "bg-blue-500" : "bg-red-500"}`}>{data.reclamacao[0]?.status}</Badge>
                        <VerReclamacao idMulta={idMulta} />
                      </>
                    ) : data.pagamentomulta[0].status != "PAGO" && data.reclamacao.length == 0 ? (
                      (
                        <CriarReclama multa={data}/>)
                    ) : (
                      <Badge className="font-semibold text-white bg-red-200">Sem Reclamação</Badge>
                    )
                  )}</div>
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

function VerReclamacao({ idMulta }: { idMulta: string }) {
  const { data, isSuccess } = useQuery({
    queryKey: ["multa_id2", idMulta],
    queryFn: () => GET_MULTA_BY_ID(idMulta),
  })

  console.log("ewewd", data);
  console.log(data?.viatura === null ? "N/A" : "asdasd");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="flex gap-1">VER</Button>
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
                <Badge className={`font-semibold text-white ${data.reclamacao[0]?.status === "Pendente" ? "bg-orange-500" : data.reclamacao[0]?.status === "Aceite" ? "bg-green-500" : data.reclamacao[0]?.status === "Analise" ? "bg-blue-500" : "bg-red-500"}`}>{data.reclamacao[0]?.status}</Badge>
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

function CriarReclama({ multa }: { multa: any }) {
  console.log(multa);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="bg-blue-600 text-white flex gap-1">Fazer Reclamação</Button>
      </DialogTrigger>
      <DialogContent id="cont-modal" className="max-h-96 overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle><span className="text-slate-700">Fazer Reclamação</span></DialogTitle>
        </DialogHeader>
        <CadastroReclamacao multa={multa} />
      </DialogContent>
    </Dialog>
  )
}
export function CadastroReclamacao({ multa }: { multa: any }) {

  const useClient = useQueryClient();
  console.log("trtgrtgr", multa)

  const [control, setControl] = useState(false)
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    motivo: "",
  });

  // Função para atualizar o estado do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { mutateAsync: createReclama } = useMutation({
    onSuccess(data) {
      useClient.invalidateQueries({
        queryKey: ["multa_id"], // chave da consulta
        exact: true, // opcional, dependendo do filtro
      });
      toast.success('Reclamacao feita com sucesso')
    },
    mutationFn: POST_RECLAMACAO,
    onError(error) {
      toast.error('Não foi possível fazer reclamacao')
      console.log(error)
    }

  })

  const { mutateAsync: verifyReclam } = useMutation({
    onSuccess(data) {
      console.log("reclamacao", data)
      const reclam = {
        codMulta: multa.codMulta,
        motivo: formData.motivo,
      }

      const reclamacaoAtivo = data?.reclamacao.some((item: any) => item.codMulta === multa.codMulta);
      if (reclamacaoAtivo) {
        toast.error('já tem uma reclamacao em andamento')
      } else {
        createReclama(reclam)
        setFormData({
          motivo: "",
        })
      }
    },
    mutationFn: GET_MULTA_BY_ID,
    onError(error) {
      toast.error('Não foi possível verificar a reclamacao')
      console.log(error)
    }
  })

  const handleAction = () => {
    // Exibe o toast de confirmação
    toast.info(
      <div>
        <p>Tem certeza que deseja confirmar a ação?</p>
        <button
          onClick={confirmAction}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Sim
        </button>
        <button
          onClick={cancelAction}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Não
        </button>
      </div>,
      { autoClose: false } // Mantém o toast até que uma ação seja tomada
    );
  };

  const confirmAction = () => {

    verifyReclam(multa.codMulta)
    //createAlert(data)
    setControl(true)
    toast.dismiss(); // Fecha o toast
  };

  const cancelAction = () => {
    setControl(true)
    toast.dismiss(); // Fecha o toast sem tomar ação
    toast.error("Ação cancelada.");
  };



  // Função para enviar os dados para a API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!control) {
      handleAction()
    }
    setControl(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <label htmlFor="motivo">Motivo / Descriçao</label>
          <textarea
            id="motivo"
            name="motivo"
            value={formData.motivo}
            onChange={(e) => handleChange(e)}
            required
            className="border p-2 w-full"
          ></textarea>
        </div>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Enviar Reclamação
      </button>
      < ToastContainer/>
    </form>
  );
}