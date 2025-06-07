import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const HoldingsTable = ({ holdings }) => {
  const [sortField, setSortField] = useState('totalValue');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedHolding, setSelectedHolding] = useState(null);

  const formatCurrency = (value) => {
    return `$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const formatPercent = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedHoldings = [...holdings].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleRowClick = (holding) => {
    setSelectedHolding(selectedHolding?.id === holding.id ? null : holding);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-secondary" strokeWidth={2} />;
    }
    return (
      <Icon
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'}
        size={14}
        className="text-primary"
        strokeWidth={2}
      />
    );
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-light overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Holdings</h3>
            <p className="text-sm text-text-secondary">
              {holdings.length} positions • Click any row for detailed analysis
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth">
              <Icon name="Filter" size={16} strokeWidth={2} />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth">
              <Icon name="Download" size={16} strokeWidth={2} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('symbol')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Symbol</span>
                  <SortIcon field="symbol" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('currentPrice')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Price</span>
                  <SortIcon field="currentPrice" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('dailyChangePercent')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Daily Change</span>
                  <SortIcon field="dailyChangePercent" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('shares')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Shares</span>
                  <SortIcon field="shares" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('totalValue')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Market Value</span>
                  <SortIcon field="totalValue" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('totalReturnPercent')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Total Return</span>
                  <SortIcon field="totalReturnPercent" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('allocation')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Allocation</span>
                  <SortIcon field="allocation" />
                </button>
              </th>
              <th className="text-center p-4">
                <span className="text-sm font-medium text-text-primary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedHoldings.map((holding) => (
              <React.Fragment key={holding.id}>
                <tr
                  onClick={() => handleRowClick(holding)}
                  className={`border-b border-border hover:bg-background/50 cursor-pointer transition-smooth ${
                    selectedHolding?.id === holding.id ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-text-primary">{holding.symbol}</p>
                      <p className="text-sm text-text-secondary truncate max-w-32">
                        {holding.name}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-data text-text-primary">
                      {formatCurrency(holding.currentPrice)}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon
                        name={holding.dailyChange >= 0 ? 'TrendingUp' : 'TrendingDown'}
                        size={14}
                        className={holding.dailyChange >= 0 ? 'text-success' : 'text-error'}
                        strokeWidth={2}
                      />
                      <div>
                        <p className={`font-data text-sm ${
                          holding.dailyChange >= 0 ? 'text-success' : 'text-error'
                        }`}>
                          {formatCurrency(holding.dailyChange)}
                        </p>
                        <p className={`font-data text-xs ${
                          holding.dailyChange >= 0 ? 'text-success' : 'text-error'
                        }`}>
                          {formatPercent(holding.dailyChangePercent)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-data text-text-primary">{holding.shares}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-data font-medium text-text-primary">
                      {formatCurrency(holding.totalValue)}
                    </p>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className={`font-data text-sm ${
                        holding.totalReturn >= 0 ? 'text-success' : 'text-error'
                      }`}>
                        {formatCurrency(holding.totalReturn)}
                      </p>
                      <p className={`font-data text-xs ${
                        holding.totalReturn >= 0 ? 'text-success' : 'text-error'
                      }`}>
                        {formatPercent(holding.totalReturnPercent)}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-border rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${Math.min(holding.allocation * 10, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-data text-text-primary">
                        {holding.allocation.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-1">
                      <button className="p-1 text-text-secondary hover:text-primary hover:bg-primary/5 rounded transition-smooth">
                        <Icon name="TrendingUp" size={14} strokeWidth={2} />
                      </button>
                      <button className="p-1 text-text-secondary hover:text-primary hover:bg-primary/5 rounded transition-smooth">
                        <Icon name="MoreHorizontal" size={14} strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Row Details */}
                {selectedHolding?.id === holding.id && (
                  <tr className="bg-background/30">
                    <td colSpan="8" className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-medium text-text-primary">Position Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Average Cost:</span>
                              <span className="font-data text-text-primary">
                                ${((holding.totalValue - holding.totalReturn) / holding.shares).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Market Value:</span>
                              <span className="font-data text-text-primary">
                                {formatCurrency(holding.totalValue)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Unrealized P&L:</span>
                              <span className={`font-data ${
                                holding.totalReturn >= 0 ? 'text-success' : 'text-error'
                              }`}>
                                {formatCurrency(holding.totalReturn)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium text-text-primary">Performance</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-text-secondary">1-Day Return:</span>
                              <span className={`font-data ${
                                holding.dailyChange >= 0 ? 'text-success' : 'text-error'
                              }`}>
                                {formatPercent(holding.dailyChangePercent)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Total Return:</span>
                              <span className={`font-data ${
                                holding.totalReturn >= 0 ? 'text-success' : 'text-error'
                              }`}>
                                {formatPercent(holding.totalReturnPercent)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Portfolio Weight:</span>
                              <span className="font-data text-text-primary">
                                {holding.allocation.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium text-text-primary">Quick Actions</h4>
                          <div className="space-y-2">
                            <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-blue-700 transition-smooth">
                              <Icon name="Plus" size={14} strokeWidth={2} />
                              <span>Buy More</span>
                            </button>
                            <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm bg-error text-white rounded-lg hover:bg-red-700 transition-smooth">
                              <Icon name="Minus" size={14} strokeWidth={2} />
                              <span>Sell</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HoldingsTable;