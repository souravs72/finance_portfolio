import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from 'components/AppIcon';

const AssetAllocation = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const formatCurrency = (value) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-modal">
          <p className="font-medium text-text-primary">{data.name}</p>
          <p className="text-sm text-text-secondary">
            {data.value}% • {formatCurrency(data.amount)}
          </p>
        </div>
      );
    }
    return null;
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const getRecommendation = () => {
    const stockAllocation = data.find(item => item.name === 'Stocks')?.value || 0;
    const bondAllocation = data.find(item => item.name === 'Bonds')?.value || 0;
    
    if (stockAllocation > 70) {
      return {
        type: 'warning',
        message: 'Consider rebalancing: High stock allocation may increase risk',
        action: 'Reduce stocks by 5-10%'
      };
    } else if (bondAllocation < 15) {
      return {
        type: 'info',
        message: 'Low bond allocation: Consider adding bonds for stability',
        action: 'Increase bonds to 20%'
      };
    } else {
      return {
        type: 'success',
        message: 'Well-balanced portfolio with good diversification',
        action: 'Maintain current allocation'
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Asset Allocation</h3>
          <p className="text-sm text-text-secondary">Current portfolio distribution</p>
        </div>
        <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth">
          <Icon name="RefreshCw" size={16} strokeWidth={2} />
        </button>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke={activeIndex === index ? '#1E40AF' : 'none'}
                  strokeWidth={activeIndex === index ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Asset Breakdown */}
      <div className="space-y-3 mb-6">
        {data.map((asset, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: asset.color }}
              />
              <span className="text-sm font-medium text-text-primary">{asset.name}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-text-primary">{asset.value}%</p>
              <p className="text-xs text-text-secondary">{formatCurrency(asset.amount)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Rebalancing Recommendation */}
      <div className={`p-4 rounded-lg border ${
        recommendation.type === 'success' ? 'bg-success/5 border-success/20' :
        recommendation.type === 'warning'? 'bg-warning/5 border-warning/20' : 'bg-accent/5 border-accent/20'
      }`}>
        <div className="flex items-start space-x-3">
          <Icon
            name={
              recommendation.type === 'success' ? 'CheckCircle' :
              recommendation.type === 'warning'? 'AlertTriangle' : 'Info'
            }
            size={16}
            className={
              recommendation.type === 'success' ? 'text-success' :
              recommendation.type === 'warning'? 'text-warning' : 'text-accent'
            }
            strokeWidth={2}
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary mb-1">
              Rebalancing Recommendation
            </p>
            <p className="text-xs text-text-secondary mb-2">
              {recommendation.message}
            </p>
            <p className="text-xs font-medium text-primary">
              {recommendation.action}
            </p>
          </div>
        </div>
      </div>

      {/* Rebalance Button */}
      <button className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-smooth">
        <Icon name="RotateCcw" size={16} strokeWidth={2} />
        <span>Rebalance Portfolio</span>
      </button>
    </div>
  );
};

export default AssetAllocation;