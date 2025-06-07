import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const PerformanceChart = ({ data, selectedPeriod, selectedBenchmark }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomDomain, setZoomDomain] = useState(null);

  const formatCurrency = (value) => {
    return `$${value.toLocaleString('en-US')}`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-modal">
          <p className="text-sm font-medium text-text-primary mb-2">
            {formatDate(label)}
          </p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-text-secondary">{entry.name}:</span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
          {payload.length === 2 && (
            <div className="mt-2 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Difference:</span>
                <span className={`text-sm font-medium ${
                  payload[0].value > payload[1].value ? 'text-success' : 'text-error'
                }`}>
                  {formatCurrency(Math.abs(payload[0].value - payload[1].value))}
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const handleZoomReset = () => {
    setIsZoomed(false);
    setZoomDomain(null);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Portfolio Performance</h3>
          <p className="text-sm text-text-secondary">
            Compared to {selectedBenchmark} • {selectedPeriod}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isZoomed && (
            <button
              onClick={handleZoomReset}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-primary hover:bg-primary/5 rounded-lg transition-smooth"
            >
              <Icon name="ZoomOut" size={14} strokeWidth={2} />
              <span>Reset Zoom</span>
            </button>
          )}
          <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth">
            <Icon name="Download" size={16} strokeWidth={2} />
          </button>
          <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth">
            <Icon name="Maximize2" size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            domain={zoomDomain}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="#64748B"
              fontSize={12}
            />
            <YAxis
              tickFormatter={formatCurrency}
              stroke="#64748B"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="portfolio"
              stroke="#1E40AF"
              strokeWidth={3}
              dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#1E40AF', strokeWidth: 2 }}
              name="Your Portfolio"
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#64748B"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#64748B', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#64748B', strokeWidth: 2 }}
              name={selectedBenchmark}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-text-secondary">Your Portfolio</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-secondary rounded-full" />
            <span className="text-text-secondary">{selectedBenchmark}</span>
          </div>
        </div>
        <div className="text-text-secondary">
          Drag to zoom • Click and drag on chart to zoom into specific periods
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;