import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import BudgetMetricsStrip from './components/BudgetMetricsStrip';
import BudgetVarianceChart from './components/BudgetVarianceChart';
import BudgetAlertsPanel from './components/BudgetAlertsPanel';
import BudgetTrendChart from './components/BudgetTrendChart';
import BudgetFilters from './components/BudgetFilters';

const BudgetAnalysisDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [varianceThreshold, setVarianceThreshold] = useState(10);
  const [refreshTime, setRefreshTime] = useState(new Date());

  // Mock budget data
  const budgetData = {
    totalBudget: 5000,
    totalSpent: 4250,
    utilizationPercentage: 85,
    totalVariance: -250,
    categoriesOverBudget: 3,
    projectedMonthEnd: 'On Track',
    categories: [
      {
        id: 1,
        name: 'Food & Dining',
        budgeted: 800,
        actual: 920,
        variance: 120,
        variancePercentage: 15,
        status: 'over',
        subcategories: [
          { name: 'Restaurants', budgeted: 400, actual: 520, variance: 120 },
          { name: 'Groceries', budgeted: 400, actual: 400, variance: 0 }
        ]
      },
      {
        id: 2,
        name: 'Transportation',
        budgeted: 600,
        actual: 480,
        variance: -120,
        variancePercentage: -20,
        status: 'under',
        subcategories: [
          { name: 'Gas', budgeted: 300, actual: 280, variance: -20 },
          { name: 'Public Transit', budgeted: 300, actual: 200, variance: -100 }
        ]
      },
      {
        id: 3,
        name: 'Entertainment',
        budgeted: 400,
        actual: 450,
        variance: 50,
        variancePercentage: 12.5,
        status: 'over',
        subcategories: [
          { name: 'Movies', budgeted: 200, actual: 250, variance: 50 },
          { name: 'Games', budgeted: 200, actual: 200, variance: 0 }
        ]
      },
      {
        id: 4,
        name: 'Shopping',
        budgeted: 500,
        actual: 380,
        variance: -120,
        variancePercentage: -24,
        status: 'under',
        subcategories: [
          { name: 'Clothing', budgeted: 300, actual: 230, variance: -70 },
          { name: 'Electronics', budgeted: 200, actual: 150, variance: -50 }
        ]
      },
      {
        id: 5,
        name: 'Utilities',
        budgeted: 300,
        actual: 320,
        variance: 20,
        variancePercentage: 6.7,
        status: 'over',
        subcategories: [
          { name: 'Electricity', budgeted: 150, actual: 170, variance: 20 },
          { name: 'Internet', budgeted: 150, actual: 150, variance: 0 }
        ]
      },
      {
        id: 6,
        name: 'Healthcare',
        budgeted: 400,
        actual: 280,
        variance: -120,
        variancePercentage: -30,
        status: 'under',
        subcategories: [
          { name: 'Insurance', budgeted: 250, actual: 250, variance: 0 },
          { name: 'Medical', budgeted: 150, actual: 30, variance: -120 }
        ]
      }
    ]
  };

  const trendData = [
    { month: 'Jan', budgeted: 5000, actual: 4800, variance: -200 },
    { month: 'Feb', budgeted: 5000, actual: 5200, variance: 200 },
    { month: 'Mar', budgeted: 5000, actual: 4900, variance: -100 },
    { month: 'Apr', budgeted: 5000, actual: 5100, variance: 100 },
    { month: 'May', budgeted: 5000, actual: 4750, variance: -250 },
    { month: 'Jun', budgeted: 5000, actual: 4250, variance: -750 }
  ];

  const alerts = [
    {
      id: 1,
      category: 'Food & Dining',
      severity: 'high',
      message: '15% over budget this month',
      recommendation: 'Consider reducing restaurant visits',
      amount: 120,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      category: 'Entertainment',
      severity: 'medium',
      message: '12.5% over budget',
      recommendation: 'Review subscription services',
      amount: 50,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: 3,
      category: 'Utilities',
      severity: 'low',
      message: '6.7% over budget',
      recommendation: 'Monitor energy usage',
      amount: 20,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ];

  const handleRefresh = () => {
    setRefreshTime(new Date());
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleCategoryFilter = (categories) => {
    setSelectedCategories(categories);
  };

  const handleVarianceThreshold = (threshold) => {
    setVarianceThreshold(threshold);
  };

  useEffect(() => {
    // Simulate data refresh
    const interval = setInterval(() => {
      setRefreshTime(new Date());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Budget Analysis Dashboard</h1>
            <p className="text-text-secondary mt-1">
              Track spending performance against planned budgets with real-time variance analysis
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-text-secondary">
              Last updated: {refreshTime.toLocaleTimeString()}
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-smooth"
            >
              <Icon name="RefreshCw" size={16} strokeWidth={2} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <BudgetFilters
          selectedPeriod={selectedPeriod}
          selectedCategories={selectedCategories}
          varianceThreshold={varianceThreshold}
          onPeriodChange={handlePeriodChange}
          onCategoryFilter={handleCategoryFilter}
          onVarianceThreshold={handleVarianceThreshold}
          categories={budgetData.categories}
        />

        {/* Metrics Strip */}
        <BudgetMetricsStrip budgetData={budgetData} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Budget Variance Chart - 3 columns */}
          <div className="xl:col-span-3">
            <BudgetVarianceChart 
              categories={budgetData.categories}
              selectedCategories={selectedCategories}
              varianceThreshold={varianceThreshold}
            />
          </div>

          {/* Budget Alerts Panel - 1 column */}
          <div className="xl:col-span-1">
            <BudgetAlertsPanel alerts={alerts} />
          </div>
        </div>

        {/* Budget Trend Chart - Full Width */}
        <BudgetTrendChart trendData={trendData} selectedPeriod={selectedPeriod} />

        {/* Quick Actions */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-background hover:bg-primary/5 rounded-lg border border-border transition-smooth">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Plus" size={20} className="text-primary" strokeWidth={2} />
              </div>
              <div className="text-left">
                <p className="font-medium text-text-primary">Add Budget</p>
                <p className="text-sm text-text-secondary">Create new category budget</p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-background hover:bg-primary/5 rounded-lg border border-border transition-smooth">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={20} className="text-warning" strokeWidth={2} />
              </div>
              <div className="text-left">
                <p className="font-medium text-text-primary">Adjust Budgets</p>
                <p className="text-sm text-text-secondary">Modify existing limits</p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-background hover:bg-primary/5 rounded-lg border border-border transition-smooth">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Download" size={20} className="text-success" strokeWidth={2} />
              </div>
              <div className="text-left">
                <p className="font-medium text-text-primary">Export Report</p>
                <p className="text-sm text-text-secondary">Download budget analysis</p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-background hover:bg-primary/5 rounded-lg border border-border transition-smooth">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Bell" size={20} className="text-accent" strokeWidth={2} />
              </div>
              <div className="text-left">
                <p className="font-medium text-text-primary">Set Alerts</p>
                <p className="text-sm text-text-secondary">Configure notifications</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetAnalysisDashboard;