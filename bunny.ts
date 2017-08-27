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
}

type PaintCallback = (canvas: CanvasRenderingContext2D, options: PaintOptions) => void

/* Paint */
function paint(width: number, height: number, callback: PaintCallback, options: PaintOptions) {
    const c = getCanvas(width, height)
    c.clearRect(0, 0, width, height)

    c.save()
    callback(c, options)
    c.restore()
}

function paintBody(canvas: CanvasRenderingContext2D, options: PaintOptions) {
    canvas.translate(100, 100)

    canvas.beginPath()
    circle(canvas, 5, 84, 6)
    canvas.closePath()

    canvas.fillStyle = options.color as string
    canvas.fill()

    canvas.lineWidth = 4
    canvas.strokeStyle = options.lineColor as string
    canvas.stroke()
}

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

function paintFace(canvas: CanvasRenderingContext2D, options: PaintOptions) {
    paintEyes(canvas, 20, options)
    paintEyes(canvas, 80, options)

    canvas.beginPath()
    canvas.arc(59, 70, 10, Math.PI * 0.1, Math.PI * 0.8)
    canvas.arc(41, 70, 10, Math.PI * 0.2, Math.PI * 0.9)

    canvas.lineWidth = 4
    canvas.strokeStyle = options.lineColor as string
    canvas.stroke()
}
