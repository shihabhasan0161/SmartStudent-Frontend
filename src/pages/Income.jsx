import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import config from "../util/config.jsx";
import { endpoints } from "../util/apiEndpoints.js";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

const Income = () => {
  const { user, setUser } = useContext(AppContext);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories and incomes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        const [catRes, incRes] = await Promise.all([
          config.get(endpoints.categories),
          config.get(endpoints.incomes),
        ]);
        setCategories(catRes.data);
        setIncomes(incRes.data);
      } catch (err) {
        setError(err);
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/signin", { replace: true });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      toast.error("Income name is required");
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    setLoading(true);
    try {
      const response = await config.post(endpoints.incomes, {
        name,
        amount: Number(amount),
        categoryId,
      });

      const newIncome = response.data;
      setIncomes([...incomes, newIncome]);
      toast.success("Income added successfully!");

      // Reset form
      setName("");
      setAmount("");
      setCategoryId("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create income");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:flex lg:h-screen bg-gray-50">
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] bg-no-repeat bg-top bg-cover opacity-10"></div>
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            type="button"
            className="p-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-lg shadow-sm"
            data-hs-overlay="#hs-sidebar-footer"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Top header with logout */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 lg:block hidden">
              Incomes
            </h2>
            <div className="lg:hidden h-8"></div>
            <button
              className="py-2 px-4 inline-flex items-center font-medium text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden ml-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {/* Create Income Form */}
            <div className="bg-white shadow rounded-lg p-6 mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add New Income
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Income Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Income Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Uber Eats, Salary"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Amount */}
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Amount
                  </label>
                  <input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Category Dropdown */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories
                      .filter((cat) => cat.type === "income")
                      .map((cat) => (
                        <option
                          key={cat._id || cat.id}
                          value={cat._id || cat.id}
                        >
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`py-2 px-4 rounded-lg text-sm font-medium text-white ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Saving..." : "Add Income"}
                </button>
              </form>
            </div>

            {/* Income List */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Incomes
              </h3>
              {incomes.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {incomes.map((inc) => (
                    <li
                      key={inc.id || inc._id || inc.name}
                      className="flex justify-between items-center py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {inc.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Category:{" "}
                          {
                            categories.find((cat) => cat._id === inc.categoryId)
                              ?.name
                          }
                        </p>
                      </div>
                      <span className="text-green-600 font-semibold">
                        +${inc.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">
                  No incomes yet. Add one above!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 text-center text-gray-500 text-sm mt-auto">
          © {new Date().getFullYear()} SmartStudent. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default Income;
