"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { useQuery } from "@tanstack/react-query";
import { GET_ALERTAS_ROUBO, GET_ALERTAS_ROUBO_MES, GET_MULTAS, GET_MULTAS_MES } from "@/routes";


let chartData = [
    { month: "Janeiro", desktop: 0, mobile: 0 },
    { month: "Fevereiro", desktop: 0, mobile: 0 },
    { month: "Março", desktop: 0, mobile: 0 },
    { month: "Abril", desktop: 0, mobile: 0 },
    { month: "Maio", desktop: 0, mobile: 0 },
    { month: "Junho", desktop: 0, mobile: 0 },
    { month: "Julho", desktop: 0, mobile: 0 },
    { month: "Agosto", desktop: 0, mobile: 0 },
    { month: "Setembro", desktop: 0, mobile: 0 },
    { month: "Outubro", desktop: 0, mobile: 0 },
    { month: "Novembro", desktop: 0, mobile: 0 },
    { month: "Dezembro", desktop: 0, mobile: 0 },
  ]
  const chartConfig = {
    desktop: {
      label: "Multas",
      color: "#2563eb",
    },
    mobile: {
      label: "Alertas",
      color: "#60a5fa",
    },
  } satisfies ChartConfig
export default function ChartMultas() {
  const { data, isSuccess } = useQuery({
    queryKey: ['get-alertas'],
    queryFn: () => GET_ALERTAS_ROUBO_MES()
  });

  const { data:dataMultas, isSuccess:isSusMultas } = useQuery({
    queryKey: ['get-MULTAS'],
    queryFn: () => GET_MULTAS_MES()
  });
  console.log(data, "alertas")
  
  console.log(dataMultas, "Multas")
 isSusMultas && dataMultas.map(
  (item: any, index: number) => {chartData[index].desktop = item.length}
 );
 isSuccess && data.map(
  (item: any, index: number) => {chartData[index].mobile = item.length}
 );
    return (
        <Card className="w-full md:w-1/2 md:max-w-[600px]">
            <CardHeader>
                <CardTitle>Total de multas e alertas neste ano</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full min-h-[200px]">
                <BarChart data={chartData}>
                    <CartesianGrid vertical={false}/>
                    <XAxis dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => value.slice(0,3)} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}/>
                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4}/>
                </BarChart>
                
                </ChartContainer>
            </CardContent>
        </Card>
    )
}