import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraficaVentas({ datos }) {

  const data = {
    labels: datos.map((item) => item.fecha),
    datasets: [
      {
        label: "Ventas",
        data: datos.map((item) => item.total),
        borderColor: "#16a34a",
        backgroundColor: "rgba(22,163,74,.2)",
        tension: 0.3,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Ventas de los últimos 7 días"
      }
    }
  };

  return <Line data={data} options={options} />;

}

export default GraficaVentas;