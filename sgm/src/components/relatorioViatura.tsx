"use client";

import { COLORS } from "@/lib/utils";
import { GET_AUTOMOBILISTAS, GET_MARCAS, GET_MULTAS, GET_MUNICIPIOS, GET_PROVINCIAS, GET_VIATURAS } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { isAfter, isBefore, isWithinInterval } from "date-fns";
import React, { useState, useEffect } from "react";

const RelatorioViatura = () => {

  const { data, isSuccess } = useQuery({
    queryKey: ['get-viatu'],
    queryFn: () => GET_VIATURAS()
  });
  const { data: dataM, isSuccess: isM } = useQuery({
    queryKey: ['get-marcas'],
    queryFn: () => GET_MARCAS()
  });
  const { data: dataP, isSuccess: isP } = useQuery({
    queryKey: ['get-provincia'],
    queryFn: () => GET_PROVINCIAS()
  });
  console.log(data)

  const [relatorio, setRelatorio] = useState<any>([]);
  const [filtros, setFiltros] = useState({
    marca: "",
    cor: "",
    modelo: "",
    bi: "",
    nome: ""
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
      if (filtros.marca && item.marca?.descMarca.toLowerCase() !== filtros.marca.toLowerCase()) return false;
      if (filtros.bi && !item.titulopropriedade?.[0]?.pessoa.bi.numeroBI.toLowerCase().includes(filtros.bi.toLowerCase())) return false;
      if (filtros.cor && item.corViatura.toLowerCase() !== filtros.cor.toLowerCase()) return false;
      if (filtros.modelo && !item.modelo.toLowerCase().includes(filtros.modelo.toLowerCase())) return false;
      if (filtros.nome && !item.titulopropriedade?.[0]?.pessoa.nome.toLowerCase().includes(filtros.nome.toLowerCase())) return false;
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
          <label htmlFor="marca">Marcas:</label>
          <select
            id="marca"
            name="marca"
            value={filtros.marca}
            onChange={handleFiltroChange}
          >
            <option value="">Todos</option>
            {isM && dataM.map((item: any, index: number) => (
              <option value={item.descMarca}>{item.descMarca}</option>
            )
            )}
          </select>
        </div>
        <div>
          <label htmlFor="cor">cor da viatura:</label>
          <select
            id="cor"
            name="cor"
            value={filtros.cor}
            onChange={handleFiltroChange}
          >
            <option value="">Todos</option>
            {COLORS.map((item: any, index: number) => (
              <option value={item.name}>{item.name}</option>
            )
            )}
          </select>
        </div>
        <div>
          <label htmlFor="modelo">Modelos:</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={filtros.modelo}
            onChange={handleFiltroChange}
          />
        </div>
        <div className="justify-center">
          <div className="">
            <label htmlFor="bi">BI titular:</label>
            <input
              type="text"
              id="bi"
              name="bi"
              value={filtros.bi}
              onChange={handleFiltroChange}
            />
          </div>
          <div className="py-3 justify-center">
            <label htmlFor="nome">nome titular:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={filtros.nome}
              onChange={handleFiltroChange}
            />
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Numero de Matricula</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Cor</th>
            <th>Lotacao</th>
            <th>Combustivel</th>
            <th>Titular (nome)</th>
            <th>Genero (Titular)</th>
            <th>Numero do BI (Titular)</th>
          </tr>
        </thead>
        <tbody>
          {dadosFiltrados.map((item: any, index: number) => (
            <tr key={item.codigo}>
              <td>{index + 1}</td>
              <td>{item?.numeroMatricula}</td>
              <td>{item?.marca?.descMarca}</td>
              <td>{item?.modelo}</td>
              <td>{item?.corViatura}</td>
              <td>{item?.lotacao}</td>
              <td>{item?.conbustivel}</td>
              <td>{item?.titulopropriedade[0]?.pessoa.nome}</td>
              <td>{item?.titulopropriedade[0]?.pessoa.genero}</td>
              <td>{item?.titulopropriedade[0]?.pessoa.bi.numeroBI}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer>
        <p> © {new Date().getFullYear().toLocaleString()} Lista de Viaturas - Sistema de Gestão de Multas</p>
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

export default RelatorioViatura;
