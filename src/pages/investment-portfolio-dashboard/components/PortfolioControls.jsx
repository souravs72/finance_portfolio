import React from 'react';
import Icon from 'components/AppIcon';

const PortfolioControls = ({
  selectedPeriod,
  selectedBenchmark,
  selectedPortfolio,
  onPeriodChange,
  onBenchmarkChange,
  onPortfolioChange
}) => {
  const periods = ['1D', '1W', '1M', '3M', '1Y', '5Y'];
  const benchmarks = ['S&P 500', 'NASDAQ', 'Dow Jones', 'Custom Index'];
  const portfolios = ['Main Portfolio', 'Retirement Fund', 'Growth Portfolio', 'Conservative Mix'];

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Portfolio</label>
          <div className="relative">
            <select
              value={selectedPortfolio}
              onChange={(e) => onPortfolioChange(e.target.value)}
              className="w-full input-field appearance-none pr-10"
            >
              {portfolios.map((portfolio) => (
                <option key={portfolio} value={portfolio}>
                  {portfolio}
                </option>
              ))}
            </select>
            <Icon
              name="ChevronDown"
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
            />
          </div>
        </div>

        {/* Period Toggle */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Time Period</label>
          <div className="flex bg-background rounded-lg p-1 border border-border">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => onPeriodChange(period)}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
                  selectedPeriod === period
                    ? 'bg-primary text-white shadow-light'
                    : 'text-text-secondary hover:text-primary hover:bg-primary/5'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Benchmark Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Benchmark</label>
          <div className="relative">
            <select
              value={selectedBenchmark}
              onChange={(e) => onBenchmarkChange(e.target.value)}
              className="w-full input-field appearance-none pr-10"
            >
              {benchmarks.map((benchmark) => (
                <option key={benchmark} value={benchmark}>
                  {benchmark}
                </option>
              ))}
            </select>
            <Icon
              name="ChevronDown"
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioControls;