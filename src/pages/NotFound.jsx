import React from 'react';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="AlertTriangle" size={48} className="text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <a
            href="/financial-overview-dashboard"
            className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-smooth font-medium"
          >
            <Icon name="Home" size={20} strokeWidth={2} />
            <span>Go to Dashboard</span>
          </a>
          
          <div className="flex justify-center space-x-4 text-sm">
            <a
              href="/financial-overview-dashboard"
              className="text-primary hover:text-blue-700 transition-smooth"
            >
              Financial Overview
            </a>
            <span className="text-text-secondary">•</span>
            <a
              href="/budget-analysis-dashboard"
              className="text-primary hover:text-blue-700 transition-smooth"
            >
              Budget Analysis
            </a>
            <span className="text-text-secondary">•</span>
            <a
              href="/investment-portfolio-dashboard"
              className="text-primary hover:text-blue-700 transition-smooth"
            >
              Investments
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;