import ChartMultas from "@/components/ChartMultas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function Home() {
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
                        <p className="font-bold text-lg sm:text-4xl">250</p>
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
                        <p className="font-bold text-lg sm:text-4xl">302</p>
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
                        <p className="font-bold text-lg sm:text-4xl">400</p>
                    </CardContent>
                </Card>
            </section>
            <section className="mt-4">
                <ChartMultas/>
            </section>
        </div>
    )
}