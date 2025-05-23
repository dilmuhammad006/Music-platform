import { baseUrl } from "../../../config/base_url";

document.querySelector(".logout-btn").addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    console.log("keldi");
    await fetch(`${baseUrl}/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    window.location.href = "../pages/login.html";
    console.log("keldi");
  } catch (error) {
    alert(error.message);
  }
});
