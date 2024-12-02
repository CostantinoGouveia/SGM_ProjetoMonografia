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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { POST_AUTOMOBILISTA, POST_TIPOINFRACAO } from "@/routes"
import ViewDataInfracao from "./ViewDataInfracao"
import FirstFormInfracao from "./FirstFormInfracao"

import { toast } from 'react-toastify';

const scheemaInfracao = z.object({
    descTipoInfracao: z.string({ required_error: "Campo obrigatorio" }).min(3, "Preencha o nome completo"),
    valorTipoInfracao: z.string({ required_error: "Campo é obrigatório" }).regex(/^\d{1,10}$/, "Aceita apenas numeros"),
})
export type InfracaoType = z.infer<typeof scheemaInfracao>

export default function InfracaoForm() {
    const queryClient = useQueryClient();
    const form = useForm<InfracaoType>({
        resolver: zodResolver(scheemaInfracao)
    })
    
    function handleSubmitInfracao(data: any) {
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
    const {mutateAsync: createInfracao} = useMutation({
        mutationFn:POST_TIPOINFRACAO,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["get-tipoInfrcao"]});
            console.log(data)
            toast.success("Infracao salvo com sucesso")
        },
        onError: (error) => {
            console.log(error)
        }
    })
    function handleSaveInfracao() {
        createInfracao(form.getValues())
      
    }
    return (
        <FormProvider {...form}>

            <form onSubmit={form.handleSubmit(handleSubmitInfracao)}>
                {step == 1 && <FirstFormInfracao setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                {step == 2 && <ViewDataInfracao handleClick={handleSaveInfracao} data={form.getValues()} handleClickCancel={setPreviusStep} />}
            </form>
        </FormProvider>
    )
}