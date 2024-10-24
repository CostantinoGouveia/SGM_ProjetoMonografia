"use client";

import useAuthentication from "@/app/hooks/useAuthtication";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { GET_ALERTAS_ROUBO, GET_AUTOMOBILISTA_BY_ID, GET_INFRACOES, GET_PESSOA_BY_ID, GET_TIPOSINFRACAO, POST_MULTA } from "@/routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Badge } from "lucide-react";
import { getEdgePolyfilledModules } from "next/dist/build/webpack/plugins/middleware-plugin";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function Automobilista() {
    const router = useRouter();
    const { verifyToken } = useAuthentication();
         

    const [infracao, setInfracao] = useState<any[]>([])
    const [Total, setTotal] = useState<number>(0)
    const [descricao, setDescricao] = useState<string>('')
    const [confirmed, setConfirmed] = useState(false);
    const {id, autoId} =  useParams()
  
    useEffect(() => {
        verifyToken();
    }, [verifyToken]);
    
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
      setConfirmed(true);
      submit();
      toast.dismiss(); // Fecha o toast
    };
  
    const cancelAction = () => {
      toast.dismiss(); // Fecha o toast sem tomar ação
      toast.error("Ação cancelada.");
    };
  
 
    const {mutateAsync: createMulta} = useMutation({
        onSuccess(data) {
            toast.success('Multa aplicada com sucesso')
            refetch()
            limpa()
            
        },
        mutationFn: POST_MULTA,
        onError(error) {
            toast.error('Não foi possível aplicar a multa')
            console.log(error)
        }
        
    })
    function limpa() {
        limpaCheck()
        setInfracao([])
        setTotal(0)
        setDescricao('')
        
    }

    const handleDownload = async () => {
      const response = await fetch('/api/gerar-pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'exemplo.pdf');
      document.body.appendChild(link);
      link.click();
     // link.parentNode.removeChild(link);

    };
function submit() {
    handleDownload()
    const data = {
        codAutomobilista: id,
        descricao,
        codViatura: autoId,
        valorMulta: Total,
        codFuncionario: dataPessoa.funcionario[0].codFuncionario,
        infracoes: infracao
    }
    if (descricao === '' || Total === 0) {
        toast.error('Preencha todos os campos')
        return
    }
    else {
        createMulta(data)
    }
}

function limpaCheck() {
    setChecks([])
}

function checkedValue(params:boolean | string, id: string, valor: number) {
    if (params) {
        setChecks((state) => [...state, id])
        infracao.push({codTipoInfracao: id})
        setInfracao(infracao)
        setTotal((Total + (valor * 88)))
    }else {
        const newChecks = checks.filter((item) => item !== id)
        setChecks(newChecks)
        const newInfracao = infracao.filter((item) => item.codTipoInfracao !== id)
        setInfracao(newInfracao)
        setTotal(Total - (valor * 88))
    }
}

const[checks, setChecks] = useState<any[]>([])

    const idPessoa =localStorage.getItem('SGM_USER') || '';
    const {data : dataPessoa, isSuccess: isSuccessPessoa} = useQuery ({
    queryKey: ['get-pessoa-by-id', idPessoa],
    queryFn: () =>GET_PESSOA_BY_ID(idPessoa)
    });

    const {data, isSuccess, refetch} = useQuery({
        queryKey: ['get-automobilista', id],
        queryFn: () => GET_AUTOMOBILISTA_BY_ID(id)
    })
    
    const {data: dataInfraca, isSuccess: isSuccessInfracoes} = useQuery({
        queryKey: ['get-infracoes'],
        queryFn: GET_TIPOSINFRACAO
    })

    useEffect(() => {
        if (data && data.error) {
            router.push('/404')
        }
     }, [data])

    return (
        <div className="p-8">
            <div className="flex rounded-lg bg-slate-100 shadow-sm p-8 items-center gap-4">
                <Image alt="" width={104} height={124} src="/images/9720027.jpg" />
                <div>
                    {isSuccess && (
                        <ul>
                            <li><span className="font-bold">Nome:</span> {data.pessoa?.nome}</li>
                            <li><span className="font-bold">Nº do Bi:</span> {data.pessoa?.bi.numeroBI}</li>
                            <li><span className="font-bold">Nº da carta:</span> {data.cartaconducao?.numeroCarta}</li>
                            <li><span className="font-bold">Telefone:</span> {data.pessoa?.contacto.contacto1}<span className="font-bold"> |</span> {data.pessoa?.contacto.contacto2}</li>
                            <li><span className="font-bold">Email:</span> {data.pessoa?.contacto.email1} <span className="font-bold">|</span> {data.pessoa?.contacto.email2}</li>
                        </ul>
                    )}
                </div>
            </div>
            <div>
                <h1 className="mb-4 text-lg font-bold">Aplicar multa</h1>
                <div className="flex flex-col gap-1 max-h-32 overflow-y-auto">

                    {isSuccessInfracoes && dataInfraca.map((tipoinfracao: any, index: number) => (
                        <div key={index} className="flex gap-2 items-center" >
                            <Checkbox checked={checks.includes(tipoinfracao.codTipoInfracao)}   onCheckedChange={(e) => checkedValue(e, tipoinfracao.codTipoInfracao, Number(tipoinfracao.valorInfracao))} id={`multa-${index}`} />
                            <label htmlFor={`multa-${index}`}>{tipoinfracao.descTipoInfracao}</label>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-1 mt-6 mb-4">
                    <p>Descrição:</p>
                    <Textarea value={descricao} onChange={(e)=>{setDescricao(e.target.value)}} className="w-full" placeholder="Descreve" />
                </div>
                <div className="flex flex-col gap-2">
                    <h1>Total a pagar: {Total},00kz</h1>
                    <Button onClick={handleAction}>Aplicar</Button>    
                </div>
            </div>

            <div className="mt-8">
                <h1 className="font-bold text-lg">Outras multas</h1>
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>
                              Data
                            </TableHead>
                            <TableHead>
                              Nº de infracoes
                            </TableHead>
                            <TableHead>
                              Estado da Multa
                            </TableHead>
                            <TableHead>
                              Total
                            </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isSuccess && data.multa.map((multa:any, index:number) => (
                                <TableRow key={index}>
                                    <TableCell>{new Date(multa.data).toISOString().split("T")[0]}</TableCell>
                                    <TableCell>{multa.infracao.length}</TableCell>
                                    <TableCell className="flex justify-center"> <span className={`p-2 rounded-lg font-semibold text-white ${multa.pagamentomulta[0]?.status  === "PENDENTE"? "bg-orange-500": multa.pagamentomulta[0]?.status  === "PAGO"? "bg-green-500" :"bg-red-500"}`}>{(multa.pagamentomulta[0]?.status  === "NAO_PAGO")? "NÃO PAGO": multa.pagamentomulta[0]?.status}</span></TableCell>
                                    <TableCell >{multa.valorMulta}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}