"use client";

import { GET_MULTAS, GET_RECLAMACOES } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { isAfter, isBefore, isWithinInterval } from "date-fns";
import React, { useState, useEffect } from "react";

const RelatorioReclamacao = () => {

  const { data, isSuccess } = useQuery({
    queryKey: ['get-MULTAS1'],
    queryFn: () => GET_RECLAMACOES()
  });
  console.log(data)

  const [relatorio, setRelatorio] = useState<any>([]);
  const [filtros, setFiltros] = useState({
    data: "",
    status: "",
    statusR: "",
    fim: "",
    tribunal: false,
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
      if (filtros.data && filtros.fim && !isWithinInterval(new Date(item.dataReclamacao), { start: dataI, end: dataF })) return false;
      if (filtros.status && item.multa.pagamentomulta[0].status.toLowerCase() !== filtros.status.toLowerCase()) return false;
      if (filtros.statusR && item.status.toLowerCase() !== filtros.statusR.toLowerCase()) return false;
      if (filtros.tribunal && !item.multa.statusTribunal) return false;
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
        <h1>Relatório de Reclamações</h1>
        <p>Emitido em: {new Date().toLocaleDateString()}</p>
      </header>

      <div className="filters ">
        <div className="fe">
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
        </div>
        <div>
            <label htmlFor="tribunal">Em tribunal:</label>
            <input
              type="checkbox"
              id="tribunal"
              name="tribunal"
              checked={filtros.tribunal || false}
              onChange={handleFiltroChange}
            />
          </div>
        <div className="">
        <div>
          <label htmlFor="status">Status Pagamento:</label>
          <select
            id="status"
            name="status"
            value={filtros.status}
            onChange={handleFiltroChange}
          >
            <option value="">Todos</option>
            <option value="pendente">Pendentes</option>
            <option value="pago">Pagas</option>
            <option value="Nao Pago">Não Pagas</option>
          </select>
        </div>
        <div>
          <label htmlFor="statusR">Status Reclamacao:</label>
          <select
            id="statusR"
            name="statusR"
            value={filtros.statusR}
            onChange={handleFiltroChange}
          >
            <option value="">Todos</option>
            <option value="Pendente">Pendentes</option>
            <option value="Negada">Negadas</option>
            <option value="Aceite">Aceites</option>
          </select>
        </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Data Reclamacao</th>
            <th>Status Pagamento</th>
            <th>Status Reclamacao</th>
            <th>Automobilista</th>
            <th>Funcionário</th>
          </tr>
        </thead>
        <tbody>
          {dadosFiltrados.map((item: any, index: number) => (
            <tr key={item.codigo}>
              <td>{index + 1}</td>
              <td>{new Date(item.dataReclamacao).toLocaleDateString()}</td>
              <td>{item.multa?.pagamentomulta[0]?.status}</td>
              <td>{item.status}</td>
              <td>{item.multa?.automobilista?.pessoa?.nome}</td>
              <td>{item.funcionario?.pessoa?.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer>
        <p>© 2024 Relatório de Reclamações - Sistema de Gestão de Multas</p>
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
        .filters fe label {
          margin-right: 10px;
          font-weight: bold;
        }

        .filters select,
        .filters input {
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .filters fe input {
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

export default RelatorioReclamacao;
