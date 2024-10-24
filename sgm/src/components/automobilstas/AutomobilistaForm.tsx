"use client"
import { FormProvider, useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import FirstForm from "./FirstForm"
import { use, useEffect, useState } from "react"
import SecondForm from "./SecondForm"
import ThreeForm from "./ThreeForm"
import { Progress } from "../ui/progress"
import ViewDataAutomobilista from "./ViewDataAutomobilista"
import { useToast } from "../ui/use-toast"


const scheemaAutomobilista = z.object({
    name: z.string({ required_error: "Campo obrigatorio" }).min(3, "Preencha o nome completo"),
    email: z.string().email("O email não é válido"),
    email_alternativo: z.string().email(),
    data_nascimento: z.date({ required_error: "A data de nascimento nao é válida" }),
    pais: z.string({ required_error: "Campo Nacionalidade é obrigatório" }),
    bi: z.string({ required_error: "Campo bilhete de identitidade obrigatorio" }).min(10, "informe um numero de bi válido"),
    telemovel: z.string(),
    telemovel_alternativo: z.string(),
    endereco: z.string(),
    categoria: z.string(),
    data_emissao_carta_conducao: z.date(),
    data_primeira_emissao_carta: z.date(),
    numero_carta: z.string(),
    data_validade_carta: z.date(),
    local_emissao: z.string(),
    numero_via: z.string(),
    data_emissao_bi: z.date({ required_error: "A data de emissão nao é válida" }),
    data_validade_bi: z.date({ required_error: "A data de validade nao é válida" }),
    municipio: z.string(),
    province: z.string(),
    sexo: z.string({required_error:"Campo sexo é obrigatório"}),
})
export type AutomobilistaType = z.infer<typeof scheemaAutomobilista>

export default function AutomobilistaForm() {
    const form = useForm<AutomobilistaType>({
        resolver: zodResolver(scheemaAutomobilista)
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
                {step == 1 && <FirstForm setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                {step == 2 && <SecondForm setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                {step == 3 && <ThreeForm setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                {step == 4 && <ViewDataAutomobilista handleClick={handleSaveAutomobilista} data={form.getValues()} handleClickCancel={setPreviusStep} />}
            </form>
        </FormProvider>
    )
}