import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import config from "../util/config.jsx";
import { endpoints } from "../util/apiEndpoints.js";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

const Filter = () => {
  const { user, setUser } = useContext(AppContext);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin", { replace: true });
    toast.success("Logged out successfully");
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      type,
      startDate: startDate || null,
      endDate: endDate || null,
      keyword: keyword.trim() || "",
      sortField,
      sortOrder,
    };

    try {
      const res = await config.post(endpoints.filter, payload);
      setResults(res.data);
      toast.success("Data filtered successfully");
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      toast.error("Failed to fetch data");
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

      <Sidebar />

      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Filter {type === "income" ? "Incomes" : "Expenses"}
          </h2>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Logout
          </button>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white">
            <form
              onSubmit={handleFilter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keyword
                </label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search..."
                  className="w-full border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Field
                </label>
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                  className="w-full border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="name">Name</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Order
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-30 font-medium bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  {loading ? "Searching..." : "Apply Filter"}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6">
            {error && <p className="text-red-600 text-center">{error}</p>}
            {!loading && results.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Found ({results.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-3 text-left text-sm font-medium text-gray-600">
                          Name
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-600">
                          Amount
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-600">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((item, i) => (
                        <tr key={i} className="border-t hover:bg-gray-50">
                          <td className="p-3 text-sm text-gray-800">
                            {item.name || item.title || "-"}
                          </td>
                          <td className="p-3 text-sm text-gray-800">
                            ${item.amount?.toFixed(2) ?? "-"}
                          </td>
                          <td className="p-3 text-sm text-gray-800">
                            {item.date ?? "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {!loading && results.length === 0 && !error && (
              <p className="text-center text-gray-500 mt-4">
                No records found.
              </p>
            )}
          </div>
        </div>

        <footer className="bg-white border-t border-gray-200 py-4 text-center text-gray-500 text-sm mt-auto">
          © {new Date().getFullYear()} SmartStudent. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default Filter;
