$(document).ready(function () {
  var apiBaseUrl = "http://localhost:800/api";

  // Initialize page states
  $(".Home-Pageclass").show();
  $(".write-Blogclass").hide();
  $(".preview-Blogclass").hide();
  $(".login-signup").hide();

  $(".ThoughtNest").click(function () {
    $(".Home-Pageclass").show();
    $(".write-Blogclass").hide();
    $(".preview-Blogclass").hide();
    $(".login-signup").hide();
  });

  $(".writePost").click(function () {
    $(".Home-Pageclass").hide();
    $(".write-Blogclass").show();
    $(".preview-Blogclass").hide();
    $(".login-signup").hide();
  });

  $(document).on("click", ".OpenBtn", function (event) {
    event.preventDefault();
    var title = $(this).data("title");
    var body = $(this).data("body");
    var author = $(this).data("name");
    var email = $(this).data("email");

    const card = $(this).closest(".card");
    const imageUrl = card.find(".card-img-top").attr("src");

    $("#blogTitle").text(title);
    $("#blogBody").text(body);
    $("#blogAuthor").text(author);
    $("#blogAuthorEmail").text(email);
    $("#previewBlogImage").attr("src", imageUrl);

    $(".Home-Pageclass").hide();
    $(".write-Blogclass").hide();
    $(".preview-Blogclass").show();
    $(".login-signup").hide();
  });

  $(".loginSignUp").click(function () {
    $(".Home-Pageclass").hide();
    $(".write-Blogclass").hide();
    $(".preview-Blogclass").hide();
    $(".login-signup").show();

    $(".register").click(function () {
      $(".newAccount").show();
      $(".dontHaveAccountText").hide();
      $(".forgetPassword").hide();
      $(".signupBtn").show();
      $(".signinBtn").hide();
      $(".lead").text("Sign Up with");
      $(".alreadyHaveAccountText").show();
    });

    $(".signINText").click(function () {
      $(".newAccount").hide();
      $(".dontHaveAccountText").show();
      $(".forgetPassword").show();
      $(".signinBtn").show();
      $(".signupBtn").hide();
      $(".lead").text("Sign in with");
      $(".alreadyHaveAccountText").hide();
    });

    $(".signinBtn").on("click", function (event) {
      event.preventDefault();

      let email = $(".emailInput").val();
      let password = $(".passwordInput").val();

      let obj = { email: email, password: password };

      console.log("Email:", obj.email);
      console.log("Password:", obj.password);

      if (obj.email === "" || obj.password === "") {
        alert("Fill the Input Fields");

        if (obj.email !== "" && obj.password === "") {
          $(".passwordInput").css("border", "1px solid red");
        } else if (obj.email === "" && obj.password !== "") {
          $(".emailInput").css("border", "1px solid red");
        } else if (obj.email === "" && obj.password === "") {
          $(".emailInput").css("border", "1px solid red");
          $(".passwordInput").css("border", "1px solid red");
        }
      } else {
        $.ajax({
          type: "POST",
          url: `${apiBaseUrl}/login`,
          data: JSON.stringify(obj),
          contentType: "application/json",
          success: function (response) {
            $(".Home-Pageclass").show();
            $(".write-Blogclass").hide();
            $(".preview-Blogclass").hide();
            $(".login-signup").hide();
            $(".loginSignUp").hide();
            $(".profileName").text(obj.email).show();
          },
          error: function (xhr, status, error) {
            console.error("Error:", error);
            alert("Error: " + xhr.responseText + " Status: " + status);
          },
        });
      }
    });

    $(".signupBtn").on("click", function (event) {
      event.preventDefault();

      let name = $(".nameInput").val();
      let phoneNumber = $(".phoneNumberInput").val();
      let email = $(".emailInput").val();
      let password = $(".passwordInput").val();
      let confirmPassword = $(".confirmPasswordInput").val();

      let obj = {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      };

      if (
        obj.name === "" ||
        obj.phoneNumber === "" ||
        obj.email === "" ||
        obj.password === ""
      ) {
        alert("Fill All Input Fields");

        if (obj.name === "") $(".nameInput").css("border", "1px solid red");
        if (obj.phoneNumber === "")
          $(".phoneNumberInput").css("border", "1px solid red");
        if (obj.email === "") $(".emailInput").css("border", "1px solid red");
        if (obj.password === "")
          $(".passwordInput").css("border", "1px solid red");
      } else if (password !== confirmPassword) {
        alert("Passwords Do Not Match");
        $(".confirmPasswordInput").css("border", "1px solid red");
      } else {
        $.ajax({
          type: "POST",
          url: `${apiBaseUrl}/signup`,
          data: JSON.stringify(obj),
          contentType: "application/json",
          success: function (response) {
            alert("Your Account is Created Please Login");
            $(".login-signup").show();
          },
          error: function (xhr, status, error) {
            console.error("Error:", error);
            alert("Error: " + xhr.responseText + " Status: " + status);
          },
        });
      }
    });
  });

  $(".publishBtn").click(function (e) {
    e.preventDefault();

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
      let formData = new FormData();

      // Append form fields
      formData.append("name", $("#nameInput").val()); // Ensure the name matches what the server expects
      formData.append("email", $("#emailInput").val()); // Ensure the email field is named correctly
      formData.append("gender", $("#preferenceSelect").val()); // Gender field should match server expectations

      // Append the file (Ensure the name 'coverImagename' matches what multer is configured to handle)
      const coverImageFile = $("#coverImage")[0].files[0];
      if (coverImageFile) {
        formData.append("coverImagename", coverImageFile);
      } else {
        console.error("No file selected.");
      }

      formData.append("title", $("#titleInput").val()); // Title field
      formData.append("body", $("#bodyInput").val()); // Body field

      // Send AJAX request
      $.ajax({
        url: `${apiBaseUrl}/blog`, // Ensure this URL is correct
        method: "POST",
        data: formData,
        processData: false, // Required to prevent jQuery from automatically processing the data
        contentType: false, // Required to prevent jQuery from automatically setting content type
        success: function (response) {
          // Handle success
          function truncateText(text, wordLimit) {
            const words = text.split(" ");
            if (words.length > wordLimit) {
              return words.slice(0, wordLimit).join(" ") + "...";
            }
            return text;
          }

          const truncatedBody = truncateText($("#bodyInput").val(), 20);

          const newCard = `
          <div class="col-lg-4 mb-4 CardDiv">
              <div class="card">
                  <img src="../../server/${response.coverImagePath}" alt="Image is corrupted" class="card-img-top" />
                  <div class="card-body">
                      <h5 class="card-title">${response.title}</h5>
                      <p class="card-text">${truncatedBody}</p>
                      <a href="#" class="btn btn-outline-success btn-sm OpenBtn"
                         data-title="${response.title}"
                         data-body="${response.body}"
                         data-name="${response.name}"
                         data-email="${response.email}"
                         data-coverImagePath="${response.coverImagePath}">Read More</a>
                      <a href="#" class="btn btn-outline-danger btn-sm">
                          <i class="far fa-heart"></i>
                      </a>
                       <a href="#" class="btn btn-outline-danger btn-sm trashIcon DeleteBtn">
                          <i class="fa fa-trash"></i>
                      </a>
                      <hr>
                      <p class="card-text"><large class="text-muted">By: ${response.name} (${response.email})</large></p>
                  </div>
              </div>
          </div>
      `;

          $("#blog-Body").append(newCard);
          alert("Your Blog Has Been Saved");
        },
        error: function (xhr, status, error) {
          console.log(error);
          alert("Error: " + xhr.responseText + " status: " + status);
        },
      });

      $("#ideaForm").trigger("reset");
    }
  });

  // Get method
  $.ajax({
    url: `${apiBaseUrl}/blog`,
    method: "GET",
    success: function (data, status) {
      if (status !== "success") {
        alert("Data Get Method Failed");
        return;
      }

      data.forEach((data) => {
        function truncateText(text, wordLimit) {
          const words = text.split(" ");
          if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
          }
          return text;
        }

        const truncatedBody = truncateText(data.body, 20);

        const newCard = `
        <div class="col-lg-4 mb-4 CardDiv">
            <div class="card">
                <img src="../../server/${data.coverImagePath}" alt="Image is corrupted" class="card-img-top cardImage"  />
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${truncatedBody}</p>
                    <a href="#" class="btn btn-outline-success btn-sm OpenBtn"
                       data-title="${data.title}"
                       data-body="${data.body}"
                       data-name="${data.name}"
                       data-email="${data.email}"
                       data-coverImagePath="${data.coverImagePath}">Read More</a>
                    <a href="#" class="btn btn-outline-danger btn-sm">
                        <i class="far fa-heart"></i>
                    </a>
                     <a href="#" class="btn btn-outline-danger btn-sm trashIcon DeleteBtn" >
                          <i class="fa fa-trash"></i>
                      </a>
                    <hr>
                    <p class="card-text"><large class="text-muted">By: ${data.name} (${data.email})</large></p>
                </div>
            </div>
        </div>
    `;

        $("#blog-Body").append(newCard);
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("AJAX Error:", textStatus, errorThrown);
    },
  });

  // Delete method
  $(document).on("click", ".DeleteBtn", function (event) {
    event.preventDefault();
    const CardDiv = $(this).closest(".CardDiv");
    const title = CardDiv.find(".card-title").text();

    $.ajax({
      type: "DELETE",
      url: `${apiBaseUrl}/blog/` + title,
      success: function (response) {
        alert("Data Has been Deleted");
        CardDiv.remove();
      },
      error: function (xhr, status, error) {
        alert(status + " " + error);
      },
    });
  });
});
