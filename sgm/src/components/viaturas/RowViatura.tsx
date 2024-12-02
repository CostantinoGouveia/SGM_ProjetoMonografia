"use client"
import { Eye, Pencil, Trash2 } from "lucide-react";

import { ReactNode } from "react";
import { TableCell, TableRow } from "../ui/table";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { Button } from "../ui/button";
import AlertDelete from "../AlertDelete";
import AutomobilistaForm, { AutomobilistaType } from "../automobilstas/AutomobilistaForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import ViewDataAutomobilista from "../automobilstas/ViewDataAutomobilista";
import { Viatura } from "@/entities/interfaces";
import AlertDeleteViatura from "../AlertDeleteViatura";
import ViewDataViaturaLista from "./ViewDataViaturaLista";

export default function RowViatura({ viatura }: { viatura: Viatura}) {
async function handleDeleteViatura() {
    
}
function hancleClickViewAutomobilista() {
    
}
   return (
                <TableRow key={viatura.numeroMatricula}>       
                    <TableCell className="font-medium">
                        <ContextMenu>
                            <ContextMenuTrigger> {viatura.numeroMatricula}</ContextMenuTrigger>
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
                            <ContextMenuTrigger>{viatura.marca.descMarca}</ContextMenuTrigger>
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
                        <TableCell>{viatura.modelo}</TableCell>
                        <TableCell >{viatura.conbustivel}</TableCell>
                        <TableCell><ButtonView viatura={viatura} handleClick={()=>console.log("")}> <Button variant={"outline"} className=" hover:bg-muted"><Eye className="w-5 h-5 " /></Button></ButtonView> </TableCell>
                        <TableCell><ButtonEdit><Button variant={"outline"} className=" hover:bg-muted"><Pencil className="w-5 h-5 " /></Button></ButtonEdit></TableCell>
                        <TableCell><AlertDeleteViatura id={viatura.codViatura.toString()} handleClick={handleDeleteViatura}><Button variant={"outline"} className=" hover:bg-muted"><Trash2 className="w-5 h-5 text-red-700" /></Button></AlertDeleteViatura></TableCell>
                    </TableRow>
    )
}

function ButtonView({viatura, handleClick,children}: {children:ReactNode,viatura?: Viatura, handleClick?: () => void}) 
{
    return(
     <Dialog>
        <DialogTrigger>
           {children}
        </DialogTrigger>
        <DialogContent>
            <ViewDataViaturaLista data={viatura} handleClick={()=>console.log()}/>
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