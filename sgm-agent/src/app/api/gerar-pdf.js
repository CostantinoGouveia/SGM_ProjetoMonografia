import puppeteer from 'puppeteer';

export default async function handler(req, res) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

   // await page.goto('http://localhost:3322/', { waitUntil: 'networkidle0' });
    // Defina o conteúdo HTML que você deseja converter em PDF
    const content = `
      <!DOCTYPE html>
      <html lang="pt-br">
        <head>
          <title>Título da página</title>
          <meta charset="utf-8">
        </head>
        <body>
          Aqui vai o código HTML que fará seu site aparecer.
        </body>
      </html>
    `;

    await page.setContent(content);
    const pdfBuffer = await page.pdf({ format: 'A4' }); // Gera o PDF em formato A4
    await browser.close();

    // Define o cabeçalho de resposta para PDF e envia o buffer de PDF gerado
  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="exemplo.pdf"'); // Use inline para abrir no navegador
    res.send(pdfBuffer);
 return res.end(pdfBuffer);
}
