document.querySelector(".logout-btn").addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    console.log("keldi");
    await fetch("http://localhost:3000/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    window.location.href = "../pages/login.html";
    console.log("keldi")
  } catch (error) {
    alert(error.message);
  }
});
