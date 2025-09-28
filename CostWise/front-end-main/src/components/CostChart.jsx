import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CostChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/graficos/custo-produtos');
        if (!response.ok) {
          throw new Error('Falha ao buscar dados');
        }
        const data = await response.json();

        // Processa os dados para o formato do Chart.js
        const chartLabels = data.map(item => item.nome);
        const chartValues = data.map(item => item.custo);

        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: 'Custo por Produto',
              data: chartValues,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!chartData) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ height: '400px', width: '600px' }}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Custo Total por Produto',
            },
          },
        }}
      />
    </div>
  );
};

export default CostChart;
