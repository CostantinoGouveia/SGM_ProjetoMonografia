"use client"
import "react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { BookText, Car, HelpCircle, Home, Menu, Package, PanelBottom, TriangleAlert, UserPlus, UserRoundPlus } from "lucide-react"
import Link from "next/link"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { GET_PESSOA_BY_ID } from "@/routes"
import { useQuery } from "@tanstack/react-query"
export default function SheetMobile()
{
    const idPessoa = localStorage.getItem('SGM_USER') || '';
    const { data, isSuccess } = useQuery({
        queryKey: ['get-pessoa-by-id', idPessoa],
        queryFn: () => GET_PESSOA_BY_ID(idPessoa)
      });
      console.log("datapssoa1", data);
    return(
        <Sheet>
            <SheetTrigger asChild aria-description="adas" aria-describedby="dasd">
                <Button className="md:hidden" variant={"ghost"}><Menu className="w-5 h-5"/></Button>
            </SheetTrigger>
            <SheetContent side={"left"} aria-describedby="dasd">
                <nav className="grid gap-6 text-lg font-medium">
                    <div className="flex items-center gap-2">
                        <Link href="#" className="flex items-center justify-center w-10 h-10 bg-primary rounded-full text-lg"><Car className="h-5 w-5 text-white"/></Link>
                        <h1>SGM</h1>
                    </div>
                    <Link href="/" className="flex items-center gap-4 text-muted-foreground hover:text-foreground"><Home className="h-5 w-5 transition-all"/>Inicio</Link>
                    <Link href="/automobilistas" className="flex items-center gap-4 text-muted-foreground hover:text-foreground"><UserRoundPlus className="h-5 w-5 transition-all"/>Automobilistas</Link>
                    <Link href="/viaturas" className="flex items-center gap-4 text-muted-foreground hover:text-foreground"><UserPlus className="h-5 w-5 transition-all"/>Viaturas</Link>
                    <Link href="/multas" className="flex items-center gap-4 text-muted-foreground hover:text-foreground"><BookText className="h-5 w-5 transition-all"/>Multas</Link>
                    {isSuccess && data.usuario[0].tipoUsuario == "Admin" && (  <Link href="/reclamacoes" className="flex items-center gap-4 text-muted-foreground hover:text-foreground"><HelpCircle className="h-5 w-5 transition-all"/>Reclamações</Link>  )}  
                    <Link href="/alertas" className="flex items-center gap-4 text-muted-foreground hover:text-foreground"><TriangleAlert className="h-5 w-5 transition-all"/>Alertas</Link>
                    {isSuccess && data.usuario[0].tipoUsuario == "Admin" && ( <Link href="/agentes" className="flex items-center gap-4 text-muted-foreground hover:text-foreground"><UserPlus className="h-5 w-5 transition-all"/>Agentes</Link>    )}
                    {isSuccess && data.usuario[0].tipoUsuario == "Admin" && ( <Link href="/infracao" className="flex items-center gap-4 text-muted-foreground hover:text-foreground"><UserPlus className="h-5 w-5 transition-all"/>Infrações</Link>    )}
                </nav>
                </SheetContent>
    </Sheet>
    )
}