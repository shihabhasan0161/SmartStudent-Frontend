export const baseURL = import.meta.env.VITE_BACKEND_URL;

export const endpoints = {
  login: "login",
  googleAuth: "/oauth2/authorization/google",
  // githubAuth: "/oauth2/authorization/github",
  register: "register",
  dashboard: "dashboard",
  incomes: "incomes",
  expenses: "expenses",
  categories: "categories",
  filter: "filter",
};
