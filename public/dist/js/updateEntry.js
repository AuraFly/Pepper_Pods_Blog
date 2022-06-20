//function for updating an entry - works with entryRoutes in controllers/api
const updateEntry = async (event) => {
  event.preventDefault();
  //gathers values
  const entryId = document.querySelector("#updatebox").getAttribute("dataId");
  const entry = document.querySelector("#formInfo").value.trim();
  //sends values using put/update method api
  if (entry) {
    const response = await fetch(`/api/entries/${entryId}`, {
      method: "PUT",
      body: JSON.stringify({ entry }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("response ok");
      document.location.replace("/account");
    } else {
      alert("Sorry, your update was not submitted, try again.");
    }
  }
};

document.querySelector(".updateForm").addEventListener("submit", updateEntry);
