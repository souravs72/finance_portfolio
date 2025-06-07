import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TransactionTable = ({
  transactions,
  sortConfig,
  onSort,
  selectedTransactions,
  onTransactionSelect,
  onBulkCategoryUpdate,
  currentPage,
  totalPages,
  onPageChange,
  totalTransactions
}) => {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [bulkCategoryInput, setBulkCategoryInput] = useState('');

  const categories = [
    'Groceries', 'Food & Dining', 'Transportation', 'Entertainment', 
    'Utilities', 'Shopping', 'Health & Fitness', 'Travel', 'Education',
    'Investment', 'Salary', 'Freelance', 'Bonus', 'Transfer'
  ];

  const handleCategoryEdit = (transactionId, currentCategory) => {
    setEditingTransaction(transactionId);
    setNewCategory(currentCategory);
  };

  const handleCategorySave = (transactionId) => {
    // In a real app, this would update the transaction in the database
    console.log(`Updating transaction ${transactionId} category to ${newCategory}`);
    setEditingTransaction(null);
    setNewCategory('');
  };

  const handleBulkUpdate = () => {
    if (bulkCategoryInput && selectedTransactions.length > 0) {
      onBulkCategoryUpdate(bulkCategoryInput);
      setBulkCategoryInput('');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount);
    return {
      value: `$${absAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      isNegative
    };
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-secondary" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const getTransactionTypeIcon = (type) => {
    switch (type) {
      case 'income':
        return <Icon name="ArrowDownLeft" size={16} className="text-success" />;
      case 'expense':
        return <Icon name="ArrowUpRight" size={16} className="text-error" />;
      case 'transfer':
        return <Icon name="ArrowRightLeft" size={16} className="text-accent" />;
      default:
        return <Icon name="Circle" size={16} className="text-text-secondary" />;
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-light">
      {/* Table Header with Bulk Actions */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Transactions</h3>
            <p className="text-sm text-text-secondary">
              Showing {((currentPage - 1) * 20) + 1}-{Math.min(currentPage * 20, totalTransactions)} of {totalTransactions} transactions
            </p>
          </div>
          
          {selectedTransactions.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-secondary">
                {selectedTransactions.length} selected
              </span>
              <div className="flex items-center gap-2">
                <select
                  value={bulkCategoryInput}
                  onChange={(e) => setBulkCategoryInput(e.target.value)}
                  className="px-3 py-1 text-sm border border-border rounded bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <button
                  onClick={handleBulkUpdate}
                  disabled={!bulkCategoryInput}
                  className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedTransactions.length === transactions.length && transactions.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      transactions.forEach(t => onTransactionSelect(t.id));
                    } else {
                      selectedTransactions.forEach(id => onTransactionSelect(id));
                    }
                  }}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('date')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Date</span>
                  {getSortIcon('date')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('description')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Description</span>
                  {getSortIcon('description')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('category')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Category</span>
                  {getSortIcon('category')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('account')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Account</span>
                  {getSortIcon('account')}
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => onSort('amount')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-smooth ml-auto"
                >
                  <span>Amount</span>
                  {getSortIcon('amount')}
                </button>
              </th>
              <th className="px-4 py-3 text-center">
                <span className="text-sm font-medium text-text-primary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((transaction) => {
              const { value: amountValue, isNegative } = formatAmount(transaction.amount);
              
              return (
                <tr key={transaction.id} className="hover:bg-background/50 transition-smooth">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(transaction.id)}
                      onChange={() => onTransactionSelect(transaction.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      {getTransactionTypeIcon(transaction.type)}
                      <span className="text-sm text-text-primary">
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{transaction.description}</p>
                      <p className="text-xs text-text-secondary">{transaction.merchant}</p>
                      {transaction.recurring && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent mt-1">
                          <Icon name="RotateCcw" size={10} className="mr-1" />
                          Recurring
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {editingTransaction === transaction.id ? (
                      <div className="flex items-center space-x-2">
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="px-2 py-1 text-sm border border-border rounded bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleCategorySave(transaction.id)}
                          className="p-1 text-success hover:bg-success/10 rounded transition-smooth"
                        >
                          <Icon name="Check" size={14} />
                        </button>
                        <button
                          onClick={() => setEditingTransaction(null)}
                          className="p-1 text-error hover:bg-error/10 rounded transition-smooth"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleCategoryEdit(transaction.id, transaction.category)}
                        className="text-sm text-text-primary hover:text-primary transition-smooth"
                      >
                        {transaction.category}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-text-secondary">{transaction.account}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-sm font-medium font-data ${
                      isNegative ? 'text-error' : 'text-success'
                    }`}>
                      {isNegative ? '-' : '+'}{amountValue}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center space-x-1">
                      <button
                        onClick={() => handleCategoryEdit(transaction.id, transaction.category)}
                        className="p-1 text-text-secondary hover:text-primary hover:bg-primary/10 rounded transition-smooth"
                        title="Edit category"
                      >
                        <Icon name="Edit2" size={14} />
                      </button>
                      <button
                        className="p-1 text-text-secondary hover:text-error hover:bg-error/10 rounded transition-smooth"
                        title="Delete transaction"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-border rounded hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`px-3 py-1 text-sm rounded transition-smooth ${
                        currentPage === pageNum
                          ? 'bg-primary text-white' :'text-text-secondary hover:bg-background border border-border'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-border rounded hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
            
            <span className="text-sm text-text-secondary">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;