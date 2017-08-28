function makeBunny(parent) {
    const bunny = document.createElement('div')
    bunny.className = 'bunny'

    const body = createGraphic(paint(paintBody, { color: '#f4ff81', lineColor: '#303030' }), 'body')
    bunny.appendChild(body)

    const ears = document.createElement('div')
    ears.className = 'ears'
    bunny.appendChild(ears)

    const ear0 = createGraphic(paint(paintEars, { color: '#f4ff81', lineColor: '#303030' }), 'ear0')
    ears.appendChild(ear0)

    const ear1 = createGraphic(paint(paintEars, { color: '#f4ff81', lineColor: '#303030' }), 'ear1')
    ears.appendChild(ear1)

    const whisker0 = createGraphic(paint(paintWhiskers, { lineColor: '#303030', mirror: true }), 'whisker0')
    bunny.appendChild(whisker0)

    const whisker1 = createGraphic(paint(paintWhiskers, { lineColor: '#303030', mirror: false }), 'whisker1')
    bunny.appendChild(whisker1)

    const leg0 = createGraphic(paint(paintLegs, { color: '#f4ff81', lineColor: '#303030' }), 'leg0')
    bunny.appendChild(leg0)

    const leg1 = createGraphic(paint(paintLegs, { color: '#f4ff81', lineColor: '#303030' }), 'leg1')
    bunny.appendChild(leg1)

    const leg2 = createGraphic(paint(paintLegs, { color: '#f4ff81', lineColor: '#303030' }), 'leg2')
    bunny.appendChild(leg2)

    const leg3 = createGraphic(paint(paintLegs, { color: '#f4ff81', lineColor: '#303030' }), 'leg3')
    bunny.appendChild(leg3)

    const face = createGraphic(paint(paintFace, { lineColor: '#303030', glareColor: '#fbfbfb' }), 'face')
    bunny.appendChild(face)

    parent.appendChild(bunny)
}

makeBunny(document.body)
