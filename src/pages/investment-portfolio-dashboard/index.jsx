import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import PortfolioMetrics from './components/PortfolioMetrics';
import PerformanceChart from './components/PerformanceChart';
import AssetAllocation from './components/AssetAllocation';
import HoldingsTable from './components/HoldingsTable';
import PortfolioControls from './components/PortfolioControls';

const InvestmentPortfolioDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [selectedBenchmark, setSelectedBenchmark] = useState('S&P 500');
  const [selectedPortfolio, setSelectedPortfolio] = useState('Main Portfolio');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock portfolio data
  const portfolioData = {
    totalValue: 125750.50,
    dailyChange: 2340.75,
    dailyChangePercent: 1.89,
    totalReturn: 18750.25,
    totalReturnPercent: 17.52,
    allocationScore: 85
  };

  const performanceData = [
    { date: '2023-01', portfolio: 107000, benchmark: 105000 },
    { date: '2023-02', portfolio: 109500, benchmark: 106800 },
    { date: '2023-03', portfolio: 108200, benchmark: 105200 },
    { date: '2023-04', portfolio: 112300, benchmark: 108900 },
    { date: '2023-05', portfolio: 115600, benchmark: 111200 },
    { date: '2023-06', portfolio: 118900, benchmark: 113800 },
    { date: '2023-07', portfolio: 121200, benchmark: 116500 },
    { date: '2023-08', portfolio: 119800, benchmark: 115200 },
    { date: '2023-09', portfolio: 117500, benchmark: 113900 },
    { date: '2023-10', portfolio: 120800, benchmark: 116800 },
    { date: '2023-11', portfolio: 123400, benchmark: 119200 },
    { date: '2023-12', portfolio: 125750, benchmark: 121500 }
  ];

  const assetAllocation = [
    { name: 'Stocks', value: 65, amount: 81738.83, color: '#1E40AF' },
    { name: 'Bonds', value: 20, amount: 25150.10, color: '#0EA5E9' },
    { name: 'Real Estate', value: 10, amount: 12575.05, color: '#059669' },
    { name: 'Commodities', value: 3, amount: 3772.52, color: '#D97706' },
    { name: 'Cash', value: 2, amount: 2515.01, color: '#64748B' }
  ];

  const holdings = [
    {
      id: 1,
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 50,
      currentPrice: 175.25,
      dailyChange: 2.15,
      dailyChangePercent: 1.24,
      totalValue: 8762.50,
      totalReturn: 1250.00,
      totalReturnPercent: 16.67,
      allocation: 6.97
    },
    {
      id: 2,
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 30,
      currentPrice: 342.80,
      dailyChange: -1.45,
      dailyChangePercent: -0.42,
      totalValue: 10284.00,
      totalReturn: 1840.00,
      totalReturnPercent: 21.79,
      allocation: 8.18
    },
    {
      id: 3,
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 25,
      currentPrice: 128.45,
      dailyChange: 3.20,
      dailyChangePercent: 2.56,
      totalValue: 3211.25,
      totalReturn: 485.75,
      totalReturnPercent: 17.82,
      allocation: 2.55
    },
    {
      id: 4,
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      shares: 15,
      currentPrice: 245.60,
      dailyChange: 8.90,
      dailyChangePercent: 3.76,
      totalValue: 3684.00,
      totalReturn: -320.00,
      totalReturnPercent: -7.99,
      allocation: 2.93
    },
    {
      id: 5,
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      shares: 20,
      currentPrice: 485.20,
      dailyChange: 12.30,
      dailyChangePercent: 2.60,
      totalValue: 9704.00,
      totalReturn: 2850.00,
      totalReturnPercent: 41.58,
      allocation: 7.72
    }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleBenchmarkChange = (benchmark) => {
    setSelectedBenchmark(benchmark);
  };

  const handlePortfolioChange = (portfolio) => {
    setSelectedPortfolio(portfolio);
  };

  const handleExportData = () => {
    console.log('Exporting portfolio data...');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Investment Portfolio</h1>
            <p className="text-text-secondary mt-1">
              Track your investment performance and asset allocation
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Clock" size={16} strokeWidth={2} />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
            <button
              onClick={handleExportData}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-smooth"
            >
              <Icon name="Download" size={16} strokeWidth={2} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Portfolio Controls */}
        <PortfolioControls
          selectedPeriod={selectedPeriod}
          selectedBenchmark={selectedBenchmark}
          selectedPortfolio={selectedPortfolio}
          onPeriodChange={handlePeriodChange}
          onBenchmarkChange={handleBenchmarkChange}
          onPortfolioChange={handlePortfolioChange}
        />

        {/* Portfolio Metrics */}
        <PortfolioMetrics data={portfolioData} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <div className="xl:col-span-2">
            <PerformanceChart
              data={performanceData}
              selectedPeriod={selectedPeriod}
              selectedBenchmark={selectedBenchmark}
            />
          </div>

          {/* Asset Allocation */}
          <div className="xl:col-span-1">
            <AssetAllocation data={assetAllocation} />
          </div>
        </div>

        {/* Holdings Table */}
        <HoldingsTable holdings={holdings} />
      </div>
    </div>
  );
};

export default InvestmentPortfolioDashboard;