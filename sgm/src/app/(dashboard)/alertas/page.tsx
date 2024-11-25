"use client"
import AutomobilistaForm, { AutomobilistaType } from "@/components/automobilstas/AutomobilistaForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RowAlerta from "@/components/viaturas/RowAlerta";
import RowViatura from "@/components/viaturas/RowViatura";
import ViaturaForm, { viaturaType } from "@/components/viaturas/ViaruraForm";
import { Alertaroubo, Viatura } from "@/entities/interfaces";
import { GET_ALERTAS_ROUBO, GET_VIATURAS } from "@/routes";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Search } from "lucide-react";
import { z } from "zod";


export default function Viaturas() {

  const { data, isSuccess } = useQuery({
    queryKey: ['get-alertas'],
    queryFn: () => GET_ALERTAS_ROUBO()
  });
  console.log(data)

  return (
    <div className="p-4">
      <h1 className="text-lg text-slate-700 font-bold mb-4">Alertas de Roubos de Viaturas</h1>
      <div className="flex justify-between items-start md:items-center">
        <div className="flex gap-1 flex-col md:flex-row">
          <div className="flex flex-col md:flex-row gap-1">
            <Input placeholder="Nome do automobilistas" />
            <Input placeholder="Email do automobilistas" />
          </div>
          <Button variant={"ghost"} className="text-muted-foreground flex gap-1 "><Search className="w-4 h-4" /> Filtrar resultados</Button>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-1 bg-foreground hidden"><PlusCircle className="w-5 h-5" />Cadastrar</Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader className="relative">
              <DialogTitle><span className="text-slate-700">Cadastrar nova viatura</span></DialogTitle>
            </DialogHeader>
            <ViaturaForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full shadow-sm rounded-md">

        <Table className="bg-white mt-8  rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead>Matricula</TableHead>
              <TableHead className="w-[200px]">Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Combustivel</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right"></TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSuccess && data.map((alerta:Alertaroubo) => (
              <RowAlerta key={alerta.codAlertaRoubo} alerta={alerta} />
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