document.querySelectorAll(".delete-blog-form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to delete blog post");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.querySelector(".btn");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      // Example: Redirect to logout route
      window.location.href = "/logout"; 

    });
  }
});
