//function for creating a new comment - works with commentRoutes in controllers/api
const newComment = async (event) => {
  event.preventDefault();
  //checks for data id on the dom element and gathers form value to use in the body for post api, then finally reloads the page.
  if (event.target.hasAttribute("dataId")) {
    const entryId = event.target.getAttribute("dataId");
    const formInfo = document.querySelector("#formInfo").value.trim();

    if (formInfo && entryId) {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        body: JSON.stringify({ formInfo, entryId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.replace(`/entry/${entryId}`);
      } else {
        alert("Comment could not be created, please try again.");
      }
    }
  }
};

document.querySelector(".replyForm").addEventListener("submit", newComment);
