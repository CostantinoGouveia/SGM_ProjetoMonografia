"use client"
import { DialogClose } from "@radix-ui/react-dialog"
import { FormControl, FormDescription, FormField, FormItem } from "../ui/form"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"

import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { Input } from "../ui/input"
import { useFormContext } from "react-hook-form"
import { AutomobilistaType } from "./AutomobilistaForm"
import { ICountry, IStep } from "./FirstForm"
import { ptBR } from "date-fns/locale/pt-BR"
import { useEffect, useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { CATE, cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { useQuery } from "@tanstack/react-query"
import { GET_CATEGORIASCARTA, GET_FUNCIONARIOS } from "@/routes"
import { AgenteType } from "./AgenteForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { toast } from "react-toastify"

export default function ThreeFormAgente({ setNextStep, setPreviusStep }: IStep) {
    
    const { formState: { errors }, ...form } = useFormContext<AgenteType>()
    //const form = useFormContext<AutomobilistaType>()
    const { data:dataFunc, isSuccess:isSuccessFunc } = useQuery({
        queryKey: ['get-funciona'],
        queryFn: () => GET_FUNCIONARIOS()
    });
    async function handleClickNext() {
        const erros = await form.trigger(["numeroAgente", "tipoUsuario"])
        let numeroAgente = false;
        isSuccessFunc && dataFunc.map((item:any)=>{
            if(item.numeroAgente === form.getValues("numeroAgente")) {
                numeroAgente = true
                toast.warning("Este numero de Agente já exite!")
                }
        })
        console.log(erros);
        if (erros && !numeroAgente)
            setNextStep()
    }
    return (
        <div className="flex flex-col gap-3">
            <h1>Passo 3 - Dados do Agente</h1>
            <div className="gap-4 flex flex-col">
                <div className="">
                    <FormField
                        control={form.control}
                        name="numeroAgente"
                        render={({ fieldState, field }) => (
                            <FormItem className="flex flex-col gap-1">
                                <Label>Informe o numero da carta de condução</Label>
                                <FormControl>
                                    <Input className={`${errors.numeroAgente && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="NIP" />
                                </FormControl>
                                <FormDescription className="text-red-600">{errors.numeroAgente && errors.numeroAgente.message}</FormDescription>
                            </FormItem>
                        )
                        }
                    />

                </div>
            </div>

            <div className="grid grid-cols-1 gap-1 max-sm:grid-cols-1">

                <FormField
                    control={form.control}
                    name="tipoUsuario"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <Label>Informe o tipo de usuario do Agente</Label>
                            <Select onValueChange={(e) => field.onChange(e)}>
                                <FormControl>
                                    <SelectTrigger className={`${errors.tipoUsuario && "focus-visible:ring-red-600 border-red-600"}`}>
                                        <SelectValue placeholder={`${field.value || "Selecione o tipo de usuario"}`} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Agente">Agente</SelectItem>
                                    <SelectItem value="Admin">Administrador</SelectItem>
                                    <SelectItem value="Transito">Transito</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription className="text-red-600">{errors.tipoUsuario && errors.tipoUsuario.message}</FormDescription>
                        </FormItem>)}
                />
            </div>
            <div className="flex justify-between mt-4">
                <Button onClick={() => setPreviusStep()} variant={"outline"}>Anterior</Button>
                <Button onClick={() => handleClickNext()} className="bg-blue-600">Finalizar</Button>
            </div>
        </div >
    )
}