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
import { cn, COLORS } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { GET_MARCAS, GET_VIATURAS } from "@/routes"
import { toast } from "react-toastify"

export default function FirstFormViatura({ setNextStep, setPreviusStep }: IStep) {
    const { formState: { errors }, ...form } = useFormContext<viaturaType>()
    const [openCor, setOpenCor] = useState(false)
    const [openMarca, setOpenMarca] = useState(false)
    const [open, setOpen] = useState(false)

    const { data: dataMarca, isSuccess: isSuccessMarca } = useQuery({
        queryKey: ['get-marcas'],
        queryFn: GET_MARCAS
    });

    const { data: dataViat, isSuccess: isSuccessViat } = useQuery({
        queryKey: ['get-viat'],
        queryFn: GET_VIATURAS
    });

    async function handleClickNext() {
        const erros = await form.trigger(["numeroQuadro", "numeroMatricula", "conbustivel", "tipoCaixa", "corViatura", "MedidasPneumaticos", "lotacao", "peso", "numeroCilindro", "tara", "cilindrada", "distanciaEixo", "marca", "modelo"])
        console.log("etapa 1",form.getValues())
        let nMatricula = false;
        isSuccessViat && dataViat.map((item:any)=>{
            if(item.numeroMatricula === form.getValues("numeroMatricula")) {
                nMatricula = true
                 toast.warning("Este numero de Matricula já exite!")
                }
        })
        console.log(erros);
        if (erros && !nMatricula)
            setNextStep()
    }
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-blue-600">Passo 1 - Dados refente a Viatura</h1>
            <div className="gap-4 flex flex-col">
                <div className="grid grid-cols-2 gap-2 items-center max-sm:grid-cols-1">
                    <div className="flex flex-col gap-1">

                        <FormField
                            control={form.control}
                            name="marca"
                            render={({ field }) => (
                                
                                <FormItem className="flex flex-col gap-1">
                                    <Label>Informe a Marca da Viatura</Label>
                                    <Popover open={openMarca} onOpenChange={setOpenMarca}>
                                        <FormControl>
                                            <PopoverTrigger asChild className={`${errors.marca && !field.value && "focus-visible:ring-red-600 border-red-600"}`}>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openMarca}
                                                    className="w-fu justify-between">
                                                    {isSuccessMarca && field.value ? dataMarca.find((country: any) => country.codMarca === Number(field.value))?.descMarca : "Selecione a Marca"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                        </FormControl>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Procurar categoria da carta de conducao.." />
                                                <CommandList>
                                                    <CommandEmpty>marca nao encontrada</CommandEmpty>
                                                    <CommandGroup>
                                                        {isSuccessMarca && dataMarca.map((categoria: any) => (
                                                            <CommandItem
                                                                key={categoria.codMarca}
                                                                value={String(categoria.descMarca)}
                                                                onSelect={(currentValue) => {
                                                                    form.setValue("marca", String(categoria.codMarca))
                                                                    setOpenMarca(false)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        field.value === categoria.descMarca ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {categoria.descMarca}
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
                    <div className="flex flex-col gap-1">
                        <FormField
                            control={form.control}
                            name="modelo"
                            render={({ fieldState, field }) => (
                                <FormItem>
                                    <Label className="text-slate-700">Informe o modelo</Label>
                                    <FormControl>
                                        <Input className={`${errors.modelo && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="modelo" />
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.modelo && errors.modelo.message}</FormDescription>
                                </FormItem>
                            )
                            }
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center max-sm:grid-cols-1">
                    <div className="flex flex-col gap-1">
                        <FormField
                            control={form.control}
                            name="numeroQuadro"
                            render={({ fieldState, field }) => (
                                <FormItem>
                                    <Label className="text-slate-700">Informe o Numero de quadro</Label>
                                    <FormControl>
                                        <Input className={`${errors.numeroQuadro && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Numero de quadro" />
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.numeroQuadro && errors.numeroQuadro.message}</FormDescription>
                                </FormItem>
                            )
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <FormField
                            control={form.control}
                            name="numeroMatricula"
                            render={({ fieldState, field }) => (
                                <FormItem>
                                    <Label className="text-slate-700">Informe a matricula</Label>
                                    <FormControl>
                                        <Input className={`${errors.numeroMatricula && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Numero da matricula" />
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.numeroMatricula && errors.numeroMatricula.message}</FormDescription>
                                </FormItem>
                            )
                            }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 items-center max-sm:grid-cols-1">
                    <div className="flex flex-col gap-1">
                        <FormField
                            control={form.control}
                            name="conbustivel"
                            render={({ field }) => (
                                <FormItem>
                                    <Label className="text-slate-700">Tipo de combustivel Combustivel</Label>
                                    <FormControl>
                                        <Select onValueChange={(e) => field.onChange(e)}>
                                            <FormControl>
                                                <SelectTrigger className={`${errors.conbustivel && "focus-visible:ring-red-600 border-red-600"}`}>
                                                    <SelectValue placeholder={`${field.value || "Selecione o combustivel"}`} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent >
                                                <SelectItem value="Gasolina">Gasolina</SelectItem>
                                                <SelectItem value="Gasoleo">Gasoleo</SelectItem>
                                                <SelectItem value="Electrico">Electrico</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.conbustivel && errors.conbustivel.message}</FormDescription>
                                </FormItem>)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <FormField
                            control={form.control}
                            name="tipoCaixa"
                            render={({ field }) => (
                                <FormItem>
                                    <Label className="text-slate-700">Tipo de caixa</Label>
                                    <FormControl>
                                        <Select onValueChange={(e) => field.onChange(e)}>
                                            <FormControl>
                                                <SelectTrigger className={`${errors.tipoCaixa && "focus-visible:ring-red-600 border-red-600"}`}>
                                                    <SelectValue placeholder={`${field.value || "Selecione o tipo de caixa"}`} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent >
                                                <SelectItem value="Manual">Manual</SelectItem>
                                                <SelectItem value="Automático">Automático</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.tipoCaixa && errors.tipoCaixa.message}</FormDescription>
                                </FormItem>
                            )} />

                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 items-center max-sm:grid-cols-1">
                    <div className="flex flex-col gap-1">

                        <FormField
                            control={form.control}
                            name="corViatura"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Label className="text-slate-700">Informe a Cor da viatura</Label>
                                    <Popover open={openCor} onOpenChange={setOpenCor}>
                                        <FormControl>
                                            <PopoverTrigger asChild className={`${errors.corViatura && !field.value && "focus-visible:ring-red-600 border-red-600"}`}>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="w-fu justify-between text-slate-700"
                                                >
                                                    {field.value || "Selecione a Cor da viatura"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                        </FormControl>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Procurar cor.." />
                                                <CommandList>
                                                    <CommandEmpty>Cor não encontrada</CommandEmpty>
                                                    <CommandGroup>
                                                        {COLORS.map((item: any) => (
                                                            <CommandItem
                                                                key={item.id}
                                                                value={item.name}
                                                                onSelect={(currentValue) => {
                                                                    form.setValue("corViatura", currentValue)
                                                                    setOpenCor(false)
                                                                }
                                                                }
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        field.value === item.name ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {item.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription className="text-red-600">{errors.corViatura && !field.value && errors.corViatura.message}</FormDescription>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <FormField
                            control={form.control}
                            name="MedidasPneumaticos"
                            render={({ field }) => (
                                <FormItem>
                                    <Label className="text-slate-700">Informe as medidas pneumaticas</Label>
                                    <FormControl>
                                        <Input className={`${errors.MedidasPneumaticos && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Medidas pneumaticos" />
                                    </FormControl>
                                    <FormDescription className="text-red-600">{errors.MedidasPneumaticos && errors.MedidasPneumaticos.message}</FormDescription>
                                </FormItem>
                            )} />

                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <FormField
                        control={form.control}
                        name="lotacao"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-slate-700">Informe a lotacao da viatura</Label>
                                <FormControl>
                                    <Input className={`${errors.lotacao && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Lotacao da viatura" />
                                </FormControl>
                                <FormDescription className="text-red-600">{errors.lotacao && errors.lotacao.message}</FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="peso"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-slate-700">Informe o peso da viatura <span className="text-sm text-muted">(Kz)</span></Label>
                                <FormControl>
                                    <Input className={`${errors.peso && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Peso da viatura" />
                                </FormControl>
                                <FormDescription className="text-red-600">{errors.peso && errors.peso.message}</FormDescription>
                            </FormItem>
                        )}
                    />
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
                    <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-2 w-full gap-2 max-sm:grid-cols-1">
                            <FormField
                                control={form.control}
                                name="cilindrada"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label className="text-slate-700">Informe o numero de cilindrada</Label>
                                        <FormControl>
                                            <Input className={`${errors.cilindrada && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Numero de cilindrada" />
                                        </FormControl>
                                        <FormDescription className="text-red-600">{errors.cilindrada && errors.cilindrada.message}</FormDescription>
                                    </FormItem>
                                )}
                            />
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

            </div>

            <div className="flex justify-between mt-4">
                <DialogClose asChild><Button type="button" variant={"outline"}>Cancelar</Button></DialogClose>
                <Button onClick={() => handleClickNext()} className="bg-blue-600">Proximo</Button>
            </div>
        </div>
    )
}