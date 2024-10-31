"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TableBody, TableRow, Table, TableCell, TableHeader, TableHead } from "@/components/ui/table";
import { GET_PESSOA_BY_ID, GET_PROVINCIAS, GET_TIPOSROUBO, GET_VIATURA_BY_ID, POST_ALERTA_ROUBO, PUT_ALERTA_ROUBO } from "@/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { verify } from "crypto";
import { AlertTriangle, Badge, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function RoubosPage() {

    const [items, setItems] = useState<string>('');
    const [search, setSearch] = useState<any>();

    const { data, isSuccess } = useQuery({
        queryKey: ['get-viaturaPessoa'],
        queryFn: () => GET_PESSOA_BY_ID(localStorage.getItem('SGM_USER') || ''),
    });
    console.log(data)
    useEffect(() => {
        if (isSuccess) {
            if (items !== "") {
                const results = data.titulopropriedade.filter((item: any) =>
                    item.viatura.numeroMatricula.toLowerCase().includes(items.toLowerCase())
                );
                setSearch(results);
            } else {
                setSearch(data?.titulopropriedade); // Mostra todos os resultados se o termo de pesquisa estiver vazio
            }
        }
    }, [items, data, isSuccess]);
    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-4 flex gap-2 items-center">Viaturas<AlertTriangle className="text-red-800" /></h1>
            <form className="flex">
                <Input placeholder="Procurar viatura" value={items} onChange={(e) => setItems(e.target.value)} className="rounded-r-none" />
                <Button className="rounded-l-none" disabled variant={"secondary"}><Search /></Button>
            </form>
            <div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Matriula</TableHead>
                            <TableHead>Lotação</TableHead>
                            <TableHead>Cor</TableHead>
                            <TableHead>Marca</TableHead>
                            <TableHead>Modelo</TableHead>
                            <TableHead>Accao</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(search) && search.length > 0 ? search.map((titulo: any) => (
                            <TableRow key={titulo.codTituloPropriedade}>
                                <TableCell><Link href={`/alertas/${titulo.viatura.codViatura}`}><p>{titulo.viatura.numeroMatricula}</p>  </Link></TableCell>
                                <TableCell><Link href={`/alertas/${titulo.viatura.codViatura}`}><p>{titulo.viatura.lotacao}</p></Link></TableCell>
                                <TableCell><Link href={`/alertas/${titulo.viatura.codViatura}`}><p>{titulo.viatura.corViatura}</p></Link></TableCell>
                                <TableCell><Link href={`/alertas/${titulo.viatura.codViatura}`}><p>{titulo.viatura.marca.descMarca}</p></Link></TableCell>
                                <TableCell><Link href={`/alertas/${titulo.viatura.codViatura}`}><p>{titulo.viatura.modelo}</p></Link></TableCell>
                                <TableCell><AlertaRoubo viatura={titulo.viatura} /></TableCell>
                            </TableRow>
                        )) :
                            <TableRow>
                                <TableCell colSpan={5} className="items-center text-center text-red-500">
                                    Nenhum resultado encontrado
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

function AlertaRoubo({ viatura }: { viatura: any }) {
    // const { data, isSuccess } = useQuery({
    //   queryKey: ["multa_id", viatura],
    //   queryFn: () => GET_(viatura),
    // })
    console.log(viatura);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"secondary"} className="flex gap-1">VER</Button>
            </DialogTrigger>
            <DialogContent id="cont-modal" className="max-h-96 overflow-y-auto">
                <DialogHeader className="relative">
                    <DialogTitle><span className="text-slate-700">Alertas da viatura {viatura.numeroMatricula}</span></DialogTitle>
                </DialogHeader>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data/Alerta</TableHead>
                            <TableHead>Tipo/Roubo</TableHead>
                            <TableHead>Municipio</TableHead>
                            <TableHead>Bairro</TableHead>
                            <TableHead></TableHead>
                            <TableHead>Accao</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(viatura.alertaroubo) && viatura.alertaroubo.length > 0 ? viatura.alertaroubo.map((titulo: any) => (
                            <TableRow key={titulo.codAlertaRoubo}>
                                <TableCell><p>{titulo.dataRoubo.split("T")[0]}</p>  </TableCell>
                                <TableCell><p>{titulo.tiporoubo.descTipoRoubo}</p></TableCell>
                                <TableCell><p>{titulo.endereco.municipio.municipio}</p></TableCell>
                                <TableCell colSpan={2}><p>{titulo.endereco.descricaoEndereco}</p></TableCell>
                                <TableCell><VerAlerta verAlerta={titulo} /></TableCell>
                            </TableRow>
                        )) :
                            <TableRow>
                                <TableCell colSpan={5} className="items-center text-center text-red-500">
                                    Nenhum resultado encontrado
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
                <CriarAlerta viatura={viatura} />
            </DialogContent>
        </Dialog>
    )
}
function VerAlerta({ verAlerta }: { verAlerta: any }) {
    // const { data, isSuccess } = useQuery({
    //   queryKey: ["multa_id", viatura],
    //   queryFn: () => GET_(viatura),
    // })
    console.log(verAlerta);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"secondary"} className="flex gap-1">VER</Button>
            </DialogTrigger>
            <DialogContent id="cont-modal" className="max-h-96 overflow-y-auto">
                <DialogHeader className="relative">
                    <DialogTitle><span className="text-slate-700">Alerta de Roubo</span></DialogTitle>
                </DialogHeader>
                {verAlerta && (

                    <div>
                        <h1 className=" font-bold text-1xl text-blue-600">Detalhes da Multa</h1>
                        <div className="grid grid-cols-12">
                            <div className="my-2 col-span-6">
                                <label htmlFor="numeroMatricula" className="block m-2 font-semibold ">Data do Roubo</label>
                                <input
                                    disabled
                                    type="text"
                                    id="numeroMatricula"
                                    name="numeroMatricula"
                                    value={verAlerta.dataRoubo.split("T")[0]}
                                />
                            </div>
                            <div className="my-2 col-span-6">
                                <label htmlFor="status" className="block m-2 font-semibold ">Status</label>
                                <label className={`font-semibold rounded-lg p-2 text-white ${verAlerta.status === "Cancelado" ? "bg-orange-500" : verAlerta.status === "Ativo" ? "bg-green-500" : "bg-red-500"}`}>{verAlerta.status}</label>
                            </div>
                        </div>

                        <div className="grid grid-cols-12">

                            <div className="my-2 col-span-6">
                                <label htmlFor="valor" className="block m-2 font-semibold">Tipo de roubo</label>
                                <label className="" > {verAlerta.tiporoubo.descTipoRoubo} </label>
                            </div>

                            <div className="my-2 col-span-6">
                                <label htmlFor="dataEmissao" className="block m-2 font-semibold">Data de Emissão</label>
                                <input
                                    disabled
                                    type="text"
                                    id="dataEmissao"
                                    name="dataEmissao"
                                    value={verAlerta.dataRoubo.split("T")[0]}

                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="my-2 col-span-12">
                                <label htmlFor="descricao" className="block m-2 font-semibold">Descrição</label>
                                <textarea
                                    disabled
                                    id="descricao"
                                    name="descricao"
                                    value={verAlerta.descRoubo}
                                    className="w-full h-36"
                                />
                            </div>

                        </div>

                        <h2 className="font-bold text-1xl  text-blue-600">Localização</h2>
                        <div className="grid grid-cols-12">
                            <div className="my-2 col-span-6">
                                <label htmlFor="referencia" className="block m-2 font-semibold">Provincia</label>
                                <input
                                    disabled
                                    type="text"
                                    id="referencia"
                                    name="referencia"
                                    value={verAlerta.endereco.municipio.provincia.provincia}
                                />
                            </div>

                            <div className="my-2 col-span-6">
                                <label htmlFor="valorPago" className="block m-2 font-semibold">Municipio</label>
                                <input
                                    disabled
                                    type="text"
                                    id="valorPago"
                                    name="valorPago"
                                    value={verAlerta.endereco.municipio.municipio}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-12">

                            <div className="my-2 col-span-6">
                                <label htmlFor={`dataCriacao`} className="block m-2 font-semibold">Bairro</label>
                                <input
                                    disabled
                                    type="text"
                                    id={`dataCriacao`}
                                    name="dataCriacao"
                                    value={verAlerta.endereco.descricaoEndereco}
                                />
                            </div>
                            <div className="my-2 col-span-6">
                                <label htmlFor="numeroMatricula" className="block m-2 font-semibold ">ACÇÃO </label>
                                {
                                    (verAlerta.status === "Ativo") ? <ActionWithConfirmation alerta={verAlerta} /> : null

                                }
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
function CriarAlerta({ viatura }: { viatura: any }) {
    // const { data, isSuccess } = useQuery({
    //   queryKey: ["multa_id", viatura],
    //   queryFn: () => GET_(viatura),
    // })
    console.log(viatura);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="bg-blue-600 text-white flex gap-1">CRIAR ALERTA</Button>
            </DialogTrigger>
            <DialogContent id="cont-modal" className="max-h-96 overflow-y-auto">
                <DialogHeader className="relative">
                    <DialogTitle><span className="text-slate-700">Criar alerta de Roubo</span></DialogTitle>
                </DialogHeader>
                <CadastroAlertaRoubo automobilista={viatura} />
            </DialogContent>
        </Dialog>
    )
}

function ActionWithConfirmation({ alerta }: { alerta: any }) {
    const [confirmed, setConfirmed] = useState(false);
    const [item, setItem] = useState(false);
    const useClient = useQueryClient();
    const handleAction = () => {
        // Exibe o toast de confirmação
        toast.info(
            <div>
                <p>Tem certeza que deseja confirmar a ação?</p>
                <button
                    onClick={confirmAction}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                    Sim
                </button>
                <button
                    onClick={cancelAction}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Não
                </button>
            </div>,
            { autoClose: false } // Mantém o toast até que uma ação seja tomada
        );
    };

    const confirmAction = () => {

        setConfirmed(true);
        PUT_ALERTA_ROUBO(alerta.codAlertaRoubo, { status: "Cancelado" });
        useClient.invalidateQueries({
            queryKey: ["get-viaturaPessoa"], // chave da consulta
            exact: true, // opcional, dependendo do filtro
        });
        toast.dismiss(); // Fecha o toast
        toast.success("Ação confirmada com sucesso!");
    };

    const cancelAction = () => {
        toast.dismiss(); // Fecha o toast sem tomar ação
        toast.error("Ação cancelada.");
    };

    return (
        <div>
            <button onClick={handleAction} disabled={item} className="bg-red-500 text-white px-2 py-1 rounded-lg">
                Cancelar
            </button>

            {/* Container para os toasts */}
            <ToastContainer />
        </div>
    );
}

export function CadastroAlertaRoubo({ automobilista }: { automobilista: any }) {
    const router = useRouter();
    const useClient = useQueryClient();
    console.log("trtgrtgr", automobilista)
    const { data, isSuccess } = useQuery({
        queryKey: ['get-tiporoubo'],
        queryFn: GET_TIPOSROUBO
    });
    const { data: dataProv, isSuccess: isSuccessProv } = useQuery({
        queryKey: ['get-alertasroubo'],
        queryFn: GET_PROVINCIAS
    });

    const [control, setControl] = useState(false)
    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        dataRoubo: "",
        codTipoRoubo: "",
        descRoubo: "",
        codEndereco: "",
        idMunicipio: "",
        idProvincia: "",
    });
    const [selectMuni, setSelectMuni] = useState([])

    // Função para atualizar o estado do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "idProvincia") {
            filtrar(e)
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function filtrar(e: any) {
        const { name, value } = e.target;
        console.log(dataProv)
        if (isSuccess) {
            const results = dataProv.filter((item: any) =>
                item.idProvincia === Number(value)
            )
            const results2 = results[0].municipio.filter((item: any) =>
                item.idProvincia === Number(value)
            )
            setSelectMuni(results2);
        }
    }

    useEffect(() => {
        console.log("Estado atualizado:", selectMuni);
    }, [selectMuni]);

    const { mutateAsync: createAlert } = useMutation({
        onSuccess(data) {
            useClient.invalidateQueries({
                queryKey: ["get-viaturaPessoa"], // chave da consulta
                exact: true, // opcional, dependendo do filtro
            });
            toast.success('Alerta criado com sucesso')
        },
        mutationFn: POST_ALERTA_ROUBO,
        onError(error) {
            toast.error('Não foi possível Criar alerta de roubo')
            console.log(error)
        }

    })

    const { mutateAsync: verifyViatura } = useMutation({
        onSuccess(data) {
            console.log("viatura", data)
            const alertaAdd = {
                codViatura: automobilista.codViatura,
                codAutomobilista: automobilista.titulopropriedade[0].pessoa?.automobilista[0].codAutomobilista,
                dataRoubo: formData.dataRoubo,
                codTipoRoubo: Number(formData.codTipoRoubo),
                descRoubo: formData.descRoubo,
                Dendereco: formData.codEndereco,
                idMunicipio: Number(formData.idMunicipio)
            }

            const alertaAtivo = data.alertaroubo.some((item: any) => item.status === "Ativo");
            if (alertaAtivo) {
                toast.error('Viatura já tem um alerta de roubo ativo')
            } else {
                createAlert(alertaAdd)
                setFormData({
                    dataRoubo: "",
                    codTipoRoubo: "",
                    descRoubo: "",
                    codEndereco: "",
                    idMunicipio: "",
                    idProvincia: "",
                })
            }
        },
        mutationFn: GET_VIATURA_BY_ID,
        onError(error) {
            toast.error('Não foi possível verificar a viatura')
            console.log(error)
        }
    })

    const handleAction = () => {
        // Exibe o toast de confirmação
        toast.info(
            <div>
                <p>Tem certeza que deseja confirmar a ação?</p>
                <button
                    onClick={confirmAction}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                    Sim
                </button>
                <button
                    onClick={cancelAction}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Não
                </button>
            </div>,
            { autoClose: false } // Mantém o toast até que uma ação seja tomada
        );
    };

    const confirmAction = () => {

        verifyViatura(automobilista.codViatura)
        //createAlert(data)
        setControl(true)
        toast.dismiss(); // Fecha o toast
    };

    const cancelAction = () => {
        setControl(true)
        toast.dismiss(); // Fecha o toast sem tomar ação
        toast.error("Ação cancelada.");
    };



    // Função para enviar os dados para a API
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!control) {
            handleAction()
        }
        setControl(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-12">
                <div className="col-span-6">
                    <label htmlFor="dataRoubo">Data do Roubo</label>
                    <input
                        type="date"
                        id="dataRoubo"
                        name="dataRoubo"
                        value={formData.dataRoubo}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>

                <div className="col-span-6">
                    <label htmlFor="codTipoRoubo">Tipo de Roubo</label>
                    <select
                        id="codTipoRoubo"
                        name="codTipoRoubo"
                        value={formData.codTipoRoubo}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    >
                        <option value="">Selecione o tipo de roubo</option>
                        {isSuccess && data.map((tipo: any) => (
                            <option key={tipo.codTipoRoubo} value={tipo.codTipoRoubo}>{tipo.descTipoRoubo}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                    <label htmlFor="descRoubo">Descrição do Roubo</label>
                    <textarea
                        id="descRoubo"
                        name="descRoubo"
                        value={formData.descRoubo}
                        onChange={(e) => handleChange(e)}
                        required
                        className="border p-2 w-full"
                    ></textarea>
                </div>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-6">
                    <label htmlFor="idProvincia">Provincia</label>
                    <select
                        id="idProvincia"
                        name="idProvincia"
                        value={formData.idProvincia}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    >
                        <option key={"s"}>Selecione a provincia</option>
                        {isSuccessProv && dataProv.map((provincia: any) => (
                            <option key={provincia.idProvincia} value={provincia.idProvincia}>{provincia.provincia}</option>
                        ))}
                    </select>
                </div>
                <div className="col-span-6">
                    <label htmlFor="idMunicipio">Municipio</label>
                    <select
                        id="idMunicipio"
                        name="idMunicipio"
                        value={formData.idMunicipio}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    >
                        <option value="">Selecione o município</option>
                        {selectMuni.map((municipio: any) => (
                            <option key={municipio.idMunicipio} value={municipio.idMunicipio}>
                                {municipio.municipio}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                    <label htmlFor="codEndereco">Código do Endereço</label>
                    <input
                        type="text"
                        id="codEndereco"
                        name="codEndereco"
                        value={formData.codEndereco}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Cadastrar Alerta de Roubo
            </button>
            <ToastContainer />
        </form>
    );
}