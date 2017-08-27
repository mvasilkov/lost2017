function $(id) {
    return document.getElementById(id)
}

function paintEars() {
    const small = 0

    const c = getCanvas(100, 300)
    c.clearRect(0, 0, 100, 300)

    c.save()
    c.translate(50, 150)
    c.rotate(Math.PI * 0.5)
    if (small) c.translate(48, 0)

    c.beginPath()
    if (small) drop(c, 5, 56, 4)
    else drop(c, 5, 84, 6)
    c.closePath()

    c.restore()

    c.fillStyle = '#f4ff81'
    c.fill()

    c.lineWidth = 4
    c.strokeStyle = '#303030'
    c.stroke()
}

function paintWhiskers(mirror) {
    const c = getCanvas(200, 150)
    c.clearRect(0, 0, 200, 150)

    c.save()
    c.translate(100, 200)
    if (mirror) c.scale(-1, 1)

    for (let n = 0; n < 4; ++n) {
        c.translate(-10 * n, 0)
        c.beginPath()
        arc(c, 3, Math.PI * (1.35 + Math.PI * 0.00444 * n * n), Math.PI * 1.65, 168 - 16 * n, 1)
        // --- 1.65
        // +++ (1.6 - Math.PI * 0.00333 * (4 - n) * (4 - n))

        c.lineWidth = 3
        c.strokeStyle = '#303030'
        c.stroke()
    }

    c.restore()
}

function paintLegs() {
    const c = getCanvas(100, 100)
    c.clearRect(0, 0, 100, 100)

    c.save()
    c.translate(50, 50)

    c.beginPath()
    circle(c, 4, 25, 2)
    c.closePath()

    c.restore()

    c.fillStyle = '#f4ff81'
    c.fill()

    c.lineWidth = 4
    c.strokeStyle = '#303030'
    c.stroke()
}

function makeBunny(parent) {
    const bunny = document.createElement('div')
    bunny.className = 'bunny'

    paint(200, 200, paintBody, { color: '#f4ff81', lineColor: '#303030' })
    const body = createGraphic(getCanvasTag(200, 200), 'body')
    bunny.appendChild(body)

    const ears = document.createElement('div')
    ears.className = 'ears'
    bunny.appendChild(ears)

    paintEars()
    const ear0 = createGraphic(getCanvasTag(100, 300), 'ear0')
    ears.appendChild(ear0)

    paintEars()
    const ear1 = createGraphic(getCanvasTag(100, 300), 'ear1')
    ears.appendChild(ear1)

    paintWhiskers(true)
    const whisker0 = createGraphic(getCanvasTag(200, 150), 'whisker0')
    bunny.appendChild(whisker0)

    paintWhiskers(false)
    const whisker1 = createGraphic(getCanvasTag(200, 150), 'whisker1')
    bunny.appendChild(whisker1)

    paintLegs()
    const leg0 = createGraphic(getCanvasTag(100, 100), 'leg0')
    bunny.appendChild(leg0)

    paintLegs()
    const leg1 = createGraphic(getCanvasTag(100, 100), 'leg1')
    bunny.appendChild(leg1)

    paintLegs()
    const leg2 = createGraphic(getCanvasTag(100, 100), 'leg2')
    bunny.appendChild(leg2)

    paintLegs()
    const leg3 = createGraphic(getCanvasTag(100, 100), 'leg3')
    bunny.appendChild(leg3)

    paint(100, 100, paintFace, { lineColor: '#303030', glareColor: '#fbfbfb' })
    const face = createGraphic(getCanvasTag(100, 100), 'face')
    bunny.appendChild(face)

    parent.appendChild(bunny)
}

makeBunny(document.body)
