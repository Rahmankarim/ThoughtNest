$(document).ready(function () {
  var apiBaseUrl = "http://localhost:800/api";

  // changing page on write a post btn clicked
  $(".writePost").click(function () {
    window.location.href = "writePost.html";
  });
  // when preview btn is clicked
  $(document).on("click", ".OpenBtn", function (event) {
    event.preventDefault();
    var title = $(this).data("title");
    var body = $(this).data("body");
    var author = $(this).data("name");
    var email = $(this).data("email");

    // Save values in localStorage
    localStorage.setItem("blogTitle", title);
    localStorage.setItem("blogBody", body);
    localStorage.setItem("blogAuthor", author);
    localStorage.setItem("blogAuthorEmail", email);

    // Redirect to preview page
    window.location.href = "previewBlog.html";
  });
  // Get Method
  $.ajax({
    url: `${apiBaseUrl}/blog`,
    method: "GET",
    success: function (data, status) {
      if (status !== "success") {
        alert("Data Get Method Failed");
        return;
      }

      data.forEach((data) => {
        const row = `
        <tr>
          <td style="font-family: serif;">
            <span class="h1 text-primary">${data.title}</span>
            <span style="display: flex; justify-content: space-around;">${data.name}</span>
            <span>${data.email}</span>
          </td>
          <td style="text-align: end;">
            <a class="btn btn-primary OpenBtn m-3" style="width: 50%; font-size: 2rem"
               data-title="${data.title}"
               data-body="${data.body}"
               data-name="${data.name}"
               data-email="${data.email}">
              Open
            </a>
            
          </td>
             <td style="text-align: start;">
            <a class="btn btn-danger DeleteBtn m-3" style="width: 50%; font-size: 2rem"
               data-title="${data.title}">
              Delete
            </a>
            
          </td>
        </tr>
      `;
        $("#blog-Body").append(row);
      });

      // when preview btn is clicked
      $(document).on("click", ".OpenBtn", function (event) {
        event.preventDefault();
        var title = $(this).data("title");
        var body = $(this).data("body");
        var author = $(this).data("name");
        var email = $(this).data("email");

        // Save values in localStorage
        localStorage.setItem("blogTitle", title);
        localStorage.setItem("blogBody", body);
        localStorage.setItem("blogAuthor", author);
        localStorage.setItem("blogAuthorEmail", email);

        // Redirect to preview page
        window.location.href = "previewBlog.html";
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("AJAX Error:", textStatus, errorThrown);
    },
  });
  // adding validation and Post Method to the form
  $(".publishBtn").click(function () {
    $(".Fields").removeClass("border-danger");

    let isValid = true;

    $(".Fields").each(function () {
      if ($(this).is("select")) {
        if (
          $(this).val() === "" ||
          $(this).find("option:selected").text() === "Gender"
        ) {
          $(this).addClass("border-danger");
          isValid = false;
        }
      } else {
        if ($(this).val().trim() === "") {
          $(this).addClass("border-danger");
          isValid = false;
        }
      }
    });

    if (!isValid) {
      alert("Please fill in all the required fields.");
    } else {
      let newBlog = {
        name: $("#nameInput").val(),
        email: $("#emailInput").val(),
        gender: $("#preferenceSelect").val(),
        title: $("#titleInput").val(),
        body: $("#bodyInput").val(),
      };

      $.ajax({
        url: `${apiBaseUrl}/blog`,
        method: "POST",
        data: JSON.stringify(newBlog),
        contentType: "application/json",
        success: function (response) {
          const newRow = `
            <tr>
              <td style="font-family: serif;">
                <span class="h1 text-primary">${newBlog.title}</span>
                <span style="display: flex; justify-content: space-around;">${response.name}</span>
                <span>${newBlog.email}</span>
              </td>
              <td>
                <a class="btn btn-primary OpenBtn m-3" style="width: 50%; font-size: 2rem"
                   data-title="${newBlog.title}"
                   data-body="${newBlog.body}"
                   data-name="${newBlog.name}"
                   data-email="${newBlog.email}">
                  Open
                </a>
                 <a class="btn btn-danger DeleteBtn m-3" style="width: 50%; font-size: 2rem"
                   data-title="${newBlog.title}">
                  Delete
                </a>
              </td>
            </tr>
          `;
          $("#blog-Body").append(newRow);
        },
        error: function (xhr, status, error) {
          console.log(error);
          alert("Error: " + xhr.responseText + " status: " + status);
        },
      });

      $("#nameInput").val("");
      $("#emailInput").val("");
      $("#preferenceSelect").val("");
      $("#titleInput").val("");
      $("#bodyInput").val("");

      alert("Your Blog Has Been Saved");
    }
  });

  // Delete method
  $(document).on("click", ".DeleteBtn", function (event) {
    event.preventDefault();
    var title = $(this).data("title");
    var row = $(this).closest("tr");

    $.ajax({
      type: "DELETE",
      url: `${apiBaseUrl}/blog/` + encodeURIComponent(title),
      success: function (response) {
        alert("Data Has been Deleted");
        row.remove();
      },
      error: function (xhr, status, error) {
        alert(status + " " + error);
      },
    });
  });

  $(".loginSignUp").click(function () {
    window.location.href = "login-page.html";
  });
});
