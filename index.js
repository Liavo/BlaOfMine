let mainPost = new Post(document.getElementsByClassName('post')[0]);
let mainScreen = document.getElementsByClassName("post")[0];
let frame1Element = document.getElementById("frame-1");
let frame2Element = document.getElementById("frame-2");
let frame3Element = document.getElementById("frame-3");
let miniPost1 = new Post(frame1Element)
let miniPost2 = new Post(frame2Element)
let miniPost3 = new Post(frame3Element)

document.getElementsByClassName("button-background")[0].addEventListener("change", function(e) {
  mainPost.setBackgroundImage(e.target.files[0]);
}, false);
document.getElementsByClassName("button-theme")[0].addEventListener("change", function(e) {
  mainPost.setThemeImage(e.target.files[0]);
}, false);
document.getElementsByClassName("button-logo")[0].addEventListener("change", function(e) {
  mainPost.setLogoImage(e.target.files[0]);
}, false);
document.getElementsByClassName("textbox")[0].addEventListener("input", function(e) {
  mainPost.text = e.target.value
}, false);
document.getElementsByClassName("downloadButton")[0].addEventListener("click", function(e) {
  if (miniPost1.isEmpty()){
    mainPost.downloadPost()
    miniPost1.copyPost(mainPost)
    miniPost1.copyImageToCanvas()
    miniPost1.setCanvas()

    mainPost.removeImage()
    mainPost.removeText()
  } 
  else if (miniPost2.isEmpty()){
    mainPost.downloadPost()
    miniPost2.copyPost(mainPost)
    miniPost2.copyImageToCanvas()
    miniPost2.setCanvas()

    mainPost.removeImage()
    mainPost.resetInput()
  }
  else if (miniPost3.isEmpty()){
    mainPost.downloadPost()
    miniPost3.copyPost(mainPost)
    miniPost3.copyImageToCanvas()
    miniPost3.setCanvas()
    
    mainPost.removeImage()
    mainPost.resetInput()
  }
}, false);

frame1Element.addEventListener("click", function(e) {
  mainPost.copyPost(miniPost1)
}, false);
frame2Element.addEventListener("click", function(e) {
  mainPost.copyPost(miniPost2)
}, false);
frame3Element.addEventListener("click", function(e) {
  mainPost.copyPost(miniPost3)
}, false);
