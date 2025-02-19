let canvas = document.getElementById('canvas')
let c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
c.imageSmoothingEnabled = false
class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(that) {
        return new Vector2(this.x + that.x, this.y + that.y)
    }

    multiply(that) {
        return new Vector2(this.x * that, this.y * that)
    }
}
function drawRect(pos, dim, r, g, b, a) {
    c.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
    c.fillRect(pos.x, pos.y, dim.x, dim.y)
}

function drawLine(list, r, g, b, a) {
    c.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`
    c.beginPath()
    c.moveTo(list[0].x, list[0].y)
    for (let i of list) {
        c.lineTo(i.x, i.y)
    }
    c.stroke()
}

function drawPoly(list, r, g, b, a) {
    c.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`
    c.beginPath()
    c.moveTo(list[0].x, list[0].y)
    for (let i of list) {
        c.lineTo(i.x, i.y)
    }
    c.stroke()
    c.fill()
}

function drawArc(pos, rad, sa, ea, clock, r, g, b, a) {
    c.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`
    c.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
    c.beginPath()
    c.arc(pos.x, pos.y, rad, sa, ea, !clock)
    c.stroke()
    c.fill()
}

function drawImg(img, cropPos, cropDim, pos, dim) {
    c.drawImage(img, cropPos.x, cropPos.y, cropDim.x, cropDim.y, pos.x, pos.y, dim.x, dim.y)
}

function write(text, pos, r, g, b, a) {
    c.font = "20px Arial"
    c.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
    c.fillText(text, pos.x, pos.y)
}
function clear() {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
}
let spinning = false
function run() {
    clear()
    for (let i of slots) {
        if (i.rotation > 1000) {
            i.rotation -= 1000
        }
    }
    let img = [
        new Image(),
        new Image(),
        new Image()
    ]
    img[0].src = `Images/${Math.floor(slots[0].rotation/100)}.png`
    let height = Math.abs(Math.cos((slots[0].rotation-50) % 100 * Math.PI / 100)) * 500
    let ypos = (((Math.sin(((Math.PI * (slots[0].rotation % 100)) / 100) % Math.PI - (Math.PI / 2)) + 1) / 2) * 300) - height/2 + canvas.height/4
    drawImg(img[0], new Vector2(0, 0), new Vector2(50, 50), new Vector2(canvas.width/2 - 700, ypos), new Vector2(500, height))
    img[1].src = `Images/${Math.floor(slots[1].rotation/100)}.png`
    height = Math.abs(Math.cos((slots[1].rotation-50) % 100 * Math.PI / 100)) * 500
    ypos = (((Math.sin(((Math.PI * (slots[1].rotation % 100)) / 100) % Math.PI - (Math.PI / 2)) + 1) / 2) * 300) - height/2 + canvas.height/4
    drawImg(img[1], new Vector2(0, 0), new Vector2(50, 50), new Vector2(canvas.width/2 - 250, ypos), new Vector2(500, height))
    img[2].src = `Images/${Math.floor(slots[2].rotation/100)}.png`
    height = Math.abs(Math.cos((slots[2].rotation-50) % 100 * Math.PI / 100)) * 500
    ypos = (((Math.sin(((Math.PI * (slots[2].rotation % 100)) / 100) % Math.PI - (Math.PI / 2)) + 1) / 2) * 300) - height/2 + canvas.height/4
    drawImg(img[2], new Vector2(0, 0), new Vector2(50, 50), new Vector2(canvas.width/2 + 200, ypos), new Vector2(500, height))
    //draw
}
setInterval(run, 1)
function spin() {
    if (!spinning) {
        spinTick((Math.floor(Math.random()*10) * 33) + 100, 3, 0)
        spinTick((Math.floor(Math.random()*10) * 33) + 600, 3, 1)
        spinTick((Math.floor(Math.random()*10) * 33) + 1100, 3, 2)
        spinning = true
    }
}
function spinTick(t, d, n) {
    slots[n].rotation += d
    if (t > 0) {
        setTimeout(spinTick, 1, t-1, d, n)
    } else {
        value += Math.floor(slots[n].rotation/100) * (10**(2-n))
        score = facts[facts[value]]
        if (n == 2) {
            setTimeout(function() {alert(`You got ${value} for a score of ${score}\n${value} -> ${facts[value]} -> ${score}\nYou get ${score} balls to drop into the plinko!`)}, 100)
            spinning = false
        }
    }
}
class Slot {
    constructor(rotation) {
        this.rotation = rotation
    }
}
let slots = [
    new Slot(50),
    new Slot(50),
    new Slot(50)
]
//spin()
function numOfFact(n) {
    let final = 0
    for (let i = 1; i <= n; i++) {
        if (n % i == 0) {
            final++
        }
    }
    return final
}
let facts = []
for (let i = 0; i < 1000; i++) {
    facts.push(numOfFact(i))
}
let value = 0
let score = 0
document.addEventListener('click', function(event) {spin()})
