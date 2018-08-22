let id = 0

class Post {

  constructor(postElement) {
    this._postElement = postElement;
    this._id = id++;
    this._name = '';
    this._canvas= null;
    this._ctx= null;
    this._text = '';
    this._bgImage= null;
    this._themeImage = null;
    this._logoImage = null ;
    this.logoElement= null;
    this.bgElement= null;
    this.themeElement = null;
    // this._bgImageSelector = 'post-background';
    // this._templateImageSelector = 'post-theme';
    // this._logoImageSelector = 'post-logo';
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

    postObj.resetInput();
    this.downloadPost();
    
  }
 resetInput(){
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

  copyImageToCanvas() {
    this.CreateCanvas ()
    
    const imgElements = this.getImages()
    
    const imgElementsLogo = this.getLogo()

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
  getImages() {
    return  [ this.bgElement,this.themeElement]
  
  }
  getLogo(){
    return this.logoElement
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
    this._postElement.appendChild(canvas);
    this.isEmpty = false
  }

  setBackgroundImage(backgroundFile) {
      this.bgImage = backgroundFile;
      this.createBg();
    }

  setThemeImage(themeFile) {
    this.themeImage = themeFile;
    this.createTheme();
  }

  setLogoImage(logoFile){
    this.logoImage = logoFile;
    this.createLogo();
  }

  createBg() {
    let that = this;
      let img = document.createElement("img");
      img.className = "post";
      img.crossOrigin = "Anonymous";
      img.src = window.URL.createObjectURL(this.bgImage);
      let parentDivElement = this._postElement.getElementsByClassName('post-background')[0]
      img.onload = function() {
        window.URL.revokeObjectURL(img.src);
        parentDivElement.appendChild(img);
        that.bgElement = parentDivElement.children[0];
      }
  }

  createTheme() {
    let that = this;
    let img = document.createElement("img");
    img.className = "post";
    img.crossOrigin = "Anonymous";
    img.src = window.URL.createObjectURL(this.themeImage);
    let parentDivElement = this._postElement.getElementsByClassName('post-theme')[0]
    img.onload = function() {
      window.URL.revokeObjectURL(img.src);
      parentDivElement.appendChild(img);
      that.themeElement = parentDivElement.children[0];
    }
  }

  createLogo() {
    let that = this;
    let img = document.createElement("img");
    img.className = "post";
    img.crossOrigin = "Anonymous";
    img.src = window.URL.createObjectURL(this.logoImage);
    let parentDivElement = this._postElement.getElementsByClassName('post-logo')[0]
    img.onload = function() {
      window.URL.revokeObjectURL(img.src);
      parentDivElement.appendChild(img);
      that.logoElement = parentDivElement.children[0];
    }
  }

 


}

