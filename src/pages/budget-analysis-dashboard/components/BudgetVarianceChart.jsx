import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const BudgetVarianceChart = ({ categories, selectedCategories, varianceThreshold }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryDetails, setSelectedCategoryDetails] = useState(null);

  // Filter categories based on selected filters
  const filteredCategories = categories.filter(category => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(category.name)) {
      return false;
    }
    if (Math.abs(category.variancePercentage) < varianceThreshold) {
      return false;
    }
    return true;
  });

  // Prepare chart data
  const chartData = filteredCategories.map(category => ({
    name: category.name,
    budgeted: category.budgeted,
    actual: category.actual,
    variance: category.variance,
    variancePercentage: category.variancePercentage,
    status: category.status
  }));

  const handleBarClick = (data) => {
    const categoryDetails = categories.find(cat => cat.name === data.name);
    setSelectedCategoryDetails(categoryDetails);
    setShowModal(true);
  };

  const handleCategoryExpand = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-modal">
          <p className="font-semibold text-text-primary mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-text-secondary">Budgeted: </span>
              <span className="font-medium">${data.budgeted.toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <span className="text-text-secondary">Actual: </span>
              <span className="font-medium">${data.actual.toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <span className="text-text-secondary">Variance: </span>
              <span className={`font-medium ${data.variance < 0 ? 'text-success' : 'text-error'}`}>
                ${Math.abs(data.variance).toLocaleString()} ({data.variancePercentage > 0 ? '+' : ''}{data.variancePercentage}%)
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Budget vs Actual Spending</h3>
          <p className="text-sm text-text-secondary">Compare planned vs actual spending by category</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-text-secondary">Budgeted</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-accent rounded"></div>
            <span className="text-text-secondary">Actual</span>
          </div>
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="h-96 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              onClick={handleBarClick}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="name" 
                stroke="#64748B"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="budgeted" fill="#1E40AF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <Icon name="BarChart3" size={48} className="text-text-secondary mx-auto mb-4" strokeWidth={1} />
            <p className="text-text-secondary">No data matches your current filters</p>
            <p className="text-sm text-text-secondary mt-1">Try adjusting your category or variance threshold filters</p>
          </div>
        </div>
      )}

      {/* Category Details List */}
      <div className="space-y-3">
        <h4 className="font-medium text-text-primary">Category Breakdown</h4>
        {filteredCategories.map((category) => (
          <div key={category.id} className="border border-border rounded-lg overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-background transition-smooth"
              onClick={() => handleCategoryExpand(category.id)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  category.status === 'over' ? 'bg-error' : 'bg-success'
                }`}></div>
                <div>
                  <p className="font-medium text-text-primary">{category.name}</p>
                  <p className="text-sm text-text-secondary">
                    ${category.actual.toLocaleString()} of ${category.budgeted.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className={`font-medium ${category.variance < 0 ? 'text-success' : 'text-error'}`}>
                    {category.variance < 0 ? '-' : '+'}${Math.abs(category.variance).toLocaleString()}
                  </p>
                  <p className={`text-sm ${category.variance < 0 ? 'text-success' : 'text-error'}`}>
                    {category.variancePercentage > 0 ? '+' : ''}{category.variancePercentage}%
                  </p>
                </div>
                <Icon 
                  name={expandedCategory === category.id ? 'ChevronUp' : 'ChevronDown'} 
                  size={16} 
                  className="text-text-secondary" 
                  strokeWidth={2} 
                />
              </div>
            </div>

            {expandedCategory === category.id && (
              <div className="border-t border-border bg-background p-4">
                <h5 className="font-medium text-text-primary mb-3">Subcategories</h5>
                <div className="space-y-2">
                  {category.subcategories.map((sub, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-sm text-text-secondary">{sub.name}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-text-secondary">
                          ${sub.actual.toLocaleString()} / ${sub.budgeted.toLocaleString()}
                        </span>
                        <span className={`text-sm font-medium ${sub.variance < 0 ? 'text-success' : 'text-error'}`}>
                          {sub.variance < 0 ? '-' : '+'}${Math.abs(sub.variance).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for Category Details */}
      {showModal && selectedCategoryDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg border border-border max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">
                {selectedCategoryDetails.name} - Transaction Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-smooth"
              >
                <Icon name="X" size={20} strokeWidth={2} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-sm text-text-secondary">Budgeted Amount</p>
                  <p className="text-xl font-bold text-text-primary">
                    ${selectedCategoryDetails.budgeted.toLocaleString()}
                  </p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-sm text-text-secondary">Actual Spent</p>
                  <p className="text-xl font-bold text-text-primary">
                    ${selectedCategoryDetails.actual.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-text-primary">Recent Transactions</h4>
                <div className="space-y-2">
                  {/* Mock transaction data */}
                  {[
                    { date: '2024-01-15', description: 'Restaurant ABC', amount: 45.50 },
                    { date: '2024-01-14', description: 'Grocery Store XYZ', amount: 120.30 },
                    { date: '2024-01-13', description: 'Coffee Shop', amount: 8.75 },
                    { date: '2024-01-12', description: 'Fast Food', amount: 15.20 }
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                      <div>
                        <p className="font-medium text-text-primary">{transaction.description}</p>
                        <p className="text-sm text-text-secondary">{transaction.date}</p>
                      </div>
                      <span className="font-medium text-text-primary">
                        ${transaction.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetVarianceChart;