document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.querySelector("#commentForm");

  if (commentForm) {
    commentForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const content = document
        .querySelector('textarea[name="content"]')
        .value.trim();
      const blogId = document.querySelector("#blog-id").value;

      if (content) {
        try {
          const response = await fetch(`/api/comments`, {
            method: "POST",
            body: JSON.stringify({ content, blog_id: blogId }),
            headers: { "Content-Type": "application/json" },
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
  }
});
