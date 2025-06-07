import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  const navigationItems = [
    {
      path: '/financial-overview-dashboard',
      label: 'Financial Overview',
      icon: 'BarChart3',
      description: 'Complete financial snapshot'
    },
    {
      path: '/budget-analysis-dashboard',
      label: 'Budget Analysis',
      icon: 'PieChart',
      description: 'Track spending patterns'
    },
    {
      path: '/investment-portfolio-dashboard',
      label: 'Investment Portfolio',
      icon: 'TrendingUp',
      description: 'Monitor investments'
    },
    {
      path: '/transaction-analysis-dashboard',
      label: 'Transaction Analysis',
      icon: 'Receipt',
      description: 'Detailed transaction insights'
    }
  ];

  const quickActions = [
    { label: 'Add Transaction', icon: 'Plus', action: 'add-transaction' },
    { label: 'Transfer Money', icon: 'ArrowRightLeft', action: 'transfer' },
    { label: 'Pay Bills', icon: 'CreditCard', action: 'pay-bills' },
    { label: 'Set Budget', icon: 'Target', action: 'set-budget' }
  ];

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setActiveSubmenu(null);
  };

  const handleSubmenuToggle = (submenu) => {
    if (isCollapsed) return;
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
  };

  return (
    <aside className={`fixed left-0 top-16 bottom-0 z-60 bg-surface border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-text-primary">Navigation</h2>
                <p className="text-xs text-text-secondary">Financial Management</p>
              </div>
            )}
            <button
              onClick={handleToggleCollapse}
              className="p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <div key={item.path}>
              <a
                href={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-smooth group ${
                  location.pathname === item.path
                    ? 'bg-primary text-white shadow-light'
                    : 'text-text-secondary hover:text-primary hover:bg-primary/5'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  strokeWidth={2}
                  className={location.pathname === item.path ? 'text-white' : ''}
                />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.label}</p>
                    <p className={`text-xs truncate ${
                      location.pathname === item.path ? 'text-white/80' : 'text-text-secondary'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                )}
              </a>
            </div>
          ))}
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <button
                  key={action.action}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth"
                >
                  <Icon name={action.icon} size={16} strokeWidth={2} />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Collapsed Quick Actions */}
        {isCollapsed && (
          <div className="p-2 border-t border-border">
            {quickActions.slice(0, 2).map((action) => (
              <button
                key={action.action}
                onClick={() => handleQuickAction(action.action)}
                className="flex items-center justify-center w-full p-2 mb-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth"
                title={action.label}
              >
                <Icon name={action.icon} size={16} strokeWidth={2} />
              </button>
            ))}
          </div>
        )}

        {/* Account Summary */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border bg-background/50">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">Total Balance</span>
                <span className="text-sm font-data font-semibold text-success">$24,580.50</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">This Month</span>
                <span className="text-xs font-data text-success">+$1,240.00</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
              <p className="text-xs text-text-secondary">68% of monthly goal reached</p>
            </div>
          </div>
        )}

        {/* Collapsed Account Indicator */}
        {isCollapsed && (
          <div className="p-2 border-t border-border">
            <div className="flex items-center justify-center p-2 bg-success/10 rounded-lg">
              <Icon name="TrendingUp" size={16} color="#059669" strokeWidth={2} />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;