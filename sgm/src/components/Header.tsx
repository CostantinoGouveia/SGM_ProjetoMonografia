"use client"
import { Bell, Menu } from "lucide-react";
import { Button } from "./ui/button";
import SheetMobile from "./SheetMobile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_NOTIFICACAO_RECLAMACAOES, GET_PESSOA_BY_ID, PUT_NOTIFICACAO_RECLAMACAO, VERIFY_MULTAS } from "@/routes";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface ISideBar {
  toogleSideBar: () => void,
}
export default function Header({ toogleSideBar }: ISideBar) {
  const idPessoa = localStorage.getItem('SGM_USER') || '';
  

  const useClient = useQueryClient();

const { mutateAsync: updateNotify } = useMutation({
  onSuccess: (data) => {
    useClient.invalidateQueries({
      queryKey: ["pessoa_id"], // chave da consulta
      exact: true, // opcional, dependendo do filtro
  });
     useClient.invalidateQueries({
      queryKey: ["get-pessoa-notify-by-id"], // chave da consulta
      exact: true, // opcional, dependendo do filtro
    });
  },
  mutationFn: PUT_NOTIFICACAO_RECLAMACAO,
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

  const { data: ver, isSuccess: isSuccessVer } = useQuery({
    queryKey: ['verify-multas'],
    queryFn: VERIFY_MULTAS,
  });
  const { data: dataPessoa, isSuccess: isSuccessPessoa } = useQuery({
    queryKey: ['get-reclamacao-notify-by-id'],
    queryFn: () => GET_NOTIFICACAO_RECLAMACAOES()
  });
  const [search, setSearch] = useState<any>();
  useEffect(() => {
    if (dataPessoa && isSuccessPessoa) {
      const notificacoesPendetes = dataPessoa.notificacoes.filter((item: any) => item.status === "pendente");
      setSearch(notificacoesPendetes);
    } else {
      setSearch([]); // Mostra todos os resultados se o termo de pesquisa estiver vazio
    }

  }, [dataPessoa]);

  console.log(dataPessoa)

  const { data, isSuccess } = useQuery({
    queryKey: ['get-pessoa-by-id', idPessoa],
    queryFn: () => GET_PESSOA_BY_ID(idPessoa)
  });
  return (
    <header className="sticky z-50 shadow-sm top-0 left-0 bg-white w-full p-1 flex justify-between pr-4 h-20 items-center">
      <Button onClick={toogleSideBar} className="p-2 max-md:hidden" variant={"ghost"}><Menu className="w-8 h-8" /></Button>
      <SheetMobile />
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger><Button variant={"ghost"}>
            <div className="relative">
              <Bell className="w-5 h-5" />
              {Array.isArray(search) && search.filter((n: any) => n.status === "pendente").length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {search.filter((n: any) => n.status === "pendente").length}
                </span>
              )}
            </div>
          </Button></DropdownMenuTrigger>
          <DropdownMenuContent className="p-4">
          {Array.isArray(search) && search.length > 0 ? search.slice().reverse().map((notificacao: any) => (
            <DropdownMenuItem className="flex items-center justify-between space-x-2" key={notificacao.codNotificacao} onClick={()=>handUpdateNotify(notificacao.codNotificacao,notificacao.status)}>
            <Link className={`flex items-center space-x-2 px-2`} href={`/reclamacoes/${String(notificacao.reclamacao.codMulta)}`} >
              <Bell className={`${notificacao.status == "pendente" ? "text-red-400" : ""} h-4 w-4`} />
              <span className="text-sm">{notificacao.mensagem}</span>
              <DropdownMenuShortcut className={`text-blue-700 text-xs`}>
                {notificacao.dataNotificacao.split("T")[1].split(".")[0]}
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          )) : <DropdownMenuItem><Link className="px-2 text-red-300" href={"/"}> Sem notificações</Link></DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>


        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"ghost"} className="flex gap-1 py-4">
              <small>{data?.nome.split(" ")[0]} {data?.nome.split(" ")[data?.nome.split(" ").length - 1]}</small>
              <Avatar>
                <AvatarImage src="https://github.com/CostantinoGouveia.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><Link className="px-2" href={"/"}>Definicoes</Link></DropdownMenuItem>
            <DropdownMenuItem><Link className="px-2" href={"/auth/iniciar-sessao"}>Sair</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>)
}