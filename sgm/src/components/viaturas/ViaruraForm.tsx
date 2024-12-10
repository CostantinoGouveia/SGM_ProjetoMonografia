"use client"
import { FormProvider, useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"

import { use, useEffect, useState } from "react"

import { Progress } from "../ui/progress"
import FirstFormViatura from "./FirstFormViatura"
import SecondFormViatura from "./SecondFormViatura"
import ViewDataViatura from "./ViewDataViatura"
import { POST_VIATURA } from "@/routes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from 'react-toastify'


const schema = z.object({
    MedidasPneumaticos: z.string({ required_error: "Campo obrigatorio" }).max(100, "O campo MedidasPneumaticos deve ter no máximo 100 caracteres"),
    lotacao: z.string({ required_error: "Campo obrigatorio" }).max(100, "O campo lotacao deve ter no máximo 100 caracteres").regex(/^\d{1,4}$/, "A penas numero"),
    cilindrada: z.string({ required_error: "Campo obrigatorio" }).max(100, "O campo cilindrada deve ter no máximo 100 caracteres"),
    numeroCilindro: z.string({ required_error: "Campo obrigatorio" }).max(100, "O campo numeroCilindro deve ter no máximo 100 caracteres").regex(/^\d{1,4}$/, "A penas numero"),
    conbustivel: z.string({ required_error: "Campo obrigatorio" }).max(100, "O campo conbustivel deve ter no máximo 100 caracteres"),
    peso: z.string({ required_error: "Campo obrigatorio" }).max(100, "O campo peso deve ter no máximo 100 caracteres"),
    tara: z.string({ required_error: "Campo obrigatorio" }).max(100, "O campo tara deve ter no máximo 100 caracteres"),
    tipoCaixa: z.string({ required_error: "Campo obrigatorio" }).max(100, "O campo tipoCaixa deve ter no máximo 100 caracteres"),
    distanciaEixo: z.string({ required_error: "Campo obrigatorio" }).max(100, "O campo distanciaEixo deve ter no máximo 100 caracteres"),
    modelo: z.string({ required_error: "Campo obrigatorio" }).max(200, "O campo modelo deve ter no máximo 200 caracteres"),
    numeroMatricula: z.string({ required_error: "Campo obrigatorio" }).max(50, "O campo numeroMatricula deve ter no máximo 50 caracteres").regex(/^[A-Z]{2,3}-\d{2}-\d{2}-[A-Z]{2}$/, "O formato deve ser LL-##-##-LL"),
    marca: z.string({ required_error: "Campo obrigatorio" }),  // Presumindo que este campo seja opcional
    codPessoa: z.number({ required_error: "Campo obrigatorio" }).int().nonnegative("O campo proprietario deve ser um número inteiro não negativo"),
    codViatura: z.number().int().nonnegative("O campo codViatura deve ser um número inteiro não negativo"),
    codServico: z.number().int().nonnegative("O campo codServico deve ser um número inteiro não negativo"),
    dataEmissao: z.date({ required_error: "Campo obrigatorio" }).refine(date => !isNaN(date.getTime()), "O campo dataEmissao deve ser uma data válida"),
    dataPrimeiroRegistro: z.date({ required_error: "Campo obrigatorio" }).refine(date => !isNaN(date.getTime()), "O campo dataPrimeiroRegistro deve ser uma data válida"),
    numeroQuadro: z.string({ required_error: "Campo obrigatorio" }),
    numeroEmissao: z.string({ required_error: "Campo obrigatorio" }).regex(/^\d{1,4}$/, "A penas numero"),
    corViatura: z.string({ required_error: "Campo obrigatorio" })
  });

export type viaturaType = z.infer<typeof schema>

export default function ViaturaForm() {
    const queryClient = useQueryClient();

    const form = useForm<viaturaType>({
        resolver: zodResolver(schema)
    })
    function handleSubmitAutomobilista(data: any) {
        console.log(data)
    }

    const [step, setStep] = useState(1)

    const [progressBar, setProgressBar] = useState(0)

    function setPreviusStep() {
        setStep((state) => {
            if (state > 1)
                return state - 1;
            return 0
        })
    }
    function setNextStep() {
        setStep((state) => {
            if (state < 4)
                return state + 1;
            return 0
        })
    }
    const {mutateAsync: createViatura} = useMutation({
        mutationFn:POST_VIATURA,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["get-viaturas"]});
            console.log(data)
            toast.success("Viatura Adicionada com sucesso")
        },
        onError: (error) => {
            console.log(error)
            toast.error("Erro ao adicionar Viatura ")
        }
    })
    function handleSaveViatura() {
        console.log(form.getValues())
        createViatura(form.getValues())
       
    }
    return (
        <FormProvider {...form}>

            <form onSubmit={form.handleSubmit(handleSubmitAutomobilista)}>
                {step == 1 && <FirstFormViatura setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                {step == 2 && <SecondFormViatura setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                {step == 3 && <ViewDataViatura handleClick={handleSaveViatura} data={form.getValues()} handleClickCancel={setPreviusStep} />}
            </form>
        </FormProvider>
    )
}