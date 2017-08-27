/// <reference path="game.d.ts" />

/* Linear interpolation */
function lerp(a: number, b: number, t: number): number {
    return a * (1 - t) + b * t
}

interface LL {
    x: number,
    y: number,
    next: LL | null,
}

/* Fractal subdivision */
function makePoints(iterations: number): LL {
    const tail: LL = { x: 1, y: 1, next: null }
    const head: LL = { x: 0, y: 1, next: tail }
    let min = 1
    let max = 1

    for (let i = iterations; i; --i) {
        let p = head
        while (p.next) {
            const sign = Math.random() < 0.5 ? -0.5 : 0.5
            const a = sign * Math.random() * (p.next.x - p.x)

            p.next = {
                x: 0.5 * (p.x + p.next.x),
                y: 0.5 * (p.y + p.next.y) + a,
                next: p.next,
            }

            min = Math.min(min, p.next.y)
            max = Math.max(max, p.next.y)

            p = p.next.next as LL
        }
    }

    if (min == max) {
        // straight line y = 1
        for (let p = head; p; p = p.next as LL) {
            p.y = 1
        }
    }
    else {
        // normalize y to [0, 1]
        const k = max - min
        for (let p = head; p; p = p.next as LL) {
            p.y = (p.y - min) / k
        }
    }

    return head
}

const PIPI = Math.PI * 2

/* Primitives */
function arc(canvas: CanvasRenderingContext2D, iterations: number, a0: number, a1: number, r: number, s: number) {
    let p = makePoints(iterations)

    while (p) {
        const a = lerp(a0, a1, p.x)
        const b = r + p.y * s

        canvas.lineTo(b * Math.cos(a), b * Math.sin(a))

        p = p.next as LL
    }
}

function circle(canvas: CanvasRenderingContext2D, iterations: number, r: number, s: number) {
    let p = makePoints(iterations)
    const phase = PIPI * Math.random()

    while (p) {
        const a = phase + p.x * PIPI
        const b = r + p.y * s

        canvas.lineTo(b * Math.cos(a), b * Math.sin(a))

        p = p.next as LL
    }
}

function drop(canvas: CanvasRenderingContext2D, iterations: number, r: number, s: number) {
    let p = makePoints(iterations)

    while (p) {
        const a = p.x * PIPI
        const b = r + p.y * s

        canvas.lineTo(b * Math.cos(a) * 1.5, b * Math.sin(a) * Math.sin(a * 0.5) * 0.5)

        p = p.next as LL
    }
}
