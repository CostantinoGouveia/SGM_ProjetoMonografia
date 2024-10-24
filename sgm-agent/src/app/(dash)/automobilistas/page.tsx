"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableBody, TableRow, Table, TableCell, TableHeader, TableHead } from "@/components/ui/table";
import { Search } from "lucide-react";
import Link from "next/link";
import { GET_ALERTAS_ROUBO, GET_AUTOMOBILISTAS, GET_BIS, GET_PESSOAS, login, saveLocalStorageToken } from "@/routes";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Automobilista } from "@/entities/Automobilista";
import { useRouter } from "next/navigation";
import useAuthentication from "@/app/hooks/useAuthtication";


export default  function AutomobolistasPages() {

  const router = useRouter();
    const { verifyToken } = useAuthentication();
    useEffect(() => {
        verifyToken();
      }, []);
   //console.log(usr);
    //const response = await fetch('http://localhost:3000/automobilistas'); // Sua API Node.js
   const [items, setItems] = useState<string>('');
   const [search, setSearch] = useState<any>( );
    
    const {data, isSuccess} = useQuery ({
        queryKey: ['get-automobilistas'],
        queryFn: GET_AUTOMOBILISTAS
    });

    useEffect(() => {
        if (items !== "" && isSuccess) {
          const results = data.filter((item) =>
            item.pessoa.nome.toLowerCase().includes(items.toLowerCase())
          );
          setSearch(results);
        } else {
          setSearch(data); // Mostra todos os resultados se o termo de pesquisa estiver vazio
        }
      }, [items, data]);
 /*
    useEffect(()=>{
          
         async function getPessoas() {
           // const usr = await login('BI98765432', 'kaculo938');
           // saveLocalStorageToken(usr.token);
            const automobilistas = await GET_AUTOMOBILISTAS(); 
            console.log(automobilistas);
        }
        getPessoas()
    }, []`*/
    console.log(search);

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-4">Automobilistas</h1>
            <form className="flex">
                <Input placeholder="Procurar automobilista" value={items} onChange={(e) => setItems(e.target.value)} className="rounded-r-none" />
                <Button className="rounded-l-none" disabled variant={"secondary"}><Search /></Button>
            </form>
            
            <div className="pt-4 flex flex-col gap-2">
            
              {Array.isArray(search) && search.length > 0? search.map((automobilista: any) => (
                <Link key={automobilista.codAutomobilista} href={`/automobilistas/${automobilista.codAutomobilista}`}>
                    <div className="flex gap-2 items-center justify-start  rounded-lg shadow-sm ring-1 ring-zinc-100 h-20">
                        <img src="/images/9720027.jpg" className="w-20 rounded-l-lg" alt="" />
                        <div className="flex flex-col text-sm justify-start flex-1 text-zinc-500">
                            <span><span className="font-bold">Nome:</span> {automobilista.pessoa.nome}</span>
                            <span><span className="font-bold">BI:</span> {automobilista.pessoa.bi.numeroBI}</span>
                            <span><span className="font-bold">Carta Condução:</span> {automobilista.cartaconducao.numeroCarta}</span>
                            <span><span className="font-bold">Telefone:</span> {automobilista.pessoa.contacto?.contacto1}</span>
                        </div>
                    </div>
                </Link>
              )):
                <div className="text-center text-red-500">Nenhum resultado encontrado</div> 
            }
            </div>
        </div>
    )
}