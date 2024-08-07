$(document).ready(function () {
  var title = localStorage.getItem("blogTitle");
  var body = localStorage.getItem("blogBody");
  var author = localStorage.getItem("blogAuthor");
  var email = localStorage.getItem("blogAuthorEmail");

  $("#blogTitle").text(title);
  $("#blogBody").text(body);
  $("#blogAuthor").text(author);
  $("#blogAuthorEmail").text(email);
});
