"use client";

import { GET_AUTOMOBILISTAS, GET_FUNCIONARIOS, GET_MULTAS, GET_MUNICIPIOS, GET_PROVINCIAS, GET_TIPOSINFRACAO } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { isAfter, isBefore, isWithinInterval } from "date-fns";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";

const RelatorioInfracao = () => {

  const { data, isSuccess } = useQuery({
    queryKey: ['get-tipoInfrcao'],
    queryFn: () => GET_TIPOSINFRACAO()
});

  const [relatorio, setRelatorio] = useState<any>([]);
  const [filtros, setFiltros] = useState({
    bi: "",
    nome: ""
  });

  useEffect(() => {
    isSuccess && setRelatorio(data);
  }, [data]);

  const handleFiltroChange = (e: any) => {
    const { name, type, checked, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const filtrarRelatorio = () => {
    // Implementar lógica de filtro aqui, se necessário
    return relatorio.filter((item: any) => {
      if (filtros.nome && !item.descTipoInfracao.toLowerCase().includes(filtros.nome.toLowerCase())) return false;
      if (filtros.bi && !item.valorInfracao.toLowerCase().includes(filtros.bi.toLowerCase())) return false;
      return true;
    });
  };
  const dadosFiltrados = filtrarRelatorio();
  return (
    <div className="container">
      <header>
        <div className="flex items-center justify-center"><img className="w-12 " src="./images/logo.png" /></div>
        <p>DIRECÇÃO NACIONAL DE VIAÇÃO E TRÂNSITO</p>
        <p>DNVT</p>
        <h1>Relatório de Infrações</h1>
        <p>Emitido em: {new Date().toLocaleDateString()}</p>
      </header>

      <div className="filters">
        <div className="flex flex-col md:flex-row gap-1">
          <Input placeholder="Descrição"
            id="nome"
            name="nome"
            value={filtros.nome}
            onChange={handleFiltroChange}
          />
          <Input placeholder="Valor em UCF"
            id="bi"
            name="bi"
            value={filtros.bi}
            onChange={handleFiltroChange}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Valor em UCF</th>
            <th>Qtd já cometidas</th>
          </tr>
        </thead>
        <tbody>
          {dadosFiltrados.map((item: any, index: number) => (
            <tr key={item.codigo}>
              <td>{index + 1}</td>
              <td>{item?.descTipoInfracao}</td>
              <td>{item?.valorInfracao}</td>
              <td>{item?.infracao.length}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer>
        <p> © {new Date().getFullYear().toLocaleString()} Relatório de Infrações - Sistema de Gestão de Multas</p>
      </footer>

      <style jsx>{`
        .container {
          max-width: 100vw;
          margin: 0 auto;
          padding: 10px;
          background: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        header {
          text-align: center;
          margin-bottom: 20px;
        }

        header h1 {
          font-size: 24px;
          margin-bottom: 5px;
        }

        header p {
          font-size: 14px;
          color: #555;
        }

        .filters {
          margin-bottom: 20px;
          padding: 10px;
          background: #f1f1f1;
          border-radius: 5px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }

        .filters label {
          margin-right: 10px;
          font-weight: bold;
        }

        .filters select,
        .filters input {
          padding: 5px;
          margin-right: 30px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        table th,
        table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }

        table th {
          background-color: #f4f4f4;
          font-weight: bold;
        }

        table tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        table tr:hover {
          background-color: #f1f1f1;
        }

        footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #555;
        }

        @media print {
          .filters {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default RelatorioInfracao;
