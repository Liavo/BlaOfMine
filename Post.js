let id = 0

class Post {
  constructor(postElement) {
    this._id = id++;
    this._name = '';
    this._bgImage = null;
    this._templateImage = null;
    this._logo = null;
    this._text = '';
    this._bgImageSelector = 'post-background';
    this._templateImageSelector = 'post-theme';
    this._logoImageSelector = 'post-logo';

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
    document.getElementsByClassName("post")[0].appendChild(backgroundDiv); 
    document.getElementsByClassName("post")[0].appendChild(themeDiv); 
    document.getElementsByClassName("post")[0].appendChild(logoDiv); 
    document.getElementsByClassName("post")[0].appendChild(textbox); 
  }
  
  get bgDivElement() {
    return document.getElementsByClassName(this._bgImageSelector)[0]
  }
  
  get templateDivElement() {
    return document.getElementsByClassName(this._templateImageSelector)[0]
  }
  
  get logoDivElement() {
    return document.getElementsByClassName(this._logoImageSelector)[0]
  }
  
  get bgImageElement() {
    return document.getElementsByClassName(this._bgImageSelector)[0].children[0]
  }
  
  get templateImageElement() {
    return document.getElementsByClassName(this._templateImageSelector)[0].children[0]
  }

  get logoImageElement() {
    return document.getElementsByClassName(this._logoImageSelector)[0].children[0]
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
    this._loadImage(imageFile, this.logoDivElement, 0.2, {
      top: 10,
      left: 200,
    })
    this._logo = imageFile;
  }

  get logo() {
    return this._logo
  }

  copyPost (srcPost) {
    this.bgImage = srcPost.bgImage
    this.templateImage =srcPost.bgImage
    this.logo=srcPost.logo
  }

  convertInputToCanvasText() {
    let input = document.getElementsByClassName("textbox");
   
    drawText(ctx,input[0].value);
    let removeInput= document.getElementsByClassName("post")[0]
    removeInput.removeChild(input[0]);
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
    let canvas = document.createElement('canvas');
    canvas.className = "myCanvas";
    let ctx = canvas.getContext("2d");
    ctx.drawImage(imgElement, position.left, position.top, canvas.width * scaleFactor, canvas.height * scaleFactor);
    let imgParent = imgElement.parentElement
    let imgGetPost= imgParent.parentElement
// document.getElementById("frame-1").appendChild(imgGetPost)
    imgParent.removeChild(imgParent.children[0])
  }
  
  convertAndDownloadPost() {
    const imgElements = [this.bgImageElement, this.templateImageElement]
    const imgElementFiltered = imgElements.filter(n => !!n);
    imgElementFiltered.forEach((img, i) => {
      this.convertImgToCanvas(img)
    })
    if (this.logoImageElement) {
      this.convertImgToCanvas(this.logoImageElement,0.25,{
        left:196,
        top:0,
      })
    }
    // document.getElementById("frame-1").appendChild(canvas)
    this.convertInputToCanvasText();

    let link = document.getElementsByClassName('downloadButton')[0];
    link.href = canvas.toDataURL("image/png");
    link.download = "Post-1";
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
