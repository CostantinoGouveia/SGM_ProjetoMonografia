"use client"
import { ReactNode } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";


export default function AlertLogout() {
    const router = useRouter()

function handleLogout() {
    localStorage.removeItem('SGM_');
    localStorage.removeItem('SGM_USER');
    Cookies.set('token', '', { expires: 0 });
    router.replace("/auth/entrar");
}
    return (
        <AlertDialog>
            <AlertDialogTrigger>
            <Button variant={"ghost"} className="hover:bg-black/10 hover:text-muted"><LogOut /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem a certeza que deseja sair</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa açâo fará você sair do sistema!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-700 hover:bg-red-900" onClick={()=>handleLogout()}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}