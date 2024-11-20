import { useFormContext, useFormState } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AutomobilistaType } from "./AutomobilistaForm";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { ICountry, IStep } from "./FirstForm";
import { FormControl, FormDescription, FormField, FormItem } from "../ui/form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn, MUNICIPIOS, PROVINCES } from "@/lib/utils";
import { GET_MUNICIPIOS, GET_PROVINCIAS } from "@/routes";
import { useQuery } from "@tanstack/react-query";

export default function SecondForm({ setNextStep, setPreviusStep }: IStep) {
    async function getCountrys() {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flag")
        const json = await response.json() as ICountry[]
        setCountry(json.reverse())
    }
    const { register } = useFormContext<AutomobilistaType>()
    const { formState: { errors }, ...form } = useFormContext<AutomobilistaType>()
   // const form = useFormContext<AutomobilistaType>()

    const [openProvince, setOpenProvince] = useState(false)
    const [open, setOpen] = useState(false)
    const [openMunicipe, setOpenMunicipe] = useState(false)
    const [countrys, setCountry] = useState<ICountry[]>()

    const { data: dataProv, isSuccess: isSuccessProv } = useQuery({
        queryKey: ['get-provincias'],
        queryFn: GET_PROVINCIAS
    });
    const { data: dataMuni, isSuccess: isSuccessMuni } = useQuery({
        queryKey: ['get-municipios'],
        queryFn: GET_MUNICIPIOS
    });
    const [selectMuni, setSelectMuni] = useState([])

    function filtrar(e: any) {
        if (isSuccessProv && isSuccessMuni && dataMuni) {
            const results2 = dataMuni.filter((item: any) =>
                item.idProvincia === e
            )
            setSelectMuni(results2);
        } else {
            setSelectMuni([])
        }
    }

    useEffect(() => {
        getCountrys()
    }, [])
    //console.log(countrys)

    async function handleClickNext() {
        const erros = await form.trigger(["telemovel", "email", "province", "municipio", "endereco"])
        console.log(form.trigger(["telemovel", "email", "province", "municipio", "endereco"]));
        console.log(erros);
        if(erros)
            setNextStep()
    }
    return (
        <div className="flex flex-col gap-4">
            <h1>Passo 2 - Contactos</h1>
            <div className="grid grid-cols-2 items-center gap-2">
                <div className="flex flex-col gap-2">
                <FormField
                    control={form.control}
                        name="telemovel"
                        render={({fieldState,field}) => (
                            <FormItem className="flex flex-col gap-1">
                                <Label>Informe o contacto</Label>
                                <FormControl>
                                    <Input  className={`${errors.telemovel && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Numero de telemovel"/>
                                </FormControl>
                                <FormDescription className="text-red-600">{errors.telemovel && errors.telemovel.message}</FormDescription>
                            </FormItem>
                        )     
                        }
                    />
                </div>
                <div className="flex flex-col gap-2">
                <FormField
                    control={form.control}
                        name="telemovel_alternativo"
                        render={({fieldState,field}) => (
                            <FormItem className="flex flex-col gap-1">
                                <Label>Informe o contacto alternativo</Label>
                                <FormControl>
                                    <Input {...field} placeholder="Numero de telemovel alternativo"/>
                                </FormControl>
                             </FormItem>
                        )     
                        }
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
            <FormField
                    control={form.control}
                        name="email"
                        render={({fieldState,field}) => (
                            <FormItem className="flex flex-col gap-1">
                                <Label>Informe o email</Label>
                                <FormControl>
                                    <Input  className={`${errors.email && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Endereço de email"/>
                                </FormControl>
                                <FormDescription className="text-red-600">{errors.email && errors.email.message}</FormDescription>
                            </FormItem>
                        )     
                        }
                    />
            </div>
            <div className="flex flex-col gap-2">
            <FormField
                    control={form.control}
                        name="email_alternativo"
                        render={({fieldState,field}) => (
                            <FormItem className="flex flex-col gap-1">
                                <Label>Informe o email alternativo</Label>
                                <FormControl>
                                    <Input  {...field} placeholder="Endereço de email alternativo"/>
                                </FormControl>
                            </FormItem>
                        )     
                        }
                    />
            </div>

            <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
                <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <Label>Informe a provincia</Label>
                            <Popover open={openProvince} onOpenChange={setOpenProvince}>
                                <FormControl>
                                    <PopoverTrigger asChild className={`${errors.province && !field.value && "focus-visible:ring-red-600 border-red-600"}`}>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-fu justify-between"
                                        >
                                            {isSuccessProv && field.value? dataProv.find((country: any) => country.idProvincia === Number(field.value))?.provincia : "Selecione a provincia"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                </FormControl>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Procurar provincia.." />
                                        <CommandList>
                                            <CommandEmpty>Provincia nao encontrada</CommandEmpty>
                                            <CommandGroup>
                                                {isSuccessProv && dataProv.map((province: any) => (
                                                    <CommandItem
                                                        key={province.idProvincia}
                                                        value={province.provincia}
                                                        onSelect={(currentValue) => {
                                                            form.setValue("province", String(province.idProvincia))
                                                            filtrar(province.idProvincia)
                                                            setOpenProvince(false)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                field.value === province.idProvincia ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {province.provincia}
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
                <FormField
                    control={form.control}
                    name="municipio"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <Label>Informe o municipio</Label>
                            <Popover open={openMunicipe} onOpenChange={setOpenMunicipe}>
                                <FormControl>
                                    <PopoverTrigger asChild className={`${errors.municipio && !field.value && "focus-visible:ring-red-600 border-red-600"}`}>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-fu justify-between"
                                        >
                                            {isSuccessMuni && field.value? dataMuni.find((country: any) => country.idMunicipio === Number(field.value))?.municipio : "Selecione o municipio"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                </FormControl>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Procurar municipio.." />
                                        <CommandList>
                                            <CommandEmpty>Municipio nao encontrado</CommandEmpty>
                                            <CommandGroup>
                                                {selectMuni.map((municipio: any) => (
                                                    <CommandItem
                                                        key={municipio.idMunicipio}
                                                        value={String(municipio.municipio)}
                                                        onSelect={(currentValue) => {
                                                            form.setValue("municipio", String(municipio.idMunicipio))
                                                            console.log(form.getValues())
                                                            setOpenMunicipe(false)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                field.value === municipio.idMunicipio ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {municipio.municipio}
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
            <div>
            <FormField
                    control={form.control}
                        name="endereco"
                        render={({fieldState,field}) => (
                            <FormItem className="flex flex-col gap-1">
                                <Label>Informe o Endereço</Label>
                                <FormControl>
                                    <Input  className={`${errors.endereco && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Endereço"/>
                                </FormControl>
                                <FormDescription className="text-red-600">{errors.endereco && errors.endereco.message}</FormDescription>
                            </FormItem>
                        )     
                        }
                    />
            </div>
            <div className="flex justify-between mt-4">
                <Button onClick={() => setPreviusStep()} variant={"outline"}>Anterior</Button>
                <Button onClick={() => handleClickNext()} className="bg-blue-600">Proximo</Button>
            </div>
        </div>
    )
}