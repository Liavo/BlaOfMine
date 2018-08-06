

// function scaleAndDraw(canvas, ctx, img, scaleFactor, x, y) {
//   let w = canvas.width * scaleFactor;
//   let h = canvas.height * scaleFactor;
//   ctx.drawImage(img, 0, 0, w, h);
//   return (canvas);
// }
let font = "21px Arial";

function drawText(ctx, textValue) {
  ctx.textAlign = 'rtl';
  ctx.fillStyle = 'white';
  ctx.font = font;
  ctx.fillText(textValue, 230, 238);
}
