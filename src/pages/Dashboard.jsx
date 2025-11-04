import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar.jsx";

const Dashboard = () => {
  const { setUser } = useContext(AppContext);
  const [setError] = useState(null);
  const navigate = useNavigate();

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
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] bg-no-repeat bg-top bg-cover opacity-80"></div>
      </div>
      {/* ========== HEADER ========== */}
      <header className="flex flex-wrap  md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200">
        <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8">
          {/* Collapse */}
          <div
            id="hs-header-base"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block "
            aria-labelledby="hs-header-base-collapse"
          >
            <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
              <div className="py-2 md:py-0  flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
                <div className="grow">
                  <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1"></div>
                </div>

                <div className="my-2 md:my-0 md:mx-2">
                  <div className="w-full h-px md:w-px md:h-4 bg-gray-100 md:bg-gray-300"></div>
                </div>

                {/* Button Group */}
                <div className=" flex flex-wrap items-center gap-x-1.5">
                  <button
                    className="py-2 px-2.5 inline-flex items-center font-medium text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
                {/* End Button Group */}
              </div>
            </div>
          </div>
          {/* End Collapse */}
        </nav>
      </header>
      {/* ========== END HEADER ========== */}
      {/* Main */}
      <Sidebar />
      <main className="flex-grow">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          {/* Title */}
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
              Take Control of Your Student
              <span className="bg-clip-text bg-linear-to-tl from-blue-600 to-violet-600 text-transparent">
                {" "}
                Finances
              </span>
            </h1>
          </div>
          {/* End Title */}

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600">
              SmartStudent helps you track expenses, set budgets, and build
              better money habits — all in one clean dashboard.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 gap-3 flex justify-center">
            <a
              className="inline-flex justify-center items-center gap-x-3 text-center bg-linear-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-hidden focus:from-violet-600 focus:to-blue-600 py-3 px-4"
              href="/signup"
            >
              Start Tracking Now
              <svg
                className="shrink-0 size-4"
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </div>
          {/* End Buttons */}
        </div>
      </main>
      {/* footer */}
      <footer className="w-full border-t border-gray-200 py-6 text-center text-gray-500 text-sm bg-white/70 backdrop-blur-sm">
        © {new Date().getFullYear()} SmartStudent. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
