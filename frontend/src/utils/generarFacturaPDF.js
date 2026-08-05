import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generarFacturaPDF = (factura) => {

  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.text("PAÑALERA", 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.text("Sistema de Facturación", 105, 22, { align: "center" });

  // Datos de la factura
  doc.setFontSize(11);

  doc.text(`Factura No: ${factura.id}`, 14, 35);
  doc.text(`Fecha: ${factura.fecha}`, 14, 42);
  doc.text(`Cliente: ${factura.cliente}`, 14, 49);

  // Tabla de productos
  autoTable(doc, {
    startY: 60,
    head: [["Producto", "Cantidad", "Precio", "Subtotal"]],
    body: factura.detalle.map((item) => [
      item.nombre,
      item.cantidad,
      `$${Number(item.precio).toLocaleString()}`,
      `$${Number(item.subtotal).toLocaleString()}`
    ])
  });

  // Total
  doc.setFontSize(13);

  doc.text(
    `TOTAL: $${Number(factura.total).toLocaleString()}`,
    14,
    doc.lastAutoTable.finalY + 15
  );

  // Abrir PDF
  doc.save(`Factura_${factura.id}.pdf`);

};

export default generarFacturaPDF;