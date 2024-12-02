"use client"
import AutomobilistaForm, { AutomobilistaType } from "@/components/automobilstas/AutomobilistaForm";
import RelatorioViatura from "@/components/relatorioViatura";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RowViatura from "@/components/viaturas/RowViatura";
import ViaturaForm, { viaturaType } from "@/components/viaturas/ViaruraForm";
import { Viatura } from "@/entities/interfaces";
import { GET_MARCAS, GET_VIATURAS } from "@/routes";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { FileText, PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import generatePDF, { Margin } from "react-to-pdf";
import { recuperarConteudoParaPDF } from "../multas/page";

export default function Viaturas() {

  const { data, isSuccess } = useQuery({
    queryKey: ['get-viaturas'],
    queryFn: () => GET_VIATURAS()
  });
  const { data: dataM, isSuccess: isM } = useQuery({
    queryKey: ['get-marcas'],
    queryFn: () => GET_MARCAS()
  });
  console.log(data)
  const [relatorio, setRelatorio] = useState<any>([]);
  const [filtros, setFiltros] = useState({
    matricula: "",
    nome: "",
    marca: "",
    carta: ""
  });

  useEffect(() => {
    isSuccess && setRelatorio(data);
  }, [data]);

  const handleFiltroChange = (e: any) => {
    const { name, type, checked, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const filtrarRelatorio = () => {
    // Implementar lógica de filtro aqui, se necessário
    return relatorio.filter((item: any) => {
      if (filtros.nome && !item?.titulopropriedade?.[0]?.pessoa?.nome.toLowerCase().includes(filtros.nome.toLowerCase())) return false;
      if (filtros.carta && !item?.titulopropriedade?.[0]?.pessoa?.automobilista?.[0]?.cartaconducao?.numeroCarta.toLowerCase().includes(filtros.carta.toLowerCase())) return false;
      if (filtros.matricula && !item?.numeroMatricula.toLowerCase().includes(filtros.matricula.toLowerCase())) return false;
      if (filtros.marca && !item?.marca?.descMarca.toLowerCase().includes(filtros.marca.toLowerCase())) return false;
      return true;
    });
  };
  const dadosFiltrados = filtrarRelatorio();
  return (
    <div className="p-4">
      <h1 className="text-lg text-slate-700 font-bold mb-4">Viaturas</h1>
      <div className="flex justify-between items-start md:items-center">
        <div className="flex gap-1 flex-col md:flex-row">
          <div className="flex flex-col md:flex-row gap-1">
            <Input placeholder="Numero de Matricula"
              id="matricula"
              name="matricula"
              value={filtros.matricula}
              onChange={handleFiltroChange}
            />
            <Input placeholder="Nome do automobilistas"
              id="nome"
              name="nome"
              value={filtros.nome}
              onChange={handleFiltroChange}
            />
            <Input placeholder="Numero da carta"
              id="carta"
              name="carta"
              value={filtros.carta}
              onChange={handleFiltroChange}
            />
          </div>
            <div className="flex items-center gap-2">
              <label htmlFor="status" className="text-sm font-medium text-slate-600">
                Marcas:
              </label>
              <select
                id="marca"
                name="marca"
                value={filtros.marca}
                onChange={handleFiltroChange}
                className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                {isM && dataM.map((item: any, index: number) => (
                  <option value={item.descMarca}>{item.descMarca}</option>
                )
                )}
              </select>
            </div>
            <Dialog>
                        <DialogTrigger asChild>
                        <Button variant={"ghost"} className="text-muted-foreground flex gap-1"><FileText className="w-4 h-4" /> Imprimir</Button>
                        </DialogTrigger>
                        <DialogContent className=" max-h-screen max-w-screen  overflow-y-auto ">
                            <DialogHeader className="relative">
                                <DialogTitle><span className="text-slate-700">Lista de Automobilistas</span></DialogTitle>
                            </DialogHeader>
                            <div className="flex justify-center">
                                <Button className="flex max-w-96 align-center gap-1 bg-foreground" onClick={() => generatePDF(recuperarConteudoParaPDF, {
                                    // Baixar/Salvar = save / Abrir no navegador = open
                                    method: 'open',
                                    page: {
                                        // Definir a margem: SMALL ou MEDIUM 
                                        margin: Margin.MEDIUM,
                                        // Formato da página: A4 ou letter
                                        format: 'A4',
                                        // Orientação do arquivo: portrait ou landscape
                                        orientation: 'portrait',
                                    },
                                })}>Gerar PDF</Button>
                            </div>
                            <div id="conteudo">
                                <RelatorioViatura />
                            </div>

                        </DialogContent>
                    </Dialog>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-1 bg-foreground"><PlusCircle className="w-5 h-5" />Cadastrar</Button>
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
              <TableHead className="text-right"></TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dadosFiltrados.map((viatura: Viatura) => (
              <RowViatura key={viatura.codViatura} viatura={viatura} />
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