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
function paint(callback, options) {
    var width = callback.width, height = callback.height;
    var canvas = getCanvas(width, height);
    canvas.clearRect(0, 0, width, height);
    canvas.save();
    callback(canvas, options);
    canvas.restore();
    if (callback.standardDraw) {
        canvas.closePath();
        canvas.fillStyle = options.color;
        canvas.fill();
        canvas.lineWidth = 4;
        canvas.strokeStyle = options.lineColor;
        canvas.stroke();
    }
    return getCanvasTag(width, height);
}
var paintBody = function paintBody(canvas, options) {
    canvas.translate(100, 100);
    canvas.beginPath();
    circle(canvas, 5, 84, 6);
};
paintBody.width = paintBody.height = 200;
paintBody.standardDraw = true;
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
var paintFace = function paintFace(canvas, options) {
    paintEyes(canvas, 20, options);
    paintEyes(canvas, 80, options);
    canvas.beginPath();
    canvas.arc(59, 70, 10, Math.PI * 0.1, Math.PI * 0.8);
    canvas.arc(41, 70, 10, Math.PI * 0.2, Math.PI * 0.9);
    canvas.lineWidth = 4;
    canvas.strokeStyle = options.lineColor;
    canvas.stroke();
};
paintFace.width = paintFace.height = 100;
var paintEars = function paintEars(canvas, options) {
    canvas.translate(50, 150);
    canvas.rotate(Math.PI * 0.5);
    if (options.small)
        canvas.translate(48, 0);
    canvas.beginPath();
    if (options.small)
        drop(canvas, 5, 56, 4);
    else
        drop(canvas, 5, 84, 6);
};
paintEars.width = 100;
paintEars.height = 300;
paintEars.standardDraw = true;
var paintWhiskers = function paintWhiskers(canvas, options) {
    canvas.translate(100, 200);
    if (options.mirror)
        canvas.scale(-1, 1);
    for (var n = 0; n < 4; ++n) {
        canvas.translate(-10 * n, 0);
        canvas.beginPath();
        var k = options.small ? (1.6 - Math.PI * 0.00333 * (4 - n) * (4 - n)) : 1.65;
        arc(canvas, 3, Math.PI * (1.35 + Math.PI * 0.00444 * n * n), Math.PI * k, 168 - 16 * n, 1);
        canvas.lineWidth = 2;
        canvas.strokeStyle = options.lineColor;
        canvas.stroke();
    }
};
paintWhiskers.width = 200;
paintWhiskers.height = 150;
var paintLegs = function paintLegs(canvas, options) {
    canvas.translate(50, 50);
    canvas.beginPath();
    circle(canvas, 4, 25, 2);
};
paintLegs.width = paintLegs.height = 100;
paintLegs.standardDraw = true;
