/// <reference path="game.d.ts" />

function create(className: string, parent?: HTMLElement): HTMLDivElement {
    const result = document.createElement('div')

    result.className = className
    if (parent) parent.appendChild(result)

    return result
}

function createGraphic(canvas: HTMLCanvasElement, className: string, parent?: HTMLElement): HTMLDivElement {
    const graphic = create(`graphic ${className}`, parent)

    graphic.style.backgroundImage = `url(${canvas.toDataURL()})`
    graphic.style.height = `${canvas.height}px`
    graphic.style.width = `${canvas.width}px`

    return graphic
}

const _canvasCache: { [index: string]: CanvasRenderingContext2D } = {}
const _canvasTagCache: { [index: string]: HTMLCanvasElement } = {}

function cacheCanvas(width: number, height: number) {
    const index = width * 1000 + height
    const canvasTag = _canvasTagCache[index] =
        document.getElementById(`c${width}x${height}`) as HTMLCanvasElement
    _canvasCache[index] = canvasTag.getContext('2d') as CanvasRenderingContext2D
}

function getCanvas(width: number, height: number): CanvasRenderingContext2D {
    const index = width * 1000 + height
    if (!_canvasCache[index]) cacheCanvas(width, height)
    return _canvasCache[index]
}

function getCanvasTag(width: number, height: number): HTMLCanvasElement {
    const index = width * 1000 + height
    if (!_canvasTagCache[index]) cacheCanvas(width, height)
    return _canvasTagCache[index]
}

interface PaintOptions {
    color?: string,
    lineColor?: string,
    glareColor?: string,
    small?: boolean,
    mirror?: boolean,
}

interface PaintCallback {
    (canvas: CanvasRenderingContext2D, options: PaintOptions): void

    width?: number
    height?: number
    standardDraw?: boolean
}

/* Paint */
function paint(callback: PaintCallback, options: PaintOptions) {
    const { width, height } = callback
    const canvas = getCanvas(width as number, height as number)
    canvas.clearRect(0, 0, width as number, height as number)

    canvas.save()
    callback(canvas, options)
    canvas.restore()

    if (callback.standardDraw) {
        canvas.closePath()

        canvas.fillStyle = options.color as string
        canvas.fill()

        canvas.lineWidth = 4
        canvas.strokeStyle = options.lineColor as string
        canvas.stroke()
    }

    return getCanvasTag(width as number, height as number)
}

const paintBody: PaintCallback = function paintBody(canvas: CanvasRenderingContext2D, options: PaintOptions) {
    canvas.translate(100, 100)

    canvas.beginPath()
    circle(canvas, 5, 84, 6)
}
paintBody.width = paintBody.height = 200
paintBody.standardDraw = true

function paintEyes(canvas: CanvasRenderingContext2D, x: number, options: PaintOptions) {
    canvas.beginPath()
    canvas.arc(x, 25, 8, 0, PIPI)
    canvas.fillStyle = options.lineColor as string
    canvas.fill()

    canvas.beginPath()
    canvas.arc(x - 2, 23, 2, 0, PIPI)
    canvas.fillStyle = options.glareColor as string
    canvas.fill()
}

const paintFace: PaintCallback = function paintFace(canvas: CanvasRenderingContext2D, options: PaintOptions) {
    paintEyes(canvas, 20, options)
    paintEyes(canvas, 80, options)

    canvas.beginPath()
    canvas.arc(59, 70, 10, Math.PI * 0.1, Math.PI * 0.8)
    canvas.arc(41, 70, 10, Math.PI * 0.2, Math.PI * 0.9)

    canvas.lineWidth = 4
    canvas.strokeStyle = options.lineColor as string
    canvas.stroke()
}
paintFace.width = paintFace.height = 100

const paintEars: PaintCallback = function paintEars(canvas: CanvasRenderingContext2D, options: PaintOptions) {
    canvas.translate(50, 150)
    canvas.rotate(Math.PI * 0.5)
    if (options.small) canvas.translate(48, 0)

    canvas.beginPath()
    if (options.small) drop(canvas, 5, 56, 4)
    else drop(canvas, 5, 84, 6)
}
paintEars.width = 100
paintEars.height = 300
paintEars.standardDraw = true

const paintWhiskers: PaintCallback = function paintWhiskers(canvas: CanvasRenderingContext2D, options: PaintOptions) {
    canvas.translate(100, 200)
    if (options.mirror) canvas.scale(-1, 1)

    for (let n = 0; n < 4; ++n) {
        canvas.translate(-10 * n, 0)
        canvas.beginPath()

        const k = options.small ? (1.6 - Math.PI * 0.00333 * (4 - n) * (4 - n)) : 1.65
        arc(canvas, 3, Math.PI * (1.35 + Math.PI * 0.00444 * n * n), Math.PI * k, 168 - 16 * n, 1)

        canvas.lineWidth = 2
        canvas.strokeStyle = options.lineColor as string
        canvas.stroke()
    }
}
paintWhiskers.width = 200
paintWhiskers.height = 150

const paintLegs: PaintCallback = function paintLegs(canvas: CanvasRenderingContext2D, options: PaintOptions) {
    canvas.translate(50, 50)

    canvas.beginPath()
    circle(canvas, 4, 25, 2)
}
paintLegs.width = paintLegs.height = 100
paintLegs.standardDraw = true
