export const baseURL = import.meta.env.VITE_BACKEND_URL;
export const endpoints = {
  login: "login",
  register: "register",
};

export const sideBarLinks = [
  { label: "Incomes", path: "/incomes" },
  { label: "Expenses", path: "/expenses" },
  { label: "Categories", path: "/categories" },
  { label: "Filter", path: "/filter" },
];