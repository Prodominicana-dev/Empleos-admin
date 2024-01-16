import { PDFcrowd } from 'pdfcrowd';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Método no permitido
    return;
  }

  const { content } = req.body;

  try {
    const client = new PDFcrowd('username', 'apikey');
    const pdf = await client.convertHtml(content);

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    res.status(500).end('Error al generar el PDF');
  }
}