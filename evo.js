"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addFeatures(a, b) {
    if (a == 0)
        a = -0.01;
    if (b == 0)
        b = -0.01;
    return Math.floor((a + b) * 0.5 + 0.5);
}
exports.addFeatures = addFeatures;
