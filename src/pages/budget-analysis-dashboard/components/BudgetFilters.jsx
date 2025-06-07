import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BudgetFilters = ({ 
  selectedPeriod, 
  selectedCategories, 
  varianceThreshold, 
  onPeriodChange, 
  onCategoryFilter, 
  onVarianceThreshold,
  categories 
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [tempCategories, setTempCategories] = useState(selectedCategories);

  const periods = [
    { value: 'monthly', label: 'Monthly', icon: 'Calendar' },
    { value: 'quarterly', label: 'Quarterly', icon: 'CalendarDays' },
    { value: 'yearly', label: 'Yearly', icon: 'CalendarRange' }
  ];

  const handleCategoryToggle = (categoryName) => {
    const updated = tempCategories.includes(categoryName)
      ? tempCategories.filter(c => c !== categoryName)
      : [...tempCategories, categoryName];
    setTempCategories(updated);
  };

  const applyFilters = () => {
    onCategoryFilter(tempCategories);
    setIsFiltersExpanded(false);
  };

  const resetFilters = () => {
    setTempCategories([]);
    onCategoryFilter([]);
    onVarianceThreshold(0);
    setIsFiltersExpanded(false);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategories.length > 0) count++;
    if (varianceThreshold > 0) count++;
    return count;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Period Selector */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-text-primary">Period:</label>
          <div className="flex items-center bg-background rounded-lg p-1">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => onPeriodChange(period.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-smooth ${
                  selectedPeriod === period.value
                    ? 'bg-primary text-white shadow-light'
                    : 'text-text-secondary hover:text-primary hover:bg-primary/5'
                }`}
              >
                <Icon name={period.icon} size={16} strokeWidth={2} />
                <span>{period.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-4">
          {/* Variance Threshold */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-text-primary">Min Variance:</label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={varianceThreshold}
                onChange={(e) => onVarianceThreshold(Number(e.target.value))}
                className="w-24 h-2 bg-background rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-text-secondary">
                {varianceThreshold}%
              </span>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-smooth ${
              isFiltersExpanded
                ? 'bg-primary text-white border-primary' :'bg-background text-text-secondary border-border hover:text-primary hover:border-primary'
            }`}
          >
            <Icon name="Filter" size={16} strokeWidth={2} />
            <span>Filters</span>
            {getActiveFiltersCount() > 0 && (
              <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                isFiltersExpanded ? 'bg-white text-primary' : 'bg-primary text-white'
              }`}>
                {getActiveFiltersCount()}
              </span>
            )}
          </button>

          {/* Reset Filters */}
          {(selectedCategories.length > 0 || varianceThreshold > 0) && (
            <button
              onClick={resetFilters}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-error hover:bg-error/5 rounded-lg transition-smooth"
            >
              <Icon name="X" size={16} strokeWidth={2} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filters */}
      {isFiltersExpanded && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Categories</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center space-x-3 p-2 hover:bg-background rounded-lg cursor-pointer transition-smooth"
                  >
                    <input
                      type="checkbox"
                      checked={tempCategories.includes(category.name)}
                      onChange={() => handleCategoryToggle(category.name)}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <div className="flex items-center space-x-2 flex-1">
                      <div className={`w-3 h-3 rounded-full ${
                        category.status === 'over' ? 'bg-error' : 'bg-success'
                      }`}></div>
                      <span className="text-sm text-text-primary">{category.name}</span>
                    </div>
                    <span className="text-xs text-text-secondary">
                      {category.variancePercentage > 0 ? '+' : ''}{category.variancePercentage}%
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Filter Presets */}
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Quick Filters</h4>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const overBudgetCategories = categories
                      .filter(c => c.status === 'over')
                      .map(c => c.name);
                    setTempCategories(overBudgetCategories);
                  }}
                  className="w-full flex items-center justify-between p-3 bg-background hover:bg-error/5 rounded-lg border border-border hover:border-error/20 transition-smooth"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-error" strokeWidth={2} />
                    <span className="text-sm text-text-primary">Over Budget Categories</span>
                  </div>
                  <span className="text-xs text-text-secondary">
                    {categories.filter(c => c.status === 'over').length} categories
                  </span>
                </button>

                <button
                  onClick={() => {
                    const underBudgetCategories = categories
                      .filter(c => c.status === 'under')
                      .map(c => c.name);
                    setTempCategories(underBudgetCategories);
                  }}
                  className="w-full flex items-center justify-between p-3 bg-background hover:bg-success/5 rounded-lg border border-border hover:border-success/20 transition-smooth"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" strokeWidth={2} />
                    <span className="text-sm text-text-primary">Under Budget Categories</span>
                  </div>
                  <span className="text-xs text-text-secondary">
                    {categories.filter(c => c.status === 'under').length} categories
                  </span>
                </button>

                <button
                  onClick={() => {
                    const highVarianceCategories = categories
                      .filter(c => Math.abs(c.variancePercentage) > 15)
                      .map(c => c.name);
                    setTempCategories(highVarianceCategories);
                  }}
                  className="w-full flex items-center justify-between p-3 bg-background hover:bg-warning/5 rounded-lg border border-border hover:border-warning/20 transition-smooth"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={16} className="text-warning" strokeWidth={2} />
                    <span className="text-sm text-text-primary">High Variance (&gt;15%)</span>
                  </div>
                  <span className="text-xs text-text-secondary">
                    {categories.filter(c => Math.abs(c.variancePercentage) > 15).length} categories
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Apply/Cancel Buttons */}
          <div className="flex items-center justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setTempCategories(selectedCategories);
                setIsFiltersExpanded(false);
              }}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-background transition-smooth"
            >
              Cancel
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-blue-700 transition-smooth"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(selectedCategories.length > 0 || varianceThreshold > 0) && !isFiltersExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-text-secondary">Active filters:</span>
            {selectedCategories.length > 0 && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                {selectedCategories.length} categories
              </span>
            )}
            {varianceThreshold > 0 && (
              <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                Min {varianceThreshold}% variance
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetFilters;