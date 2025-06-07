import React, { useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const IncomeExpenseChart = ({ dateRange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const chartData = [
    { month: 'Jan', income: 4200, expenses: 3100, savingsRate: 26.2 },
    { month: 'Feb', income: 4200, expenses: 2950, savingsRate: 29.8 },
    { month: 'Mar', income: 4400, expenses: 3200, savingsRate: 27.3 },
    { month: 'Apr', income: 4200, expenses: 2800, savingsRate: 33.3 },
    { month: 'May', income: 4600, expenses: 3300, savingsRate: 28.3 },
    { month: 'Jun', income: 4200, expenses: 3000, savingsRate: 28.6 },
    { month: 'Jul', income: 4200, expenses: 2900, savingsRate: 31.0 },
    { month: 'Aug', income: 4400, expenses: 3150, savingsRate: 28.4 },
    { month: 'Sep', income: 4200, expenses: 2850, savingsRate: 32.1 },
    { month: 'Oct', income: 4600, expenses: 3250, savingsRate: 29.3 },
    { month: 'Nov', income: 4200, expenses: 3000, savingsRate: 28.6 },
    { month: 'Dec', income: 4400, expenses: 3100, savingsRate: 29.5 }
  ];

  const categories = [
    { name: 'Housing', amount: 1200, color: '#1E40AF' },
    { name: 'Food', amount: 650, color: '#0EA5E9' },
    { name: 'Transportation', amount: 450, color: '#059669' },
    { name: 'Entertainment', amount: 300, color: '#D97706' },
    { name: 'Utilities', amount: 250, color: '#DC2626' },
    { name: 'Other', amount: 250, color: '#64748B' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-modal">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm text-text-secondary">{entry.name}:</span>
              <span className="text-sm font-medium text-text-primary font-data">
                {entry.name === 'savingsRate' ? `${entry.value}%` : `$${entry.value.toLocaleString()}`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Income vs Expenses</h3>
          <p className="text-sm text-text-secondary">Monthly comparison with savings rate overlay</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-smooth ${
              !selectedCategory 
                ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-primary/5'
            }`}
          >
            All Categories
          </button>
          
          <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth">
            <Icon name="Download" size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="month" 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              yAxisId="left"
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Bar 
              yAxisId="left"
              dataKey="income" 
              fill="#059669" 
              name="Income"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              yAxisId="left"
              dataKey="expenses" 
              fill="#DC2626" 
              name="Expenses"
              radius={[4, 4, 0, 0]}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="savingsRate" 
              stroke="#1E40AF" 
              strokeWidth={3}
              name="Savings Rate (%)"
              dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#1E40AF', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown */}
      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-4">Expense Categories (Click to filter)</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-smooth ${
                selectedCategory === category.name
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              ></div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-text-primary">{category.name}</p>
                <p className="text-xs text-text-secondary font-data">${category.amount}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;