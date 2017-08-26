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
