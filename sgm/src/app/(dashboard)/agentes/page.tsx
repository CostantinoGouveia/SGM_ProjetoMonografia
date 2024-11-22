"use client"
import AgenteForm from "@/components/automobilstas/AgenteForm";
import AutomobilistaForm, { AutomobilistaType } from "@/components/automobilstas/AutomobilistaForm";
import RowAgente from "@/components/automobilstas/RowAgente";
import RowAutomo from "@/components/automobilstas/RowAutomo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow, Table } from "@/components/ui/table";
import { GET_AUTOMOBILISTAS, GET_FUNCIONARIOS } from "@/routes";
import { useQuery } from "@tanstack/react-query";

import {  PlusCircle, Search } from "lucide-react";

export default function Agente() {

    const { data, isSuccess } = useQuery({
        queryKey: ['get-funcionario'],
        queryFn: () => GET_FUNCIONARIOS()
    });
    console.log(data)
    return(
        <div className="p-4">
            <h1 className="text-lg text-slate-700 font-bold mb-4">Agentes</h1>
            <div className="flex justify-between items-start md:items-center">
                <div className="flex gap-1 flex-col md:flex-row">
                    <div className="flex flex-col md:flex-row gap-1">
                       <Input placeholder="Nome do automobilistas"/>
                        <Input placeholder="Email do automobilistas"/>
                    </div>
                    <Button variant={"ghost"} className="text-muted-foreground flex gap-1"><Search className="w-4 h-4"/> Filtrar resultados</Button>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="flex gap-1 bg-foreground"><PlusCircle className="w-5 h-5"/>Cadastrar</Button>
                    </DialogTrigger>
                    <DialogContent className="">
                          <DialogHeader className="flex justify-between">
                            <DialogTitle><span className="text-slate-700">Cadastrar novo Agente</span></DialogTitle>
                          </DialogHeader>
                          <AgenteForm />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="w-full shadow-sm rounded-md">
     
              <Table className="bg-white mt-8  rounded-md">
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[200px]">Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>NIP</TableHead>
                    <TableHead>BI</TableHead>
                    <TableHead colSpan={3} className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {isSuccess && data.map((agente : any) => (
                        <RowAgente key={agente.codFuncionario} Agente={agente}/>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                    <TableCell colSpan={3}><Button>Anterior</Button></TableCell>
                    <TableCell colSpan={6} className="text-right"><Button>Proximo</Button></TableCell>
                    </TableRow>
                </TableFooter>
                </Table>
            </div>
        </div>
    )
}