import React from 'react';
import Icon from 'components/AppIcon';

const KPICard = ({ title, value, change, changePercent, trend, icon, color }) => {
  const getColorClasses = (color, trend) => {
    if (color === 'success') {
      return {
        iconBg: 'bg-success/10',
        iconColor: 'text-success',
        changeColor: 'text-success'
      };
    } else if (color === 'warning') {
      return {
        iconBg: 'bg-warning/10',
        iconColor: 'text-warning',
        changeColor: 'text-warning'
      };
    } else if (color === 'error') {
      return {
        iconBg: 'bg-error/10',
        iconColor: 'text-error',
        changeColor: 'text-error'
      };
    }
    
    return {
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      changeColor: trend === 'up' ? 'text-success' : 'text-error'
    };
  };

  const colorClasses = getColorClasses(color, trend);

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-light hover:shadow-medium transition-all duration-200 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses.iconBg}`}>
          <Icon name={icon} size={24} className={colorClasses.iconColor} strokeWidth={2} />
        </div>
        
        <div className="flex items-center space-x-1">
          <Icon 
            name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
            size={16} 
            className={colorClasses.changeColor}
            strokeWidth={2} 
          />
          <span className={`text-sm font-medium ${colorClasses.changeColor}`}>
            {changePercent}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        <p className="text-2xl font-bold text-text-primary font-data">{value}</p>
        <p className={`text-sm font-medium ${colorClasses.changeColor}`}>
          {change} from last period
        </p>
      </div>
    </div>
  );
};

export default KPICard;