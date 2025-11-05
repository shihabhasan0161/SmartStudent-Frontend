import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import config from "../util/config.jsx";
import { endpoints } from "../util/apiEndpoints.js";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

const Category = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("income");
  const { user, setUser } = useContext(AppContext);
  const [categories, setCategories] = useState(user?.categories || []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.HSStaticMethods?.autoInit?.();
  }, []);

  // Fetch the category list
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        const response = await config.get(endpoints.categories);
        setCategories(response.data);
      } catch (error) {
        setError(error);
        toast.error("Failed to fetch categories");
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
      setError(error);
      toast.error("Failed to log out");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!name.trim()) {
      setError("Category name is required");
      toast.error("Category name is required");
      setLoading(false);
      return;
    }

    try {
      const response = await config.post(endpoints.categories, {
        name,
        type,
      });
      const newCategory = response.data;
      setCategories([...categories, newCategory]);
      setUser({
        ...user,
        categories: [...categories, newCategory],
      });
      toast.success("Category created successfully");
      // reset form
      setName("");
      setType("income");
    } catch (error) {
      setError("Failed to create category");
      toast.error("Failed to create category, Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:flex lg:h-screen bg-gray-50">
      {/* Background pattern */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] bg-no-repeat bg-top bg-cover opacity-10"></div>
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
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
              Category
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

        {/* Page content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white shadow rounded-lg p-6 mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Create New Category
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Category name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Job, Food, Rent..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Category type */}
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Type
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`py-2 px-4 rounded-lg text-sm font-medium text-white ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Creating..." : "Create Category"}
                </button>
              </form>
            </div>

            {/* Category List */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Existing Categories
              </h3>
              {categories.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {categories.map((cat) => (
                    <li
                      key={cat.id || cat._id || cat.name}
                      className="flex justify-between items-center py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {cat.name}
                        </p>
                        <p
                          className={`text-xs font-medium ${
                            cat.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {cat.type}
                        </p>
                      </div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs ${
                          cat.type === "income"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {cat.type}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">
                  No categories yet. Create one above!
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

export default Category;
