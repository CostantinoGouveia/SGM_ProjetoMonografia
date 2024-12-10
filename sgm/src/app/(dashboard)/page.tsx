"use client"
import ChartMultas from "@/components/ChartMultas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GET_PESSOA_BY_ID, GET_VIATURAS, GET_AUTOMOBILISTAS, GET_FUNCIONARIOS } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

export default function Home() {
    const { data: dataViaturas, isSuccess: isSuV} = useQuery({
        queryKey: ['get-viat'],
        queryFn: () => GET_VIATURAS()
      });
      const { data: dataAut, isSuccess: isSuA } = useQuery({
        queryKey: ['get-aut'],
        queryFn: () => GET_AUTOMOBILISTAS()
      });
      const { data: dataAg, isSuccess: isSuAg } = useQuery({
        queryKey: ['get-ag'],
        queryFn: () => GET_FUNCIONARIOS()
      });
    return (
        <div className="p-4">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-start">
                            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                                Automobilistas
                            </CardTitle>
                           </div>
                        <CardDescription>
                            Total de automobilistas cadastrados
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="font-bold text-lg sm:text-4xl">{isSuA && (dataAut.length)}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-start">
                            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                                Viaturas
                            </CardTitle>
                           </div>
                        <CardDescription>
                            Total de viaturas cadastrados
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="font-bold text-lg sm:text-4xl">{isSuV && (dataViaturas.length)}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-start">
                            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                                Agentes
                            </CardTitle>
                           </div>
                        <CardDescription>
                            Total de Agentes cadastrados
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="font-bold text-lg sm:text-4xl">{isSuAg && (dataAg.length)}</p>
                    </CardContent>
                </Card>
            </section>
            <section className="mt-4 flex">
                <ChartMultas/>
            </section>
        </div>
    )
}