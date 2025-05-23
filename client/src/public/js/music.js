import { baseUrl } from "../../../config/base_url";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const duration = document.querySelector("#duration").value;
  const musicianId = document.querySelector("#musicianId").value;
  const musicFile = document.querySelector("#musicFile").files[0];

  const formData = new FormData();
  formData.append("name", name);
  formData.append("duration", duration);
  formData.append("musicianId", musicianId);
  formData.append("musicFile", musicFile);

  try {
    const res = await fetch(`${baseUrl}/musics/add`, {
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
