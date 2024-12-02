"use client"
import { ReactNode } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DELETE_AUTOMOBILISTA, DELETE_FUNCIONARIO, DELETE_TIPOINFRACAO } from "@/routes";
interface DeleteAgenteProps {
    handleClick: () => void,
    children: ReactNode,
    id: string
}

export default function AlertDeleteInfracao({ children, handleClick, id }: DeleteAgenteProps) {
    const atualisa = useQueryClient()
    const { mutateAsync: deleteInfracao } = useMutation({
        mutationFn: DELETE_TIPOINFRACAO,
        onSuccess: () => {
            atualisa.invalidateQueries({queryKey: ["get-tipoInfracao"]})
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
                    <AlertDialogAction className="bg-red-700 hover:bg-red-900" onClick={()=>deleteInfracao(id)}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}