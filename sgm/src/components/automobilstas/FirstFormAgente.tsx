"use client"
import { useFormContext, useFormState } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AutomobilistaType } from "./AutomobilistaForm";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";
import { format, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { DialogClose } from "@radix-ui/react-dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";
import { FormControl, FormDescription, FormField, FormItem } from "../ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useQuery } from "@tanstack/react-query";
import { GET_FUNCIONARIOS, GET_PAISES } from "@/routes";
import { AgenteType } from "./AgenteForm";
import { toast } from "react-toastify";


export interface IStep {
    setNextStep: () => void,
    setPreviusStep: () => void
}
export interface ICountry {
    name: {
        common: string,
        official: string,
        nativeName: {
            eng: {
                official: string
                common: string
            }
        }
    },
    flag: any
}


export default function FirstFormAgente({ setNextStep, setPreviusStep }: IStep) {

    const { data:dataPais, isSuccess:isSuccessPais } = useQuery({
        queryKey: ['get-pais'],
        queryFn: () => GET_PAISES()
    });
    const { data:dataFunc, isSuccess:isSuccessFunc } = useQuery({
        queryKey: ['get-funciona'],
        queryFn: () => GET_FUNCIONARIOS()
    });

    const { formState: { errors }, ...form } = useFormContext<AgenteType>()
    const [open, setOpen] = useState(false)
  


    async function handleClickNext() {
        const erros = await form.trigger(["name", "pais", "sexo", "estado", "bi", "data_emissao_bi", "data_validade_bi", "data_nascimento"])
        console.log(form.trigger(["name", "pais", "sexo", "estado", "bi", "data_emissao_bi", "data_validade_bi", "data_nascimento"]));
        let Bi = false;
        isSuccessFunc && dataFunc.map((item:any)=>{
            if(item.pessoa.bi.numeroBI === form.getValues("bi")) {
                Bi = true
                toast.warning("Este bi já exite!")
                }
        })
        if(isBefore(form.getValues("data_validade_bi"), form.getValues("data_emissao_bi")))
            toast.warning("A data de validade não pode ser antes da data de Emissão!")
        console.log(erros);
        if (erros && !Bi && !isBefore(form.getValues("data_validade_bi"), form.getValues("data_emissao_bi")))
            setNextStep()
    }
    return (
        <div className="flex flex-col gap-3">
            <h1>Passo 1 - Dados Pessoais</h1>
            <div className="gap-4 flex flex-col">
                <div className="flex flex-col gap-1">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-slate-700">Informe o nome completo do Agente</Label>
                                <FormControl>
                                    <Input className={`${errors.name && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Nome completo" />
                                </FormControl>
                                <FormDescription className="text-red-600">{errors.name && errors.name.message}</FormDescription>
                            </FormItem>
                        )
                        }
                    />
                </div>

                <div className="grid grid-cols-2 gap-2 items-center max-sm:grid-cols-1">
                    <div className="flex flex-col gap-1">
                        <FormField
                            control={form.control}
                            name="sexo"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1">
                                    <Label>Informe o sexo do Agente</Label>
                                    <Select onValueChange={(e) => field.onChange(e)}>
                                        <FormControl>
                                            <SelectTrigger className={`${errors.sexo && "focus-visible:ring-red-600 border-red-600"}`}>
                                                <SelectValue placeholder={`${field.value || "Selecione o sexo"}`} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent >
                                            <SelectItem value="Masculino">Masculino</SelectItem>
                                            <SelectItem value="Feminino">Feminino</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="text-red-600">{errors.sexo && errors.sexo.message}</FormDescription>
                                </FormItem>)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <FormField
                            control={form.control}
                            name="pais"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1">
                                    <Label>Informe a nacionalidade</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <FormControl>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className={`${errors.pais && !field.value && "focus-visible:ring-red-600 border-red-600"}  justify-between`}
                                                >
                                                    {isSuccessPais && field.value? dataPais.find((country: any) => country.idPais === Number(field.value))?.pais : "Selecione a nacionalidade"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                        </FormControl>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Procurar país.." />
                                                <CommandList>
                                                    <CommandEmpty>Nacionalidade nao encontrada</CommandEmpty>
                                                    <CommandGroup>
                                                        {isSuccessPais && dataPais.map((country: any) => (
                                                            <CommandItem
                                                                key={country.idPais}
                                                                value={country.pais}
                                                                onSelect={(currentValue) => {
                                                                    field.onChange(String(country.idPais))
                                                                    setOpen(false)
                                                                }}
                                                                
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        field.value === country.pais ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {country.pais}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription className="text-red-600">{errors.pais && errors.pais.message}</FormDescription>
                                </FormItem>
                            )} />

                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center max-sm:grid-cols-1">
                    <div className="flex flex-col gap-1">
                        <FormField
                            control={form.control}
                            name="estado"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1">
                                    <Label>Informe o estado civil</Label>
                                    <Select onValueChange={(e) => field.onChange(e)}>
                                        <FormControl>
                                            <SelectTrigger className={`${errors.estado && "focus-visible:ring-red-600 border-red-600"}`}>
                                                <SelectValue placeholder={`${field.value || "Selecione o estado civil"}`} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent >
                                            <SelectItem value="Solteiro">Solteiro/a</SelectItem>
                                            <SelectItem value="Casado">Casado/a</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="text-red-600">{errors.estado && errors.estado.message}</FormDescription>
                                </FormItem>)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="data_nascimento"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Label className="text-slate-700">Informe a data de nascimemto</Label>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={`${errors.data_nascimento && "border-red-600"} w-[240px] pl-3 text-left font-normal`}>
                                                    {field.value ? format(field.value, "PPP", { locale: ptBR }) : "Data de nascimento"}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" onSelect={(e) => field.onChange(e)} disabled={(date) => { return date < new Date("1900-01-01") }} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.data_nascimento && errors.data_nascimento.message}</FormDescription>
                                </FormItem>
                            )}
                        />

                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="bi"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Informe o numero de bilhete de identidade</Label>
                                <FormControl>
                                    <Input className={`${errors.bi && "focus-visible:ring-red-600 border-red-600"}`} placeholder="Numero de BI ou Passaporte" {...field} />
                                </FormControl>
                                <FormDescription className="text-red-600">{errors.bi && errors.bi.message}</FormDescription>
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 w-full gap-2 max-sm:grid-cols-1">
                        <FormField
                            control={form.control}
                            name="data_emissao_bi"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Label className="text-slate-700">Informe a data de emissão</Label>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={`${errors.data_emissao_bi && "border-red-600"} w-[240px] pl-3 text-left font-normal`}>
                                                    {field.value ? format(field.value, "PPP", { locale: ptBR }) : "Data de Emissão"}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" onSelect={(e) => field.onChange(e)} disabled={(date) => { return date < new Date("1900-01-01") }} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.data_emissao_bi && errors.data_emissao_bi.message}</FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="data_validade_bi"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Label className="text-slate-700">Informe a data de validade</Label>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={`${errors.data_validade_bi && "border-red-600"} w-[240px] pl-3 text-left font-normal`}>
                                                    {field.value ? format(field.value, "PPP", { locale: ptBR }) : "Data de Validade"}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" onSelect={(e) => field.onChange(e)} disabled={(date) => { return date < new Date("1900-01-01") }} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.data_validade_bi && errors.data_validade_bi.message}</FormDescription>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <DialogClose asChild><Button type="button" variant={"outline"}>Cancelar</Button></DialogClose>
                <Button onClick={handleClickNext} className="bg-blue-600">Proximo</Button>
            </div>
        </div>
    )
}