document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#createBlogForm");
  const titleInput = document.querySelector("#title");
  const contentInput = document.querySelector("#content");

  if (form && titleInput && contentInput) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = titleInput.value.trim();
      const content = contentInput.value.trim();

      if (title && content) {
        try {
          const response = await fetch("/api/blogs", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
            document.location.replace("/dashboard");
          } else {
            alert("Failed to create blog post");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
  } else {
    console.error("Form or input elements not found");
  }
});

