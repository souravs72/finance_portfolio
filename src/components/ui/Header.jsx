import { useState } from "react";
import { useLocation } from "react-router-dom";
import Icon from "../AppIcon";

const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      path: "/financial-overview-dashboard",
      label: "Overview",
      icon: "BarChart3",
    },
    { path: "/budget-analysis-dashboard", label: "Budget", icon: "PieChart" },
    {
      path: "/investment-portfolio-dashboard",
      label: "Investments",
      icon: "TrendingUp",
    },
    {
      path: "/transaction-analysis-dashboard",
      label: "Transactions",
      icon: "Receipt",
    },
  ];

  const handleProfileToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsNotificationOpen(false);
  };

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileMenuOpen(false);
  };

  const handleMenuItemClick = () => {
    setIsProfileMenuOpen(false);
    setIsNotificationOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-70 bg-surface border-b border-border shadow-light">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon
                  name="IndianRupee"
                  size={20}
                  color="white"
                  strokeWidth={2.5}
                />
              </div>
              <span className="text-xl font-semibold text-text-primary">
                MoneyMesh
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-smooth ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:text-primary hover:bg-primary/5"
                }`}
                onClick={handleMenuItemClick}
              >
                <Icon name={item.icon} size={18} strokeWidth={2} />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden lg:block">
              <div className="relative">
                <Icon
                  name="Search"
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 w-64 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                />
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={handleNotificationToggle}
                className="p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth relative"
              >
                <Icon name="Bell" size={20} strokeWidth={2} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></span>
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-modal border border-border z-50">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-text-primary">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-4 hover:bg-background transition-smooth cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            Budget Alert
                          </p>
                          <p className="text-xs text-text-secondary">
                            You've spent 85% of your monthly budget
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-background transition-smooth cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            Investment Update
                          </p>
                          <p className="text-xs text-text-secondary">
                            Your portfolio gained 2.3% today
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            4 hours ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-border">
                    <button className="w-full text-center text-sm text-primary hover:text-blue-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={handleProfileToggle}
                className="flex items-center space-x-2 p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" strokeWidth={2} />
                </div>
                <Icon name="ChevronDown" size={16} strokeWidth={2} />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-modal border border-border z-50">
                  <div className="p-3 border-b border-border">
                    <p className="font-medium text-text-primary">
                      Sourav Singh
                    </p>
                    <p className="text-sm text-text-secondary">
                      sourav@clapgrow.com
                    </p>
                  </div>
                  <div className="py-2">
                    <a
                      href="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 transition-smooth"
                      onClick={handleMenuItemClick}
                    >
                      <Icon name="User" size={16} strokeWidth={2} />
                      <span>Profile</span>
                    </a>
                    <a
                      href="/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 transition-smooth"
                      onClick={handleMenuItemClick}
                    >
                      <Icon name="Settings" size={16} strokeWidth={2} />
                      <span>Settings</span>
                    </a>
                    <a
                      href="/help"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 transition-smooth"
                      onClick={handleMenuItemClick}
                    >
                      <Icon name="HelpCircle" size={16} strokeWidth={2} />
                      <span>Help</span>
                    </a>
                  </div>
                  <div className="py-2 border-t border-border">
                    <button
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-error hover:bg-error/5 transition-smooth"
                      onClick={handleMenuItemClick}
                    >
                      <Icon name="LogOut" size={16} strokeWidth={2} />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth">
              <Icon name="Menu" size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-surface">
        <nav className="px-4 py-3 space-y-1">
          {navigationItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-smooth ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-text-secondary hover:text-primary hover:bg-primary/5"
              }`}
              onClick={handleMenuItemClick}
            >
              <Icon name={item.icon} size={18} strokeWidth={2} />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
