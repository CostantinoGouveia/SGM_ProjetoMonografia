"use client"
import AutomobilistaForm, { AutomobilistaType } from "@/components/automobilstas/AutomobilistaForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RowMulta from "@/components/viaturas/RowMulta";
import RowReclamacao from "@/components/viaturas/RowReclamacao";
import RowViatura from "@/components/viaturas/RowViatura";
import ViaturaForm, { viaturaType } from "@/components/viaturas/ViaruraForm";
import { Multa, Reclamacao, Viatura } from "@/entities/interfaces";
import { GET_MULTAS, GET_RECLAMACOES, GET_VIATURAS } from "@/routes";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { FileText, PlusCircle, Search } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { z } from "zod";
import { recuperarConteudoParaPDF } from "../multas/page";
import generatePDF, { Margin } from "react-to-pdf";
import RelatorioAlertas from "@/components/relatorioAlerta";
import RelatorioReclamacao from "@/components/relatorioReclamacao";
import { isWithinInterval } from "date-fns";
import { useEffect, useState } from "react";


export default function Viaturas() {

  const { data, isSuccess } = useQuery({
    queryKey: ['get-MULTAS'],
    queryFn: () => GET_RECLAMACOES()
  });
  console.log(data)

  const [relatorio, setRelatorio] = useState<any>([]);
  const [filtros, setFiltros] = useState({
    data: "",
    status: "",
    statusR: "",
    fim: "",
    tribunal: false,
    nome:"",
    carta:""
  });

  useEffect(() => {
    // Simulação de dados (substituir com fetch para API)

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
      if (filtros.data && filtros.fim && !isWithinInterval(new Date(item.dataReclamacao), { start: dataI, end: dataF })) return false;
      if (filtros.status && item.multa.pagamentomulta[0].status.toLowerCase() !== filtros.status.toLowerCase()) return false;
      if (filtros.statusR && item.status.toLowerCase() !== filtros.statusR.toLowerCase()) return false;
      if (filtros.tribunal && !item.multa.statusTribunal) return false;
      if (filtros.nome && !item.multa.automobilista.pessoa.nome.toLowerCase().includes(filtros.nome.toLowerCase())) return false;
      if (filtros.carta && !item.multa.automobilista.cartaconducao.numeroCarta.toLowerCase().includes(filtros.carta.toLowerCase())) return false;
      return true;
    });
  };
  const dadosFiltrados = filtrarRelatorio();

  return (
    <div className="p-4">
      <h1 className="text-lg text-slate-700 font-bold mb-4">Reclamações</h1>
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
                    Status Pagamento:
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
                <div className="flex flex-col gap-2">
                  <label htmlFor="statusR" className="text-sm font-medium text-slate-600">Status Reclamacao:</label>
                  <select
                    id="statusR"
                    name="statusR"
                    value={filtros.statusR}
                    onChange={handleFiltroChange}
                     className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos</option>
                    <option value="Pendente">Pendentes</option>
                    <option value="Negada">Negadas</option>
                    <option value="Aceite">Aceites</option>
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
              <DialogTitle><span className="text-slate-700">Gerar relatório de Reclamações</span></DialogTitle>
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
              <RelatorioReclamacao />
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
              <TableHead>situação</TableHead>
              <TableHead>Funcionario Atendimento</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right"></TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dadosFiltrados.map((reclamacao: Reclamacao) => (
              <RowReclamacao key={reclamacao.codReclamacao} reclamacao={reclamacao} />
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