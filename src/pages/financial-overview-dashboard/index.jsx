import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import KPICard from './components/KPICard';
import IncomeExpenseChart from './components/IncomeExpenseChart';
import AccountSummary from './components/AccountSummary';
import SpendingBreakdown from './components/SpendingBreakdown';
import QuickActions from './components/QuickActions';

const FinancialOverviewDashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('30days');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: '1year', label: 'Last year' },
    { value: '5years', label: 'Last 5 years' }
  ];

  const accountOptions = [
    { value: 'all', label: 'All Accounts' },
    { value: 'checking', label: 'Checking Account' },
    { value: 'savings', label: 'Savings Account' },
    { value: 'credit', label: 'Credit Cards' },
    { value: 'investment', label: 'Investment Accounts' }
  ];

  const kpiData = [
    {
      title: 'Net Worth',
      value: '$124,580.50',
      change: '+$2,340.00',
      changePercent: '+1.9%',
      trend: 'up',
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      title: 'Monthly Cash Flow',
      value: '$3,240.00',
      change: '+$540.00',
      changePercent: '+20.0%',
      trend: 'up',
      icon: 'ArrowUpDown',
      color: 'success'
    },
    {
      title: 'Savings Rate',
      value: '28.5%',
      change: '+2.1%',
      changePercent: '+7.9%',
      trend: 'up',
      icon: 'PiggyBank',
      color: 'success'
    },
    {
      title: 'Financial Health Score',
      value: '8.2/10',
      change: '+0.3',
      changePercent: '+3.8%',
      trend: 'up',
      icon: 'Heart',
      color: 'success'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastRefresh(new Date());
      }, 900000); // 15 minutes

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleRefresh = () => {
    setIsLoading(true);
    setLastRefresh(new Date());
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format`);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-background min-h-screen">
        {/* Loading Header */}
        <div className="bg-surface rounded-lg border border-border p-6 animate-pulse">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="space-y-2">
              <div className="h-8 bg-border rounded w-64"></div>
              <div className="h-4 bg-border rounded w-48"></div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="h-10 bg-border rounded w-32"></div>
              <div className="h-10 bg-border rounded w-32"></div>
              <div className="h-10 bg-border rounded w-24"></div>
            </div>
          </div>
        </div>

        {/* Loading KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-surface rounded-lg border border-border p-6 animate-pulse">
              <div className="space-y-3">
                <div className="h-4 bg-border rounded w-24"></div>
                <div className="h-8 bg-border rounded w-32"></div>
                <div className="h-4 bg-border rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-8 bg-surface rounded-lg border border-border p-6 animate-pulse">
            <div className="h-80 bg-border rounded"></div>
          </div>
          <div className="xl:col-span-4 space-y-6">
            <div className="bg-surface rounded-lg border border-border p-6 animate-pulse">
              <div className="h-48 bg-border rounded"></div>
            </div>
            <div className="bg-surface rounded-lg border border-border p-6 animate-pulse">
              <div className="h-32 bg-border rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header Section */}
      <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold text-text-primary mb-2">Financial Overview Dashboard</h1>
            <p className="text-text-secondary">
              Last updated: {lastRefresh.toLocaleTimeString()} • 
              <span className="ml-2 inline-flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm">Live data</span>
              </span>
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Account Selector */}
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="input-field text-sm min-w-0"
            >
              {accountOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Date Range Picker */}
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="input-field text-sm min-w-0"
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Auto Refresh Toggle */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                autoRefresh
                  ? 'bg-success/10 text-success border border-success/20' :'bg-surface text-text-secondary border border-border hover:bg-background'
              }`}
            >
              <Icon name="RotateCcw" size={16} strokeWidth={2} />
              <span>Auto</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-smooth"
            >
              <Icon name="RefreshCw" size={16} strokeWidth={2} />
              <span>Refresh</span>
            </button>

            {/* Export Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 bg-surface text-text-secondary border border-border rounded-lg text-sm font-medium hover:bg-background transition-smooth">
                <Icon name="Download" size={16} strokeWidth={2} />
                <span>Export</span>
                <Icon name="ChevronDown" size={14} strokeWidth={2} />
              </button>
              
              <div className="absolute right-0 mt-2 w-32 bg-surface rounded-lg shadow-modal border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full px-3 py-2 text-left text-sm text-text-secondary hover:text-primary hover:bg-primary/5 transition-smooth first:rounded-t-lg"
                >
                  Export PDF
                </button>
                <button
                  onClick={() => handleExport('excel')}
                  className="w-full px-3 py-2 text-left text-sm text-text-secondary hover:text-primary hover:bg-primary/5 transition-smooth last:rounded-b-lg"
                >
                  Export Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Income vs Expenses Chart */}
        <div className="xl:col-span-8">
          <IncomeExpenseChart dateRange={selectedDateRange} />
        </div>

        {/* Right Sidebar */}
        <div className="xl:col-span-4 space-y-6">
          {/* Account Summary */}
          <AccountSummary />
          
          {/* Quick Actions */}
          <QuickActions />
        </div>
      </div>

      {/* Spending Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingBreakdown />
        
        {/* Recent Activity */}
        <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
            <a
              href="/transaction-analysis-dashboard"
              className="text-sm text-primary hover:text-blue-700 font-medium transition-smooth"
            >
              View all
            </a>
          </div>
          
          <div className="space-y-4">
            {[
              {
                id: 1,
                type: 'expense',
                category: 'Groceries',
                merchant: 'Whole Foods Market',
                amount: '-$127.45',
                date: '2 hours ago',
                icon: 'ShoppingCart'
              },
              {
                id: 2,
                type: 'income',
                category: 'Salary',
                merchant: 'Tech Corp Inc.',
                amount: '+$4,200.00',
                date: '1 day ago',
                icon: 'Briefcase'
              },
              {
                id: 3,
                type: 'expense',
                category: 'Transportation',
                merchant: 'Uber',
                amount: '-$23.50',
                date: '2 days ago',
                icon: 'Car'
              },
              {
                id: 4,
                type: 'expense',
                category: 'Entertainment',
                merchant: 'Netflix',
                amount: '-$15.99',
                date: '3 days ago',
                icon: 'Play'
              }
            ].map((transaction) => (
              <div key={transaction.id} className="flex items-center space-x-4 p-3 hover:bg-background rounded-lg transition-smooth">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.type === 'income' ? 'bg-success/10' : 'bg-error/10'
                }`}>
                  <Icon 
                    name={transaction.icon} 
                    size={18} 
                    className={transaction.type === 'income' ? 'text-success' : 'text-error'} 
                    strokeWidth={2} 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-primary truncate">{transaction.merchant}</p>
                  <p className="text-sm text-text-secondary">{transaction.category}</p>
                </div>
                
                <div className="text-right">
                  <p className={`font-data font-semibold ${
                    transaction.type === 'income' ? 'text-success' : 'text-error'
                  }`}>
                    {transaction.amount}
                  </p>
                  <p className="text-xs text-text-secondary">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverviewDashboard;