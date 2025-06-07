import React from 'react';
import Icon from 'components/AppIcon';

const MetricsRow = ({ transactions }) => {
  const totalTransactions = transactions.length;
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const averageTransaction = totalTransactions > 0 ? totalAmount / totalTransactions : 0;
  
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const categorySpending = expenseTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    return acc;
  }, {});
  
  const topSpendingCategory = Object.entries(categorySpending)
    .sort(([,a], [,b]) => b - a)[0];

  const incomeAmount = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenseAmount = Math.abs(transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0));

  const metrics = [
    {
      label: 'Total Transactions',
      value: totalTransactions.toLocaleString(),
      icon: 'Receipt',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Total Income',
      value: `$${incomeAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Total Expenses',
      value: `$${expenseAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: 'TrendingDown',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      label: 'Average Transaction',
      value: `$${Math.abs(averageTransaction).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: 'Calculator',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Top Category',
      value: topSpendingCategory ? topSpendingCategory[0] : 'N/A',
      subValue: topSpendingCategory ? `$${topSpendingCategory[1].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '',
      icon: 'PieChart',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-surface rounded-lg border border-border p-4 shadow-light">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
              <Icon name={metric.icon} size={20} className={metric.color} strokeWidth={2} />
            </div>
          </div>
          
          <div>
            <p className="text-sm text-text-secondary mb-1">{metric.label}</p>
            <p className="text-xl font-semibold text-text-primary">{metric.value}</p>
            {metric.subValue && (
              <p className="text-xs text-text-secondary mt-1">{metric.subValue}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsRow;