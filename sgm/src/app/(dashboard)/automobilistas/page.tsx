"use client"
import AutomobilistaForm, { AutomobilistaType } from "@/components/automobilstas/AutomobilistaForm";
import RowAutomo from "@/components/automobilstas/RowAutomo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow, Table } from "@/components/ui/table";
import { GET_AUTOMOBILISTAS, GET_PESSOA_BY_ID } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { isWithinInterval } from "date-fns";

import { FileText, PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import generatePDF, { Margin } from "react-to-pdf";
import { recuperarConteudoParaPDF } from "../multas/page";
import RelatorioAtomobobilista from "@/components/relatorioAutomobilista";

export default function Automobilista() {
    const idPessoa = localStorage.getItem('SGM_USER') || '';
    const { data:dataPessoa, isSuccess:isSus } = useQuery({
        queryKey: ['get-pessoa-by-id', idPessoa],
        queryFn: () => GET_PESSOA_BY_ID(idPessoa)
      });
      console.log("datapssoa", dataPessoa);
    const { data, isSuccess } = useQuery({
        queryKey: ['get-automobilista'],
        queryFn: () => GET_AUTOMOBILISTAS()
    });
    console.log(data)
    const [relatorio, setRelatorio] = useState<any>([]);
    const [filtros, setFiltros] = useState({
        bi: "",
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
            if (filtros.nome && !item.pessoa.nome.toLowerCase().includes(filtros.nome.toLowerCase())) return false;
            if (filtros.carta && !item.cartaconducao.numeroCarta.toLowerCase().includes(filtros.carta.toLowerCase())) return false;
            if (filtros.bi && !item.pessoa.bi.numeroBI.toLowerCase().includes(filtros.bi.toLowerCase())) return false;
            return true;
        });
    };
    const dadosFiltrados = filtrarRelatorio();
    return (
        <div className="p-4">
            <h1 className="text-lg text-slate-700 font-bold mb-4">Automobilistas</h1>
            <div className="flex justify-between items-start md:items-center">
                <div className="flex gap-1 flex-col md:flex-row">
                    <div className="flex flex-col md:flex-row gap-1">
                        <Input placeholder="Nome do automobilistas"
                            id="nome"
                            name="nome"
                            value={filtros.nome}
                            onChange={handleFiltroChange}
                        />
                        <Input placeholder="Numero do BI"
                            id="bi"
                            name="bi"
                            value={filtros.bi}
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
                       { isSus && dataPessoa.usuario[0].tipoUsuario == "Admin" && ( <Button variant={"ghost"} className="text-muted-foreground flex gap-1"><FileText className="w-4 h-4" /> Imprimir</Button>)}
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
                                <RelatorioAtomobobilista />
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
                            <DialogTitle><span className="text-slate-700">Cadastrar novo automobilista</span></DialogTitle>
                        </DialogHeader>
                        <AutomobilistaForm />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="w-full shadow-sm rounded-md">

                <Table className="bg-white mt-8  rounded-md">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Nº da carta</TableHead>
                            <TableHead>BI</TableHead>
                            <TableHead colSpan={3} className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {dadosFiltrados.map((automobilista: any) => (
                            <RowAutomo key={automobilista.email} automobilista={automobilista} />
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