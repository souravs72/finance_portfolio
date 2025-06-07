import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from 'components/AppIcon';

const SpendingBreakdown = () => {
  const [selectedSlice, setSelectedSlice] = useState(null);

  const spendingData = [
    { name: 'Housing', value: 1200, percentage: 38.7, color: '#1E40AF', icon: 'Home' },
    { name: 'Food & Dining', value: 650, percentage: 21.0, color: '#0EA5E9', icon: 'UtensilsCrossed' },
    { name: 'Transportation', value: 450, percentage: 14.5, color: '#059669', icon: 'Car' },
    { name: 'Entertainment', value: 300, percentage: 9.7, color: '#D97706', icon: 'Play' },
    { name: 'Utilities', value: 250, percentage: 8.1, color: '#DC2626', icon: 'Zap' },
    { name: 'Other', value: 250, percentage: 8.1, color: '#64748B', icon: 'MoreHorizontal' }
  ];

  const totalSpending = spendingData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-modal">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color }}
            ></div>
            <span className="font-medium text-text-primary">{data.name}</span>
          </div>
          <p className="text-sm text-text-secondary">
            Amount: <span className="font-data font-medium text-text-primary">${data.value.toLocaleString()}</span>
          </p>
          <p className="text-sm text-text-secondary">
            Percentage: <span className="font-medium text-text-primary">{data.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const handleSliceClick = (data, index) => {
    setSelectedSlice(selectedSlice === index ? null : index);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Spending Breakdown</h3>
          <p className="text-sm text-text-secondary">Current month category distribution</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Total:</span>
          <span className="font-data font-semibold text-text-primary">
            ${totalSpending.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                onClick={handleSliceClick}
                className="cursor-pointer"
              >
                {spendingData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke={selectedSlice === index ? '#1E40AF' : 'none'}
                    strokeWidth={selectedSlice === index ? 3 : 0}
                    style={{
                      filter: selectedSlice !== null && selectedSlice !== index ? 'opacity(0.6)' : 'none'
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category List */}
        <div className="space-y-3">
          {spendingData.map((category, index) => (
            <div
              key={category.name}
              onClick={() => handleSliceClick(category, index)}
              className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-smooth ${
                selectedSlice === index
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${category.color}20` }}
              >
                <Icon 
                  name={category.icon} 
                  size={18} 
                  style={{ color: category.color }}
                  strokeWidth={2} 
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-text-primary">{category.name}</span>
                  <span className="font-data font-semibold text-text-primary">
                    ${category.value.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1 bg-border rounded-full h-2 mr-3">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: category.color 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-text-secondary">
                    {category.percentage}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-semibold text-text-primary mb-3">Spending Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-warning/5 border border-warning/20 rounded-lg">
            <Icon name="AlertTriangle" size={16} className="text-warning" strokeWidth={2} />
            <div>
              <p className="text-sm font-medium text-text-primary">High Housing Costs</p>
              <p className="text-xs text-text-secondary">38.7% of spending (recommended: &lt;30%)</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-success/5 border border-success/20 rounded-lg">
            <Icon name="CheckCircle" size={16} className="text-success" strokeWidth={2} />
            <div>
              <p className="text-sm font-medium text-text-primary">Good Entertainment Control</p>
              <p className="text-xs text-text-secondary">9.7% of spending (recommended: &lt;15%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdown;