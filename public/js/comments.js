document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".comment-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const content = form.querySelector(".comment-content").value; // Ensure this matches the field in your form
      const blog_id = form.getAttribute("data-blog-id");

      try {
        const response = await fetch("/api/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, blog_id }),
        });

        if (response.ok) {
          const newComment = await response.json();
          alert("Comment added successfully!");
          // Optionally, you could update the comments section dynamically here
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
});
