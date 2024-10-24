"use client"
import useAuthentication from "@/app/hooks/useAuthtication";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectValue,SelectTrigger } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GET_PESSOA_BY_ID } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Aplicar() {
  const router = useRouter();
    const { verifyToken } = useAuthentication();
    useEffect(() => {
        verifyToken();
      }, []);

      const [items, setItems] = useState<string>('');
     // const [items1, setItems1] = useState<string>('');
   const [search, setSearch] = useState<any[]>([]);
   
 const idPessoa =localStorage.getItem('SGM_USER') || '';
  const {data, isSuccess} = useQuery ({
    queryKey: ['get-pessoa-by-id', idPessoa],
    queryFn: () =>GET_PESSOA_BY_ID(idPessoa)
});

useEffect(() => {
  if (data && data.funcionario && data.funcionario.length > 0) {
    if (items !== "" && items !== " ") {
      const results = data.funcionario[0].multa.filter((item: any) =>
        (item.pagamentomulta[0].status.toLowerCase() == (items.toLowerCase()))
      );
      setSearch(results);
    } else {
      
    // console.log("fre",data);
      setSearch(data.funcionario[0].multa); // Mostra todos os resultados se o termo de pesquisa estiver vazio
    }
  } else {
    setSearch([]); // Se não houver dados, define search como array vazio
}
}, [items, data]);

console.log("search",search);
    return(
        <div className="flex flex-col p-8 gap-2">
            <div className="grid grid-cols-2 gap-4">
            <Select  onValueChange={(e) => setItems(e)} >
             <SelectTrigger>
               <SelectValue placeholder="Estado" />
               <SelectContent>
                 <SelectItem value=" " >selecione</SelectItem>
                 <SelectItem value="PAGO">Pago</SelectItem>
                 <SelectItem value="PENDENTE">Pendente</SelectItem>
                 <SelectItem value="NAO_PAGO">Não paga</SelectItem>
               </SelectContent>
             </SelectTrigger>
           </Select>
           <Select onValueChange={(e) => alert(e)}>
             <SelectTrigger>
               <SelectValue placeholder="Filtrar as multas" />
               <SelectContent>
                 <SelectItem value="hoje">Hoje</SelectItem>
                 <SelectItem value="semana">Essa semana</SelectItem>
                 <SelectItem value="mes">Esse mes</SelectItem>
                 <SelectItem value="ano">Esse ano</SelectItem>
               </SelectContent>
             </SelectTrigger>
           </Select>
            </div>
           <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>
                              Data
                            </TableHead>
                            <TableHead>
                              Nº de infracoes
                            </TableHead>
                            <TableHead>
                              Total
                            </TableHead>
                            <TableHead>
                              Estado
                            </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                          { Array.isArray(search) && search.length > 0? search.map((multas: any) => (
                            <TableRow key={multas.codMulta}>
                                <TableCell>{multas.automobilista.pessoa.nome}</TableCell>
                                <TableCell>{new Date(multas.data).toISOString().split("T")[0]}</TableCell>
                                <TableCell>{multas.infracao.length}</TableCell>
                                <TableCell>{multas.valorMulta}kz</TableCell>
                                <TableCell><Badge className={multas.pagamentomulta[0].status === "PENDENTE"? "bg-orange-500": multas.pagamentomulta[0].status === "PAGO"? "bg-green-500" :"bg-red-500"}>{(multas.pagamentomulta[0].status === "NAO_PAGO")? "NÃO PAGO": multas.pagamentomulta[0].status}</Badge></TableCell>
                            </TableRow>
                          )):   
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