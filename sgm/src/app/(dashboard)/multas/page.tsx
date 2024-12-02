"use client"
import AutomobilistaForm, { AutomobilistaType } from "@/components/automobilstas/AutomobilistaForm";
import RelatorioMultas from "@/components/relatorioMulta";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RowMulta from "@/components/viaturas/RowMulta";
import RowViatura from "@/components/viaturas/RowViatura";
import ViaturaForm, { viaturaType } from "@/components/viaturas/ViaruraForm";
import { Multa, Viatura } from "@/entities/interfaces";
import { GET_MULTAS, GET_VIATURAS } from "@/routes";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { File, FileArchive, FileCheck, FilePen, FileTerminal, FileText, PlusCircle, Search } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { z } from "zod";
import generatePDF, { Margin } from 'react-to-pdf';
import { isWithinInterval } from "date-fns";
import { useEffect, useState } from "react";

export const recuperarConteudoParaPDF = () => document.getElementById('conteudo');


export default function Viaturas() {

  const { data, isSuccess } = useQuery({
    queryKey: ['get-MULTAS'],
    queryFn: () => GET_MULTAS()
  });
  console.log(data)

  const [relatorio, setRelatorio] = useState<any>([]);
  const [filtros, setFiltros] = useState({
    data: "",
    status: "",
    fim: "",
    tribunal: false,
    recl: false,
    nome: "",
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
      const dataI = new Date(filtros.data);
      const dataF = new Date(filtros.fim);
      if (filtros.data && filtros.fim && !isWithinInterval(new Date(item.data), { start: dataI, end: dataF })) return false;
      if (filtros.status && item.pagamentomulta[0].status.toLowerCase() !== filtros.status.toLowerCase()) return false;
      if (filtros.nome && !item.automobilista.pessoa.nome.toLowerCase().includes(filtros.nome.toLowerCase())) return false;
      if (filtros.carta && !item.automobilista.cartaconducao.numeroCarta.toLowerCase().includes(filtros.carta.toLowerCase())) return false;
      if (filtros.tribunal && !item.statusTribunal) return false;
      if (filtros.recl && item.reclamacao <= 0) return false;
      return true;
    });
  };
  const dadosFiltrados = filtrarRelatorio();

  return (
    <div className="p-4">
      <h1 className="text-lg text-slate-700 font-bold mb-4">Multas</h1>
      <div className="flex justify-between items-start md:items-center">
        <div className="flex gap-1 flex-col md:flex-row">
          <div className="flex flex-col md:flex-row gap-1">
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"ghost"} className="text-muted-foreground flex gap-1">
                <Search className="w-4 h-4" /> Filtrar resultados
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[900px] max-w-[400px] overflow-y-auto rounded-lg p-6 shadow-lg bg-white">
              <DialogHeader>
                <DialogTitle>
                  <span className="text-slate-700 text-lg font-semibold">Filtros</span>
                </DialogTitle>
              </DialogHeader>
              <div className="filters space-y-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="data" className="text-sm font-medium text-slate-600">
                    Data de início:
                  </label>
                  <input
                    type="date"
                    id="data"
                    name="data"
                    value={filtros.data}
                    onChange={handleFiltroChange}
                    className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="fim" className="text-sm font-medium text-slate-600">
                    Data de fim:
                  </label>
                  <input
                    type="date"
                    id="fim"
                    name="fim"
                    value={filtros.fim}
                    onChange={handleFiltroChange}
                    className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="status" className="text-sm font-medium text-slate-600">
                    Status:
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={filtros.status}
                    onChange={handleFiltroChange}
                    className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos</option>
                    <option value="pendente">Pendentes</option>
                    <option value="pago">Pagas</option>
                    <option value="Nao Pago">Não Pagas</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="tribunal"
                      name="tribunal"
                      checked={filtros.tribunal || false}
                      onChange={handleFiltroChange}
                      className="w-5 h-5 rounded border-slate-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="tribunal" className="text-sm text-slate-600">
                      Em tribunal
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="recl"
                      name="recl"
                      checked={filtros.recl || false}
                      onChange={handleFiltroChange}
                      className="w-5 h-5 rounded border-slate-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="recl" className="text-sm text-slate-600">
                      Reclamadas
                    </label>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-1 bg-foreground"><FileText className="w-5 h-5 " />Relatório</Button>
          </DialogTrigger>
          <DialogContent className=" max-h-[900px] max-w-[1000px] overflow-y-auto ">
            <DialogHeader className="relative">
              <DialogTitle><span className="text-slate-700">Gerar relatório de Multas</span></DialogTitle>
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
              <RelatorioMultas />
            </div>

          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full shadow-sm rounded-md">

        <Table className="bg-white mt-8  rounded-md">

          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="w-[200px]">Data</TableHead>
              <TableHead>Nº de Infrações</TableHead>
              <TableHead>situação</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right"></TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dadosFiltrados.map((Multa: Multa) => (
              <RowMulta key={Multa.codMulta} Multa={Multa} />
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