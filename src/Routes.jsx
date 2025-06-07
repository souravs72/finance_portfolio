import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import Sidebar from "components/ui/Sidebar";
import FinancialOverviewDashboard from "pages/financial-overview-dashboard";
import InvestmentPortfolioDashboard from "pages/investment-portfolio-dashboard";
import TransactionAnalysisDashboard from "pages/transaction-analysis-dashboard";
import BudgetAnalysisDashboard from "pages/budget-analysis-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <div className="min-h-screen bg-background">
          <Header />
          <Sidebar />
          <main className="ml-64 pt-16 min-h-screen">
            <RouterRoutes>
              <Route path="/" element={<FinancialOverviewDashboard />} />
              <Route path="/financial-overview-dashboard" element={<FinancialOverviewDashboard />} />
              <Route path="/investment-portfolio-dashboard" element={<InvestmentPortfolioDashboard />} />
              <Route path="/transaction-analysis-dashboard" element={<TransactionAnalysisDashboard />} />
              <Route path="/budget-analysis-dashboard" element={<BudgetAnalysisDashboard />} />
              <Route path="*" element={<NotFound />} />
            </RouterRoutes>
          </main>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;