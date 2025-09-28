import React, { useState, useEffect } from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import HistoricalChart from '../components/HistoricalChart';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Modal from '../components/Modal';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header toggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
                    <div className="flex flex-wrap -mx-4">
                        {/* Gráfico de Produtos Mais Vendidos */}
                        <div className="w-full md:w-1/2 px-4 mb-4">
                            <div className="bg-white rounded-lg shadow p-4">
                                <h2 className="text-xl font-semibold mb-2">Produtos Mais Vendidos</h2>
                                <select className="w-full p-2 border rounded mb-2">
                                    <option>Filtrar por Produto</option>
                                    {/* Opções de produtos aqui */}
                                </select>
                                <BarChart />
                            </div>
                        </div>

                        {/* Gráfico de Maiores Gastos de Matéria-Prima */}
                        <div className="w-full md:w-1/2 px-4 mb-4">
                            <div className="bg-white rounded-lg shadow p-4">
                                <h2 className="text-xl font-semibold mb-2">Maiores Gastos de Matéria-Prima</h2>
                                <select className="w-full p-2 border rounded mb-2">
                                    <option>Filtrar por Matéria-Prima</option>
                                    {/* Opções de matérias-primas aqui */}
                                </select>
                                <PieChart />
                            </div>
                        </div>

                        {/* Gráfico de Histórico de Valores por Matéria-Prima */}
                        <div className="w-full px-4 mb-4">
                            <div className="bg-white rounded-lg shadow p-4">
                                <h2 className="text-xl font-semibold mb-2">Histórico de Valores por Matéria-Prima</h2>
                                <div className="flex space-x-2 mb-2">
                                    <select className="w-1/2 p-2 border rounded">
                                        <option>Filtrar por Matéria-Prima</option>
                                        {/* Opções de matérias-primas aqui */}
                                    </select>
                                    <input type="date" className="w-1/2 p-2 border rounded" />
                                </div>
                                <HistoricalChart />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
