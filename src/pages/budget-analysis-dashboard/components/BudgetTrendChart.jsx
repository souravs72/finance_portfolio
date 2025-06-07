import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from 'components/AppIcon';

const BudgetTrendChart = ({ trendData, selectedPeriod }) => {
  const [chartType, setChartType] = useState('line');
  const [showForecast, setShowForecast] = useState(true);

  // Add forecast data
  const forecastData = [
    ...trendData,
    { month: 'Jul', budgeted: 5000, actual: null, variance: null, forecast: 4800 },
    { month: 'Aug', budgeted: 5000, actual: null, variance: null, forecast: 4900 },
    { month: 'Sep', budgeted: 5000, actual: null, variance: null, forecast: 4850 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-modal">
          <p className="font-semibold text-text-primary mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <p key={index} className="text-sm">
                <span className="text-text-secondary">{entry.name}: </span>
                <span className="font-medium" style={{ color: entry.color }}>
                  ${entry.value?.toLocaleString() || 'N/A'}
                </span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const data = showForecast ? forecastData : trendData;

    if (chartType === 'area') {
      return (
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
          <YAxis stroke="#64748B" fontSize={12} tickFormatter={(value) => `$${value.toLocaleString()}`} />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="budgeted" 
            stackId="1" 
            stroke="#1E40AF" 
            fill="#1E40AF" 
            fillOpacity={0.3}
            name="Budgeted"
          />
          <Area 
            type="monotone" 
            dataKey="actual" 
            stackId="2" 
            stroke="#0EA5E9" 
            fill="#0EA5E9" 
            fillOpacity={0.3}
            name="Actual"
          />
          {showForecast && (
            <Area 
              type="monotone" 
              dataKey="forecast" 
              stackId="3" 
              stroke="#64748B" 
              fill="#64748B" 
              fillOpacity={0.2}
              strokeDasharray="5 5"
              name="Forecast"
            />
          )}
        </AreaChart>
      );
    }

    return (
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
        <YAxis stroke="#64748B" fontSize={12} tickFormatter={(value) => `$${value.toLocaleString()}`} />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="budgeted" 
          stroke="#1E40AF" 
          strokeWidth={3}
          dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
          name="Budgeted"
        />
        <Line 
          type="monotone" 
          dataKey="actual" 
          stroke="#0EA5E9" 
          strokeWidth={3}
          dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 4 }}
          name="Actual"
        />
        {showForecast && (
          <Line 
            type="monotone" 
            dataKey="forecast" 
            stroke="#64748B" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#64748B', strokeWidth: 2, r: 3 }}
            name="Forecast"
          />
        )}
      </LineChart>
    );
  };

  const calculateTrend = () => {
    const actualValues = trendData.filter(d => d.actual !== null).map(d => d.actual);
    if (actualValues.length < 2) return { direction: 'stable', percentage: 0 };

    const firstValue = actualValues[0];
    const lastValue = actualValues[actualValues.length - 1];
    const percentage = ((lastValue - firstValue) / firstValue) * 100;

    return {
      direction: percentage > 5 ? 'increasing' : percentage < -5 ? 'decreasing' : 'stable',
      percentage: Math.abs(percentage)
    };
  };

  const trend = calculateTrend();

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Budget Performance Trend</h3>
          <p className="text-sm text-text-secondary">
            Monthly budget vs actual spending with {selectedPeriod} view
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Chart Type Toggle */}
          <div className="flex items-center bg-background rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded text-sm transition-smooth ${
                chartType === 'line' ?'bg-primary text-white' :'text-text-secondary hover:text-primary'
              }`}
            >
              <Icon name="TrendingUp" size={16} strokeWidth={2} />
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 rounded text-sm transition-smooth ${
                chartType === 'area' ?'bg-primary text-white' :'text-text-secondary hover:text-primary'
              }`}
            >
              <Icon name="BarChart3" size={16} strokeWidth={2} />
            </button>
          </div>

          {/* Forecast Toggle */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showForecast}
              onChange={(e) => setShowForecast(e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-text-secondary">Show Forecast</span>
          </label>
        </div>
      </div>

      {/* Trend Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-background p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={trend.direction === 'increasing' ? 'TrendingUp' : trend.direction === 'decreasing' ? 'TrendingDown' : 'Minus'} 
              size={16} 
              className={
                trend.direction === 'increasing' ? 'text-error' : 
                trend.direction === 'decreasing' ? 'text-success' : 'text-text-secondary'
              }
              strokeWidth={2} 
            />
            <span className="text-sm font-medium text-text-primary">Spending Trend</span>
          </div>
          <p className={`text-lg font-bold ${
            trend.direction === 'increasing' ? 'text-error' : 
            trend.direction === 'decreasing' ? 'text-success' : 'text-text-secondary'
          }`}>
            {trend.direction === 'stable' ? 'Stable' : `${trend.percentage.toFixed(1)}%`}
          </p>
          <p className="text-xs text-text-secondary">
            {trend.direction === 'increasing' ? 'Increasing' : 
             trend.direction === 'decreasing' ? 'Decreasing' : 'No significant change'}
          </p>
        </div>

        <div className="bg-background p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">Budget Adherence</span>
          </div>
          <p className="text-lg font-bold text-primary">
            {Math.round((trendData.filter(d => d.actual <= d.budgeted).length / trendData.length) * 100)}%
          </p>
          <p className="text-xs text-text-secondary">Months within budget</p>
        </div>

        <div className="bg-background p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={16} className="text-accent" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">Average Variance</span>
          </div>
          <p className="text-lg font-bold text-accent">
            ${Math.abs(trendData.reduce((sum, d) => sum + d.variance, 0) / trendData.length).toFixed(0)}
          </p>
          <p className="text-xs text-text-secondary">Per month</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded"></div>
          <span className="text-text-secondary">Budgeted</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-accent rounded"></div>
          <span className="text-text-secondary">Actual</span>
        </div>
        {showForecast && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-text-secondary rounded opacity-60"></div>
            <span className="text-text-secondary">Forecast</span>
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-background rounded-lg">
        <h4 className="font-medium text-text-primary mb-2">Key Insights</h4>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>• Your spending has been {trend.direction} over the past few months</p>
          <p>• You stayed within budget {Math.round((trendData.filter(d => d.actual <= d.budgeted).length / trendData.length) * 100)}% of the time</p>
          <p>• Average monthly variance is ${Math.abs(trendData.reduce((sum, d) => sum + d.variance, 0) / trendData.length).toFixed(0)}</p>
          {showForecast && <p>• Forecast suggests continued {trend.direction === 'increasing' ? 'growth' : trend.direction === 'decreasing' ? 'reduction' : 'stability'} in spending</p>}
        </div>
      </div>
    </div>
  );
};

export default BudgetTrendChart;