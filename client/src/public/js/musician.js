import { baseUrl } from "../../../config/base_url";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const nickname = document.querySelector("#nickname").value;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("nickname", nickname);

  try {
    const res = await fetch(`${baseUrl}/musicians/add`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    window.location.href = "../index.html";
  } catch (error) {
    document.getElementById("error-message").textContent = error.message;
  }
});
