let id = 0
class Post {
  constructor(canvas) {
    canvas.width = 512;
    canvas.height = 512;
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
    this._id = id++;
    this._name = '';
    this._bgImage = null;
    this._templateImage = null;
    this._logo = null;
    this._text = '';
    this._bgImageSelector = 'post-background';
    this._templateImageSelector = 'post-theme';
    this._logoImageSelector = 'post-logo';

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
    this._loadImage(imageFile, this.logoDivElement)
    this._logo = imageFile;
  }

  get logo() {
    return this._logo
  }
  
  set text(textInput) {
    this._text(textInput, 'post-text')
    this._text = textInput;
  }
  
  get text() {
    return this._text
  }
  
  convertInputToCanvasText() {
    let input = document.getElementsByClassName("textbox");
    let textValue = document.getElementsByClassName("textbox")[0].value;
    drawText(this._ctx, textValue);
    document.getElementsByClassName("post")[0].removeChild(input[0]);
  }
 
  convertImgToCanvas(imgElement) { 
//     scaleAndDraw(this._canvas, this._ctx, imgElement, 1, 0, 0);
    drawImageProp(this._ctx, imgElement  )
    let imgParent = imgElement.parentElement
    imgParent.removeChild(imgParent.children[0])
  }
  
  convertAndDownloadPost() {
    const imgElements = [this.bgImageElement, this.templateImageElement, this.logoImageElement]
    const imgElementFiltered = imgElements.filter(n => !!n);
    imgElementFiltered.forEach((img, i) => {
      this.convertImgToCanvas(img)
    })

    this.convertInputToCanvasText();

    let link = document.getElementsByClassName('downloadButton')[0];
    link.href = canvas.toDataURL();
    link.download = "Post-1";
  }

  _loadImage(imageFile, parentDivElement) {
    if (imageFile) {
      let img = document.createElement("img");
      img.className = "post";
      img.src = window.URL.createObjectURL(imageFile);
      img.onload = function() {
        window.URL.revokeObjectURL(img.src);
        parentDivElement.appendChild(img);
      }
    }
  }
}