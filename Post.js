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
    this.bgElement= null;
    this.themeElement = null;
    this.logoElement= null;
    // this._bgImageSelector = 'post-background';
    // this._templateImageSelector = 'post-theme';
    // this._logoImageSelector = 'post-logo';
    this._isEmpty = true;
    

    this._buildPost()
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

    this.bgElement = srcPost.bgElement
    this.themeElement = srcPost.themeElement
    this.logoElement = srcPost.logoElement
    this._text = srcPost._text
  }

  CreateCanvas (){
    this._canvas = document.createElement('canvas');
    // this._canvas.className = "canvas";
    this._ctx =this._canvas.getContext("2d");
  }
 
  convertInputToCanvasText() {
    drawText(this._ctx, this._text);

    this.resetInput();
    // this.downloadPost();
    
  }
 resetInput(){
    this._text = ''
    return this._text
  }
 
  convertImgToCanvas(imgElement, scaleFactor, position) { 
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
    imgParent.removeChild(imgParent.children[0])
  }

  copyImageToCanvas() {
    this.CreateCanvas()
    
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
    this.convertInputToCanvasText();

  }
  
  setCanvas() {
    this._postElement.appendChild(this._canvas);
    this._isEmpty = false
  }

  getImages() {
    return  [ this.bgElement,this.themeElement]
  
  }

  getLogo(){
    return this.logoElement
  }

  downloadPost(){
    // let link = document.getElementsByClassName('downloadButton')[0];
    // let canvas =this._canvas
    // link.href = canvas.toDataURL("image/png");
    // link.download = "Post-1";
  }

  isEmpty(){
    return this._isEmpty;
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

