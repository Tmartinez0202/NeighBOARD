$(document).ready(function() {
  // Getting references to the name input and author container, as well as the table body
  var nameInput = $("#neighbor-name");
  var neighborList = $("tbody");
  var neighborContainer = $(".neighbor-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#neighbor-form", handleNeighborFormSubmit);
  $(document).on("click", ".delete-neighbor", handleDeleteButtonPress);

  // Getting the initial list of Authors
  getNeighbor();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleNeighborFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertNeighbor({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertNeighbor(neighborData) {
    $.post("/api/neighbors", neighborData)
      .then(getNeighbors);
  }

  // Function for creating a new list row for authors
  function createNeighborRow(neighborData) {
    var newTr = $("<tr>");
    newTr.data("neighbor", neighborData);
    newTr.append("<td>" + neighborData.name + "</td>");
    // if (neighborData.Posts) {
    //   newTr.append("<td> " + neighborData.Posts.length + "</td>");
    // } else {
    //   newTr.append("<td>0</td>");
    // }
    newTr.append("<td><a href='/blog?neighbor_id=" + neighborData.id + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?neighbor_id=" + neighborData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-neighbor'>Delete Neighbor</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getNeighbors() {
    $.get("/api/neighbors", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createNeighborRow(data[i]));
      }
      renderNeighborList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderNeighborList(rows) {
    neighborList.children().not(":last").remove();
    neighborContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      neighborList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Neighbor before you can create a Post.");
    neighborContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("neighbor");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/neighbors/" + id
    })
      .then(getNeighbor);
  }
});
