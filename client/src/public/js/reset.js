document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = document.querySelector("#password").value;

  const params = new URLSearchParams(window.location.search);
  const resetToken = params.get("resetToken");
  try {
    const res = await fetch("http://localhost:3000/users/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ password, resetToken }),
    });

    const data = await res.json();
    document.getElementById("error-message").textContent = data.message;

    if (!res.ok) {
      throw new Error(data.message);
    }
    document.getElementById("login-message").textContent = "Go to login page";
  } catch (error) {
    document.getElementById("error-message").textContent = error.message;
  }
});
