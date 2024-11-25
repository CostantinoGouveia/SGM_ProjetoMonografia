"use client"
import AutomobilistaForm, { AutomobilistaType } from "@/components/automobilstas/AutomobilistaForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RowMulta from "@/components/viaturas/RowMulta";
import RowReclamacao, { AtenderReclamacao } from "@/components/viaturas/RowReclamacao";
import RowViatura from "@/components/viaturas/RowViatura";
import ViaturaForm, { viaturaType } from "@/components/viaturas/ViaruraForm";
import { Multa, Reclamacao, Viatura } from "@/entities/interfaces";
import { GET_MULTA_BY_ID, GET_MULTAS, GET_RECLAMACOES, GET_VIATURAS, PUT_NOTIFICACAO_RECLAMACAO } from "@/routes";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusCircle, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";



export default function VerReclamacao1({ idMulta }: { idMulta: string }) {
  const { id } = useParams();
  const { data, isSuccess } = useQuery({
    queryKey: ["multa_id2", id],
    queryFn: () => GET_MULTA_BY_ID(id),
  })
  console.log("reclamacaomulta", idMulta)
const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="p-4">
      <h1 className="text-lg text-slate-700 font-bold mb-4">Reclamação</h1>
      <div className="flex justify-between items-start md:items-center">
        <div className="flex gap-1 flex-col md:flex-row">
         
        </div>

        <AtenderReclamacao idMulta={id.toString()}></AtenderReclamacao>
      </div>

      <div className="w-full mt-4 shadow-md rounded-lg p-6 bg-white">
  {isSuccess && (
    <div>
      {/* Título Principal */}
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Detalhes da Reclamação</h1>

      {/* Detalhes Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Data da Reclamação */}
        <div>
          <label htmlFor="dataReclamacao" className="block text-gray-700 font-semibold mb-2">
            Data Feita
          </label>
          <p className="text-lg">{data.reclamacao[0]?.dataReclamacao?.split("T")[0]}</p>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-gray-700 font-semibold mb-2">
            Status
          </label>
          <p
            className={`font-semibold text-white rounded-md py-1 px-3 inline-block ${
              data.reclamacao[0]?.status === "Pendente"
                ? "bg-orange-500"
                : data.reclamacao[0]?.status === "Aceite"
                ? "bg-green-500"
                : data.reclamacao[0]?.status === "Analise"
                ? "bg-blue-500"
                : "bg-red-500"
            }`}
          >
            {data.reclamacao[0]?.status}
          </p>
        </div>
      </div>

      {/* Motivo */}
      <div className="mb-6">
        <label htmlFor="motivo" className="block text-gray-700 font-semibold mb-2">
          Motivo
        </label>
        <p className="text-lg">{data.reclamacao[0]?.motivo}</p>
      </div>

      {/* Título da Resposta */}
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Resposta à Reclamação</h2>

      {/* Observação */}
      <div>
        <label htmlFor="observacao" className="block text-gray-700 font-semibold mb-2">
          Observação
        </label>
        <p className="text-lg">
          {data.reclamacao[0]?.observacao ? data.reclamacao[0]?.observacao : "Sem Observação"}
        </p>
      </div>
    </div>
  )}
</div>

    </div>
  )
}
