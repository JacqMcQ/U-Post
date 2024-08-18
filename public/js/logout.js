// logout.js
document.getElementById("logout").addEventListener("click", function (event) {
  event.preventDefault();

  fetch("/api/users/logout", {
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/"; 
      } else {
        console.error("Logout failed");
      }
    })
    .catch((error) => console.error("Error:", error));
});
