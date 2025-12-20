//works as basic api function. Every protected site has own url
//
export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  });

//Auto-logout
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Nicht autorisiert");
  }

  return response.json();
}
