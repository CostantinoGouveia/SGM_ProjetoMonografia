import AutomobilistaForm, { AutomobilistaType } from "@/components/automobilstas/AutomobilistaForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RowViatura from "@/components/viaturas/RowViatura";
import ViaturaForm, { viaturaType } from "@/components/viaturas/ViaruraForm";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircle, Search } from "lucide-react";
import { z } from "zod";




export default function Viaturas() {
    const viaturas: viaturaType[]= [
        {
          MedidasPneumaticos: "205/55 R16",
          lotacao: "5 lugares",
          cilindrada: "1598 cc",
          numeroCilindro: "4 cilindros",
          conbustivel: "Gasolina",
          peso: "1300 kg",
          tara: "1100 kg",
          tipoCaixa: "Manual",
          distanciaEixo: "2600 mm",
          modelo: "Toyota Corolla 2022",
          numeroMatricula: "ABC-1234",
          marca: "Toyota",
          codLivrete: 1,
          codViatura: 1001,
          codServico: 501,
          dataEmissao: new Date("2023-05-12"),
          dataPrimeiroRegistro: new Date("2023-01-15"),
        },
        {
          MedidasPneumaticos: "225/45 R17",
          lotacao: "7 lugares",
          cilindrada: "1998 cc",
          numeroCilindro: "6 cilindros",
          conbustivel: "Diesel",
          peso: "1500 kg",
          tara: "1200 kg",
          tipoCaixa: "Automática",
          distanciaEixo: "2800 mm",
          modelo: "Ford Explorer 2021",
          numeroMatricula: "DEF-5678",
          marca: "Ford",
          codLivrete: 2,
          codViatura: 1002,
          codServico: 502,
          dataEmissao: new Date("2022-11-30"),
          dataPrimeiroRegistro: new Date("2022-03-20"),
        },
        {
          MedidasPneumaticos: "195/65 R15",
          lotacao: "5 lugares",
          cilindrada: "1496 cc",
          numeroCilindro: "4 cilindros",
          conbustivel: "Flex",
          peso: "1200 kg",
          tara: "1000 kg",
          tipoCaixa: "Manual",
          distanciaEixo: "2550 mm",
          modelo: "Honda Civic 2020",
          numeroMatricula: "GHI-9012",
          marca: "Honda",
          codLivrete: 3,
          codViatura: 1003,
          codServico: 503,
          dataEmissao: new Date("2021-08-15"),
          dataPrimeiroRegistro: new Date("2021-02-10"),
        },
      ];
      
      
    return(
        <div className="p-4">
        <h1 className="text-lg text-slate-700 font-bold mb-4">Viaturas</h1>
        <div className="flex justify-between items-start md:items-center">
            <div className="flex gap-1 flex-col md:flex-row">
                <div className="flex flex-col md:flex-row gap-1">
                   <Input placeholder="Nome do automobilistas"/>
                    <Input placeholder="Email do automobilistas"/>
                </div>
                <Button variant={"ghost"} className="text-muted-foreground flex gap-1"><Search className="w-4 h-4"/> Filtrar resultados</Button>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex gap-1 bg-foreground"><PlusCircle className="w-5 h-5"/>Cadastrar</Button>
                </DialogTrigger>
                <DialogContent className="">
                      <DialogHeader className="relative">
                        <DialogTitle><span className="text-slate-700">Cadastrar nova viatura</span></DialogTitle>
                      </DialogHeader>
                      <ViaturaForm />
                </DialogContent>
            </Dialog>
        </div>

        <div className="w-full shadow-sm rounded-md">

          <Table className="bg-white mt-8  rounded-md">
            <TableHeader>
                <TableRow>
                <TableHead>Matricuka</TableHead>
                <TableHead className="w-[200px]">Marca</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Combustivel</TableHead>
                <TableHead className="text-right"></TableHead>
                <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {viaturas.map((viatura) => (
                    <RowViatura key={viatura.numeroMatricula} viatura={viatura}/>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                <TableCell colSpan={3}><Button>Anterior</Button></TableCell>
                <TableCell colSpan={6} className="text-right"><Button>Proximo</Button></TableCell>
                </TableRow>
            </TableFooter>
            </Table>
        </div>
    </div>
    )
}