"use client"
import { ReactNode } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DELETE_AUTOMOBILISTA, DELETE_FUNCIONARIO } from "@/routes";
interface DeleteAgenteProps {
    handleClick: () => void,
    children: ReactNode,
    id: string
}

export default function AlertDeleteAgente({ children, handleClick, id }: DeleteAgenteProps) {
    const atualisa = useQueryClient()
    const { mutateAsync: deleteAgente } = useMutation({
        mutationFn: DELETE_FUNCIONARIO,
        onSuccess: () => {
            atualisa.invalidateQueries({queryKey: ["get-funcionario"]})
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
                    <AlertDialogAction className="bg-red-700 hover:bg-red-900" onClick={()=>deleteAgente(id)}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}