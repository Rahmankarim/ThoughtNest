$(document).ready(function () {
  var apiBaseUrl = "http://localhost:800/api";

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

  // When SignIn Button Is Clicked
  $(".signinBtn").on("click", function (event) {
    event.preventDefault(); // Prevent form submission if inside a form tag

    let email = $(".emailInput").val();
    let password = $(".passwordInput").val();

    let obj = {
      email: email,
      password: password,
    };

    console.log("Email:", obj.email); // Debug log
    console.log("Password:", obj.password); // Debug log

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
          window.location.href = "home.html"; // Redirect to the home page
        },
        error: function (xhr, status, error) {
          console.error("Error:", error);
          alert("Error: " + xhr.responseText + " Status: " + status);
        },
      });
    }
  });

  // When SignUP Button Is Clicked
  $(".signupBtn").on("click", function (event) {
    event.preventDefault(); // Prevent form submission if inside a form tag

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

      if (obj.name === "") {
        $(".nameInput").css("border", "1px solid red");
      }
      if (obj.phoneNumber === "") {
        $(".phoneNumberInput").css("border", "1px solid red");
      }
      if (obj.email === "") {
        $(".emailInput").css("border", "1px solid red");
      }
      if (obj.password === "") {
        $(".passwordInput").css("border", "1px solid red");
      }
    } else if (password !== confirmPassword) {
      alert("Passwords Do Not Match");
      $(".confirmPasswordInput").css("border", "1px solid red");
    } else {
      $.ajax({
        type: "POST",
        url: `${apiBaseUrl}/signup`, // Make sure the endpoint is correct
        data: JSON.stringify(obj),
        contentType: "application/json",
        success: function (response) {
          console.log("Response from server:", response);
        },
        error: function (xhr, status, error) {
          console.error("Error:", error);
          alert("Error: " + xhr.responseText + " Status: " + status);
        },
      });
    }
  });
});
