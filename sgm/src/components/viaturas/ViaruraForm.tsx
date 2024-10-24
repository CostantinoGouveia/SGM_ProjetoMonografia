"use client"
import { FormProvider, useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"

import { use, useEffect, useState } from "react"

import { Progress } from "../ui/progress"
import { useToast } from "../ui/use-toast"
import FirstFormViatura from "./FirstFormViatura"

const schema = z.object({
    MedidasPneumaticos: z.string().max(100, "O campo MedidasPneumaticos deve ter no máximo 100 caracteres"),
    lotacao: z.string().max(100, "O campo lotacao deve ter no máximo 100 caracteres"),
    cilindrada: z.string().max(100, "O campo cilindrada deve ter no máximo 100 caracteres"),
    numeroCilindro: z.string().max(100, "O campo numeroCilindro deve ter no máximo 100 caracteres"),
    conbustivel: z.string().max(100, "O campo conbustivel deve ter no máximo 100 caracteres"),
    peso: z.string().max(100, "O campo peso deve ter no máximo 100 caracteres"),
    tara: z.string().max(100, "O campo tara deve ter no máximo 100 caracteres"),
    tipoCaixa: z.string().max(100, "O campo tipoCaixa deve ter no máximo 100 caracteres"),
    distanciaEixo: z.string().max(100, "O campo distanciaEixo deve ter no máximo 100 caracteres"),
    modelo: z.string().max(200, "O campo modelo deve ter no máximo 200 caracteres"),
    numeroMatricula: z.string().max(50, "O campo numeroMatricula deve ter no máximo 50 caracteres"),
    marca: z.string().optional(),  // Presumindo que este campo seja opcional
    codLivrete: z.number().int().nonnegative("O campo codLivrete deve ser um número inteiro não negativo"),
    codViatura: z.number().int().nonnegative("O campo codViatura deve ser um número inteiro não negativo"),
    codServico: z.number().int().nonnegative("O campo codServico deve ser um número inteiro não negativo"),
    dataEmissao: z.date().refine(date => !isNaN(date.getTime()), "O campo dataEmissao deve ser uma data válida"),
    dataPrimeiroRegistro: z.date().refine(date => !isNaN(date.getTime()), "O campo dataPrimeiroRegistro deve ser uma data válida"),
    numeroQuadro: z.string(),
    corViatura: z.string()
  });

export type viaturaType = z.infer<typeof schema>

export default function ViaturaForm() {
    const form = useForm<viaturaType>({
        resolver: zodResolver(schema)
    })
    const { toast } = useToast()
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
    function handleSaveAutomobilista() {
        toast({
            description: "Automobista salvo com sucesso",
        })
    }
    return (
        <FormProvider {...form}>

            <form onSubmit={form.handleSubmit(handleSubmitAutomobilista)}>
                {step == 1 && <FirstFormViatura setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                {step == 2 && <SecondForm setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                {step == 3 && <ThreeForm setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                {step == 4 && <ViewDataAutomobilista handleClick={handleSaveAutomobilista} data={form.getValues()} handleClickCancel={setPreviusStep} />}
            </form>
        </FormProvider>
    )
}