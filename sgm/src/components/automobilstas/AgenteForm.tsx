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
import { POST_AUTOMOBILISTA, POST_FUNCIONARIO } from "@/routes"
import FirstFormAgente from "./FirstFormAgente"
import ThreeFormAgente from "./ThreeFormAgente"
import SecondFormAgente from "./SecondFormAgente"
import ViewDataAgente from "./ViewDataAgente"


const scheemaAgente = z.object({
    name: z.string({ required_error: "Campo obrigatorio" }).min(3, "Preencha o nome completo"),
    email: z.string({ required_error: "Email é obrigatório" }).email("O email não é válido"),
    email_alternativo: z.string().email(),
    data_nascimento: z.date({ required_error: "A data de nascimento nao é válida" }),
    pais: z.string({ required_error: "Campo Nacionalidade é obrigatório" }),
    bi: z.string({ required_error: "Campo bilhete de identitidade obrigatorio" }).min(15, "15 caracteres sao necessarios no minimo").regex(/^\d{10}[A-Z,a-z]{2}\d{3}$/, "O formato deve ser de um Bi valido"),
    telemovel: z.string({ required_error: "Campo telemovel é obrigatório" }).regex(/^\d{5,10}$/, "O formato deve ser de um temovel valido"),
    telemovel_alternativo: z.string().optional(),
    endereco: z.string({ required_error: "Campo Endereco é obrigatório" }),
    tipoUsuario: z.string({ required_error: "Campo tipo de usuario é obrigatório" }),
    numeroAgente: z.string({ required_error: "Campo numero de agente é obrigatório" }),
    data_emissao_bi: z.date({ required_error: "A data de emissão nao é válida" }),
    data_validade_bi: z.date({ required_error: "A data de validade nao é válida" }),
    municipio: z.string({ required_error: "Campo municipio é obrigatório" }),
    province: z.string({ required_error: "Campo provincia é obrigatório" }),
    sexo: z.string({required_error:"Campo sexo é obrigatório"}),
    estado: z.string({required_error:"Campo estado civil é obrigatório"}),
})
export type AgenteType = z.infer<typeof scheemaAgente>

export default function AgenteForm() {
    const queryClient = useQueryClient();
    const form = useForm<AgenteType>({
        resolver: zodResolver(scheemaAgente)
    })
    const { toast } = useToast()
    function handleSubmitAgente(data: any) {
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
    const {mutateAsync: createAgente} = useMutation({
        mutationFn:POST_FUNCIONARIO,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["get-funcionario"]});
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })
    function handleSaveAutomobilista() {
        console.log({...form.getValues(), idMunicipio : 1})
        createAgente(form.getValues())
        toast({
            description: "Agente salvo com sucesso",
        })
    }
    return (
        <FormProvider {...form}>

            <form onSubmit={form.handleSubmit(handleSubmitAgente)}>
                {step == 1 && <FirstFormAgente setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                {step == 2 && <SecondFormAgente setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                {step == 3 && <ThreeFormAgente setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                {step == 4 && <ViewDataAgente handleClick={handleSaveAutomobilista} data={form.getValues()} handleClickCancel={setPreviusStep} />}
            </form>
        </FormProvider>
    )
}