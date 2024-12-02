"use client";

import { GET_ALERTAS_ROUBO, GET_MULTAS } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { isAfter, isBefore, isWithinInterval } from "date-fns";
import React, { useState, useEffect } from "react";

const RelatorioAlertas = () => {

  const { data, isSuccess } = useQuery({
    queryKey: ['get-MULTAS1'],
    queryFn: () => GET_ALERTAS_ROUBO()
  });
  console.log(data)

  const [relatorio, setRelatorio] = useState<any>([]);
  const [filtros, setFiltros] = useState({
    data: "",
    status: "",
    fim: "",
    roubo: false
  });

  useEffect(() => {
    // Simulação de dados (substituir com fetch para API)
    
    isSuccess && setRelatorio(data);
  }, [data]);

  const handleFiltroChange = (e: any) => {
    const { name, type, checked, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const filtrarRelatorio = () => {
    // Implementar lógica de filtro aqui, se necessário
    return relatorio.filter((item: any) => {
      const dataI = new Date(filtros.data);
      const dataF = new Date(filtros.fim);
      if (!filtros.roubo && filtros.data && filtros.fim && !isWithinInterval(new Date(item.dataFeita), { start: dataI, end: dataF })) return false;
      if (filtros.roubo && filtros.fim && !isWithinInterval(new Date(item.dataRoubo), { start: dataI, end: dataF })) return false;
      if (filtros.status && item.status.toLowerCase() !== filtros.status.toLowerCase()) return false;
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
        <h1>Relatório de Alertas de Roubo</h1>
        <p>Emitido em: {new Date().toLocaleDateString()}</p>
      </header>

      <div className="filters ">
        <div>
          <label htmlFor="data">Data de inicio:</label>
          <input
            type="date"
            id="data"
            name="data"
            value={filtros.data}
            onChange={handleFiltroChange}
          />
        </div>
        <div>
          <label htmlFor="fim">Data de fim:</label>
          <input
            type="date"
            id="fim"
            name="fim"
            value={filtros.fim}
            onChange={handleFiltroChange}
          />
        </div>

        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={filtros.status}
            onChange={handleFiltroChange}
          >
            <option value="">Todos</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
        <div className="">
          <div>
            <label htmlFor="tribunal">Usar data Roubo:</label>
            <input
              type="checkbox"
              id="roubo"
              name="roubo"
              checked={filtros.roubo || false}
              onChange={handleFiltroChange}
            />
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Data Feita</th>
            <th>Data Roubo</th>
            <th>Tipo Roubo</th>
            <th>Status</th>
            <th>Automobilista</th>
            <th>Viatura</th>
          </tr>
        </thead>
        <tbody>
          {dadosFiltrados.map((item: any, index: number) => (
            <tr key={item.codigo}>
              <td>{index + 1}</td>
              <td>{new Date(item.dataFeita).toLocaleDateString()}</td>
              <td>{new Date(item.dataRoubo).toLocaleDateString()}</td>
              <td>{item.tiporoubo?.descTipoRoubo}</td>
              <td>{item.status}</td>
              <td>{item.automobilista?.pessoa?.nome}</td>
              <td>{item.viatura?.numeroMatricula}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer>
        <p>© 2024 Relatório de Alertas - Sistema de Gestão de Multas</p>
      </footer>

      <style jsx>{`
        .container {
          max-width: 310mm;
          margin: 0 auto;
          padding: 20px;
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
          justify-content: space-between;
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

export default RelatorioAlertas;
