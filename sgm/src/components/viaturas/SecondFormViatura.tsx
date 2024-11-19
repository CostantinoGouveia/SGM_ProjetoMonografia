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

    isSuccessAutomo && (console.log(dataAutomo)
    )
    async function handleClickNext() {
        console.log("etapa 2",form.getValues())
        
    }
    return (
        <div className="flex flex-col gap-3">
            <h1>Passo 1</h1>
            <div className="gap-4 flex flex-col">
                <div className="flex flex-col gap-1">
                    <FormField
                        control={form.control}
                        name="codPessoa"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1">
                                <Label>Informe o Proprietario da viatura</Label>
                                <Popover open={openPessoa} onOpenChange={setOpenPessoa}>
                                    <FormControl>
                                        <PopoverTrigger asChild className={`${errors.marca && !field.value && "focus-visible:ring-red-600 border-red-600"}`}>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openPessoa}
                                                className="w-fu justify-between">
                                                {isSuccessAutomo && field.value ? dataAutomo.find((country: any) => country.pessoa.codPessoa === Number(field.value))?.pessoa.nome : "Selecione a categoria"}
                                                <ChevronsUpDown className="ml-2 h-4 w-8 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                    </FormControl>
                                    <PopoverContent className="w-[500px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Procurar categoria da carta de conducao.." />
                                            <CommandList>
                                                <CommandEmpty>marca nao encontrada</CommandEmpty>
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
                                <FormDescription className="text-red-600">{errors.marca && !field.value && errors.marca.message}</FormDescription>
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
                                    <Label className="text-slate-700">Informe a data de nascimemto</Label>
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

                    <div className="grid grid-cols-2 w-full gap-2 max-sm:grid-cols-1">
                        <FormField
                            control={form.control}
                            name="numeroCilindro"
                            render={({ field }) => (
                                <FormItem>
                                    <Label className="text-slate-700">Informe o numero de cilindro da viatura</Label>
                                    <FormControl>
                                        <Input className={`${errors.numeroCilindro && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Numero de cilindro da viatura" />
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.numeroCilindro && errors.numeroCilindro.message}</FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tara"
                            render={({ field }) => (
                                <FormItem>
                                    <Label className="text-slate-700">Informe a tara da viatura</Label>
                                    <FormControl>
                                        <Input className={`${errors.tara && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Tara da viatura" />
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.tara && errors.tara.message}</FormDescription>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <FormField
                            control={form.control}
                            name="distanciaEixo"
                            render={({ fieldState, field }) => (
                                <FormItem>
                                    <Label className="text-slate-700">Distancia de eixo</Label>
                                    <FormControl>
                                        <Input className={`${errors.numeroQuadro && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Distancia de eixo" />
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.numeroQuadro && errors.numeroQuadro.message}</FormDescription>
                                </FormItem>
                            )
                            }
                        />
                    </div>
                </div>

            </div>

            <div className="flex justify-between mt-4">
                <div className="flex justify-between mt-4">
                    <Button onClick={() => setPreviusStep()} variant={"outline"}>Anterior</Button>
                    <Button onClick={() => handleClickNext()} className="bg-blue-600">Proximo</Button>
                </div>
            </div>
        </div>
    )
}