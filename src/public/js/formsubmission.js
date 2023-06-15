document.getElementById("searchForm").addEventListener("submit", function (ev) {
  ev.preventDefault(); // Prevent the form from submitting

  let filmTitle = encodeURIComponent(
    document.getElementById("filmTitle").value
  );
  let actionURL = "/films/" + filmTitle;
  window.location.href = actionURL;
});
