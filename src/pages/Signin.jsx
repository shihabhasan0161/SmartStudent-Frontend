import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../util/config.jsx";
import { baseURL, endpoints } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext.jsx";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!email.trim()) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // validate the form first
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    } else if (password.length < 8 || !password.trim()) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }
    setError("");

    // signin api call
    try {
      const response = await config.post(endpoints.login, {
        email,
        password,
      });
      const { token, user } = response.data;
      // store the token in localstorage
      localStorage.setItem("token", token);
      setUser(user);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
      toast.error(`Login failed, Please try again!`);
    } finally {
      setLoading(false);
    }
  };

  // Handling social login here
  const handleGoogleLogin = () => {
    window.location.href = baseURL + endpoints.googleAuth;
  }

  // const handleGitHubLogin = () => {
  //   window.location.href = baseURL + endpoints.githubAuth;
  // }

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 space-y-6">
      <a href="/" className="flex items-center space-x-2">
        <span className="text-xl font-semibold text-gray-800">
          SmartStudent
        </span>
      </a>
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-2xs">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">Sign in</h1>

            {/* Social Login */}
            <div className="mt-7 flex flex-col gap-2">
              <button onClick={handleGoogleLogin} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px]"
                ></img>
                Continue with Google
              </button>
              {/* <button onClick={handleGitHubLogin} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  alt="GitHub"
                  className="h-[18px] w-[18px] "
                ></img>
                Continue with GitHub
              </button> */}
            </div>
          </div>

          <div className="mt-5">
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
              Or
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div></div>
              <div className="grid gap-y-4">
                {/* Form Group */}
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      required
                      aria-describedby="email-error"
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                {/* End Form Group */}

                <div>
                  <label htmlFor="password" className="block text-sm mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="signin-password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      required
                      aria-describedby="password-error"
                    />
                    <button
                      type="button"
                      data-hs-toggle-password='{"target":"#signin-password"}'
                      className="absolute inset-y-0 end-0 flex items-center z-20 px-3 text-gray-400 hover:text-blue-600 focus:outline-hidden"
                    >
                      <svg
                        className="shrink-0 size-3.5"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          className="hs-password-active:hidden"
                          d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                        ></path>
                        <path
                          className="hs-password-active:hidden"
                          d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                        ></path>
                        <path
                          className="hs-password-active:hidden"
                          d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                        ></path>
                        <line
                          className="hs-password-active:hidden"
                          x1="2"
                          x2="22"
                          y1="2"
                          y2="22"
                        ></line>
                        <path
                          className="hidden hs-password-active:block"
                          d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                        ></path>
                        <circle
                          className="hidden hs-password-active:block"
                          cx="12"
                          cy="12"
                          r="3"
                        ></circle>
                      </svg>
                    </button>
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="password-error"
                  >
                    8+ characters required
                  </p>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
            {/* End Form */}
          </div>
          <div className="flex justify-center mt-4">
            <p className="content-center text-sm text-gray-600">
              Don't have an account?
              <Link
                className="ml-2 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                to="../signup"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Signin;
