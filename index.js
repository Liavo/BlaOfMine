let mainPost = new Post(document.getElementsByClassName('post')[0])
let frame1Element = document.getElementById("frame-1");
let frame2Element = document.getElementById("frame-2");
let frame3Element = document.getElementById("frame-3");
let miniPost1 = new Post(frame1Element)
let miniPost2 = new Post(frame2Element)
let miniPost3 = new Post(frame3Element)

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
  if (miniPost1.isEmpty()){
    const canvas = mainPost1.convertPostToCanvas()
    mainPost1.downloadPost()
    miniPost1.copyPost(mainPost)
    miniPost1.appendCanvas(canvas)
  } 
  

  mainPost.convertPost()
  miniPost.copyPost(mainPost)
  emptyFrameElement.appendChild(canvas)
}, false);



