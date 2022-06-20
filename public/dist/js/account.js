const newEntry = async (event) => {
  event.preventDefault();

  const product = document.querySelector("#entry-p").value.trim();
  const blurb = document.querySelector("#entry-b").value.trim();
  const entry = document.querySelector("#entry-e").value.trim();

  if (product && blurb && entry) {
    const response = await fetch(`/api/entries`, {
      method: "POST",
      body: JSON.stringify({ product, blurb, entry }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/account");
    } else {
      console.log(response);
      alert("Failed to create new entry!");
    }
  }
};

const delEntry = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/entries/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/account");
    } else {
      alert("Failed to delete entry!");
    }
  }
};

document.querySelector(".entry-form").addEventListener("click", newEntry);

document.querySelector("#mainaccont").addEventListener("click", delEntry);
