document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#commentForm");
  if (form) {
    const textarea = form.querySelector('textarea[name="content"]');
    if (textarea) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const content = textarea.value.trim();
        const blogId = window.location.pathname.split("/").pop();

        if (content) {
          try {
            const response = await fetch("/api/comments", {
              // Ensure this matches your Express route
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ content, blog_id: blogId }),
            });

            if (response.ok) {
              document.location.reload();
            } else {
              alert("Failed to add comment");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }
      });
    } else {
      console.error("Textarea not found");
    }
  } else {
    console.error("Form not found");
  }
});
