"use client"
import { ReactNode } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { useToast } from "./ui/use-toast";
interface DeleteAutomobilistaProps {
    handleClick: () => void,
    children: ReactNode
}
export default function AlertDelete({ children, handleClick }: DeleteAutomobilistaProps) {
   const {toast} = useToast()
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem a certeza que deseja eliminar</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa açâo nâo pode ser revertida
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-700 hover:bg-red-900" onClick={()=>{toast({description:"Eliminado com sucesso"}); handleClick()}}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}