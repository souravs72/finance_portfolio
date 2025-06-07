import React from 'react';
import Icon from 'components/AppIcon';

const PortfolioMetrics = ({ data }) => {
  const metrics = [
    {
      title: 'Total Portfolio Value',
      value: `$${data.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: 'DollarSign',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Daily P&L',
      value: `$${data.dailyChange.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      subValue: `${data.dailyChangePercent > 0 ? '+' : ''}${data.dailyChangePercent.toFixed(2)}%`,
      icon: data.dailyChange >= 0 ? 'TrendingUp' : 'TrendingDown',
      color: data.dailyChange >= 0 ? 'text-success' : 'text-error',
      bgColor: data.dailyChange >= 0 ? 'bg-success/10' : 'bg-error/10'
    },
    {
      title: 'Total Return',
      value: `$${data.totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      subValue: `${data.totalReturnPercent > 0 ? '+' : ''}${data.totalReturnPercent.toFixed(2)}%`,
      icon: 'Target',
      color: data.totalReturn >= 0 ? 'text-success' : 'text-error',
      bgColor: data.totalReturn >= 0 ? 'bg-success/10' : 'bg-error/10'
    },
    {
      title: 'Allocation Score',
      value: `${data.allocationScore}/100`,
      subValue: 'Well Balanced',
      icon: 'PieChart',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-surface rounded-lg border border-border p-6 shadow-light">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-text-secondary mb-2">{metric.title}</p>
              <p className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</p>
              {metric.subValue && (
                <p className={`text-sm font-medium ${metric.color}`}>{metric.subValue}</p>
              )}
            </div>
            <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={metric.icon} size={24} className={metric.color} strokeWidth={2} />
            </div>
          </div>
          
          {/* Sparkline placeholder */}
          <div className="mt-4 h-8 bg-background rounded flex items-end space-x-1 overflow-hidden">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className={`flex-1 ${metric.color.replace('text-', 'bg-')} opacity-60 rounded-sm`}
                style={{ height: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioMetrics;