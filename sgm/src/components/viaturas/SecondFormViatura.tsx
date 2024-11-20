import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { FormControl, FormDescription, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Calendar } from "../ui/calendar"
import { DialogClose } from "../ui/dialog"
import { format } from "date-fns"
import { useForm, useFormContext } from "react-hook-form"
import { viaturaType } from "./ViaruraForm"
import { IStep } from "../automobilstas/FirstForm"
import { ptBR } from "date-fns/locale/pt-BR"
import { useState } from "react"
import { GET_AUTOMOBILISTAS } from "@/routes"
import { useQuery } from "@tanstack/react-query"
import { cn } from "@/lib/utils"

export default function SecondFormViatura({ setNextStep, setPreviusStep }: IStep) {
    const { formState: { errors }, ...form } = useFormContext<viaturaType>()
    const [openPessoa, setOpenPessoa] = useState(false)

    const { data: dataAutomo, isSuccess: isSuccessAutomo } = useQuery({
        queryKey: ['get-automobilistas'],
        queryFn: GET_AUTOMOBILISTAS

    });
    async function handleClickNext() {
        const erros = await form.trigger(["codPessoa", "dataEmissao", "dataPrimeiroRegistro", "numeroEmissao"])
        console.log("etapa 2",form.getValues())
        if (erros)
            setNextStep()        
    }
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-blue-600 bold">Passo 2 - Dados referente ao Titular</h1>
            <div className="gap-4 flex flex-col">
                <div className="flex flex-col gap-1">
                    <FormField
                        control={form.control}
                        name="codPessoa"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1">
                                <Label>Informe o Titular da viatura</Label>
                                <Popover open={openPessoa} onOpenChange={setOpenPessoa}>
                                    <FormControl>
                                        <PopoverTrigger asChild className={`${errors.codPessoa && !field.value && "focus-visible:ring-red-600 border-red-600"}`}>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openPessoa}
                                                className="w-fu justify-between">
                                                {isSuccessAutomo && field.value ? dataAutomo.find((country: any) => country.pessoa.codPessoa === Number(field.value))?.pessoa.nome : "Selecione o Titular"}
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
                                                    {isSuccessAutomo && dataAutomo.map((automobilista: any) => (
                                                        <CommandItem
                                                            key={automobilista.codAutomobilista}
                                                            value={automobilista.pessoa.nome + automobilista.pessoa.bi.numeroBI + automobilista.cartaconducao.numeroCarta}
                                                            onSelect={(currentValue) => {
                                                                form.setValue("codPessoa", automobilista.pessoa.codPessoa)
                                                                setOpenPessoa(false)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    field.value === automobilista.pessoa.codPessoa ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {automobilista.pessoa.nome} / 
                                                            {automobilista.pessoa.bi.numeroBI} / 
                                                            {automobilista.cartaconducao.numeroCarta}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription className="text-red-600">{errors.codPessoa && !field.value && errors.codPessoa.message}</FormDescription>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2 items-center max-sm:grid-cols-1">
                    <div className="flex flex-col gap-1">
                        <FormField
                            control={form.control}
                            name="dataEmissao"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Label className="text-slate-700">Informe a data de Emissão do titulo</Label>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={`${errors.dataEmissao && "border-red-600"} w-[240px] pl-3 text-left font-normal`}>
                                                    {field.value ? format(field.value, "PPP", { locale: ptBR }) : "Data de Emissao"}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" onSelect={(e) => field.onChange(e)} disabled={(date) => { return date < new Date("1900-01-01") }} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.dataEmissao && errors.dataEmissao.message}</FormDescription>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <FormField
                            control={form.control}
                            name="dataPrimeiroRegistro"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Label className="text-slate-700">Informe a data do primeiro registro</Label>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={`${errors.dataPrimeiroRegistro && "border-red-600"} w-[240px] pl-3 text-left font-normal`}>
                                                    {field.value ? format(field.value, "PPP", { locale: ptBR }) : "Data do Primeiro Registro"}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" onSelect={(e) => field.onChange(e)} disabled={(date) => { return date < new Date("1900-01-01") }} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.dataPrimeiroRegistro && errors.dataPrimeiroRegistro.message}</FormDescription>
                                </FormItem>
                            )}
                        />

                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <FormField
                            control={form.control}
                            name="numeroEmissao"
                            render={({ fieldState, field }) => (
                                <FormItem>
                                    <Label className="text-slate-700">Número de Emissão</Label>
                                    <FormControl>
                                        <Input className={`${errors.numeroEmissao && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Nº de Emissão" />
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.numeroEmissao && errors.numeroEmissao.message}</FormDescription>
                                </FormItem>
                            )
                            }
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