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

export default function SecondFormViatura({ setNextStep, setPreviusStep }: IStep)
{
    const {formState:{errors}, ...form} = useFormContext<viaturaType>()
    return (
        <div className="flex flex-col gap-3">
        <h1>Passo 1</h1>
        <div className="gap-4 flex flex-col">
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
                                <Input className={`${errors.numeroQuadro && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Numero da matricula" />
                            </FormControl>
                            <FormDescription className="text-red-600">{errors.numeroQuadro && errors.numeroQuadro.message}</FormDescription>
                        </FormItem>
                    )
                    }
                />
            </div>

            <div className="grid grid-cols-2 gap-2 items-center max-sm:grid-cols-1">
                <div className="flex flex-col gap-1">
                    <FormField
                        control={form.control}
                        name="corViatura"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-slate-700">Tipo de combustivel Combustivel</Label>
                                <FormControl>
                                <Select onValueChange={(e) => field.onChange(e)}>
                                        <FormControl>
                                            <SelectTrigger className={`${errors.conbustivel && "focus-visible:ring-red-600 border-red-600"}`}>
                                                <SelectValue placeholder={`${field.value || "Selecione o combustivel" }`} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent >
                                            <SelectItem value="masculino">Gasolina</SelectItem>
                                            <SelectItem value="femenino">Gasoleo</SelectItem>
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
                        name="MedidasPneumaticos"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-slate-700">Tipo de caixa</Label>
                                <FormControl>
                                    <Select onValueChange={(e) => field.onChange(e)}>
                                        <FormControl>
                                            <SelectTrigger className={`${errors.tipoCaixa && "focus-visible:ring-red-600 border-red-600"}`}>
                                                <SelectValue placeholder={`${field.value || "Selecione o tipo de caixa" }`} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent >
                                            <SelectItem value="masculino">Caixa 1</SelectItem>
                                            <SelectItem value="femenino">Caixa 2</SelectItem>
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
                            <FormItem>
                                <Label className="text-slate-700">Informe a Cor da viatura</Label>
                                <FormControl>
                                    <Input className={`${errors.numeroQuadro && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Cor da viatura" />
                                </FormControl>
                                <FormDescription className="text-red-600">{errors.corViatura && errors.corViatura.message}</FormDescription>
                            </FormItem>)}
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
                                <Input className={`${errors.lotacao && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Peso da viatura" />
                            </FormControl>
                        <FormDescription className="text-red-600">{errors.lotacao && errors.lotacao.message}</FormDescription>
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
            <DialogClose asChild><Button type="button" variant={"outline"}>Cancelar</Button></DialogClose>
            <Button onClick={()=>console.log()} className="bg-blue-600">Proximo</Button>
        </div>
    </div>
    )
}