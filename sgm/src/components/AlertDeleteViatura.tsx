"use client"
import { ReactNode } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DELETE_AUTOMOBILISTA, DELETE_VIATURA } from "@/routes";
interface DeleteViaturaProps {
    handleClick: () => void,
    children: ReactNode,
    id: string
}

export default function AlertDeleteViatura({ children, handleClick, id }: DeleteViaturaProps) {
    const atualisa = useQueryClient()
    const { mutateAsync: deleteViatura } = useMutation({
        mutationFn: DELETE_VIATURA,
        onSuccess: () => {
            atualisa.invalidateQueries(["get-viaturas"])
            toast({description:"Eliminado com sucesso"})
        }
    });
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
                    <AlertDialogAction className="bg-red-700 hover:bg-red-900" onClick={()=>deleteViatura(id)}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}