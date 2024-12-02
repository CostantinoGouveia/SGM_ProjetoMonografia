"use client"
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Bell, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthentication from "../hooks/useAuthtication";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GET_NOTIFICACAO_AUTOMO_BY_ID, GET_NOTIFICACAO_MULTAS, GET_PESSOA_BY_ID, GET_USUARIO_BY_PESSOA_ID, PUT_NOTIFICACAO_MULTA } from "@/routes";
import { PagamentoMulta } from "./multas/page";
import { toast } from "react-toastify";
export default function Layout({ children }: { children: ReactNode }) {

  const { verifyToken } = useAuthentication();
  const idPessoa = localStorage.getItem('SGM_USER') || '';
  const [dados, setDados] = useState({});
  const { data: dataPessoa, isSuccess: isSuccessPessoa } = useQuery({
    queryKey: ['get-pessoa-notify-by-id', idPessoa],
    queryFn: () => GET_PESSOA_BY_ID(idPessoa)
  });
  const [search, setSearch] = useState<any>();
  useEffect(() => {
    if (dataPessoa && isSuccessPessoa) {
      const notificacoesPendetes = dataPessoa.automobilista[0].notificacaomulta.filter((item: any) => item.status === "pendente");
      setSearch(notificacoesPendetes);
    } else {
      setSearch(dataPessoa?.automobilista[0].notificacaomulta); // Mostra todos os resultados se o termo de pesquisa estiver vazio
    }

  }, [dataPessoa]);
  console.log(search);
  console.log("ass", dataPessoa);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);
  return (<main className="flex flex-col h-screen">
    <header className="bg-blue-950 h-16 text-white p-4 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Link href="/" className="bg-black/10 p-2 rounded-lg text-sm"> <img className="w-8" src="./images/logo.png" /></Link>
        <div className="flex gap-2">
          <Link href="/multas" className="bg-black/10 p-2 rounded-lg text-sm">Multas</Link>
          <Link href="/alertas" className="bg-black/10 p-2 rounded-lg text-sm">Alertas de roubos</Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2">
              <div className="relative">
              <Bell className="w-5 h-5" />
              {Array.isArray(search) && search.filter((n: any) => n.status === "pendente").length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {search.filter((n: any) => n.status === "pendente").length}
                </span>
              )}
            </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4">
              {Array.isArray(search) && search.length > 0 ? search.slice().reverse().map((notificacao: any) => (
                <DropdownMenuItem className="flex items-center justify-between space-x-2" key={notificacao.codNotificacao}>
                  <Link className={`flex items-center space-x-2 px-2`} href="#">
                    <PagamentoMulta idMulta={notificacao.codMulta} visual={notificacao.status} />
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
        </div>
      </div>
      <Link href="/auth/entrar"><Button variant={"ghost"} className="hover:bg-black/10 hover:text-muted"><LogOut /></Button></Link>
    </header>
    <div className="flex-1 overflow-y-auto">
      {children}
    </div>
  </main>)
}