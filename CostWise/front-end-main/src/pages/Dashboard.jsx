import React, { useState, useEffect } from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import HistoricalChart from '../components/HistoricalChart';

const Dashboard = () => {
  const [salesData, setSalesData] = useState(null);
  const [spendingData, setSpendingData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [productCostData, setProductCostData] = useState(null); // Novo estado para custo de produtos
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      console.log("Buscando dados atualizados para os gráficos...");
      setIsLoading(true);

      // Simulação para os gráficos existentes (manter por enquanto, depois substituir por fetch real)
      setTimeout(() => {
        const randomFactor = 1 + (Math.random() - 0.5) * 0.1;
        const mockSalesData = [
          { product: 'Bobina de Ignição', value: 32050 * randomFactor },
          { product: 'Bobina de Pulso Gerador', value: 26760 * randomFactor },
        ];
        const mockSpendingData = [
          { material: 'Fio de cobre esmaltado', percentage: 30.0 * randomFactor },
          { material: 'Resina Epóxi', percentage: 35.0 },
        ];
        const mockHistoryData = {
          'JAN': 79.47, 'FEV': 74.05, 'MAR': 70.53 * randomFactor,
        };

        setSalesData(mockSalesData);
        setSpendingData(mockSpendingData);
        setHistoryData(mockHistoryData);
      }, 1000);

      // --- Nova chamada para o gráfico de custo de produtos ---
      try {
        const response = await fetch('/graficos/custo-produtos'); // Faz a requisição para o seu back-end
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProductCostData(data.map(item => ({ product: item.nome, value: item.custo }))); // Adapta o formato para o BarChart
      } catch (error) {
        console.error("Erro ao buscar custo dos produtos:", error);
        setProductCostData([]); // Define como vazio em caso de erro
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
    const intervalId = setInterval(fetchChartData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="dashboard-grid">
        <div className="card chart-card">
          <div className="chart-header">
            <h2 className="chart-title">Produtos mais vendidos</h2>
            <select className="dropdown"><option>Agosto</option></select>
          </div>
          {isLoading || !salesData ? (
            <div className="loading-placeholder">Carregando dados...</div>
          ) : (
            <BarChart data={salesData} />
          )}
        </div>

        <div className="card chart-card">
          <div className="chart-header">
            <h2 className="chart-title">Maiores gastos de matéria-prima</h2>
            <select className="dropdown"><option>Setembro</option></select>
          </div>
          {isLoading || !spendingData ? (
            <div className="loading-placeholder">Carregando dados...</div>
          ) : (
            <PieChart data={spendingData} />
          )}
        </div>

        {/* Novo Card para o Gráfico de Custo de Produtos */}
        <div className="card chart-card">
          <div className="chart-header">
            <h2 className="chart-title">Custo Total por Produto</h2>
            {/* Opcional: Adicionar um dropdown de filtro se houver múltiplos períodos, etc. */}
          </div>
          {isLoading || !productCostData ? (
            <div className="loading-placeholder">Carregando dados...</div>
          ) : (
            <BarChart data={productCostData} />
          )}
        </div>

        <div className="card chart-card" style={{ gridColumn: '1 / -1' }}>
          <div className="chart-header">
            <h2 className="chart-title">Histórico de valores por matéria prima</h2>
            <select className="dropdown"><option>2024</option></select>
          </div>
          {isLoading || !historyData ? (
            <div className="loading-placeholder">Carregando dados...</div>
          ) : (
            <HistoricalChart data={historyData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
