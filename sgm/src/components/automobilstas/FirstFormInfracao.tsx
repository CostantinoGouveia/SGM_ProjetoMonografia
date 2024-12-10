"use client"
import { useFormContext, useFormState } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { FormControl, FormDescription, FormField, FormItem } from "../ui/form";
import { useQuery } from "@tanstack/react-query";
import { GET_PAISES } from "@/routes";
import { InfracaoType } from "./InfracaoForm";


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


export default function FirstFormInfracao({ setNextStep, setPreviusStep }: IStep) {

    async function getCountrys() {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flag")
        const json = await response.json() as ICountry[]
        setCountry(json.reverse())
    }

    const { data: dataPais, isSuccess: isSuccessPais } = useQuery({
        queryKey: ['get-pais'],
        queryFn: () => GET_PAISES()
    });

    const { formState: { errors }, ...form } = useFormContext<InfracaoType>()
    const [open, setOpen] = useState(false)
    const [countrys, setCountry] = useState<ICountry[]>()
    useEffect(() => {
        getCountrys()
    }, [])


    async function handleClickNext() {
        const erros = await form.trigger(["descTipoInfracao", "valorTipoInfracao"])
        console.log(erros);
        if (erros)
            setNextStep()
    }
    return (
        <div className="flex flex-col gap-3">
            <h1>Passo 1 - Dados Pessoais</h1>
            <div className="gap-4 flex flex-col">
                <div className="flex flex-col gap-1">
                    <FormField
                        control={form.control}
                        name="descTipoInfracao"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-slate-700">Informe a Infração</Label>
                                <FormControl>
                                    <Input className={`${errors.descTipoInfracao && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="Escreva a Infracao" />
                                </FormControl>
                                <FormDescription className="text-red-600">{errors.descTipoInfracao && errors.descTipoInfracao.message}</FormDescription>
                            </FormItem>
                        )
                        }
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <FormField
                        control={form.control}
                        name="valorTipoInfracao"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-slate-700">Informe o valor da Infracao em UCF</Label>
                                <FormControl>
                                    <Input className={`${errors.valorTipoInfracao && "focus-visible:ring-red-600 border-red-600"}`} {...field} placeholder="valor da Infracao em UCF" />
                                </FormControl>
                                <FormDescription className="text-red-600">{errors.valorTipoInfracao && errors.valorTipoInfracao.message}</FormDescription>
                            </FormItem>
                        )
                        }
                    />
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <DialogClose asChild><Button type="button" variant={"outline"}>Cancelar</Button></DialogClose>
                <Button onClick={handleClickNext} className="bg-blue-600">visualizar</Button>
            </div>
        </div>
    )
}