import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods?.autoInit?.();
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Sidebar */}
      <div
        id="hs-sidebar-footer"
        className="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-64 h-full fixed top-0 start-0 bottom-0 z-[60] bg-white border-e border-gray-200 lg:z-30 hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform"
        role="dialog"
        tabIndex="-1"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          {/* Header */}
          <header className="p-4 flex justify-between items-center gap-x-2 border-b border-gray-200">
            <Link
              className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80"
              to="/dashboard"
              aria-label="SmartStudent"
            >
              SmartStudent
            </Link>

            {/* Close button for mobile */}
            <div className="lg:hidden">
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100"
                data-hs-overlay="#hs-sidebar-footer"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 6-12 12"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </header>

          {/* Navigation */}
          <nav className="h-full overflow-y-auto p-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <ul className="space-y-2">
              <li>
                <Link
                  className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${
                    isActive("/dashboard")
                      ? "bg-gray-100 text-gray-800"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                  to="/dashboard"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                    />
                    <polyline points="9,22 9,12 15,12 15,22" />
                  </svg>
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${
                    isActive("/incomes")
                      ? "bg-gray-100 text-gray-800"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                  to="/incomes"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Incomes
                </Link>
              </li>

              <li>
                <Link
                  className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${
                    isActive("/expenses")
                      ? "bg-gray-100 text-gray-800"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                  to="/expenses"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                  Expenses
                </Link>
              </li>

              <li>
                <Link
                  className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${
                    isActive("/categories")
                      ? "bg-gray-100 text-gray-800"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                  to="/categories"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${
                    isActive("/filter")
                      ? "bg-gray-100 text-gray-800"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                  to="/filter"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filter
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
