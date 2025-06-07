import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const QuickActions = () => {
  const [activeAction, setActiveAction] = useState(null);

  const quickActions = [
    {
      id: 'add-transaction',
      title: 'Add Transaction',
      description: 'Record a new expense or income',
      icon: 'Plus',
      color: 'primary',
      shortcut: 'Ctrl+N'
    },
    {
      id: 'transfer-money',
      title: 'Transfer Money',
      description: 'Move funds between accounts',
      icon: 'ArrowRightLeft',
      color: 'accent',
      shortcut: 'Ctrl+T'
    },
    {
      id: 'pay-bills',
      title: 'Pay Bills',
      description: 'Schedule or pay pending bills',
      icon: 'CreditCard',
      color: 'warning',
      shortcut: 'Ctrl+B'
    },
    {
      id: 'set-budget',
      title: 'Set Budget',
      description: 'Create or modify budget limits',
      icon: 'Target',
      color: 'success',
      shortcut: 'Ctrl+G'
    }
  ];

  const upcomingBills = [
    {
      id: 1,
      name: 'Rent Payment',
      amount: 1200,
      dueDate: '2024-01-01',
      status: 'due-soon',
      icon: 'Home'
    },
    {
      id: 2,
      name: 'Electric Bill',
      amount: 89.50,
      dueDate: '2024-01-03',
      status: 'upcoming',
      icon: 'Zap'
    },
    {
      id: 3,
      name: 'Internet',
      amount: 79.99,
      dueDate: '2024-01-05',
      status: 'upcoming',
      icon: 'Wifi'
    }
  ];

  const handleActionClick = (actionId) => {
    setActiveAction(actionId);
    console.log(`Executing action: ${actionId}`);
    
    // Simulate action completion
    setTimeout(() => {
      setActiveAction(null);
    }, 1000);
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary',
          hover: 'hover:bg-blue-700',
          icon: 'text-white'
        };
      case 'accent':
        return {
          bg: 'bg-accent',
          hover: 'hover:bg-sky-600',
          icon: 'text-white'
        };
      case 'warning':
        return {
          bg: 'bg-warning',
          hover: 'hover:bg-amber-700',
          icon: 'text-white'
        };
      case 'success':
        return {
          bg: 'bg-success',
          hover: 'hover:bg-emerald-700',
          icon: 'text-white'
        };
      default:
        return {
          bg: 'bg-secondary',
          hover: 'hover:bg-slate-600',
          icon: 'text-white'
        };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'due-soon':
        return 'text-error';
      case 'upcoming':
        return 'text-warning';
      default:
        return 'text-text-secondary';
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    return `Due in ${diffDays} days`;
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
            <p className="text-sm text-text-secondary">Common financial tasks</p>
          </div>
          
          <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth">
            <Icon name="Settings" size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action) => {
            const colorClasses = getColorClasses(action.color);
            const isActive = activeAction === action.id;
            
            return (
              <button
                key={action.id}
                onClick={() => handleActionClick(action.id)}
                disabled={isActive}
                className={`flex items-center space-x-4 w-full p-4 rounded-lg transition-smooth text-left ${
                  isActive 
                    ? 'bg-primary/10 border border-primary' :'border border-border hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses.bg} ${colorClasses.hover} transition-smooth`}>
                  {isActive ? (
                    <Icon name="Loader2" size={20} className="text-white animate-spin" strokeWidth={2} />
                  ) : (
                    <Icon name={action.icon} size={20} className={colorClasses.icon} strokeWidth={2} />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-text-primary">{action.title}</h4>
                    <span className="text-xs text-text-secondary bg-background px-2 py-1 rounded">
                      {action.shortcut}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Bills */}
      <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Upcoming Bills</h3>
            <p className="text-sm text-text-secondary">Payment reminders</p>
          </div>
          
          <a
            href="/transaction-analysis-dashboard"
            className="text-sm text-primary hover:text-blue-700 font-medium transition-smooth"
          >
            View all bills
          </a>
        </div>

        <div className="space-y-3">
          {upcomingBills.map((bill) => (
            <div key={bill.id} className="flex items-center space-x-4 p-3 border border-border rounded-lg hover:border-primary/50 transition-smooth">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={bill.icon} size={18} className="text-primary" strokeWidth={2} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-text-primary">{bill.name}</h4>
                  <span className="font-data font-semibold text-text-primary">
                    ${bill.amount.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${getStatusColor(bill.status)}`}>
                    {getDaysUntilDue(bill.dueDate)}
                  </span>
                  
                  <button className="text-xs text-primary hover:text-blue-700 font-medium transition-smooth">
                    Pay now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Upcoming */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-secondary">Total upcoming (7 days)</span>
            <span className="font-data font-semibold text-text-primary">
              ${upcomingBills.reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;