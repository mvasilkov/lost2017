"use strict";
/// <reference path="game.d.ts" />
function create(className, parent) {
    var result = document.createElement('div');
    result.className = className;
    if (parent)
        parent.appendChild(result);
    return result;
}
function createGraphic(canvas, className, parent) {
    var graphic = create("graphic " + className, parent);
    graphic.style.backgroundImage = "url(" + canvas.toDataURL() + ")";
    graphic.style.height = canvas.height + "px";
    graphic.style.width = canvas.width + "px";
    return graphic;
}
var _canvasCache = {};
var _canvasTagCache = {};
function cacheCanvas(width, height) {
    var index = width * 1000 + height;
    var canvasTag = _canvasTagCache[index] =
        document.getElementById("c" + width + "x" + height);
    _canvasCache[index] = canvasTag.getContext('2d');
}
function getCanvas(width, height) {
    var index = width * 1000 + height;
    if (!_canvasCache[index])
        cacheCanvas(width, height);
    return _canvasCache[index];
}
function getCanvasTag(width, height) {
    var index = width * 1000 + height;
    if (!_canvasTagCache[index])
        cacheCanvas(width, height);
    return _canvasTagCache[index];
}
/* Paint */
function paint(width, height, callback, options) {
    var c = getCanvas(width, height);
    c.clearRect(0, 0, width, height);
    c.save();
    callback(c, options);
    c.restore();
}
function paintBody(canvas, options) {
    canvas.translate(100, 100);
    canvas.beginPath();
    circle(canvas, 5, 84, 6);
    canvas.closePath();
    canvas.fillStyle = options.color;
    canvas.fill();
    canvas.lineWidth = 4;
    canvas.strokeStyle = options.lineColor;
    canvas.stroke();
}
function paintEyes(canvas, x, options) {
    canvas.beginPath();
    canvas.arc(x, 25, 8, 0, PIPI);
    canvas.fillStyle = options.lineColor;
    canvas.fill();
    canvas.beginPath();
    canvas.arc(x - 2, 23, 2, 0, PIPI);
    canvas.fillStyle = options.glareColor;
    canvas.fill();
}
function paintFace(canvas, options) {
    paintEyes(canvas, 20, options);
    paintEyes(canvas, 80, options);
    canvas.beginPath();
    canvas.arc(59, 70, 10, Math.PI * 0.1, Math.PI * 0.8);
    canvas.arc(41, 70, 10, Math.PI * 0.2, Math.PI * 0.9);
    canvas.lineWidth = 4;
    canvas.strokeStyle = options.lineColor;
    canvas.stroke();
}
