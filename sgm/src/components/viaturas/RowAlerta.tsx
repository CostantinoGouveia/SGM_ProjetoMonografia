"use client"
import { Eye, Pencil, Trash2 } from "lucide-react";

import { ReactNode } from "react";
import { TableCell, TableRow } from "../ui/table";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { Button } from "../ui/button";
import AlertDelete from "../AlertDelete";
import AutomobilistaForm, { AutomobilistaType } from "../automobilstas/AutomobilistaForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Alertaroubo, Viatura } from "@/entities/interfaces";
import AlertDeleteViatura from "../AlertDeleteViatura";
import ViewDataAlertaLista from "./ViewDataAlertaLista";

export default function RowAlerta({ alerta }: { alerta: Alertaroubo}) {
async function handleDeleteAlerta() {
    
}
function hancleClickViewAutomobilista() {
    
}
   return (
                <TableRow key={alerta.codAlertaRoubo}>       
                    <TableCell className="font-medium">
                        <ContextMenu>
                            <ContextMenuTrigger> {alerta.viatura?.numeroMatricula}</ContextMenuTrigger>
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
                            <ContextMenuTrigger>{alerta?.viatura?.marca?.descMarca}</ContextMenuTrigger>
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
                        <TableCell>{alerta?.viatura?.modelo}</TableCell>
                        <TableCell >{new Date(alerta?.dataRoubo).toLocaleDateString()}</TableCell>
                        <TableCell ><label className={` text-white p-1 rounded ${alerta?.status === "Ativo" ? "bg-green-500" : "bg-red-500"}`}>{alerta?.status}</label></TableCell>
                        <TableCell><ButtonView alerta={alerta} handleClick={()=>console.log("")}> <Button variant={"outline"} className=" hover:bg-muted"><Eye className="w-5 h-5 " /></Button></ButtonView> </TableCell>
                       </TableRow>
    )
}

function ButtonView({alerta, handleClick,children}: {children:ReactNode,alerta?: Alertaroubo, handleClick?: () => void}) 
{
    return(
     <Dialog>
        <DialogTrigger>
           {children}
        </DialogTrigger>
        <DialogContent>
            <ViewDataAlertaLista data={alerta} handleClick={()=>console.log()}/>
        </DialogContent>
    </Dialog>
    )
}

function ButtonEdit({children}: {children: ReactNode}) {
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