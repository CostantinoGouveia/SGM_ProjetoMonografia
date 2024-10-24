"use client"
import { Eye, Pencil, Trash2 } from "lucide-react";

import { ReactNode } from "react";
import { viaturaType } from "@/app/(dashboard)/viaturas/page";
import { TableCell, TableRow } from "../ui/table";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { Button } from "../ui/button";
import AlertDelete from "../AlertDelete";
import AutomobilistaForm, { AutomobilistaType } from "../automobilstas/AutomobilistaForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import ViewDataAutomobilista from "../automobilstas/ViewDataAutomobilista";

export default function RowViatura({ viatura }: { viatura: viaturaType}) {
async function handleDeleteAutomobilista() {
    
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
                            <ContextMenuTrigger>{viatura.marca}</ContextMenuTrigger>
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
                        <TableCell><ButtonView > <Button variant={"outline"} className=" hover:bg-muted"><Eye className="w-5 h-5 " /></Button></ButtonView> </TableCell>
                        <TableCell><ButtonEdit><Button variant={"outline"} className=" hover:bg-muted"><Pencil className="w-5 h-5 " /></Button></ButtonEdit></TableCell>
                        <TableCell><AlertDelete handleClick={handleDeleteAutomobilista}><Button variant={"outline"} className=" hover:bg-muted"><Trash2 className="w-5 h-5 text-red-700" /></Button></AlertDelete></TableCell>
                    </TableRow>
    )
}

function ButtonView({automobilista, handleClick,children}: {children:ReactNode,automobilista?: AutomobilistaType, handleClick?: () => void}) 
{
    return(
     <Dialog>
        <DialogTrigger>
           {children}
        </DialogTrigger>
        <DialogContent>
            <ViewDataAutomobilista data={automobilista} handleClick={()=>console.log()}/>
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