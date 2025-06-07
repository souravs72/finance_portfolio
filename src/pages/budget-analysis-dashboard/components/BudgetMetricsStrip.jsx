import React from 'react';
import Icon from 'components/AppIcon';

const BudgetMetricsStrip = ({ budgetData }) => {
  const metrics = [
    {
      title: 'Budget Utilization',
      value: `${budgetData.utilizationPercentage}%`,
      subValue: `$${budgetData.totalSpent.toLocaleString()} of $${budgetData.totalBudget.toLocaleString()}`,
      icon: 'PieChart',
      color: budgetData.utilizationPercentage > 90 ? 'error' : budgetData.utilizationPercentage > 75 ? 'warning' : 'success',
      progress: budgetData.utilizationPercentage
    },
    {
      title: 'Total Variance',
      value: `$${Math.abs(budgetData.totalVariance).toLocaleString()}`,
      subValue: budgetData.totalVariance < 0 ? 'Under Budget' : 'Over Budget',
      icon: budgetData.totalVariance < 0 ? 'TrendingDown' : 'TrendingUp',
      color: budgetData.totalVariance < 0 ? 'success' : 'error',
      progress: null
    },
    {
      title: 'Categories Over Budget',
      value: budgetData.categoriesOverBudget,
      subValue: `out of ${budgetData.categories.length} categories`,
      icon: 'AlertTriangle',
      color: budgetData.categoriesOverBudget > 2 ? 'error' : budgetData.categoriesOverBudget > 0 ? 'warning' : 'success',
      progress: null
    },
    {
      title: 'Month-End Projection',
      value: budgetData.projectedMonthEnd,
      subValue: 'Based on current trends',
      icon: 'Target',
      color: budgetData.projectedMonthEnd === 'On Track' ? 'success' : budgetData.projectedMonthEnd === 'At Risk' ? 'warning' : 'error',
      progress: null
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return {
          bg: 'bg-success/10',
          text: 'text-success',
          icon: 'text-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          icon: 'text-warning'
        };
      case 'error':
        return {
          bg: 'bg-error/10',
          text: 'text-error',
          icon: 'text-error'
        };
      default:
        return {
          bg: 'bg-primary/10',
          text: 'text-primary',
          icon: 'text-primary'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const colorClasses = getColorClasses(metric.color);
        
        return (
          <div key={index} className="bg-surface rounded-lg border border-border p-6 hover:shadow-modal transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                <Icon name={metric.icon} size={24} className={colorClasses.icon} strokeWidth={2} />
              </div>
              {metric.progress !== null && (
                <div className="text-right">
                  <div className={`text-2xl font-bold ${colorClasses.text}`}>
                    {metric.progress}%
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-text-secondary">{metric.title}</h3>
              <div className={`text-2xl font-bold ${colorClasses.text}`}>
                {metric.value}
              </div>
              <p className="text-sm text-text-secondary">{metric.subValue}</p>
              
              {metric.progress !== null && (
                <div className="mt-4">
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        metric.color === 'success' ? 'bg-success' :
                        metric.color === 'warning' ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${Math.min(metric.progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetMetricsStrip;