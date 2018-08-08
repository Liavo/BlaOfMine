

let font = "22px Arial";

function drawText(ctx, textValue) {
  ctx.textAlign = 'rtl';
  ctx.fillStyle = 'white';
  ctx.font = font;
  ctx.fillText(textValue, 215, 238);
}
