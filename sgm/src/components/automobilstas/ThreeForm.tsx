 "use client"
import { DialogClose } from "@radix-ui/react-dialog"
import { FormControl, FormField, FormItem } from "../ui/form"
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

export default function ThreeForm({setNextStep,setPreviusStep}: IStep) {
    async function getCountrys() {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flag")
        const json = await response.json() as ICountry[]
        setCountry(json.reverse())
    }
    const [countrys, setCountry] = useState<ICountry[]>()
    useEffect(()=>{
        getCountrys()
    },[])
    const form = useFormContext<AutomobilistaType>()
    const [openCartaCategoria, setCartaCategoria] = useState(false)
   return (
    <div className="flex flex-col gap-3">
            <h1>Passo 3</h1>
            <div className="gap-4 flex flex-col">
                <div className="">
                    <FormField
                    control={form.control}
                        name="numero_carta"
                        render={({fieldState,field}) => (
                            <FormItem className="flex flex-col gap-1">
                                <Label>Informe o numero da carta de conducao</Label>
                                <FormControl>
                                    <Input {...field} placeholder="Numero da carta de condução"/>
                                </FormControl>
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
                                    <Input {...field} placeholder="Numero de via"/>
                                </FormControl>
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
                                        <Input placeholder="Local de emissão" {...field}/>
                                    </FormControl>
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
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={"w-[200px] pl-3 text-left font-normal"}> 
                                                    {field.value ? format(field.value,"PPP",{locale:ptBR}) : "Data de Emissão"}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar  mode="single" onSelect={ (e) => field.onChange(String(e)) } disabled={(date) => {  return date < new Date("1900-01-01")}} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                    </FormControl>
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
                                                <Button variant={"outline"} className={"w-[240px] pl-3 text-left font-normal"}> 
                                                    {field.value ? format(field.value,"PPP",{locale:ptBR}) : "Data de Validade"}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar  mode="single" onSelect={ (e) => field.onChange(String(e)) } disabled={(date) => {  return date < new Date("1900-01-01")}} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                    </FormControl>
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
                                                    <Button variant={"outline"} className={"w-full pl-3 text-left font-normal"}> 
                                                        {field.value ? format(field.value,"PPP",{locale:ptBR}) : "Data da primeira emissão"}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar  mode="single" onSelect={ (e) => field.onChange(String(e)) } disabled={(date) => {  return date < new Date("1900-01-01")}} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                        </FormControl>
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
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={openCartaCategoria}
                                                        className="w-fu justify-between">
                                                        {field.value || "Selecione a categoria"}
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
                                                    {CATE && CATE.map((categoria) => (
                                                        <CommandItem
                                                        key={categoria.name}
                                                        value={categoria.name}
                                                        onSelect={(currentValue) => {
                                                            form.setValue("categoria",currentValue)
                                                            setCartaCategoria(false)
                                                        }}
                                                        >
                                                        <Check
                                                            className={cn(
                                                            "mr-2 h-4 w-4",
                                                            field.value === categoria.name ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {categoria.name}
                                                        </CommandItem>
                                                    ))}
                                                    </CommandGroup>
                                                </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                        )}
                                />
                    </div>
                
                    
                </div>
            </div>
           
            <div className="flex justify-between mt-4">
                <Button onClick={() => setPreviusStep()} variant={"outline"}>Anterior</Button>
                <Button onClick={() => { setNextStep()}} className="bg-blue-600">Finalizar</Button>
            </div>
    </div>
   ) 
}