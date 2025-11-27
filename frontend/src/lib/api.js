const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api/admin";

/* Helper - attach token stored in localStorage */
function _headers(isJson = true) {
  const token = localStorage.getItem("admin_token");
  const headers = {};
  if (isJson) headers["Content-Type"] = "application/json";
  if (token) headers["x-admin-token"] = token;
  return headers;
}

/* ------------- Auth ------------- */
export async function apiLogin(password) {
  const res = await fetch(\`\${API_BASE}/login\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  return res.ok ? res.json() : { error: "Login failed" };
}

/* ------------- Partners ------------- */
export async function fetchPartners() {
  const res = await fetch(\`\${API_BASE}/partners\`, { headers: _headers() });
  if (!res.ok) return [];
  return res.json();
}

export async function registerPartner(payload) {
  const res = await fetch(\`\${API_BASE}/partners\`, {
    method: "POST",
    headers: _headers(),
    body: JSON.stringify(payload),
  });
  return res.json();
}

/* ------------- Photos ------------- */
export async function uploadPhoto(file) {
  const fd = new FormData();
  fd.append("image", file);
  const token = localStorage.getItem("admin_token");
  const res = await fetch(\`\${API_BASE}/upload-photo\`, {
    method: "POST",
    headers: token ? { "x-admin-token": token } : {},
    body: fd,
  });
  return res.ok ? res.json() : { error: "Upload failed" };
}

export async function deletePhoto(imagePath) {
  const res = await fetch(\`\${API_BASE}/delete-photo\`, {
    method: "DELETE",
    headers: _headers(),
    body: JSON.stringify({ imagePath }),
  });
  return res.ok ? res.json() : { error: "Delete failed" };
}

/* ------------- Sermons (demo) ------------- */
export async function registerSermon(payload) {
  // implement on backend to store sermons; here we post to /sermons (demo)
  const res = await fetch(\`\${API_BASE}/sermons\`, {
    method: "POST",
    headers: _headers(),
    body: JSON.stringify(payload),
  });
  return res.json();
}

