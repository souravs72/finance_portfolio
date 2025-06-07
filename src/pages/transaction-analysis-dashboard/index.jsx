import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'components/AppIcon';
import FilterPanel from './components/FilterPanel';
import TransactionTable from './components/TransactionTable';
import SpendingInsights from './components/SpendingInsights';
import MetricsRow from './components/MetricsRow';

const TransactionAnalysisDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: { start: null, end: null },
    amountRange: { min: 0, max: 10000 },
    categories: [],
    accounts: [],
    transactionTypes: ['income', 'expense', 'transfer'],
    searchQuery: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Mock transaction data
  const mockTransactions = [
    {
      id: 1,
      date: new Date('2024-01-15'),
      description: "Grocery Shopping - Whole Foods",
      category: "Groceries",
      amount: -156.78,
      account: "Chase Checking",
      type: "expense",
      merchant: "Whole Foods Market",
      recurring: false
    },
    {
      id: 2,
      date: new Date('2024-01-14'),
      description: "Salary Deposit",
      category: "Salary",
      amount: 4500.00,
      account: "Chase Checking",
      type: "income",
      merchant: "ABC Corporation",
      recurring: true
    },
    {
      id: 3,
      date: new Date('2024-01-13'),
      description: "Netflix Subscription",
      category: "Entertainment",
      amount: -15.99,
      account: "Chase Credit Card",
      type: "expense",
      merchant: "Netflix",
      recurring: true
    },
    {
      id: 4,
      date: new Date('2024-01-12'),
      description: "Gas Station - Shell",
      category: "Transportation",
      amount: -45.32,
      account: "Chase Checking",
      type: "expense",
      merchant: "Shell",
      recurring: false
    },
    {
      id: 5,
      date: new Date('2024-01-11'),
      description: "Transfer to Savings",
      category: "Transfer",
      amount: -1000.00,
      account: "Chase Checking",
      type: "transfer",
      merchant: "Internal Transfer",
      recurring: true
    },
    {
      id: 6,
      date: new Date('2024-01-10'),
      description: "Coffee Shop - Starbucks",
      category: "Food & Dining",
      amount: -8.45,
      account: "Chase Credit Card",
      type: "expense",
      merchant: "Starbucks",
      recurring: false
    },
    {
      id: 7,
      date: new Date('2024-01-09'),
      description: "Amazon Purchase",
      category: "Shopping",
      amount: -89.99,
      account: "Chase Credit Card",
      type: "expense",
      merchant: "Amazon",
      recurring: false
    },
    {
      id: 8,
      date: new Date('2024-01-08'),
      description: "Freelance Payment",
      category: "Freelance",
      amount: 750.00,
      account: "Chase Checking",
      type: "income",
      merchant: "XYZ Client",
      recurring: false
    },
    {
      id: 9,
      date: new Date('2024-01-07'),
      description: "Electric Bill",
      category: "Utilities",
      amount: -125.67,
      account: "Chase Checking",
      type: "expense",
      merchant: "Electric Company",
      recurring: true
    },
    {
      id: 10,
      date: new Date('2024-01-06'),
      description: "Restaurant - Italian Bistro",
      category: "Food & Dining",
      amount: -67.89,
      account: "Chase Credit Card",
      type: "expense",
      merchant: "Italian Bistro",
      recurring: false
    },
    {
      id: 11,
      date: new Date('2024-01-05'),
      description: "Gym Membership",
      category: "Health & Fitness",
      amount: -49.99,
      account: "Chase Checking",
      type: "expense",
      merchant: "FitLife Gym",
      recurring: true
    },
    {
      id: 12,
      date: new Date('2024-01-04'),
      description: "Investment Dividend",
      category: "Investment",
      amount: 125.50,
      account: "Investment Account",
      type: "income",
      merchant: "Vanguard",
      recurring: false
    },
    {
      id: 13,
      date: new Date('2024-01-03'),
      description: "Phone Bill",
      category: "Utilities",
      amount: -85.00,
      account: "Chase Checking",
      type: "expense",
      merchant: "Verizon",
      recurring: true
    },
    {
      id: 14,
      date: new Date('2024-01-02'),
      description: "Uber Ride",
      category: "Transportation",
      amount: -23.45,
      account: "Chase Credit Card",
      type: "expense",
      merchant: "Uber",
      recurring: false
    },
    {
      id: 15,
      date: new Date('2024-01-01'),
      description: "New Year Bonus",
      category: "Bonus",
      amount: 1000.00,
      account: "Chase Checking",
      type: "income",
      merchant: "ABC Corporation",
      recurring: false
    }
  ];

  useEffect(() => {
    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...transactions];

    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= filters.dateRange.start && transactionDate <= filters.dateRange.end;
      });
    }

    // Amount range filter
    filtered = filtered.filter(transaction => {
      const absAmount = Math.abs(transaction.amount);
      return absAmount >= filters.amountRange.min && absAmount <= filters.amountRange.max;
    });

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(transaction => 
        filters.categories.includes(transaction.category)
      );
    }

    // Account filter
    if (filters.accounts.length > 0) {
      filtered = filtered.filter(transaction => 
        filters.accounts.includes(transaction.account)
      );
    }

    // Transaction type filter
    filtered = filtered.filter(transaction => 
      filters.transactionTypes.includes(transaction.type)
    );

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(transaction => 
        transaction.description.toLowerCase().includes(query) ||
        transaction.merchant.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query)
      );
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [filters, transactions]);

  // Sort transactions
  const sortedTransactions = useMemo(() => {
    const sorted = [...filteredTransactions].sort((a, b) => {
      if (sortConfig.key === 'date') {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
      }
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      if (sortConfig.key === 'description' || sortConfig.key === 'category' || sortConfig.key === 'account') {
        const aValue = a[sortConfig.key].toLowerCase();
        const bValue = b[sortConfig.key].toLowerCase();
        if (sortConfig.direction === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      }
      return 0;
    });
    return sorted;
  }, [filteredTransactions, sortConfig]);

  // Pagination
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedTransactions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleTransactionSelect = (transactionId) => {
    setSelectedTransactions(prev => 
      prev.includes(transactionId) 
        ? prev.filter(id => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const handleBulkCategoryUpdate = (newCategory) => {
    setTransactions(prev => 
      prev.map(transaction => 
        selectedTransactions.includes(transaction.id)
          ? { ...transaction, category: newCategory }
          : transaction
      )
    );
    setSelectedTransactions([]);
  };

  const handleExport = (format) => {
    console.log(`Exporting ${filteredTransactions.length} transactions in ${format} format`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-text-primary">Transaction Analysis</h1>
            <p className="text-text-secondary mt-1">Detailed spending patterns and transaction insights</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-smooth ${
                isFilterPanelOpen 
                  ? 'bg-primary text-white border-primary' :'bg-surface text-text-secondary border-border hover:border-primary hover:text-primary'
              }`}
            >
              <Icon name="Filter" size={18} strokeWidth={2} />
              <span>Filters</span>
            </button>
            
            <div className="relative">
              <select 
                onChange={(e) => handleExport(e.target.value)}
                className="appearance-none bg-surface border border-border rounded-lg px-4 py-2 pr-8 text-text-secondary hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
              >
                <option value="">Export</option>
                <option value="csv">CSV</option>
                <option value="excel">Excel</option>
                <option value="pdf">PDF</option>
              </select>
              <Icon name="ChevronDown" size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterPanelOpen && (
          <FilterPanel 
            filters={filters}
            onFilterChange={handleFilterChange}
            transactions={transactions}
          />
        )}

        {/* Metrics Row */}
        <MetricsRow transactions={filteredTransactions} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Transaction Table */}
          <div className="xl:col-span-8">
            <TransactionTable
              transactions={paginatedTransactions}
              sortConfig={sortConfig}
              onSort={handleSort}
              selectedTransactions={selectedTransactions}
              onTransactionSelect={handleTransactionSelect}
              onBulkCategoryUpdate={handleBulkCategoryUpdate}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalTransactions={sortedTransactions.length}
            />
          </div>

          {/* Spending Insights */}
          <div className="xl:col-span-4">
            <SpendingInsights transactions={filteredTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionAnalysisDashboard;