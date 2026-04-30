const API_BASE = "http://127.0.0.1:5000";

// 🔐 Register User
export const registerUser = async (data) => {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};


// 🔑 Login User
export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  // store JWT token automatically
  if (result.access_token) {
    localStorage.setItem("token", result.access_token);
  }

  return result;
};


// 🔥 Fire Detection API
export const detectFire = async (formData, token) => {
  const res = await fetch(`${API_BASE}/api/detect`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return await res.json();
};