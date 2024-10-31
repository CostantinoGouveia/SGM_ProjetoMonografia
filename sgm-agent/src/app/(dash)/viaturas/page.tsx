"use client";
import useAuthentication from "@/app/hooks/useAuthtication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableBody, TableRow, Table, TableCell, TableHeader, TableHead } from "@/components/ui/table";
import { GET_VIATURAS } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function ViaturasPage() {

    const router = useRouter();
    const { verifyToken } = useAuthentication();
    useEffect(() => {
        verifyToken();
      }, []);
    const [items, setItems] = useState<string>('');
   const [search, setSearch] = useState<any>( );


    const {data, isSuccess} = useQuery ({
        queryKey: ['get-viaturas'],
        queryFn: GET_VIATURAS
    });
    useEffect(() => {
        if (items !== "") {
          const results = data.filter((item:any) =>
            item.numeroMatricula.toLowerCase().includes(items.toLowerCase())
          );
          setSearch(results);
        } else {
          setSearch(data); // Mostra todos os resultados se o termo de pesquisa estiver vazio
        }
      }, [items, data]);


    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-4">Viaturas</h1>
            <form className="flex">
                <Input placeholder="Procurar viatura" value={items} onChange={(e) => setItems(e.target.value)} className="rounded-r-none" />
                <Button className="rounded-l-none" disabled variant={"secondary"}><Search /></Button>
            </form>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Matriula</TableHead>
                            <TableHead>Proprietario</TableHead>
                            <TableHead>Cor</TableHead>
                            <TableHead>Marca</TableHead>
                            <TableHead>Modelo</TableHead>
                           
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {Array.isArray(search) && search.length > 0? search.slice().reverse().map((viatura: any) => (
                            <TableRow key={viatura.codViatura}>
                                <TableCell><Link href={`/viaturas/${viatura.codViatura}`}><p>{viatura.numeroMatricula}</p>  </Link></TableCell>
                                <TableCell><Link href={`/viaturas/${viatura.codViatura}`}><p>{viatura.titulopropriedade[0].pessoa.nome}</p></Link></TableCell>
                                <TableCell><Link href={`/viaturas/${viatura.codViatura}`}><p>{viatura.corViatura}</p></Link></TableCell>
                                <TableCell><Link href={`/viaturas/${viatura.codViatura}`}><p>{viatura.marca.descMarca}</p></Link></TableCell>
                                <TableCell><Link href={`/viaturas/${viatura.codViatura}`}><p>{viatura.modelo}</p></Link></TableCell>
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