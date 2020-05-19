var originalImage = null;
var grayImage = null;
var redImage = null;
var canvas = document.getElementById("canv");

var imageIn;
var image;
var imageorgnl = null;
var grayImage = null;
var outImage;
var pixel;
var red;
var green;
var blue;
var avgColor;

function loadImage(){
  var file=document.getElementById("fileInput");
  originalImage=new SimpleImage(file);
  grayImage=new SimpleImage(file);
  redImage=new SimpleImage(file);
  originalImage.drawTo(canvas);
}
function doGray(){
  if(loadedImage(grayImage)){
    filterGray();
    grayImage.drawTo(canvas);
  }
}
function filterGray(){
  for(var pixel of grayImage.values()){
    var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setBlue(avg);
    pixel.setGreen(avg);
  }
}

function doRed(){
  if(loadedImage(redImage)){
    filterRed();
    redImage.drawTo(canvas);
  }
}

function filterRed() {
  for (var pixel of redImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }
}
function doReset(){  
if (loadedImage(originalImage)) {
    originalImage.drawTo(canvas);
    grayImage = new SimpleImage(originalImage);
    redImage = new SimpleImage(originalImage);
  }
}

function loadedImage(img) {
  if (img == null || !img.complete()) {
    alert("Image not loaded");
    return false;
  } else {
    return true;
  }
}

function doRainbow() {
  if (checkImageLoad()) {
    drawRainbow();
    outImage.drawTo(canvas);
  } else {
    alert("Image Not Loaded");
  }
}
//Draw Rainbow
function drawRainbow() {
  outImage = new SimpleImage(originalImage);
  var rectHeight = outImage.getHeight();
  var rectSegment = parseInt(rectHeight) / 7;
  var Y;
  var X;
  for (pixel of outImage.values()) {
    X = pixel.getX();
    Y = pixel.getY();
//    outImage.setPixel(X, Y, pixel);
    avgColor = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (Y >= 6 * parseInt(rectSegment)) {
      dored();
    } else if (Y >= (5 * parseInt(rectSegment))) {
      doOrange();
    } else if (Y >= (4 * parseInt(rectSegment))) {
      doYellow();
    } else if (Y >= (3 * parseInt(rectSegment))) {
      doGreen();
    } else if (Y >= (2 * parseInt(rectSegment))) {
      doBlue();
    } else if (Y >= parseInt(rectSegment)) {
      doIndigo();
    } else {
      doViolet();
    }
  }
}

function doViolet() {
  if (avgColor < 128) {
    red = Math.round(1.6 * avgColor);
    green = 0;
    blue = Math.round(1.6 * avgColor);
  } else {
    red = Math.round(0.4 * avgColor + 153 );
    green = Math.round(2 * avgColor - 255);
    blue = Math.round(0.4 * avgColor + 153 );
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doIndigo() {
  if (avgColor < 128) {
    red = Math.round(.8 * avgColor);
    green = 0;
    blue = Math.round(2 * avgColor);
  } else {
    red = Math.round(1.2 * avgColor - 51);
    green = Math.round(2*avgColor - 255);
    blue = 255;
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doBlue() {
 if (avgColor < 128) {
    red = 0;
    green = 0;
    blue = Math.round(2*avgColor);
  } else {
    red = Math.round(2*avgColor-255);
    green =Math.round(2*avgColor-255);
    blue = 255;
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}
function doGreen() {
  if (avgColor < 128) {
    red = 0;
    green = Math.round(2*avgColor);
    blue = 0;
  } else {
    red = Math.round(2*avgColor-255);
    green = 255;
    blue = Math.round(2*avgColor-255);
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doYellow() {
  if (avgColor < 128) {
    red = Math.round(2 * avgColor);
    green = Math.round(2 * avgColor);
    blue = 0;
  } else {
    red = 255;
    green = 255;
    blue = Math.round(2 * avgColor - 255);
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doOrange() {
   if (avgColor < 128) {
    red = Math.round(2 * avgColor);
    green = Math.round(.8 * avgColor);
    blue = 0;
  } else {
    red = 255;
    green = Math.round(1.2 * avgColor - 51);
    blue =  Math.round(2 * avgColor - 255);
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function dored() {
  if (avgColor < 128) {
    red = Math.round(2*avgColor);
    green = 0;
    blue = 0;
  } else {
    red = 255;
    green = Math.round(2*avgColor-255);
    blue = Math.round(2*avgColor-255);
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}
function checkImageLoad() {
  if ((originalImage=== null) || ! originalImage.complete()) {
    return false;
  } else {
    return true;
  }
}