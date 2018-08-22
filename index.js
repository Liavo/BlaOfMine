let mainPost = new Post(document.getElementsByClassName('post')[0]);
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
    const canvas = mainPost.copyImageToCanvas()
    mainPost.downloadPost()
    miniPost1.copyPost(mainPost)
    miniPost1.setCanvas(canvas)
  } 
  else if (miniPost2.isEmpty()){
    const canvas = mainPost.convertPost()
    mainPost.downloadPost()
    miniPost2.copyPost(mainPost)
    miniPost2.setCanvas(canvas)
  }
}, false);



