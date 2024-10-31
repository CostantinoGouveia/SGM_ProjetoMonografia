// pages/api/relatorio.js

import PDFDocument from 'pdfkit';

export default function handler(req, res) {
  // Configura o cabeçalho da resposta para o tipo PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');

  // Cria um novo documento PDF
  const doc = new PDFDocument();

  // Transmite o PDF gerado como resposta
  doc.pipe(res);

  // Conteúdo do PDF
  doc.fontSize(20).text('Relatório de Exemplo', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text('Este é um relatório gerado pelo PDFKit com um endpoint de API no Next.js.');
  
  // Adicione mais conteúdo ao relatório
  doc.moveDown();
  doc.text('Aqui você pode adicionar mais informações relevantes.', { align: 'left' });

  // Finaliza o documento
  doc.end();
}
