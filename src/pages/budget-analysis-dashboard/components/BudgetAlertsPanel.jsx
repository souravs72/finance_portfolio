import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BudgetAlertsPanel = ({ alerts }) => {
  const [filter, setFilter] = useState('all');

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return {
          bg: 'bg-error/10',
          text: 'text-error',
          icon: 'text-error',
          border: 'border-error/20'
        };
      case 'medium':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          icon: 'text-warning',
          border: 'border-warning/20'
        };
      case 'low':
        return {
          bg: 'bg-accent/10',
          text: 'text-accent',
          icon: 'text-accent',
          border: 'border-accent/20'
        };
      default:
        return {
          bg: 'bg-primary/10',
          text: 'text-primary',
          icon: 'text-primary',
          border: 'border-primary/20'
        };
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.severity === filter;
  });

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Budget Alerts</h3>
          <p className="text-sm text-text-secondary">Real-time budget notifications</p>
        </div>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none bg-background border border-border rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Alerts</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
            strokeWidth={2}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => {
            const colors = getSeverityColor(alert.severity);
            const icon = getSeverityIcon(alert.severity);
            
            return (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border ${colors.border} ${colors.bg} hover:shadow-light transition-smooth`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={icon} size={16} className={colors.icon} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-text-primary truncate">{alert.category}</h4>
                      <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{alert.message}</p>
                    <p className="text-xs text-text-secondary mb-3">{alert.recommendation}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${colors.text}`}>
                        +${alert.amount.toLocaleString()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button className="text-xs text-primary hover:text-blue-700 font-medium">
                          View Details
                        </button>
                        <button className="text-xs text-text-secondary hover:text-text-primary">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" strokeWidth={1} />
            <p className="text-text-secondary">No alerts for selected filter</p>
            <p className="text-sm text-text-secondary mt-1">Your budget is on track!</p>
          </div>
        )}
      </div>

      {/* Alert Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-text-primary mb-3">Alert Summary</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span className="text-text-secondary">High Priority</span>
            </div>
            <span className="font-medium text-text-primary">
              {alerts.filter(a => a.severity === 'high').length}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-text-secondary">Medium Priority</span>
            </div>
            <span className="font-medium text-text-primary">
              {alerts.filter(a => a.severity === 'medium').length}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-text-secondary">Low Priority</span>
            </div>
            <span className="font-medium text-text-primary">
              {alerts.filter(a => a.severity === 'low').length}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-text-primary mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth">
            <Icon name="Settings" size={16} strokeWidth={2} />
            <span>Configure Alert Settings</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth">
            <Icon name="Bell" size={16} strokeWidth={2} />
            <span>Notification Preferences</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth">
            <Icon name="Download" size={16} strokeWidth={2} />
            <span>Export Alert History</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetAlertsPanel;