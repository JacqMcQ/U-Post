document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          window.location.href = "/";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  });

document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          window.location.href = "/"; 
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  });
