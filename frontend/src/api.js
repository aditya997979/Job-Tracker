const API = import.meta.env.VITE_API_URL;

export const login = async (credentials) => {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

export const register = async (data) => {
  const res = await fetch(`${API}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const fetchJobs = async (token) => {
  const res = await fetch(`${API}/api/jobs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
