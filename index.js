let mainPost = new Post(document.getElementById('myCanvas'))

document.getElementsByClassName("button-background")[0].addEventListener("change", function(e) {
  mainPost.bgImage = e.target.files[0]
}, false);
document.getElementsByClassName("button-theme")[0].addEventListener("change", function(e) {
  mainPost.templateImage = e.target.files[0]
}, false);
document.getElementsByClassName("button-logo")[0].addEventListener("change", function(e) {
  mainPost.logo = e.target.files[0]
}, false);
document.getElementsByClassName("downloadButton")[0].addEventListener("click", function(e) {
  let miniPost = new Post(document.getElementById('frame-1'))
  miniPost.copyPost(mainPost)
  mainPost.convertAndDownloadPost()
}, false);

window.onload = function() {
  canvas = document.getElementById('myCanvas');
  document.getElementsByClassName("textbox");
}




//   movePostToPostsCollection()
//   cleanMainPost()
//   createNewMainPost()
// })