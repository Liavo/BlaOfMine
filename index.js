let post = new Post(document.getElementById('myCanvas'))

document.getElementsByClassName("button-background")[0].addEventListener("change", function(e) {
  post.bgImage = e.target.files[0]
}, false);
document.getElementsByClassName("button-theme")[0].addEventListener("change", function(e) {
  post.templateImage = e.target.files[0]
}, false);
document.getElementsByClassName("button-logo")[0].addEventListener("change", function(e) {
  post.logo = e.target.files[0]
}, false);
document.getElementsByClassName("downloadButton")[0].addEventListener("click", function(e) {
  post.convertAndDownloadPost()
}, false);

window.onload = function() {
  canvas = document.getElementById('myCanvas');
  document.getElementsByClassName("textbox");
}



// addEventListener('save-button', () => {
//   convertInputToCanvasText()
//   savePost()
//   movePostToPostsCollection()
//   cleanMainPost()
//   createNewMainPost()
// })