function $(id) {
    return document.getElementById(id)
}

const _canvas = {}

function paintBody() {
    const c = _canvas.body
    c.clearRect(0, 0, 200, 200)

    c.save()
    c.translate(100, 100)

    c.beginPath()
    circle(c, 5, 84, 6)
    c.closePath()

    c.restore()

    c.fillStyle = '#f4ff81'
    c.fill()

    c.lineWidth = 4
    c.strokeStyle = '#303030'
    c.stroke()
}

function paintEars() {
    const c = _canvas.ears
    c.clearRect(0, 0, 100, 300)

    c.save()
    c.translate(50, 150)
    c.rotate(Math.PI * 0.5)

    c.beginPath()
    drop(c, 5, 84, 6)
    c.closePath()

    c.restore()

    c.fillStyle = '#f4ff81'
    c.fill()

    c.lineWidth = 4
    c.strokeStyle = '#303030'
    c.stroke()
}

function paintWhiskers(mirror) {
    const c = _canvas.whiskers
    c.clearRect(0, 0, 200, 200)

    c.save()
    c.translate(100, 200)
    if (mirror) c.scale(-1, 1)

    for (let n = 0; n < 4; ++n) {
        c.translate(-10 * n, 0)
        c.beginPath()
        arc(c, 3, Math.PI * (1.35 + Math.PI * 0.00444 * n * n), Math.PI * 1.65, 168 - 16 * n, 2)

        c.lineWidth = 3
        c.strokeStyle = '#303030'
        c.stroke()
    }

    c.restore()
}

function paintLegs() {
    const c = _canvas.legs
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

function paintFace() {
    const c = _canvas.face
    c.clearRect(0, 0, 100, 100)

    const a = 25
    const b = 70

    c.beginPath()
    c.arc(20, a, 8, 0, Math.PI * 2)
    c.fillStyle = '#303030'
    c.fill()

    c.beginPath()
    c.arc(18, a - 2, 2, 0, Math.PI * 2)
    c.fillStyle = '#fbfbfb'
    c.fill()

    c.beginPath()
    c.arc(80, a, 8, 0, Math.PI * 2)
    c.fillStyle = '#303030'
    c.fill()

    c.beginPath()
    c.arc(78, a - 2, 2, 0, Math.PI * 2)
    c.fillStyle = '#fbfbfb'
    c.fill()

    c.beginPath()
    c.arc(60 - 1, b, 10, Math.PI * 0.1, Math.PI * 0.8)
    c.arc(40 + 1, b, 10, Math.PI * 0.2, Math.PI * 0.9)
    
    c.lineWidth = 4
    c.strokeStyle = '#303030'
    c.stroke()
}

for (let name of ['body', 'ears', 'legs', 'whiskers', 'face']) {
    const htmlCanvas = _canvas['html' + name] = $('c-' + name)
    _canvas[name] = htmlCanvas.getContext('2d')
}

function makeBunny(parent) {
    const bunny = document.createElement('div')
    bunny.className = 'bunny'

    paintBody()
    const body = createGraphic(_canvas.htmlbody, 'body')
    bunny.appendChild(body)

    const ears = document.createElement('div')
    ears.className = 'ears'
    bunny.appendChild(ears)

    paintEars()
    const ear0 = createGraphic(_canvas.htmlears, 'ear0')
    ears.appendChild(ear0)

    paintEars()
    const ear1 = createGraphic(_canvas.htmlears, 'ear1')
    ears.appendChild(ear1)

    paintWhiskers(true)
    const whisker0 = createGraphic(_canvas.htmlwhiskers, 'whisker0')
    bunny.appendChild(whisker0)

    paintWhiskers(false)
    const whisker1 = createGraphic(_canvas.htmlwhiskers, 'whisker1')
    bunny.appendChild(whisker1)

    paintLegs()
    const leg0 = createGraphic(_canvas.htmllegs, 'leg0')
    bunny.appendChild(leg0)

    paintLegs()
    const leg1 = createGraphic(_canvas.htmllegs, 'leg1')
    bunny.appendChild(leg1)

    paintLegs()
    const leg2 = createGraphic(_canvas.htmllegs, 'leg2')
    bunny.appendChild(leg2)

    paintLegs()
    const leg3 = createGraphic(_canvas.htmllegs, 'leg3')
    bunny.appendChild(leg3)

    paintFace()
    const face = createGraphic(_canvas.htmlface, 'face')
    bunny.appendChild(face)

    parent.appendChild(bunny)
}

makeBunny(document.body)
