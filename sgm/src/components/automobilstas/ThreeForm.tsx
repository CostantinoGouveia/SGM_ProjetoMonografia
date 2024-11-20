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
import { GET_CATEGORIASCARTA } from "@/routes"

export default function ThreeForm({setNextStep,setPreviusStep}: IStep) {
    async function getCountrys() {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flag")
        const json = await response.json() as ICountry[]
        setCountry(json.reverse())
    }

    const { data:dataCategoriaCarta, isSuccess:isSuccessCategCarta } = useQuery({
        queryKey: ['get-caterias-carta'],
        queryFn: () => GET_CATEGORIASCARTA()
    });
    const [countrys, setCountry] = useState<ICountry[]>()
    useEffect(()=>{
        getCountrys()
    },[])
    const { formState: { errors }, ...form } = useFormContext<AutomobilistaType>()
    //const form = useFormContext<AutomobilistaType>()
    const [openCartaCategoria, setCartaCategoria] = useState(false)

    async function handleClickNext() {
        const erros = await form.trigger(["numero_carta", "numero_via", "local_emissao", "data_emissao_carta_conducao", "data_validade_carta", "data_primeira_emissao_carta", "categoria"])
        if (erros)
            setNextStep()
    }
   return (
    <div className="flex flex-col gap-3">
            <h1>Passo 3 - Dados da carta de Condução</h1>
            <div className="gap-4 flex flex-col">
                <div className="">
                    <FormField
                    control={form.control}
                        name="numero_carta"
                        render={({fieldState,field}) => (
                            <FormItem className="flex flex-col gap-1">
                                <Label>Informe o numero da carta de condução</Label>
                                <FormControl>
                                    <Input  className={`${errors.numero_carta && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Numero da carta de condução"/>
                                </FormControl>
                                <FormDescription className="text-red-600">{errors.numero_carta && errors.numero_carta.message}</FormDescription>
                            </FormItem>
                        )     
                        }
                    />

                    <FormField  
                        control={form.control}
                        name="numero_via"
                        render={({fieldState,field}) => (
                            <FormItem>
                                <Label className="text-slate-700">Informe o numero de via</Label>
                                <FormControl>
                                    <Input  className={`${errors.numero_via && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Numero de via"/>
                                </FormControl>
                                <FormDescription className="text-red-600">{errors.numero_via && errors.numero_via.message}</FormDescription>
                            </FormItem>
                        )     
                        }
                    />
                </div>
                <div>
                  
                    <FormField
                            control={form.control}
                            name="local_emissao"
                            render={({field}) => (
                                <FormItem>
                                    <Label>Informe o local de emissão</Label>
                                    <FormControl>
                                        <Input placeholder="Local de emissão"  className={`${errors.local_emissao && "focus-visible:ring-red-600 border-red-600"}`} {...field}/>
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.local_emissao && errors.local_emissao.message}</FormDescription>
                                </FormItem>
                            )}
                            /> 
             
                </div>
                
            

            <div className="flex flex-col gap-3">
                   <div className="grid grid-cols-2 w-full  max-sm:grid-cols-1">
                            <FormField
                                control={form.control}
                                name="data_emissao_carta_conducao"
                                render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <Label className="">Informe a data de emissão da carta de condução</Label>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild >
                                                <Button variant={"outline"}  className={`${errors.data_emissao_carta_conducao && "border-red-600"} w-[240px] pl-3 text-left font-normal`}> 
                                                    {field.value ? format(field.value,"PPP",{locale:ptBR}) : "Data de Emissão"}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar  mode="single" onSelect={ (e) => field.onChange(e) } disabled={(date) => {  return date < new Date("1900-01-01")}} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.data_emissao_carta_conducao && errors.data_emissao_carta_conducao.message}</FormDescription>
                                </FormItem>
                            )}
                            />
                            <FormField
                                control={form.control}
                                name="data_validade_carta"
                                render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <Label>Informe a data de validade da carta de condução</Label>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={`${errors.data_validade_carta && "border-red-600"} w-[240px] pl-3 text-left font-normal`}> 
                                                    {field.value ? format(field.value,"PPP",{locale:ptBR}) : "Data de Validade"}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar  mode="single" onSelect={ (e) => field.onChange(e) } disabled={(date) => {  return date < new Date("1900-01-01")}} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.data_validade_carta && errors.data_validade_carta.message}</FormDescription>
                                </FormItem>
                            )}
                            />
                    </div>

                    <div className="grid grid-cols-2 gap-1 max-sm:grid-cols-1">
                            <FormField
                                control={form.control}
                                name="data_primeira_emissao_carta"
                                render={({field}) => (
                                    <FormItem className="flex flex-col ">
                                        <Label className="text-slate-700">Informe a primeira data de emissao</Label>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant={"outline"} className={`${errors.data_primeira_emissao_carta && "border-red-600"} w-full pl-3 text-left font-normal`}> 
                                                        {field.value ? format(field.value,"PPP",{locale:ptBR}) : "Data da primeira emissão"}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar  mode="single" onSelect={ (e) => field.onChange(e) } disabled={(date) => {  return date < new Date("1900-01-01")}} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                        </FormControl>
                                        <FormDescription className="text-red-600">{errors.data_primeira_emissao_carta && errors.data_primeira_emissao_carta.message}</FormDescription>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="categoria"
                                render={({field}) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <Label>Informe a catergoria da carta</Label>
                                        <Popover open={openCartaCategoria} onOpenChange={setCartaCategoria}>
                                            <FormControl>  
                                                <PopoverTrigger asChild  className={`${errors.categoria && !field.value && "focus-visible:ring-red-600 border-red-600"}`}>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={openCartaCategoria}
                                                        className="w-fu justify-between">
                                                        {isSuccessCategCarta && field.value? dataCategoriaCarta.find((country: any) => country.codCategoriaCarta === Number(field.value))?.descCategoriaCarta : "Selecione a categoria"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                            </FormControl>
                                                <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                <CommandInput placeholder="Procurar categoria da carta de conducao.." />
                                                <CommandList>
                                                    <CommandEmpty>categoria nao encontrada</CommandEmpty>
                                                    <CommandGroup>
                                                    {isSuccessCategCarta && dataCategoriaCarta.map((categoria:any) => (
                                                        <CommandItem
                                                        key={categoria.codCategoriaCarta}
                                                        value={String(categoria.codCategoriaCarta)}
                                                        onSelect={(currentValue) => {
                                                            form.setValue("categoria",currentValue)
                                                            setCartaCategoria(false)
                                                        }}
                                                        >
                                                        <Check
                                                            className={cn(
                                                            "mr-2 h-4 w-4",
                                                            field.value === categoria.descCategoriaCarta ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {categoria.descCategoriaCarta}
                                                        </CommandItem>
                                                    ))}
                                                    </CommandGroup>
                                                </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription className="text-red-600">{errors.categoria && errors.categoria.message}</FormDescription>
                                    </FormItem>
                                        )}
                                />
                    </div>
                
                    
                </div>
            </div>
           
            <div className="flex justify-between mt-4">
                <Button onClick={() => setPreviusStep()} variant={"outline"}>Anterior</Button>
                <Button onClick={() => handleClickNext()} className="bg-blue-600">Finalizar</Button>
            </div>
    </div>
   ) 
}