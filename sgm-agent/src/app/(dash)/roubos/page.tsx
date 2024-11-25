"use client"
import useAuthentication from "@/app/hooks/useAuthtication";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { TableBody, TableRow, Table, TableCell, TableHeader, TableHead } from "@/components/ui/table";
import { GET_ALERTAS_ROUBO, GET_NOTIFICACOES_ALERTAS_FUNCIONARIOS, PUT_NOTIFICACAO_ALERTA_FUNCIONARIO } from "@/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Badge, Bell, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function RoubosPage() {
  const router = useRouter();
  const { verifyToken } = useAuthentication();
  const useClient = useQueryClient();

  const { mutateAsync: updateNotify } = useMutation({
    onSuccess: (data) => {
      useClient.invalidateQueries({
        queryKey: ["get-reclamacao-alerta-notify"], // chave da consulta
        exact: true, // opcional, dependendo do filtro
    });
       useClient.invalidateQueries({
        queryKey: ["get-alertasroubo"], // chave da consulta
        exact: true, // opcional, dependendo do filtro
      });
    },
    mutationFn: PUT_NOTIFICACAO_ALERTA_FUNCIONARIO,
    onError: (error) => {
      toast.error('Não foi possível atualizar a notificação');
      console.log(error)
    }
  
  })
  function handUpdateNotify(id:any, status:any) {
    if (status == "pendente") {
      const dados: any = { status: "visto" }
      updateNotify({ id: id, data: dados })
    }    
  }
  useEffect(() => {
    verifyToken();
  }, [verifyToken]);
  const [items, setItems] = useState<string>('');
  const [search, setSearch] = useState<any>();

  const { data, isSuccess } = useQuery({
    queryKey: ['get-alertasroubo'],
    queryFn: GET_ALERTAS_ROUBO
  });

  useEffect(() => {
    if (data && isSuccess) {
      const viaturasComAlertasAtivos = data.filter((item: any) => item.status === "Ativo");


      if (items !== "") {
        const results = data.filter((item: any) =>
          item.viatura.numeroMatricula.toLowerCase().includes(items.toLowerCase())
        );
        setSearch(results);
      } else {
        setSearch(viaturasComAlertasAtivos); // Mostra todos os resultados se o termo de pesquisa estiver vazio
      }
    }
  }, [items, data]);
  console.log(search);
  const idPessoa = localStorage.getItem('SGM_USER') || '';
  const { data: dataPessoa, isSuccess: isSuccessPessoa } = useQuery({
    queryKey: ['get-reclamacao-alerta-notify', idPessoa],
    queryFn: () => GET_NOTIFICACOES_ALERTAS_FUNCIONARIOS(idPessoa)
  });
  const [search1, setSearch1] = useState<any>();
  useEffect(() => {
    if (dataPessoa && isSuccessPessoa) {
      const notificacoesPendetes = dataPessoa.filter((item: any) => item.status === "pendente");
      setSearch1(notificacoesPendetes);
    } else {
      setSearch1([]); // Mostra todos os resultados se o termo de pesquisa estiver vazio
    }

  }, [dataPessoa]);
  console.log("iiiiii", dataPessoa);
  return (

    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold mb-4 flex gap-2 items-center">Viaturas em Alerta <AlertTriangle className="text-red-800" /></h1>
        <span className="mb-4">
          <DropdownMenu >
            <DropdownMenuTrigger><Button variant={"ghost"}>
              <div className="relative">
                <Bell className="w-5 h-5" />
                {Array.isArray(search1) && search1.filter((n: any) => n.status === "pendente").length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {search1.filter((n: any) => n.status === "pendente").length}
                  </span>
                )}
              </div>
            </Button></DropdownMenuTrigger>
            <DropdownMenuContent className="p-4">
              {Array.isArray(search1) && search1.length > 0 ? search1.slice().reverse().map((notificacao: any) => (
                <DropdownMenuItem className="flex items-center justify-between space-x-2" key={notificacao.codNotificacao} onClick={() => {handUpdateNotify(notificacao.codNotificacao,notificacao.status)}}>
                  <Link className={`flex items-center space-x-2 px-2`} href={`/roubos/${String(notificacao.notificacaoalerta.codAlertaRoubo)}`} >
                    <Bell className={`${notificacao.status == "pendente" ? "text-red-400" : ""} h-4 w-4`} />
                    <span className="text-sm">{notificacao.notificacaoalerta.mensagem}</span>
                    <DropdownMenuShortcut className={`text-blue-700 text-xs`}>
                      {notificacao.notificacaoalerta.dataNotificacao.split("T")[1].split(".")[0]}
                    </DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              )) : <DropdownMenuItem><Link className="px-2 text-red-300" href={"/"}> Sem notificações</Link></DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </div>
      <form className="flex">
        <Input placeholder="Procurar viatura" value={items} onChange={(e) => setItems(e.target.value)} className="rounded-r-none" />
        <Button className="rounded-l-none" disabled variant={"secondary"}><Search /></Button>
      </form>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Matriula</TableHead>
              <TableHead>Proprietario</TableHead>
              <TableHead>Cor</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(search) && search.length > 0 ? search.slice().reverse().map((alertasroubo: any) => (
              <TableRow key={alertasroubo.codAlertaRoubo} onClick={() => {handUpdateNotify(alertasroubo?.notificacaoalerta[0]?.notificacaoalertafuncionario[0]?.codNotificacao,alertasroubo?.notificacaoalerta[0]?.notificacaoalertafuncionario[0]?.status)}}>
                <TableCell><Link href={`/roubos/${alertasroubo.codAlertaRoubo}`}><p>{alertasroubo.viatura.numeroMatricula}</p>  </Link></TableCell>
                <TableCell><Link href={`/roubos/${alertasroubo.codAlertaRoubo}`}><p>{alertasroubo.viatura.titulopropriedade[0].pessoa.nome}</p></Link></TableCell>
                <TableCell><Link href={`/roubos/${alertasroubo.codAlertaRoubo}`}><p>{alertasroubo.viatura.corViatura}</p></Link></TableCell>
                <TableCell><Link href={`/roubos/${alertasroubo.codAlertaRoubo}`}><p>{alertasroubo.viatura.marca.descMarca}</p></Link></TableCell>
                <TableCell><Link href={`/roubos/${alertasroubo.codAlertaRoubo}`}><p>{alertasroubo.viatura.modelo}</p></Link></TableCell>
                <TableCell><span className={`font-semibold rounded-lg p-2 text-white ${alertasroubo.status === "Cancelado" ? "bg-orange-500" : alertasroubo.status === "Ativo" ? "bg-green-500" : "bg-red-500"}`}>{alertasroubo.status}</span></TableCell>
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