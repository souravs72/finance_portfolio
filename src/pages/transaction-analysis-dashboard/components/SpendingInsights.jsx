import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const SpendingInsights = ({ transactions }) => {
  // Day of week analysis
  const dayOfWeekData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const dayName = new Date(transaction.date).toLocaleDateString('en-US', { weekday: 'short' });
      acc[dayName] = (acc[dayName] || 0) + Math.abs(transaction.amount);
      return acc;
    }, {});

  const dayOfWeekChartData = Object.entries(dayOfWeekData).map(([day, amount]) => ({
    day,
    amount: parseFloat(amount.toFixed(2))
  }));

  // Category spending analysis
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount);
      return acc;
    }, {});

  const categoryChartData = Object.entries(categoryData)
    .map(([category, amount]) => ({
      category,
      amount: parseFloat(amount.toFixed(2))
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6);

  // Merchant frequency analysis
  const merchantData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      acc[transaction.merchant] = (acc[transaction.merchant] || 0) + 1;
      return acc;
    }, {});

  const topMerchants = Object.entries(merchantData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Recurring transactions
  const recurringTransactions = transactions.filter(t => t.recurring);
  const recurringAmount = recurringTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Chart colors
  const COLORS = ['#1E40AF', '#0EA5E9', '#059669', '#D97706', '#DC2626', '#7C3AED'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          <p className="text-sm text-text-secondary">
            Amount: <span className="font-medium text-text-primary">
              ${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-text-primary">{data.payload.category}</p>
          <p className="text-sm text-text-secondary">
            Amount: <span className="font-medium text-text-primary">
              ${data.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Spending by Category */}
      <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="PieChart" size={20} className="text-primary" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-text-primary">Spending by Category</h3>
        </div>
        
        {categoryChartData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="amount"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-text-secondary">
            <p>No expense data available</p>
          </div>
        )}
        
        <div className="mt-4 space-y-2">
          {categoryChartData.slice(0, 4).map((item, index) => (
            <div key={item.category} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm text-text-primary">{item.category}</span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                ${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Day of Week Analysis */}
      <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Calendar" size={20} className="text-primary" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-text-primary">Spending by Day</h3>
        </div>
        
        {dayOfWeekChartData.length > 0 ? (
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dayOfWeekChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#1E40AF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center text-text-secondary">
            <p>No expense data available</p>
          </div>
        )}
      </div>

      {/* Top Merchants */}
      <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Store" size={20} className="text-primary" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-text-primary">Top Merchants</h3>
        </div>
        
        <div className="space-y-3">
          {topMerchants.map(([merchant, count], index) => (
            <div key={merchant} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">{index + 1}</span>
                </div>
                <span className="text-sm text-text-primary">{merchant}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-text-primary">{count}</span>
                <p className="text-xs text-text-secondary">transactions</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recurring Transactions */}
      <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="RotateCcw" size={20} className="text-primary" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-text-primary">Recurring Transactions</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div>
              <p className="text-sm font-medium text-text-primary">Monthly Recurring</p>
              <p className="text-xs text-text-secondary">{recurringTransactions.length} transactions</p>
            </div>
            <span className="text-lg font-semibold text-error">
              -${recurringAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          
          <div className="space-y-2">
            {recurringTransactions.slice(0, 3).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm text-text-primary">{transaction.description}</p>
                  <p className="text-xs text-text-secondary">{transaction.category}</p>
                </div>
                <span className={`text-sm font-medium ${
                  transaction.amount < 0 ? 'text-error' : 'text-success'
                }`}>
                  {transaction.amount < 0 ? '-' : '+'}$
                  {Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
          
          {recurringTransactions.length > 3 && (
            <button className="w-full text-sm text-primary hover:text-blue-700 transition-smooth">
              View all {recurringTransactions.length} recurring transactions
            </button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Zap" size={20} className="text-primary" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
        </div>
        
        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-background rounded-lg transition-smooth">
            <Icon name="Plus" size={16} className="text-primary" strokeWidth={2} />
            <span className="text-sm text-text-primary">Add New Transaction</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-background rounded-lg transition-smooth">
            <Icon name="Download" size={16} className="text-primary" strokeWidth={2} />
            <span className="text-sm text-text-primary">Export Transactions</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-background rounded-lg transition-smooth">
            <Icon name="Settings" size={16} className="text-primary" strokeWidth={2} />
            <span className="text-sm text-text-primary">Manage Categories</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;