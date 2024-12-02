"use client"
import { GET_PESSOA_BY_ID } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { BookText, Car, Caravan, HelpCircle, LucideHome, PanelBottom, Trees, TriangleAlert, UserCircle2, UserPlus, UserRound, UserRoundPlus } from "lucide-react";
import Link from "next/link";

export default function Sidebar({isSideBarOpen} : {isSideBarOpen:boolean}) {
    const idPessoa = localStorage.getItem('SGM_USER') || '';
    const { data, isSuccess } = useQuery({
        queryKey: ['get-pessoa-by-id', idPessoa],
        queryFn: () => GET_PESSOA_BY_ID(idPessoa)
      });
      console.log("datapssoa", data);
      
    return (
        <div className={`shadow-lg sticky top-0 left-0 flex flex-col bg-white min-h-screen transition-all max-md:hidden text-lg overflow-hidden ${!isSideBarOpen ? "w-0 opacity-0" : "w-96 opacity-1"}`}>
            <div className="flex flex-col ">
                <div className="border-b flex gap-1 font-extrabold border-zinc-400/20 h-20 items-center pl-2">
                    <Car className="font-extrabold"/>
                    <span>SGM</span>
                </div>
                <div className=" sticky top-0 left-0">
                    <ul className="flex flex-col px-2 w-full text-nowrap text-ellipsis whitespace-nowrap mt-2 ">
                        <Link href="/" className=" p-2 text-slate-700 hover:bg-foreground/90 transition-all hover:text-muted rounded-md"><li className="flex items-center gap-1 "><LucideHome className="w-4 h-4"/>Inicio</li></Link>
                        <Link href="/automobilistas" className=" p-2 text-slate-700 hover:bg-foreground/90 transition-all hover:text-muted rounded-md"><li className="flex items-center gap-1 "><UserRoundPlus className="w-4 h-4"/>Automobilistas</li></Link>
                        <Link href="/viaturas" className=" p-2 text-slate-700 hover:bg-foreground/90 transition-all hover:text-muted rounded-md"><li className="flex items-center gap-1 "><Caravan className="w-4 h-4"/>Viaturas</li></Link>
                        <Link href="/multas" className=" p-2 text-slate-700 hover:bg-foreground/90 transition-all hover:text-muted rounded-md"><li className="flex items-center gap-1 "><BookText className="w-4 h-4"/>Multas</li></Link>
                       {isSuccess && data.usuario[0].tipoUsuario == "Admin" && ( <Link href="/reclamacoes" className=" p-2 text-slate-700 hover:bg-foreground/90 transition-all hover:text-muted rounded-md"><li className="flex items-center gap-1 "><HelpCircle className="w-4 h-4"/>Reclamações</li></Link>)}
                        <Link href="/alertas" className=" p-2 text-slate-700 hover:bg-foreground/90 transition-all hover:text-muted rounded-md"><li className="flex items-center gap-1 "><TriangleAlert className="w-4 h-4"/>Alertas</li></Link>
                        {isSuccess && data.usuario[0].tipoUsuario == "Admin" && ( <Link href="/agentes" className=" p-2 text-slate-700 hover:bg-foreground/90 transition-all hover:text-muted rounded-md"><li className="flex items-center gap-1 "><UserPlus className="w-4 h-4"/>Agentes</li></Link>)}
                        {isSuccess && data.usuario[0].tipoUsuario == "Admin" && ( <Link href="/infracao" className=" p-2 text-slate-700 hover:bg-foreground/90 transition-all hover:text-muted rounded-md"><li className="flex items-center gap-1 "><UserPlus className="w-4 h-4"/>Infrações</li></Link>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}