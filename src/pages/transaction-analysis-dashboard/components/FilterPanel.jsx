import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ filters, onFilterChange, transactions }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Extract unique values for filter options
  const categories = [...new Set(transactions.map(t => t.category))].sort();
  const accounts = [...new Set(transactions.map(t => t.account))].sort();

  const handleLocalFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateRangeChange = (type, value) => {
    const newDateRange = { ...localFilters.dateRange, [type]: value ? new Date(value) : null };
    handleLocalFilterChange('dateRange', newDateRange);
  };

  const handleAmountRangeChange = (type, value) => {
    const newAmountRange = { ...localFilters.amountRange, [type]: parseInt(value) };
    handleLocalFilterChange('amountRange', newAmountRange);
  };

  const handleMultiSelectChange = (key, value) => {
    const currentValues = localFilters[key];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    handleLocalFilterChange(key, newValues);
  };

  const handleTransactionTypeToggle = (type) => {
    const currentTypes = localFilters.transactionTypes;
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    handleLocalFilterChange('transactionTypes', newTypes);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: { start: null, end: null },
      amountRange: { min: 0, max: 10000 },
      categories: [],
      accounts: [],
      transactionTypes: ['income', 'expense', 'transfer'],
      searchQuery: ''
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-light">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Advanced Filters</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-text-secondary hover:text-primary transition-smooth"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search Query */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Search Transactions
          </label>
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <input
              type="text"
              placeholder="Search description, merchant, or category..."
              value={localFilters.searchQuery}
              onChange={(e) => handleLocalFilterChange('searchQuery', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
            />
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Date Range
          </label>
          <div className="space-y-2">
            <input
              type="date"
              value={formatDate(localFilters.dateRange.start)}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
            />
            <input
              type="date"
              value={formatDate(localFilters.dateRange.end)}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
            />
          </div>
        </div>

        {/* Amount Range */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Amount Range ($)
          </label>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min amount"
              value={localFilters.amountRange.min}
              onChange={(e) => handleAmountRangeChange('min', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
            />
            <input
              type="number"
              placeholder="Max amount"
              value={localFilters.amountRange.max}
              onChange={(e) => handleAmountRangeChange('max', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Transaction Types */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Transaction Types
          </label>
          <div className="space-y-2">
            {['income', 'expense', 'transfer'].map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.transactionTypes.includes(type)}
                  onChange={() => handleTransactionTypeToggle(type)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-text-primary capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Categories
          </label>
          <div className="max-h-32 overflow-y-auto space-y-2 border border-border rounded-lg p-2 bg-background">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.categories.includes(category)}
                  onChange={() => handleMultiSelectChange('categories', category)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-text-primary">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Accounts */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Accounts
          </label>
          <div className="max-h-32 overflow-y-auto space-y-2 border border-border rounded-lg p-2 bg-background">
            {accounts.map((account) => (
              <label key={account} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.accounts.includes(account)}
                  onChange={() => handleMultiSelectChange('accounts', account)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-text-primary">{account}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;