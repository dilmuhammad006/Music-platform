document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const email = document.querySelector("#email").value;
    try {
      const res = await fetch("http://localhost:3000/users/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();

      document.getElementById("error-message").textContent = data.message;
  
      if (!res.ok) {
        throw new Error(data.message);
      }
    } catch (error) {
      document.getElementById("error-message").textContent = error.message;
    }
  });
  