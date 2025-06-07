import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AccountSummary = () => {
  const [refreshing, setRefreshing] = useState({});

  const accounts = [
    {
      id: 'checking',
      name: 'Primary Checking',
      bank: 'Chase Bank',
      balance: 8450.75,
      change: +125.50,
      lastSync: '2 min ago',
      status: 'connected',
      icon: 'Wallet'
    },
    {
      id: 'savings',
      name: 'High Yield Savings',
      bank: 'Marcus by Goldman Sachs',
      balance: 25680.25,
      change: +45.30,
      lastSync: '5 min ago',
      status: 'connected',
      icon: 'PiggyBank'
    },
    {
      id: 'credit',
      name: 'Rewards Credit Card',
      bank: 'American Express',
      balance: -2340.50,
      change: -89.25,
      lastSync: '1 min ago',
      status: 'connected',
      icon: 'CreditCard'
    },
    {
      id: 'investment',
      name: 'Investment Portfolio',
      bank: 'Fidelity',
      balance: 92450.00,
      change: +1240.75,
      lastSync: '15 min ago',
      status: 'connected',
      icon: 'TrendingUp'
    }
  ];

  const handleRefreshAccount = async (accountId) => {
    setRefreshing(prev => ({ ...prev, [accountId]: true }));
    
    // Simulate API call
    setTimeout(() => {
      setRefreshing(prev => ({ ...prev, [accountId]: false }));
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Account Summary</h3>
          <p className="text-sm text-text-secondary">Real-time balance monitoring</p>
        </div>
        
        <button
          onClick={() => accounts.forEach(acc => handleRefreshAccount(acc.id))}
          className="p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth"
        >
          <Icon name="RefreshCw" size={16} strokeWidth={2} />
        </button>
      </div>

      <div className="space-y-4">
        {accounts.map((account) => (
          <div key={account.id} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={account.icon} size={20} className="text-primary" strokeWidth={2} />
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary">{account.name}</h4>
                  <p className="text-sm text-text-secondary">{account.bank}</p>
                </div>
              </div>
              
              <button
                onClick={() => handleRefreshAccount(account.id)}
                disabled={refreshing[account.id]}
                className="p-1 text-text-secondary hover:text-primary hover:bg-primary/5 rounded transition-smooth disabled:opacity-50"
              >
                <Icon 
                  name="RefreshCw" 
                  size={14} 
                  strokeWidth={2}
                  className={refreshing[account.id] ? 'animate-spin' : ''}
                />
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Balance</span>
                <span className={`font-data font-semibold ${
                  account.balance >= 0 ? 'text-text-primary' : 'text-error'
                }`}>
                  ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  {account.balance < 0 && ' CR'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Change (24h)</span>
                <span className={`text-sm font-medium ${
                  account.change >= 0 ? 'text-success' : 'text-error'
                }`}>
                  {account.change >= 0 ? '+' : ''}${account.change.toFixed(2)}
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getStatusIcon(account.status)} 
                    size={14} 
                    className={getStatusColor(account.status)}
                    strokeWidth={2} 
                  />
                  <span className="text-xs text-text-secondary">Last sync: {account.lastSync}</span>
                </div>
                
                <button className="text-xs text-primary hover:text-blue-700 font-medium transition-smooth">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="font-medium text-text-primary">Total Net Worth</span>
          <span className="text-xl font-bold text-success font-data">
            $124,240.50
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-text-secondary">Change (24h)</span>
          <span className="text-sm font-medium text-success">+$1,322.30 (+1.1%)</span>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;