"use client"
import AgenteForm from "@/components/automobilstas/AgenteForm";
import AutomobilistaForm, { AutomobilistaType } from "@/components/automobilstas/AutomobilistaForm";
import RowAgente from "@/components/automobilstas/RowAgente";
import RowAutomo from "@/components/automobilstas/RowAutomo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow, Table } from "@/components/ui/table";
import { GET_AUTOMOBILISTAS, GET_FUNCIONARIOS, GET_TIPOSINFRACAO } from "@/routes";
import { useQuery } from "@tanstack/react-query";

import { FileText, PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import generatePDF, { Margin } from "react-to-pdf";
import { recuperarConteudoParaPDF } from "../multas/page";
import RelatorioAgente from "@/components/relatorioAgente";
import RowInfracao from "@/components/automobilstas/RowInfracao";
import InfracaoForm from "@/components/automobilstas/InfracaoForm";
import RelatorioInfracao from "@/components/relatorioInfracao";

export default function Agente() {

    const { data, isSuccess } = useQuery({
        queryKey: ['get-tipoInfrcao'],
        queryFn: () => GET_TIPOSINFRACAO()
    });
    const [relatorio, setRelatorio] = useState<any>([]);
    const [filtros, setFiltros] = useState({
        bi: "",
        nome: ""
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
            if (filtros.nome && !item.descTipoInfracao.toLowerCase().includes(filtros.nome.toLowerCase())) return false;
            if (filtros.bi && !item.valorInfracao.toLowerCase().includes(filtros.bi.toLowerCase())) return false;
            return true;
        });
    };
    const dadosFiltrados = filtrarRelatorio();
    console.log(data)
    return (
        <div className="p-4">
            <h1 className="text-lg text-slate-700 font-bold mb-4">Infrações</h1>
            <div className="flex justify-between items-start md:items-center">
                <div className="flex gap-1 flex-col md:flex-row">
                    <div className="flex flex-col md:flex-row gap-1">
                        <Input placeholder="Descrição"
                            id="nome"
                            name="nome"
                            value={filtros.nome}
                            onChange={handleFiltroChange}
                        />
                        <Input placeholder="Valor em UCF"
                            id="bi"
                            name="bi"
                            value={filtros.bi}
                            onChange={handleFiltroChange}
                        />
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={"ghost"} className="text-muted-foreground flex gap-1"><FileText className="w-4 h-4" /> Imprimir</Button>
                        </DialogTrigger>
                        <DialogContent className=" max-h-screen max-w-screen  overflow-y-auto ">
                            <DialogHeader className="relative">
                                <DialogTitle><span className="text-slate-700">Relatório de Infrações</span></DialogTitle>
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
                                <RelatorioInfracao />
                            </div>

                        </DialogContent>
                    </Dialog>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="flex gap-1 bg-foreground"><PlusCircle className="w-5 h-5" />Cadastrar</Button>
                    </DialogTrigger>
                    <DialogContent className="">
                        <DialogHeader className="flex justify-between">
                            <DialogTitle><span className="text-slate-700">Cadastrar uma nova Infração</span></DialogTitle>
                        </DialogHeader>
                        <InfracaoForm />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="w-full shadow-sm rounded-md">

                <Table className="bg-white mt-8  rounded-md">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Descrição</TableHead>
                            <TableHead>valor em UCF</TableHead>
                            <TableHead colSpan={3} className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {dadosFiltrados.map((infracao: any) => (
                            <RowInfracao key={infracao.codTipoInfracao} Infracao={infracao} />
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}></TableCell>
                            <TableCell colSpan={6} className="text-right"></TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    )
}