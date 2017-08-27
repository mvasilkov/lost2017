"use strict";
/// <reference path="game.d.ts" />
/* Linear interpolation */
function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}
/* Fractal subdivision */
function makePoints(iterations) {
    var tail = { x: 1, y: 1, next: null };
    var head = { x: 0, y: 1, next: tail };
    var min = 1;
    var max = 1;
    for (var i = iterations; i; --i) {
        var p = head;
        while (p.next) {
            var sign = Math.random() < 0.5 ? -0.5 : 0.5;
            var a = sign * Math.random() * (p.next.x - p.x);
            p.next = {
                x: 0.5 * (p.x + p.next.x),
                y: 0.5 * (p.y + p.next.y) + a,
                next: p.next,
            };
            min = Math.min(min, p.next.y);
            max = Math.max(max, p.next.y);
            p = p.next.next;
        }
    }
    if (min == max) {
        // straight line y = 1
        for (var p = head; p; p = p.next) {
            p.y = 1;
        }
    }
    else {
        // normalize y to [0, 1]
        var k = max - min;
        for (var p = head; p; p = p.next) {
            p.y = (p.y - min) / k;
        }
    }
    return head;
}
var PIPI = Math.PI * 2;
/* Primitives */
function arc(canvas, iterations, a0, a1, r, s) {
    var p = makePoints(iterations);
    while (p) {
        var a = lerp(a0, a1, p.x);
        var b = r + p.y * s;
        canvas.lineTo(b * Math.cos(a), b * Math.sin(a));
        p = p.next;
    }
}
function circle(canvas, iterations, r, s) {
    var p = makePoints(iterations);
    var phase = PIPI * Math.random();
    while (p) {
        var a = phase + p.x * PIPI;
        var b = r + p.y * s;
        canvas.lineTo(b * Math.cos(a), b * Math.sin(a));
        p = p.next;
    }
}
function drop(canvas, iterations, r, s) {
    var p = makePoints(iterations);
    while (p) {
        var a = p.x * PIPI;
        var b = r + p.y * s;
        canvas.lineTo(b * Math.cos(a) * 1.5, b * Math.sin(a) * Math.sin(a * 0.5) * 0.5);
        p = p.next;
    }
}
