let id = 0

class Post {

  constructor(postElement) {
    this._postElement = postElement;
    this._id = id++;
    this._name = '';
    this._canvas= null;
    this._ctx= null;
    this._bgImage = null;
    this._templateImage = null;
    this._logo = null;
    this._text = '';
    this._bgImageSelector = 'post-background';
    this._templateImageSelector = 'post-theme';
    this._logoImageSelector = 'post-logo';
    this._isEmpty = true;

    this._buildPost()
    this.CreateCanvas()
  }

  _buildPost () {
    let backgroundDiv = document.createElement('div');
    backgroundDiv.className = "post-background";

    let themeDiv = document.createElement('div');
    themeDiv.className = "post-theme";

    let logoDiv = document.createElement('div');
    logoDiv.className = "post-logo";

    let textbox = document.createElement('input');
    textbox.className = "textbox";

    this._postElement.appendChild(backgroundDiv); 
    this._postElement.appendChild(themeDiv); 
    this._postElement.appendChild(logoDiv); 
    this._postElement.appendChild(textbox); 
  }
  
  get bgDivElement() {
    return this._postElement.getElementsByClassName(this._bgImageSelector)[0]
  }
  
  get templateDivElement() {
    return this._postElement.getElementsByClassName(this._templateImageSelector)[0]
  }
  
  get logoDivElement() {
    return this._postElement.getElementsByClassName(this._logoImageSelector)[0]
  }
  
  get bgImageElement() {
    return this._postElement.getElementsByClassName(this._bgImageSelector)[0].children[0]
  }
  
  get templateImageElement() {
    return this._postElement.getElementsByClassName(this._templateImageSelector)[0].children[0]
  }

  get logoImageElement() {
    return this._postElement.getElementsByClassName(this._logoImageSelector)[0].children[0]
  }

  set bgImage(imageFile) {
    this._loadImage(imageFile, this.bgDivElement)
    this._bgImage = imageFile;
  }
  
  get bgImage() {
    return this._bgImage
  }
  
  set templateImage(imageFile) {
    this._loadImage(imageFile, this.templateDivElement)
    this._templateImage = imageFile;
  }
  
  get templateImage() {
    return this._templateImage
  }
  
  set logo(imageFile) {
    this._loadImage(imageFile, this.logoDivElement)
    this._logo = imageFile;
  }

  get logo() {
    return this._logo
  }
  set text(input){
   this._text = input
  }
  get text(){
    return this._text
  }

  copyPost (srcPost) {
    this._bgImage = srcPost.bgImage
    this._templateImage = srcPost.templateImage
    this._logo = srcPost.logo
    this._text = srcPost.text
  }

  CreateCanvas (){
    this._canvas = document.createElement('canvas');
    this._canvas.className = "canvas";
    this._ctx =this._canvas.getContext("2d");
    return this._canvas
  }
 
  convertInputToCanvasText(postObj) {
    drawText(this._ctx, this._text);

    postObj.removeInput();
    this.downloadPost();
    
  }
  removeInput(){
    this._text = ''
  }
 
  convertImgToCanvas(imgElement,scaleFactor,position) { 
    if (!scaleFactor) {
      scaleFactor = 1
    }

    if (!position) {
      position = {
        left: 0,
        top: 0
      }
    }
  
    this._ctx.drawImage(imgElement, position.left, position.top, this._canvas.width * scaleFactor, this._canvas.height * scaleFactor);
    let imgParent = imgElement.parentElement

    this.convertInputToCanvasText();
    imgParent.removeChild(imgParent.children[0])
  }
  copyImageToCanvas(postObj) {
    this.CreateCanvas ()
    
    const imgElements = postObj.getImages()
    
    const imgElementsLogo = postObj.getLogo()

    const imgElementFiltered = imgElements.filter(n => !!n);
    imgElementFiltered.forEach((img, i) => {
      this.convertImgToCanvas(img)
    })
    if (imgElementsLogo) {
      this.convertImgToCanvas(imgElementsLogo,0.25,{
        left:196,
        top:0,
      })
    }

  }
  getImages(){
  return  [this._bgImage,this._templateImage]
  
  }
  getLogo(){
    return this._logo
  }
  downloadPost(){
    let link = document.getElementsByClassName('downloadButton')[0];
    link.href = this._canvas.toDataURL("image/png");
    link.download = "Post-1";
  }

  isEmpty(){
    return this._isEmpty;
  }

  setCanvas(canvas){
    postElement.appendChild(canvas);
    this.isEmpty = false
  }

  _loadImage(imageFile, parentDivElement) {
    if (imageFile) {
      let img = document.createElement("img");
      img.className = "post";
      img.crossOrigin = "Anonymous";
      img.src = window.URL.createObjectURL(imageFile);
      img.onload = function() {
        window.URL.revokeObjectURL(img.src);
        parentDivElement.appendChild(img);
      }
    }
  }
}
