"use client";

import { GET_AUTOMOBILISTAS, GET_MULTAS, GET_MUNICIPIOS, GET_PROVINCIAS } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { isAfter, isBefore, isWithinInterval } from "date-fns";
import React, { useState, useEffect } from "react";

const RelatorioAtomobobilista = () => {

  const { data, isSuccess } = useQuery({
    queryKey: ['get-automobilista'],
    queryFn: () => GET_AUTOMOBILISTAS()
  });
  const { data:dataM, isSuccess:isM } = useQuery({
    queryKey: ['get-municipio'],
    queryFn: () => GET_MUNICIPIOS()
  });
  const { data:dataP, isSuccess:isP } = useQuery({
    queryKey: ['get-provincia'],
    queryFn: () => GET_PROVINCIAS()
  });
  console.log(data)

  const [relatorio, setRelatorio] = useState<any>([]);
  const [filtros, setFiltros] = useState({
    provincia: "",
    municipio: "",
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
      if (filtros.provincia && item.pessoa?.endereco?.municipio?.provincia?.provincia.toLowerCase() !== filtros.provincia.toLowerCase()) return false;
      if (filtros.municipio && item.pessoa?.endereco?.municipio?.municipio.toLowerCase() !== filtros.municipio.toLowerCase()) return false;
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
        <h1>Lista de Automobilistas</h1>
        <p>Emitido em: {new Date().toLocaleDateString()}</p>
      </header>

      <div className="filters">

        <div>
          <label htmlFor="provincia">Provincia:</label>
          <select
            id="provincia"
            name="provincia"
            value={filtros.provincia}
            onChange={handleFiltroChange}
          >
            <option value="">Todos</option>
            {isP && dataP.map((item: any, index: number) => (
                <option value={item.provincia}>{item.provincia}</option>
            )
            )}
          </select>
        </div>
        <div>
          <label htmlFor="municipio">Municipio:</label>
          <select
            id="municipio"
            name="municipio"
            value={filtros.municipio}
            onChange={handleFiltroChange}
          >
            <option value="">Todos</option>
            {isM && dataM.map((item: any, index: number) => (
                <option value={item.municipio}>{item.municipio}</option>
            )
            )}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>BI</th>
            <th>Nacionalidade</th>
            <th>Genero</th>
            <th>Nº carta</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Provincia</th>
            <th>Municipio</th>
            <th>Endereco</th>
          </tr>
        </thead>
        <tbody>
          {dadosFiltrados.map((item: any, index: number) => (
            <tr key={item.codigo}>
              <td>{index + 1}</td>
              <td>{item?.pessoa?.nome}</td>
              <td>{item?.pessoa?.bi?.numeroBI}</td>
              <td>{item?.pessoa?.pais?.pais}</td>
              <td>{item?.pessoa?.genero}</td>
              <td>{item?.cartaconducao?.numeroCarta}</td>
              <td>{item?.pessoa?.contacto?.contacto1}</td>
              <td>{item?.pessoa?.contacto?.email1}</td>
              <td>{item?.pessoa?.endereco?.municipio?.provincia?.provincia}</td>
              <td>{item?.pessoa?.endereco?.municipio?.municipio}</td>
              <td>{item?.pessoa?.endereco?.descricaoEndereco}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer>
        <p> © {new Date().getFullYear().toLocaleString()} Lista de Automobilistas - Sistema de Gestão de Multas</p>
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

export default RelatorioAtomobobilista;
