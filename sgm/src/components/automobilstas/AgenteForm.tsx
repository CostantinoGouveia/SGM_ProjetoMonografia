"use client"
import { FormProvider, useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { use, useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { POST_FUNCIONARIO, POST_FUNCIONARIO1 } from "@/routes"
import FirstFormAgente from "./FirstFormAgente"
import ThreeFormAgente from "./ThreeFormAgente"
import SecondFormAgente from "./SecondFormAgente"
import ViewDataAgente from "./ViewDataAgente"
import { FormControl, FormItem } from "../ui/form"
import { Label } from "../ui/label"
import FormAgenteAlter from "./FormAgenteAlter"
import ViewDataAgenteAlter from "./ViewDataAgenteAlter"
import { toast } from 'react-toastify';


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
    sexo: z.string({ required_error: "Campo sexo é obrigatório" }),
    estado: z.string({ required_error: "Campo estado civil é obrigatório" }),
})
const scheemaAgente1 = z.object({
    tipoUsuario: z.string({ required_error: "Campo tipo de usuario é obrigatório" }),
    numeroAgente: z.string({ required_error: "Campo numero de agente é obrigatório" }),
    idPessoa: z.string({ required_error: "Campo pessoa é obrigatório" }),
})
export type AgenteType = z.infer<typeof scheemaAgente>
export type AgenteType1 = z.infer<typeof scheemaAgente1>

export default function AgenteForm() {
    const queryClient = useQueryClient();
    const form = useForm<AgenteType>({
        resolver: zodResolver(scheemaAgente)
    })
    const form1 = useForm<AgenteType1>({
        resolver: zodResolver(scheemaAgente1)
    })
    function handleSubmitAgente(data: any) {
        console.log(data)
    }

    const [step, setStep] = useState(1)
    const [step1, setStep1] = useState(1)
    const [chek, setChek] = useState(Boolean)

    const [aux, setAux] = useState<any>()
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
    function setPreviusStep1() {
        setStep1((state) => {
            if (state > 1)
                return state - 1;
            return 0
        })
    }
    function setNextStep1() {
        setStep1((state) => {
            if (state < 4)
                return state + 1;
            return 0
        })
    }
    const { mutateAsync: createAgente } = useMutation({
        mutationFn: POST_FUNCIONARIO,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["get-funcionario"] });
            console.log(data)
            toast.success("Funcionario Adicionado com sucesso")
        },
        onError: (error) => {
            console.log(error)
            toast.error("Erro ao adicionar funcionario ")
        }
    })
    const { mutateAsync: createAgente1 } = useMutation({
        mutationFn: POST_FUNCIONARIO1,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["get-funcionario"] });
            console.log(data)
            toast.success("Funcionario Adicionado com sucesso")
        },
        onError: (error) => {
            console.log(error)
            toast.error("Erro ao adicionar funcionario ")
        }
    })
    function handleSaveAutomobilista() {
        console.log({ ...form.getValues(), idMunicipio: 1 })
        createAgente(form.getValues())
    }
    function handleSaveAutomobilista1() {
        console.log({ ...form1.getValues() })
        createAgente1(form1.getValues())
    }
   
    return (
        <>
            <FormItem className="flex justify-end items-center gap-1">
                <Label className="text-cyan-700">É uma pessoa já Cadastrada?</Label>
                <Input type="checkbox" className="w-8" onChangeCapture={(e) => setChek(e.target.checked)} />
            </FormItem>

            {!chek ? <FormProvider {...form}>

                <form onSubmit={form.handleSubmit(handleSubmitAgente)}>
                    {step == 1 && <FirstFormAgente setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                    {step == 2 && <SecondFormAgente setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                    {step == 3 && <ThreeFormAgente setNextStep={setNextStep} setPreviusStep={setPreviusStep} />}
                    {step == 4 && <ViewDataAgente handleClick={handleSaveAutomobilista} data={form.getValues()} handleClickCancel={setPreviusStep} />}
                </form>
            </FormProvider> :
                <FormProvider {...form1}>
                    <form onSubmit={form1.handleSubmit(handleSubmitAgente)}>
                        {step1 == 1 && <FormAgenteAlter setNextStep={setNextStep1} setPreviusStep={setPreviusStep1} />}
                        {step1 == 2 && <ViewDataAgenteAlter handleClick={handleSaveAutomobilista1} data={form1.getValues()} handleClickCancel={setPreviusStep1} />}
                    </form>
                </FormProvider>}
        </>
    )
}