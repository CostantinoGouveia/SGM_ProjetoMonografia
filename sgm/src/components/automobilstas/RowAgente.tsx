"use client"
import { Eye, Pencil, Trash2 } from "lucide-react";
import { ReactNode } from "react";
import { TableCell, TableRow } from "../ui/table";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSubContent, ContextMenuTrigger } from "../ui/context-menu";
import { Button } from "../ui/button";
import AutomobilistaForm from "./AutomobilistaForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Automobilista, Funcionario } from "@/entities/interfaces";
import AlertDeleteAgente from "../AlertDeleteAgente";
import ViewDataAgenteLista from "./ViewDataAgenteLista ";

export default function RowAgente({ Agente }: { Agente: Funcionario }) {
    async function handleDeleteAgente() {

    }
    function hancleClickViewAgente() {

    }
    console.log(" fewfe", Agente)
    return (
        <TableRow key={Agente.codFuncionario}>
            <TableCell className="font-medium">
                <ContextMenu>
                    <ContextMenuTrigger> {Agente.pessoa.nome}</ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem>
                            <Button variant={"ghost"}>Visualizar</Button>
                        </ContextMenuItem>
                        <ContextMenuItem>
                            <Button variant={"ghost"}>Editar</Button>
                        </ContextMenuItem>
                        <ContextMenuItem>
                            <Button variant={"ghost"}>Apagar</Button>
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </TableCell>

            <TableCell>
                <ContextMenu>
                    <ContextMenuTrigger>{Agente.pessoa.contacto?.email1}</ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem>
                            <Button variant={"ghost"}>Visualizar</Button>
                        </ContextMenuItem>
                        <ContextMenuItem>
                            <Button variant={"ghost"}>Editar</Button>
                        </ContextMenuItem>
                        <ContextMenuItem>
                            <Button variant={"ghost"}>Apagar</Button>
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </TableCell>
            <TableCell>{Agente.numeroAgente}</TableCell>
            <TableCell >{Agente.pessoa.bi.numeroBI}</TableCell>
            <TableCell className="flex gap-1">
                <ButtonView Agente={Agente} handleClick={() => console.log("")}> <Button variant={"outline"} className=" hover:bg-muted"><Eye className="w-5 h-5 " /></Button></ButtonView>
                <ButtonEdit><Button variant={"outline"} className=" hover:bg-muted"><Pencil className="w-5 h-5 " /></Button></ButtonEdit>
                <AlertDeleteAgente id={Agente.codFuncionario.toString()} handleClick={handleDeleteAgente}><Button variant={"outline"} className=" hover:bg-muted"><Trash2 className="w-5 h-5 text-red-700" /></Button></AlertDeleteAgente>
            </TableCell>
        </TableRow>
    )
}

function ButtonView({ Agente, handleClick, children }: { children: ReactNode, Agente: Funcionario, handleClick: () => void }) {
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <ViewDataAgenteLista data={Agente} handleClick={handleClick} />
            </DialogContent>
        </Dialog>
    )
}

function ButtonEdit({ children }: { children: ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader className="relative">
                    <DialogTitle><span className="text-slate-700">Editar automobilista</span></DialogTitle>
                </DialogHeader>
                <AutomobilistaForm />
            </DialogContent>
        </Dialog>
    )
}