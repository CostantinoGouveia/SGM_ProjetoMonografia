"use client"
import { Bell, Menu } from "lucide-react";
import { Button } from "./ui/button";
import SheetMobile from "./SheetMobile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { GET_PESSOA_BY_ID, VERIFY_MULTAS } from "@/routes";
interface ISideBar {
  toogleSideBar: () => void,
}
export default function Header({ toogleSideBar }: ISideBar) {
  const idPessoa = localStorage.getItem('SGM_USER') || '';

  const { data: ver, isSuccess: isSuccessVer } = useQuery({
    queryKey: ['verify-multas'],
    queryFn: VERIFY_MULTAS,
});

  const { data, isSuccess } = useQuery({
      queryKey: ['get-pessoa-by-id', idPessoa],
      queryFn: () => GET_PESSOA_BY_ID(idPessoa)
  });
  console.log(data)
  return (
    <header className="sticky z-50 shadow-sm top-0 left-0 bg-white w-full p-1 flex justify-between pr-4 h-20 items-center">
      <Button onClick={toogleSideBar} className="p-2 max-md:hidden" variant={"ghost"}><Menu className="w-8 h-8" /></Button>
      <SheetMobile />
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger><Button variant={"ghost"}><Bell className="w-5 h-5" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent className="p-4">
            <DropdownMenuItem><Link className="px-2" href={"/"}> Nova multa aplicada</Link></DropdownMenuItem>
            <DropdownMenuItem><Link className="px-2 w-full" href={""}>Alerta de roubo de carro</Link></DropdownMenuItem>
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