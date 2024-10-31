"use client";

import { GET_MULTA_BY_ID } from '@/routes';
import { useQuery } from '@tanstack/react-query';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

export default function HandleDownload({ id }: { id: any }) {


    const { data, isSuccess } = useQuery({
        queryKey: ["multa_id", id],
        queryFn: () => GET_MULTA_BY_ID(id),
        enabled: !!id,
    })

    console.log("cerreeeerre", data)
    const handleDown = async () => {

        const doc = new jsPDF({
            unit: "mm",        // Define a unidade como milímetros
            format: [80, 297], // Define a largura de 80mm e altura de 297mm (A4) ou ajuste conforme necessário
        });

        // Conteúdo do recibo
        // Título Principal
        doc.setFontSize(14);
        doc.text("DETALHES DA MULTA", 10, 10);

        // Dados do Automobilista
        doc.setFontSize(11);
        doc.text("Dados do Automobilista", 5, 20);
        doc.setFontSize(9);
        doc.text(`Nome: ${data.automobilista.pessoa.nome}`, 5, 25);
        console.log("data", data.pagamentomulta[0].dataCriacao)
        doc.text(`Número da Carta: ${data.automobilista?.cartaconducao.numeroCarta}`, 5, 30);
        doc.text(`Número do BI: ${data.automobilista.pessoa.bi.numeroBI}`, 5, 35);
        doc.text(`Contatos: ${data.automobilista.pessoa.contacto.contacto1} | ${data.automobilista.pessoa.contacto.email1}`, 5, 40);

        // Dados da Multa
        doc.setFontSize(11);
        doc.text("Dados da Multa", 5, 50);
        doc.setFontSize(9);
        doc.text(`Data de Aplicação: ${data.pagamentomulta[0].dataCriacao}`, 5, 55);
        doc.text(`Aplicado a (Matrícula): ${data.viatura === null ? "Indivíduo" : data.viatura.numeroMatricula}`, 5, 60);
        doc.text(`Quantidade de Infrações: ${data.infracao.length}`, 5, 65);
        
        // Pagamentos
        doc.setFontSize(11);
        doc.text("Pagamentos", 5, 80);
        doc.setFontSize(9);
        doc.text(`Referência: ${data.pagamentomulta[0].referencia}`, 5, 85);
        doc.text(`Valor Pago (Kz): ${data.pagamentomulta[0].valorPago}`, 5, 90);
        doc.text(`Data do Pagamento: ${new Date(data.dataPagamento).toISOString().split("T")[0] || "N/A"}`, 5, 95);
        doc.text(`Status: ${data.pagamentomulta[0].status}`, 5, 100);
        doc.text(`Hora do Pagamento: ${new Date(data.dataPagamento).toISOString().split("T")[1].split(".")[0] || "N/A"}`, 5, 105);
        doc.text(`Transação: ${data.pagamentomulta[0].descCodigoDeposito}`, 5, 110);

        // Dados do Agente
        doc.setFontSize(11);
        doc.text("Dados do Agente", 5, 120);
        doc.setFontSize(9);
        doc.text(`Nome do Agente: ${data.funcionario?.pessoa.nome}`, 5, 125);
        doc.text(`NIP: ${data.funcionario?.numeroAgente}`, 5, 130);

        // Lista de Infrações
        doc.setFontSize(11);
        doc.text("Lista de Infrações", 5, 140);
        doc.setFontSize(9);
        doc.text(`Tipo       -         Valor`, 5, 145);
        doc.setFontSize(8);
        data.infracao.map((infra: any, index: number) => {
            const positionY = 150 + index * 5; // Posiciona as linhas em sequência
            doc.text(`${infra.tipoinfracao.descTipoInfracao} - ${infra.tipoinfracao.valorInfracao } UCF`, 5, positionY, { maxWidth: 80 });
        })
            
        // Salvar o PDF com um nome específico
        doc.save('multa.pdf');
    };

    return (
        <button onClick={handleDown}>Imprimir</button>
    )
}