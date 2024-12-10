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
import { GET_AUTOMOBILISTAS, GET_CATEGORIASCARTA, GET_FUNCIONARIOS, GET_PESSOAS } from "@/routes"
import { AgenteType, AgenteType1 } from "./AgenteForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { toast } from "react-toastify"

export default function FormAgenteAlter({ setNextStep, setPreviusStep }: IStep) {

    const { formState: { errors }, ...form1 } = useFormContext<AgenteType1>()
    const [openPessoa, setOpenPessoa] = useState(false)

    const { data: dataAutomo, isSuccess: isSuccessAutomo } = useQuery({
        queryKey: ['get-pessoas'],
        queryFn: GET_PESSOAS

    });
    //const form = useFormContext<AutomobilistaType>()
    const { data: dataFunc, isSuccess: isSuccessFunc } = useQuery({
        queryKey: ['get-funciona'],
        queryFn: () => GET_FUNCIONARIOS()
    });
    async function handleClickNext() {
        const erros = await form1.trigger(["numeroAgente", "tipoUsuario"])
        let numeroAgente = false;
        isSuccessFunc && dataFunc.map((item: any) => {
            if (item.numeroAgente === form1.getValues("numeroAgente")) {
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
            <h1>Dados do Agente</h1>
            <div className="flex flex-col gap-1">
                <FormField
                    control={form1.control}
                    name="idPessoa"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <Label>Informe o seleciona a pessoa</Label>
                            <Popover open={openPessoa} onOpenChange={setOpenPessoa}>
                                <FormControl>
                                    <PopoverTrigger asChild className={`${errors.idPessoa && !field.value && "focus-visible:ring-red-600 border-red-600"}`}>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openPessoa}
                                            className="w-fu justify-between">
                                            {isSuccessAutomo && field.value ? dataAutomo.find((country: any) => country.codPessoa === Number(field.value))?.nome : "Selecione o Titular"}
                                            <ChevronsUpDown className="ml-2 h-4 w-8 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                </FormControl>
                                <PopoverContent className="w-[500px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Procurar Titular pelo nome, BI ou nº da carta.." />
                                        <CommandList>
                                            <CommandEmpty>Titular nao encontrado</CommandEmpty>
                                            <CommandGroup>
                                                {isSuccessAutomo && dataAutomo.map((pessoa: any) => (
                                                    <CommandItem
                                                        key={pessoa.codPessoa}
                                                        value={pessoa.nome + pessoa.bi.numeroBI}
                                                        onSelect={(currentValue) => {
                                                            form1.setValue("idPessoa", pessoa.codPessoa)
                                                            setOpenPessoa(false)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                field.value === pessoa.codPessoa ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {pessoa.nome} /
                                                        {pessoa.bi.numeroBI}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription className="text-red-600">{errors.idPessoa && !field.value && errors.idPessoa.message}</FormDescription>
                        </FormItem>
                    )}
                />
            </div>
            <div className="gap-4 flex flex-col">
                <div className="">
                    <FormField
                        control={form1.control}
                        name="numeroAgente"
                        render={({ fieldState, field }) => (
                            <FormItem className="flex flex-col gap-1">
                                <Label>Informe o numero de Agente NIP</Label>
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
                    control={form1.control}
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