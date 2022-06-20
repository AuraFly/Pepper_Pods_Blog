//function for creating a new entry - works with entryRoutes in controllers/api
const newEntry = async (event) => {
  event.preventDefault();

  //gathering values from dom elements.
  const product = document.querySelector("#entry-p").value.trim();
  const blurb = document.querySelector("#entry-b").value.trim();
  const entry = document.querySelector("#entry-e").value.trim();

  //if there are values, use post method with those values
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

document.querySelector(".entry-form").addEventListener("click", newEntry);

// listener for delete function
document.addEventListener("click", async (e) => {
  if (e.target && e.target.id == "deleteentry") {
    const id = e.target.getAttribute("data-id");

    const response = await fetch(`/api/entries/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/account");
    } else {
      alert("Failed to delete entry!");
    }
  }
});
