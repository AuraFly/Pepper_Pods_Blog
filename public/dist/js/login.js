//function for handling login - works with userRoutes in controllers/api
const loginFormHandler = async (event) => {
  event.preventDefault();
  //gathets values from dom elements
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  //sends values using post api, then redirects to account page
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/account");
    } else {
      alert(response.statusText);
    }
  }
};

//function for handling signup - works with userRoutes in controllers/api
const signupFormHandler = async (event) => {
  event.preventDefault();
  //gathers values from dom elements
  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  //sends values using post api
  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/account");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signinsection")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signupsection")
  .addEventListener("submit", signupFormHandler);
