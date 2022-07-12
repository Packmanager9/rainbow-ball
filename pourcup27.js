let positionx = 0
let positiony = 1
let position = 0

// if (window.DeviceOrientationEvent) {
//     alert("yes")
// } else {
//     alert("no")

// }

let squaretable = {}
for(let t = 0;t<10000000;t++){
    squaretable[`${t}`] = Math.sqrt(t)
    if(t > 999){
        t+=9
    }
}

if(window.DeviceMotionEvent){
    window.addEventListener("devicemotion", motion, false);
  }else{
    console.log("DeviceMotionEvent is not supported");
  }

  function motion(event){
    console.log("Accelerometer: "
      + event.accelerationIncludingGravity.x + ", "
      + event.accelerationIncludingGravity.y + ", "
      + event.accelerationIncludingGravity.z
    );

    positiony = event.accelerationIncludingGravity.y
    positionx = -event.accelerationIncludingGravity.x
    // let link = new Line(0,0, event.accelerationIncludingGravity.z, event.accelerationIncludingGravity.y, "red", 1)
    // position = link.angle()
    
  }


// window.addEventListener("deviceorientation", e => {
//     position = e.gamma
//     position *= 0.0174533
//     alert('hit')
// }, true);

// window.addEventListener("orientationchange", function () {
//     position = (window.orientation * 0.0174533);
// }, false);

window.addEventListener('DOMContentLoaded', (event) => {
    // const gamepadAPI = {
    //     controller: {},
    //     turbo: true,
    //     connect: function (evt) {
    //         if (navigator.getGamepads()[0] != null) {
    //             gamepadAPI.controller = navigator.getGamepads()[0]
    //             gamepadAPI.turbo = true;
    //         } else if (navigator.getGamepads()[1] != null) {
    //             gamepadAPI.controller = navigator.getGamepads()[0]
    //             gamepadAPI.turbo = true;
    //         } else if (navigator.getGamepads()[2] != null) {
    //             gamepadAPI.controller = navigator.getGamepads()[0]
    //             gamepadAPI.turbo = true;
    //         } else if (navigator.getGamepads()[3] != null) {
    //             gamepadAPI.controller = navigator.getGamepads()[0]
    //             gamepadAPI.turbo = true;
    //         }
    //         for (let i = 0; i < gamepads.length; i++) {
    //             if (gamepads[i] === null) {
    //                 continue;
    //             }
    //             if (!gamepads[i].connected) {
    //                 continue;
    //             }
    //         }
    //     },
    //     disconnect: function (evt) {
    //         gamepadAPI.turbo = false;
    //         delete gamepadAPI.controller;
    //     },
    //     update: function () {
    //         gamepadAPI.controller = navigator.getGamepads()[0]
    //         gamepadAPI.buttonsCache = [];// clear the buttons cache
    //         for (var k = 0; k < gamepadAPI.buttonsStatus.length; k++) {// move the buttons status from the previous frame to the cache
    //             gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k];
    //         }
    //         gamepadAPI.buttonsStatus = [];// clear the buttons status
    //         var c = gamepadAPI.controller || {}; // get the gamepad object
    //         var pressed = [];
    //         if (c.buttons) {
    //             for (var b = 0, t = c.buttons.length; b < t; b++) {// loop through buttons and push the pressed ones to the array
    //                 if (c.buttons[b].pressed) {
    //                     pressed.push(gamepadAPI.buttons[b]);
    //                 }
    //             }
    //         }
    //         var axes = [];
    //         if (c.axes) {
    //             for (var a = 0, x = c.axes.length; a < x; a++) {// loop through axes and push their values to the array
    //                 axes.push(c.axes[a].toFixed(2));
    //             }
    //         }
    //         gamepadAPI.axesStatus = axes;// assign received values
    //         gamepadAPI.buttonsStatus = pressed;
    //         // console.log(pressed); // return buttons for debugging purposes
    //         return pressed;
    //     },
    //     buttonPressed: function (button, hold) {
    //         var newPress = false;
    //         for (var i = 0, s = gamepadAPI.buttonsStatus.length; i < s; i++) {// loop through pressed buttons
    //             if (gamepadAPI.buttonsStatus[i] == button) {// if we found the button we're looking for...
    //                 newPress = true;// set the boolean variable to true
    //                 if (!hold) {// if we want to check the single press
    //                     for (var j = 0, p = gamepadAPI.buttonsCache.length; j < p; j++) {// loop through the cached states from the previous frame
    //                         if (gamepadAPI.buttonsCache[j] == button) { // if the button was already pressed, ignore new press
    //                             newPress = false;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //         return newPress;
    //     },
    //     buttons: [
    //         'A', 'B', 'X', 'Y', 'LB', 'RB', 'Left-Trigger', 'Right-Trigger', 'Back', 'Start', 'Axis-Left', 'Axis-Right', 'DPad-Up', 'DPad-Down', 'DPad-Left', 'DPad-Right', "Power"
    //     ],
    //     buttonsCache: [],
    //     buttonsStatus: [],
    //     axesStatus: []
    // };
    let canvas
    let canvas_context
    let keysPressed = {}
    let FLEX_engine
    let TIP_engine = {}
    let XS_engine
    let YS_engine
    class Point {
        constructor(x, y) {
            this.x = x
            this.y = y
            this.radius = 0
        }
        pointDistance(point) {
            return (new LineOP(this, point, "transparent", 0)).hypotenuse()
        }
    }
    class Line {
        constructor(x, y, x2, y2, color, width) {
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        angle() {
            return Math.atan2(this.y1 - this.y2, this.x1 - this.x2)
        }
        hypotenuse() {
            let xdif = this.x1 - this.x2
            let ydif = this.y1 - this.y2
            let hypotenuse = (xdif * xdif) + (ydif * ydif)
            if(hypotenuse < 10000000-1){
                if(hypotenuse > 1000){
                    return squaretable[`${Math.round(10*Math.round((hypotenuse*.1)))}`]
                }else{
                return squaretable[`${Math.round(hypotenuse)}`]
                }
            }else{
                return Math.sqrt(hypotenuse)
            }
        }
        draw() {
            let linewidthstorage = canvas_context.lineWidth
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = this.width
            canvas_context.beginPath()
            canvas_context.moveTo(this.x1, this.y1)
            canvas_context.lineTo(this.x2, this.y2)
            canvas_context.stroke()
            canvas_context.lineWidth = linewidthstorage
        }
    }
    class LineOP {
        constructor(object, target, color, width) {
            this.object = object
            this.target = target
            this.color = color
            this.width = width
        }
        angle() {
            return Math.atan2(this.object.y - this.target.y, this.object.x - this.target.x)
        }
        hypotenuse() {
            let xdif = this.object.x - this.target.x
            let ydif = this.object.y - this.target.y
            let hypotenuse = (xdif * xdif) + (ydif * ydif)
            if(hypotenuse < 10000000-1){
                if(hypotenuse > 1000){
                    return squaretable[`${Math.round(10*Math.round((hypotenuse*.1)))}`]
                }else{
                return squaretable[`${Math.round(hypotenuse)}`]
                }
            }else{
                return Math.sqrt(hypotenuse)
            }
        }
        squareDistance() {
            let xdif = this.object.x - this.target.x
            let ydif = this.object.y - this.target.y
            let hypotenuse = (xdif * xdif) + (ydif * ydif)
            return (hypotenuse)
        }
        draw() {
            let linewidthstorage = canvas_context.lineWidth
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = this.width
            canvas_context.beginPath()
            canvas_context.moveTo(this.object.x, this.object.y)
            canvas_context.lineTo(this.target.x, this.target.y)
            canvas_context.stroke()
            canvas_context.lineWidth = linewidthstorage
        }
    }
    class Triangle {
        constructor(x, y, color, length, fill = 0, strokeWidth = 0, leg1Ratio = 1, leg2Ratio = 1, heightRatio = 1) {
            this.x = x
            this.y = y
            this.color = color
            this.length = length
            this.x1 = this.x + this.length * leg1Ratio
            this.x2 = this.x - this.length * leg2Ratio
            this.tip = this.y - this.length * heightRatio
            this.accept1 = (this.y - this.tip) / (this.x1 - this.x)
            this.accept2 = (this.y - this.tip) / (this.x2 - this.x)
            this.fill = fill
            this.stroke = strokeWidth
        }
        draw() {
            canvas_context.strokeStyle = this.color
            canvas_context.stokeWidth = this.stroke
            canvas_context.beginPath()
            canvas_context.moveTo(this.x, this.y)
            canvas_context.lineTo(this.x1, this.y)
            canvas_context.lineTo(this.x, this.tip)
            canvas_context.lineTo(this.x2, this.y)
            canvas_context.lineTo(this.x, this.y)
            if (this.fill == 1) {
                canvas_context.fill()
            }
            canvas_context.stroke()
            canvas_context.closePath()
        }
        isPointInside(point) {
            if (point.x <= this.x1) {
                if (point.y >= this.tip) {
                    if (point.y <= this.y) {
                        if (point.x >= this.x2) {
                            this.accept1 = (this.y - this.tip) / (this.x1 - this.x)
                            this.accept2 = (this.y - this.tip) / (this.x2 - this.x)
                            this.basey = point.y - this.tip
                            this.basex = point.x - this.x
                            if (this.basex == 0) {
                                return true
                            }
                            this.slope = this.basey / this.basex
                            if (this.slope >= this.accept1) {
                                return true
                            } else if (this.slope <= this.accept2) {
                                return true
                            }
                        }
                    }
                }
            }
            return false
        }
    }
    class Rectangle {
        constructor(x, y, width, height, color, fill = 1, stroke = 0, strokeWidth = 1) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
            this.stroke = stroke
            this.strokeWidth = strokeWidth
            this.fill = fill
        }
        draw() {
            canvas_context.fillStyle = this.color
            canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move() {
            this.x += this.xmom
            this.y += this.ymom
        }
        isPointInside(point) {
            if (point.x >= this.x) {
                if (point.y >= this.y) {
                    if (point.x <= this.x + this.width) {
                        if (point.y <= this.y + this.height) {
                            return true
                        }
                    }
                }
            }
            return false
        }
        doesPerimeterTouch(point) {
            if (point.x + point.radius >= this.x) {
                if (point.y + point.radius >= this.y) {
                    if (point.x - point.radius <= this.x + this.width) {
                        if (point.y - point.radius <= this.y + this.height) {
                            return true
                        }
                    }
                }
            }
            return false
        }
    }
    class Circle {
        constructor(x, y, radius, color, xmom = 0, ymom = 0, friction = 1, reflect = 0, strokeWidth = 0, strokeColor = "transparent") {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.friction = friction
            this.reflect = reflect
            this.strokeWidth = strokeWidth
            this.strokeColor = strokeColor
            this.xrepel = 0
            this.yrepel = 0
            this.symom = 0
            this.sxmom = 0
        }
        repel() {
            this.x += this.xrepel
            this.y += this.yrepel
            this.xrepel = 0
            this.yrepel = 0
        }
        smove() {
            this.x += this.sxmom
            this.y += this.symom
            this.sxmom = 0
            this.symom = 0
        }
        draw() {
            canvas_context.lineWidth = this.strokeWidth
            canvas_context.strokeStyle = this.color
            canvas_context.beginPath();
            if (this.radius > 0) {
                canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true)
                canvas_context.fillStyle = this.color
                canvas_context.fill()
                canvas_context.stroke();
            } else {
                console.log("The circle is below a radius of 0, and has not been drawn. The circle is:", this)
            }
        }
        move() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
        }
        unmove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x -= this.xmom
            this.y -= this.ymom
        }
        frictiveMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
            this.xmom *= this.friction
            this.ymom *= this.friction
        }
        frictiveunMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.xmom /= this.friction
            this.ymom /= this.friction
            this.x -= this.xmom
            this.y -= this.ymom
        }
        isPointInside(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.radius * this.radius)) {
                return true
            }
            return false
        }
        doesPerimeterTouch(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= ((this.radius + point.radius) * (this.radius + point.radius))) {
                return true
            }
            return false
        }
    } class Polygon {
        constructor(x, y, size, color, sides = 3, xmom = 0, ymom = 0, angle = 0, reflect = 0) {
            if (sides < 2) {
                sides = 2
            }
            this.reflect = reflect
            this.xmom = xmom
            this.ymom = ymom
            this.body = new Circle(x, y, size - (size * .293), "transparent")
            this.nodes = []
            this.angle = angle
            this.size = size
            this.color = color
            this.angleIncrement = (Math.PI * 2) / sides
            this.sides = sides
            for (let t = 0; t < sides; t++) {
                let node = new Circle(this.body.x + (this.size * (Math.cos(this.angle))), this.body.y + (this.size * (Math.sin(this.angle))), 0, "transparent")
                this.nodes.push(node)
                this.angle += this.angleIncrement
            }
        }
        isPointInside(point) { // rough approximation
            this.body.radius = this.size - (this.size * .293)
            if (this.sides <= 2) {
                return false
            }
            this.areaY = point.y - this.body.y
            this.areaX = point.x - this.body.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.body.radius * this.body.radius)) {
                return true
            }
            return false
        }
        move() {
            if (this.reflect == 1) {
                if (this.body.x > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.body.y > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.body.x < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.body.y < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.body.x += this.xmom
            this.body.y += this.ymom
        }
        draw() {
            this.nodes = []
            this.angleIncrement = (Math.PI * 2) / this.sides
            this.body.radius = this.size - (this.size * .293)
            for (let t = 0; t < this.sides; t++) {
                let node = new Circle(this.body.x + (this.size * (Math.cos(this.angle))), this.body.y + (this.size * (Math.sin(this.angle))), 0, "transparent")
                this.nodes.push(node)
                this.angle += this.angleIncrement
            }
            canvas_context.strokeStyle = this.color
            canvas_context.fillStyle = this.color
            canvas_context.lineWidth = 0
            canvas_context.beginPath()
            canvas_context.moveTo(this.nodes[0].x, this.nodes[0].y)
            for (let t = 1; t < this.nodes.length; t++) {
                canvas_context.lineTo(this.nodes[t].x, this.nodes[t].y)
            }
            canvas_context.lineTo(this.nodes[0].x, this.nodes[0].y)
            canvas_context.fill()
            canvas_context.stroke()
            canvas_context.closePath()
        }
    }
    class Shape {
        constructor(shapes) {
            this.shapes = shapes
        }
        isPointInside(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].isPointInside(point)) {
                    return true
                }
            }
            return false
        }
        doesPerimeterTouch(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].doesPerimeterTouch(point)) {
                    return true
                }
            }
            return false
        }
        isInsideOf(box) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (box.isPointInside(this.shapes[t])) {
                    return true
                }
            }
            return false
        }
        push(object) {
            this.shapes.push(object)
        }
    }
    class Spring {
        constructor(x, y, radius, color, body = 0, length = 1, gravity = 0, width = 1) {
            if (body == 0) {
                this.body = new Circle(x, y, radius, color)
                this.anchor = new Circle(x, y, radius, color)
                this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", width)
                this.length = length
            } else {
                this.body = body
                this.anchor = new Circle(x, y, radius, color)
                this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", width)
                this.length = length
            }
            this.gravity = gravity
            this.width = width
        }
        balance() {
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", this.width)
            if (this.beam.hypotenuse() < this.length) {
                this.body.xmom += (this.body.x - this.anchor.x) / this.length
                this.body.ymom += (this.body.y - this.anchor.y) / this.length
                this.anchor.xmom -= (this.body.x - this.anchor.x) / this.length
                this.anchor.ymom -= (this.body.y - this.anchor.y) / this.length
            } else {
                this.body.xmom -= (this.body.x - this.anchor.x) / this.length
                this.body.ymom -= (this.body.y - this.anchor.y) / this.length
                this.anchor.xmom += (this.body.x - this.anchor.x) / this.length
                this.anchor.ymom += (this.body.y - this.anchor.y) / this.length
            }
            let xmomentumaverage = (this.body.xmom + this.anchor.xmom) / 2
            let ymomentumaverage = (this.body.ymom + this.anchor.ymom) / 2
            this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
            this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
            this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
            this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2
        }
        draw() {
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", this.width)
            this.beam.draw()
            this.body.draw()
            this.anchor.draw()
        }
        move() {
            this.anchor.ymom += this.gravity
            this.anchor.move()
        }

    }
    class Color {
        constructor(baseColor, red = -1, green = -1, blue = -1, alpha = 1) {
            this.hue = baseColor
            if (red != -1 && green != -1 && blue != -1) {
                this.r = red
                this.g = green
                this.b = blue
                if (alpha != 1) {
                    if (alpha < 1) {
                        this.alpha = alpha
                    } else {
                        this.alpha = alpha / 255
                        if (this.alpha > 1) {
                            this.alpha = 1
                        }
                    }
                }
                if (this.r > 255) {
                    this.r = 255
                }
                if (this.g > 255) {
                    this.g = 255
                }
                if (this.b > 255) {
                    this.b = 255
                }
                if (this.r < 0) {
                    this.r = 0
                }
                if (this.g < 0) {
                    this.g = 0
                }
                if (this.b < 0) {
                    this.b = 0
                }
            } else {
                this.r = 0
                this.g = 0
                this.b = 0
            }
        }
        normalize() {
            if (this.r > 255) {
                this.r = 255
            }
            if (this.g > 255) {
                this.g = 255
            }
            if (this.b > 255) {
                this.b = 255
            }
            if (this.r < 0) {
                this.r = 0
            }
            if (this.g < 0) {
                this.g = 0
            }
            if (this.b < 0) {
                this.b = 0
            }
        }
        randomLight() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 12) + 4)];
            }
            var color = new Color(hash, 55 + Math.random() * 200, 55 + Math.random() * 200, 55 + Math.random() * 200)
            return color;
        }
        randomDark() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 12))];
            }
            var color = new Color(hash, Math.random() * 200, Math.random() * 200, Math.random() * 200)
            return color;
        }
        random() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 16))];
            }
            var color = new Color(hash, Math.random() * 255, Math.random() * 255, Math.random() * 255)
            return color;
        }
    }
    class Softbody { //buggy, spins in place
        constructor(x, y, radius, color, members = 10, memberLength = 5, force = 10, gravity = 0) {
            this.springs = []
            this.pin = new Circle(x, y, radius, color)
            this.spring = new Spring(x, y, radius, color, this.pin, memberLength, gravity)
            this.springs.push(this.spring)
            for (let k = 0; k < members; k++) {
                this.spring = new Spring(x, y, radius, color, this.spring.anchor, memberLength, gravity)
                if (k < members - 1) {
                    this.springs.push(this.spring)
                } else {
                    this.spring.anchor = this.pin
                    this.springs.push(this.spring)
                }
            }
            this.forceConstant = force
            this.centroid = new Point(0, 0)
        }
        circularize() {
            this.xpoint = 0
            this.ypoint = 0
            for (let s = 0; s < this.springs.length; s++) {
                this.xpoint += (this.springs[s].anchor.x / this.springs.length)
                this.ypoint += (this.springs[s].anchor.y / this.springs.length)
            }
            this.centroid.x = this.xpoint
            this.centroid.y = this.ypoint
            this.angle = 0
            this.angleIncrement = (Math.PI * 2) / this.springs.length
            for (let t = 0; t < this.springs.length; t++) {
                this.springs[t].body.x = this.centroid.x + (Math.cos(this.angle) * this.forceConstant)
                this.springs[t].body.y = this.centroid.y + (Math.sin(this.angle) * this.forceConstant)
                this.angle += this.angleIncrement
            }
        }
        balance() {
            for (let s = this.springs.length - 1; s >= 0; s--) {
                this.springs[s].balance()
            }
            this.xpoint = 0
            this.ypoint = 0
            for (let s = 0; s < this.springs.length; s++) {
                this.xpoint += (this.springs[s].anchor.x / this.springs.length)
                this.ypoint += (this.springs[s].anchor.y / this.springs.length)
            }
            this.centroid.x = this.xpoint
            this.centroid.y = this.ypoint
            for (let s = 0; s < this.springs.length; s++) {
                this.link = new Line(this.centroid.x, this.centroid.y, this.springs[s].anchor.x, this.springs[s].anchor.y, 0, "transparent")
                if (this.link.hypotenuse() != 0) {
                    this.springs[s].anchor.xmom += (((this.springs[s].anchor.x - this.centroid.x) / (this.link.hypotenuse()))) * this.forceConstant
                    this.springs[s].anchor.ymom += (((this.springs[s].anchor.y - this.centroid.y) / (this.link.hypotenuse()))) * this.forceConstant
                }
            }
            for (let s = 0; s < this.springs.length; s++) {
                this.springs[s].move()
            }
            for (let s = 0; s < this.springs.length; s++) {
                this.springs[s].draw()
            }
        }
    }
    class Observer {
        constructor(x, y, radius, color, range = 100, rays = 10, angle = (Math.PI * .125)) {
            this.body = new Circle(x, y, radius, color)
            this.color = color
            this.ray = []
            this.rayrange = range
            this.globalangle = Math.PI
            this.gapangle = angle
            this.currentangle = 0
            this.obstacles = []
            this.raymake = rays
        }
        beam() {
            this.currentangle = this.gapangle / 2
            for (let k = 0; k < this.raymake; k++) {
                this.currentangle += (this.gapangle / Math.ceil(this.raymake / 2))
                let ray = new Circle(this.body.x, this.body.y, 1, "white", (((Math.cos(this.globalangle + this.currentangle)))), (((Math.sin(this.globalangle + this.currentangle)))))
                ray.collided = 0
                ray.lifespan = this.rayrange - 1
                this.ray.push(ray)
            }
            for (let f = 0; f < this.rayrange; f++) {
                for (let t = 0; t < this.ray.length; t++) {
                    if (this.ray[t].collided < 1) {
                        this.ray[t].move()
                        for (let q = 0; q < this.obstacles.length; q++) {
                            if (this.obstacles[q].isPointInside(this.ray[t])) {
                                this.ray[t].collided = 1
                            }
                        }
                    }
                }
            }
        }
        draw() {
            this.beam()
            this.body.draw()
            canvas_context.lineWidth = 1
            canvas_context.fillStyle = this.color
            canvas_context.strokeStyle = this.color
            canvas_context.beginPath()
            canvas_context.moveTo(this.body.x, this.body.y)
            for (let y = 0; y < this.ray.length; y++) {
                canvas_context.lineTo(this.ray[y].x, this.ray[y].y)
                canvas_context.lineTo(this.body.x, this.body.y)
            }
            canvas_context.stroke()
            canvas_context.fill()
            this.ray = []
        }
    }
    function setUp(canvas_pass, style = "#000000") {
        canvas = canvas_pass
        canvas_context = canvas.getContext('2d');
        canvas.style.background = style
        window.setInterval(function () {
            main()
        }, 17)
        document.addEventListener('keydown', (event) => {
            keysPressed[event.key] = true;
        });
        document.addEventListener('keyup', (event) => {
            delete keysPressed[event.key];
        });




        window.addEventListener('pointerdown', e => {
            FLEX_engine = canvas.getBoundingClientRect();
            XS_engine = e.clientX - FLEX_engine.left;
            YS_engine = e.clientY - FLEX_engine.top;
            TIP_engine.x = XS_engine
            TIP_engine.y = YS_engine
            TIP_engine.body = TIP_engine
            // example usage: if(object.isPointInside(TIP_engine)){ take action }
            window.addEventListener('pointermove', continued_stimuli);
        });
        window.addEventListener('pointerup', e => {
            window.removeEventListener("pointermove", continued_stimuli);
        })
        function continued_stimuli(e) {
            FLEX_engine = canvas.getBoundingClientRect();
            XS_engine = e.clientX - FLEX_engine.left;
            YS_engine = e.clientY - FLEX_engine.top;
            TIP_engine.x = XS_engine
            TIP_engine.y = YS_engine
            TIP_engine.body = TIP_engine
        }
    }
    function gamepad_control(object, speed = 1) { // basic control for objects using the controler
        // console.log(gamepadAPI.axesStatus[1]*gamepadAPI.axesStatus[0])
        if (typeof object.body != 'undefined') {
            if (typeof (gamepadAPI.axesStatus[1]) != 'undefined') {
                if (typeof (gamepadAPI.axesStatus[0]) != 'undefined') {
                    object.body.x += (gamepadAPI.axesStatus[0] * speed)
                    object.body.y += (gamepadAPI.axesStatus[1] * speed)
                    position = (new Line((gamepadAPI.axesStatus[0] * speed), (gamepadAPI.axesStatus[1] * speed), 0, 0)).angle()
                }
            }
        } else if (typeof object != 'undefined') {
            if (typeof (gamepadAPI.axesStatus[1]) != 'undefined') {
                if (typeof (gamepadAPI.axesStatus[0]) != 'undefined') {
                    object.x += (gamepadAPI.axesStatus[0] * speed)
                    object.y += (gamepadAPI.axesStatus[1] * speed)
                    position = (new Line((gamepadAPI.axesStatus[1] * 10), (gamepadAPI.axesStatus[0] * 10), 0, 0)).angle()
                }
            }
        }
        // console.log(position)
    }
    function control(object, speed = 1) { // basic control for objects
        if (typeof object.body != 'undefined') {
            if (keysPressed['w']) {
                object.body.y -= speed
            }
            if (keysPressed['d']) {
                object.body.x += speed
            }
            if (keysPressed['s']) {
                object.body.y += speed
            }
            if (keysPressed['a']) {
                object.body.x -= speed
            }
        } else if (typeof object != 'undefined') {
            if (keysPressed['w']) {
                object.y -= speed
            }
            if (keysPressed['d']) {
                object.x += speed
            }
            if (keysPressed['s']) {
                object.y += speed
            }
            if (keysPressed['a']) {
                object.x -= speed
            }
        }
    }
    function getRandomLightColor() { // random color that will be visible on  black background
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 12) + 4)];
        }
        return color;
    }
    function getRandomColor() { // random color
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 16) + 0)];
        }
        return color;
    }
    function getRandomDarkColor() {// color that will be visible on a black background
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 12))];
        }
        return color;
    }
    function castBetween(from, to, granularity = 10, radius = 1) { //creates a sort of beam hitbox between two points, with a granularity (number of members over distance), with a radius defined as well
        let limit = granularity
        let shape_array = []
        for (let t = 0; t < limit; t++) {
            let circ = new Circle((from.x * (t / limit)) + (to.x * ((limit - t) / limit)), (from.y * (t / limit)) + (to.y * ((limit - t) / limit)), radius, "red")
            shape_array.push(circ)
            // circ.draw()
        }
        return (new Shape(shape_array))
    }

    let setup_canvas = document.getElementById('canvas') //getting canvas from document
    let cohesive = document.getElementById('cohesive') 
    let lengthslider =  document.getElementById('length') 
    let gravity = document.getElementById('gravity') 
    let mode = document.getElementById('mode') 
    let colorrate = document.getElementById('colorrate') 
    let drops =  document.getElementById('drops') 
    let sizes = document.getElementById('size') 
    let speedtrap = document.getElementById('speedtrap') 
    let linklength = document.getElementById('linklength') 
    let resetbutton = document.getElementById('reset') 
    let pausebutton = document.getElementById('pause') 
    resetbutton.onclick = resetter
    pausebutton.onclick = pauser

    function resetter(){
        cup = new Cup()
    }
    let pause = -1
    function pauser(){
        pause*=-1
    }
    setUp(setup_canvas) // setting up canvas refrences, starting timer. 

    // object instantiation and creation happens here 




    class SpringOP {
        constructor(body, anchor, length, color) {
            this.body = body
            this.anchor = anchor
            this.beam = new LineOP(body, anchor, color, body.radius*2)
            this.length = length
            this.gravity = 0
        }
        balance() {
            this.length = lengthslider.value
            this.sqr = this.beam.squareDistance()
            if (this.beam.hypotenuse() < this.length) {
                this.body.xmom += ((this.body.x - this.anchor.x) / this.length) * 10
                this.body.ymom += ((this.body.y - this.anchor.y) / this.length) * 10
                this.anchor.xmom -= ((this.body.x - this.anchor.x) / this.length) * 10
                this.anchor.ymom -= ((this.body.y - this.anchor.y) / this.length) * 10
            } else if (this.beam.hypotenuse() > this.length) {
                this.body.xmom -= (this.body.x - this.anchor.x) / (this.length / 2)
                this.body.ymom -= (this.body.y - this.anchor.y) / (this.length / 2)
                this.anchor.xmom += (this.body.x - this.anchor.x) / (this.length / 2)
                this.anchor.ymom += (this.body.y - this.anchor.y) / (this.length / 2)
            }

            let xmomentumaverage = (this.body.xmom + this.anchor.xmom) / 2
            let ymomentumaverage = (this.body.ymom + this.anchor.ymom) / 2
            this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
            this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
            this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
            this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2

            // this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
            // this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
            // this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
            // this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2
            // this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
            // this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
            // this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
            // this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2
            // this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
            // this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
            // this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
            // this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2
            // this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
            // this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
            // this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
            // this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2

            if(mode.value == 1){
            let dropoff = .001

            // let rate = 10
            let rate = Math.max(.5,(100-((Math.abs(this.anchor.xmom) + Math.abs(this.anchor.ymom) + Math.abs(this.body.xmom) + Math.abs(this.body.ymom))*8)))
            if(((Math.abs(this.anchor.xmom) + Math.abs(this.anchor.ymom) + Math.abs(this.body.xmom) + Math.abs(this.body.ymom))*.8) < 5){
                rate = 1000
            }

            dropoff = (Math.max(1,  Math.min((((Math.abs(this.anchor.xmom) + Math.abs(this.anchor.ymom) + Math.abs(this.body.xmom) + Math.abs(this.body.ymom))))  * (((Math.abs(this.anchor.xmom) + Math.abs(this.anchor.ymom) + Math.abs(this.body.xmom) + Math.abs(this.body.ymom))))  * (((Math.abs(this.anchor.xmom) + Math.abs(this.anchor.ymom) + Math.abs(this.body.xmom) + Math.abs(this.body.ymom))))  * 1.1 , 20) ))/101
            if(((Math.abs(this.anchor.xmom) + Math.abs(this.anchor.ymom) + Math.abs(this.body.xmom) + Math.abs(this.body.ymom))*.8) < 25){
                dropoff = 0
            }

            if(this.body.y <= this.anchor.y ){
                let rk = ((this.anchor.ref.r*(rate))+(this.body.ref.r))/(rate+1)
                let rt = ((this.body.ref.r*(rate))+(this.anchor.ref.r))/(rate+1)
                this.anchor.ref.r = rk
                this.body.ref.r = rt
                let j = 0 
                let boke = rk+(rt*dropoff)
                let soke = rt*(1-dropoff)
                rk = boke
                rt = soke
                while(rt+rk < (this.body.ref.r+this.anchor.ref.r)-1){
                    j++
                    if(j > 1000){
                        break
                    }
                    rt*=1.001
                    rk*=1.001
                }
                j = 0
                while(rt+rk > (this.body.ref.r+this.anchor.ref.r)+1){
                    j++
                    if(j > 1000000){
                        break
                    }
                    rt*=.995
                    rk*=.995
                }
                // inves
                // this.anchor.ref.r = rk
                // this.body.ref.r = rt
            }else{


                let rt = ((this.anchor.ref.r*(rate))+(this.body.ref.r))/(rate+1)
                let rk = ((this.body.ref.r*(rate))+(this.anchor.ref.r))/(rate+1)
                // let rt =  ((this.body.ref.r*(rate))+(this.anchor.ref.r))/(rate+1)
                // let rk = ((this.anchor.ref.r*(rate))+(this.body.ref.r))/(rate+1)
                let j = 0 
                let boke = rk+(rt*dropoff)
                let soke = rt*(1-dropoff)
                rk = boke
                rt = soke
                // console.log(rt+rk , (this.body.ref.r+this.anchor.ref.r))
                while(rt+rk < (this.body.ref.r+this.anchor.ref.r)-1){
                    j++
                    if(j > 1000){
                        break
                    }
                    rt*=1.001
                    rk*=1.001
                }
                j = 0
                
                // console.log(rt+rk , (this.body.ref.r+this.anchor.ref.r))
                while(rt+rk > (this.body.ref.r+this.anchor.ref.r)+1){
                    j++
                    if(j > 10000000){
                        break
                    }
                    rt*=.995
                    rk*=.995
                }

                this.body.ref.r = rt
                this.anchor.ref.r = rk
            }
            

            //green

            if(this.body.y > this.anchor.y ){
                let rk = ((this.anchor.ref.g*(rate))+(this.body.ref.g))/(rate+1)
                let rt = ((this.body.ref.g*(rate))+(this.anchor.ref.g))/(rate+1)
                this.anchor.ref.g = rk
                this.body.ref.g = rt
                let j = 0 
                let boke = rk+(rt*dropoff)
                let soke = rt*(1-dropoff)
                rk = boke
                rt = soke
                while(rt+rk < (this.body.ref.g+this.anchor.ref.g)-1){
                    j++
                    if(j > 1000){
                        break
                    }
                    rt*=1.001
                    rk*=1.001
                }
                j = 0
                while(rt+rk > (this.body.ref.g+this.anchor.ref.g)+1){
                    j++
                    if(j > 1000000){
                        break
                    }
                    rt*=.995
                    rk*=.995
                }
                // inves
                // this.anchor.ref.g = rk
                // this.body.ref.g = rt
            }else{


                let rt = ((this.anchor.ref.g*(rate))+(this.body.ref.g))/(rate+1)
                let rk = ((this.body.ref.g*(rate))+(this.anchor.ref.g))/(rate+1)
                // let rt =  ((this.body.ref.g*(rate))+(this.anchor.ref.g))/(rate+1)
                // let rk = ((this.anchor.ref.g*(rate))+(this.body.ref.g))/(rate+1)
                let j = 0 
                let boke = rk+(rt*dropoff)
                let soke = rt*(1-dropoff)
                rk = boke
                rt = soke
                // console.log(rt+rk , (this.body.ref.g+this.anchor.ref.g))
                while(rt+rk < (this.body.ref.g+this.anchor.ref.g)-1){
                    j++
                    if(j > 1000){
                        break
                    }
                    rt*=1.001
                    rk*=1.001
                }
                j = 0
                
                // console.log(rt+rk , (this.body.ref.g+this.anchor.ref.g))
                while(rt+rk > (this.body.ref.g+this.anchor.ref.g)+1){
                    j++
                    if(j > 10000000){
                        break
                    }
                    rt*=.995
                    rk*=.995
                }

                this.body.ref.g = rt
                this.anchor.ref.g = rk
            }


            // if(this.body.y >= this.anchor.y ){
            //     let rk = ((this.anchor.ref.g*(rate))+(this.body.ref.g))/(rate+1)
            //     let rt = ((this.body.ref.g*(rate))+(this.anchor.ref.g))/(rate+1)
            //     // this.anchor.ref.r = rk
            //     // this.body.ref.r = rt
            //     let j = 0 
            //     let boke = rk+(rt*dropoff)
            //     let soke = rt*(1-dropoff)
            //     rk = boke
            //     rt = soke
            //     while(rt+rk < (this.body.ref.g+this.anchor.ref.g)-1){
            //         j++
            //         if(j > 1000){
            //             break
            //         }
            //         rt*=1.001
            //         rk*=1.001
            //     }
            //     j = 0
            //     while(rt+rk > (this.body.ref.g+this.anchor.ref.g)+1){
            //         j++
            //         if(j > 1000000){
            //             break
            //         }
            //         rt*=.995
            //         rk*=.995
            //     }
            //     // inves
            //     this.anchor.ref.g = rk
            //     this.body.ref.g = rt
            // }else{


            //     let rt = ((this.anchor.ref.g*(rate))+(this.body.ref.g))/(rate+1)
            //     let rk = ((this.body.ref.g*(rate))+(this.anchor.ref.g))/(rate+1)
            //     // let rt =  ((this.body.ref.r*(rate))+(this.anchor.ref.r))/(rate+1)
            //     // let rk = ((this.anchor.ref.r*(rate))+(this.body.ref.r))/(rate+1)
            //     let j = 0 
            //     let boke = rk+(rt*dropoff)
            //     let soke = rt*(1-dropoff)
            //     rk = boke
            //     rt = soke
            //     // console.log(rt+rk , (this.body.ref.r+this.anchor.ref.r))
            //     while(rt+rk < (this.body.ref.g+this.anchor.ref.g)-1){
            //         j++
            //         if(j > 1000){
            //             break
            //         }
            //         rt*=1.001
            //         rk*=1.001
            //     }
            //     j = 0
                
            //     // console.log(rt+rk , (this.body.ref.r+this.anchor.ref.r))
            //     while(rt+rk > (this.body.ref.g+this.anchor.ref.g)+1){
            //         j++
            //         if(j > 10000000){
            //             break
            //         }
            //         rt*=.995
            //         rk*=.995
            //     }

            //     this.body.ref.g = rt
            //     this.anchor.ref.g = rk
            // }
            //endgr
            // if(this.body.y >= this.anchor.y ){
            //     let rk = ((this.anchor.ref.g*rate)+(this.body.ref.g))/rate
            //     let rt = ((this.body.ref.g*(rate-1))+(this.anchor.ref.g))/(rate+1)
            //     this.anchor.ref.g = rk
            //     this.body.ref.g = rt
            // }else{
            //     let rt =  ((this.body.ref.g*rate)+(this.anchor.ref.g))/rate
            //     let rk = ((this.anchor.ref.g*(rate-1))+(this.body.ref.g))/(rate+1)
            //     this.body.ref.g = rt
            //     this.anchor.ref.g = rk
            // }
            

            

                
            // if(this.body.ref.body.y > this.anchor.ref.body.y ){
            //     let rk = ((this.anchor.ref.g*99)+(this.body.ref.g))/99
            //     let rt = ((this.body.ref.g*98)+(this.anchor.ref.g))/100
            //     this.anchor.ref.g = rk
            //     this.body.ref.g = rt
            // }else{
            //     let rt =  ((this.body.ref.g*99)+(this.anchor.ref.g))/99
            //     let rk = ((this.anchor.ref.g*98)+(this.body.ref.g))/100
            //     this.body.ref.g = rt
            //     this.anchor.ref.g = rk
            // }

            //blue

            if(this.body.x < this.anchor.x ){
                let rk = ((this.anchor.ref.b*(rate))+(this.body.ref.b))/(rate+1)
                let rt = ((this.body.ref.b*(rate))+(this.anchor.ref.b))/(rate+1)
                this.anchor.ref.b = rk
                this.body.ref.b = rt
                let j = 0 
                let boke = rk+(rt*dropoff)
                let soke = rt*(1-dropoff)
                rk = boke
                rt = soke
                while(rt+rk < (this.body.ref.b+this.anchor.ref.b)-1){
                    j++
                    if(j > 1000){
                        break
                    }
                    rt*=1.001
                    rk*=1.001
                }
                j = 0
                while(rt+rk > (this.body.ref.b+this.anchor.ref.b)+1){
                    j++
                    if(j > 1000000){
                        break
                    }
                    rt*=.995
                    rk*=.995
                }
                // inves
                // this.anchor.ref.b = rk
                // this.body.ref.b = rt
            }else{


                let rt = ((this.anchor.ref.b*(rate))+(this.body.ref.b))/(rate+1)
                let rk = ((this.body.ref.b*(rate))+(this.anchor.ref.b))/(rate+1)
                // let rt =  ((this.body.ref.b*(rate))+(this.anchor.ref.b))/(rate+1)
                // let rk = ((this.anchor.ref.b*(rate))+(this.body.ref.b))/(rate+1)
                let j = 0 
                let boke = rk+(rt*dropoff)
                let soke = rt*(1-dropoff)
                rk = boke
                rt = soke
                // console.log(rt+rk , (this.body.ref.b+this.anchor.ref.b))
                while(rt+rk < (this.body.ref.b+this.anchor.ref.b)-1){
                    j++
                    if(j > 1000){
                        break
                    }
                    rt*=1.001
                    rk*=1.001
                }
                j = 0
                
                // console.log(rt+rk , (this.body.ref.b+this.anchor.ref.b))
                while(rt+rk > (this.body.ref.b+this.anchor.ref.b)+1){
                    j++
                    if(j > 10000000){
                        break
                    }
                    rt*=.995
                    rk*=.995
                }

                this.body.ref.b = rt
                this.anchor.ref.b = rk
            }
        }
        }
        // balance() {

        //     this.sqr = this.beam.squareDistance()
        //     if (this.sqr < (this.length * this.length)) {
        //         this.body.xmom += ((this.body.x - this.anchor.x) / this.length) * 6.1
        //         this.body.ymom += ((this.body.y - this.anchor.y) / this.length) * 6.1
        //         this.anchor.xmom -= ((this.body.x - this.anchor.x) / this.length) * 6.1
        //         this.anchor.ymom -= ((this.body.y - this.anchor.y) / this.length) * 6.1
        //     } else if (this.sqr > (this.length * this.length)) {
        //         this.body.xmom -= (this.body.x - this.anchor.x) / (this.length / 2)
        //         this.body.ymom -= (this.body.y - this.anchor.y) / (this.length / 2)
        //         this.anchor.xmom += (this.body.x - this.anchor.x) / (this.length / 2)
        //         this.anchor.ymom += (this.body.y - this.anchor.y) / (this.length / 2)
        //     }

        //     let xmomentumaverage = (this.body.xmom + this.anchor.xmom) / 2
        //     let ymomentumaverage = (this.body.ymom + this.anchor.ymom) / 2
        //     this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
        //     this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
        //     this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
        //     this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2


        //      xmomentumaverage = (this.body.xmom + this.anchor.xmom) / 2
        //      ymomentumaverage = (this.body.ymom + this.anchor.ymom) / 2
        //     this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
        //     this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
        //     this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
        //     this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2
        // }
        draw() {
            this.beam.color = `rgba(${((this.anchor.ref.r)+(this.body.ref.r))/2}, ${((this.anchor.ref.g)+(this.body.ref.g))/2}, ${((this.anchor.ref.b)+(this.body.ref.b))/2}, .707)`
           this.beam.width = Math.max(this.anchor.radius*2, this.body.radius*2)
            this.beam.draw()
        }
        move() {
        }
        clean() {
            if (this.sqr > ((this.length * cohesive.value)*(this.length * cohesive.value))) { // length is 16 //turn this off for sludge
                let k = cup.drops.indexOf(this.body.ref)
                let t = cup.drops.indexOf(this.anchor.ref)
                this.body.ref.links.splice(this.body.ref.links.indexOf(t), 1)
                this.anchor.ref.links.splice(this.anchor.ref.links.indexOf(k), 1)
                cup.links.splice(cup.links.indexOf(this), 1)
            }


            if (!cup.drops.includes(this.body.ref) || !cup.drops.includes(this.anchor.ref)){
                let k = cup.drops.indexOf(this.body.ref)
                let t = cup.drops.indexOf(this.anchor.ref)
                this.body.ref.links.splice(this.body.ref.links.indexOf(t), 1)
                this.anchor.ref.links.splice(this.anchor.ref.links.indexOf(k), 1)
                cup.links.splice(cup.links.indexOf(this), 1)
            }
        }
    }



    class Water {
        constructor(x, y) {
            this.body = new Circle(x, y, 5, getRandomColor(), 0, 1, 1, 1)
            this.r = 0
            this.g = 0
            this.b = 0
            if (this.body.x< 250) {
                this.r = 512
                this.g = 0
                this.b = 0
            } else if (this.body.x < 300) {
                this.r = 512
                this.g = 0
                this.b = 0
            }  else if (this.body.x < 300) {
                this.r = 0
                this.g = 512
                this.b = 0
            }  else if (this.body.x < 400) {
                this.r = 0
                this.g = 512
                this.b = 0
            }  else if (this.body.x < 400) {
                this.r = 0
                this.g = 0
                this.b = 0
            }  else if (this.body.x < 450) {
                this.r = 0
                this.g = 0
                this.b = 512
            } else {
                this.r = 0
                this.g = 0
                this.b = 512

            }
            this.bigbody = new Circle(x, y, 5, "#00AAFF80", 0, 1, .99)
            this.body.ref = this
            this.links = []
        }
        move(){
            this.body.ymom += ((((positiony) * .45)*(Math.max(( Math.max(1, this.links.length+1) -this.links.length),.1)*.5))*gravity.value)*.4
            this.body.xmom += ((((positionx) * .45)*(Math.max(( Math.max(1, this.links.length+1)-this.links.length),.1)*.5))*gravity.value)*.4
            this.body.frictiveMove()
            this.body.repel()
            this.body.color = `rgb(${this.r},${this.g},${this.b})`
            this.body.radius = ((this.links.length * 1) + 4)*sizes.value
            this.bigbody = new Circle(this.body.x, this.body.y, 14, "#00AAFF80", 0, 1, .99)
            this.bigbody.radius = ((this.links.length * 2) + 4)*sizes.value

            this.body.xmom*=speedtrap.value
            this.body.ymom*=speedtrap.value
        }
        draw() {
            this.body.draw()
        }
    }

    class Handler{
        constructor(center){
            this.center = center
            this.smallsize = this.center.radius-30
            this.bigsize = this.smallsize + 30
            this.smallbody = new Circle(this.center.x, this.center.y, this.smallsize, "black")
            this.bigbody = new Circle(this.center.x, this.center.y, this.bigsize, "white")
        }
        draw(){
            this.smallsize = this.center.radius-30
            this.smallbody = new Circle(this.center.x, this.center.y, this.smallsize, "black")
            this.bigbody = new Circle(this.center.x, this.center.y, this.bigsize, "white")
            this.bigbody.draw()
            this.smallbody.draw()
        }
        doesPerimeterTouch(point){
            this.smallbody = new Circle(this.center.x, this.center.y, this.smallsize, "black")
            this.bigbody = new Circle(this.center.x, this.center.y, 3000, "white")
            if(!this.smallbody.isPointInside(point)){
                if(this.bigbody.isPointInside(point)){
                    return true
                }
            }
            return false
        }
    }

    class Cup {
        constructor() {
            this.center = new Circle(400, 400, 270, "red", 7, 5,1, 1)
            // this.points = []
            // this.beams = []
            // this.shape = new Shape(this.beams)
            this.angle = -.5
            this.anglesto = -.5
            this.drops = []
            for (let t = 0; t < drops.value; t++) {
                let water = new Water(210 + Math.random() * 280, 200 + Math.random() * 300)
                this.drops.push(water)
            }
            this.links = []
            this.pairs = []
        }
        draw() {
            if(keysPressed[' ']){
                this.center.move()
            }
            if(keysPressed['e']){
                this.center.radius++
                if(this.center.radius > 350){
                    this.center.radius = 350
                }
            }
            if(keysPressed['q']){
                this.center.radius--
                if(this.center.radius < 60){
                    this.center.radius = 60
                }
            }
            control(this.center, 10)
            this.shape = new Handler(this.center)
            this.shape.draw()

            for (let t = 0; t < this.links.length; t++) {
                this.links[t].balance()
            }

            for (let t = 0; t < this.drops.length; t++) {
                if(t > linklength.value){
                    for (let k = t; k < this.drops[t].links.length; k++) {
                    this.links.splice(this.links.indexOf(this.drops[t].links[k]), 1)
                    this.drops[t].links.splice(t)
                }
            }
            }


            
            for (let t = 0; t < this.drops.length; t++) {
                this.drops[t].move()
            }
            for (let t = 0; t < this.drops.length; t++) {
                // while (this.shape.doesPerimeterTouch(this.drops[t].body)) {
                //     this.drops[t].body.xmom += (this.center.x - this.drops[t].body.x) / 10
                //     this.drops[t].body.ymom += (this.center.y - this.drops[t].body.y) / 10
                //     this.drops[t].body.move()
                // }

                while (this.shape.doesPerimeterTouch(this.drops[t].body)) {
                    this.drops[t].body.sxmom += (this.center.x - this.drops[t].body.x) / 100
                    this.drops[t].body.symom += (this.center.y - this.drops[t].body.y) / 100
                    // this.drops[t].body.xmom -= (this.center.x - this.drops[t].body.x) / 10000
                    // this.drops[t].body.ymom -= (this.center.y - this.drops[t].body.y) / 10000
                    this.drops[t].body.xmom *= .85//.91
                    this.drops[t].body.ymom *= .85//.91
                    this.drops[t].body.smove()
                }
                // this.drops[t].draw()
                for (let k = 0; k < this.drops.length; k++) {
                    if (t != k) {

                        if (this.drops[t].bigbody.doesPerimeterTouch(this.drops[k].bigbody)) {
                        if (this.drops[t].body.doesPerimeterTouch(this.drops[k].body)) {
                            this.drops[t].body.xmom -= (this.drops[k].body.x - this.drops[t].body.x) / 3
                            this.drops[t].body.ymom -= (this.drops[k].body.y - this.drops[t].body.y) / 3
                            const distance = ((new Line(this.drops[k].body.x, this.drops[k].body.y, this.drops[t].body.x, this.drops[t].body.y, 1, "red")).hypotenuse()) - ((this.drops[t].body.radius * 2))
                            const angleRadians = Math.atan2(this.drops[k].body.y - this.drops[t].body.y, this.drops[k].body.x - this.drops[t].body.x);
                            this.drops[t].body.xrepel += (Math.cos(angleRadians) * distance) / 4.41
                            this.drops[t].body.yrepel += (Math.sin(angleRadians) * distance) / 4.41
                            this.drops[t].body.xmom += (Math.cos(angleRadians) * distance) / 3
                            this.drops[t].body.ymom += (Math.sin(angleRadians) * distance) / 3
                            this.drops[k].body.xrepel -= (Math.cos(angleRadians) * distance) / 4.41
                            this.drops[k].body.yrepel -= (Math.sin(angleRadians) * distance) / 4.41
                            this.drops[k].body.xmom -= (Math.cos(angleRadians) * distance) / 3
                            this.drops[k].body.ymom -= (Math.sin(angleRadians) * distance) / 3
                            this.drops[t].body.repel()
                            this.drops[k].body.repel()
                            if(mode.value == -1){
                            this.drops[t].r = ((this.drops[t].r*(colorrate.value))+(this.drops[k].r))/(parseInt(colorrate.value,10)+1)
                            this.drops[t].g = ((this.drops[t].g*(colorrate.value))+(this.drops[k].g))/(parseInt(colorrate.value,10)+1)
                            this.drops[t].b = ((this.drops[t].b*(colorrate.value))+(this.drops[k].b))/(parseInt(colorrate.value,10)+1)
                            this.drops[k].r = ((this.drops[k].r*(colorrate.value))+(this.drops[t].r))/(parseInt(colorrate.value,10)+1)
                            this.drops[k].g = ((this.drops[k].g*(colorrate.value))+(this.drops[t].g))/(parseInt(colorrate.value,10)+1)
                            this.drops[k].b = ((this.drops[k].b*(colorrate.value))+(this.drops[t].b))/(parseInt(colorrate.value,10)+1)
                            }
                        }
                                
                            if (!this.drops[t].links.includes(k) && !this.drops[k].links.includes(t) && this.drops[t].links.length < (linklength.value) && this.drops[k].links.length <  (linklength.value) ) {
                                let link = new SpringOP(this.drops[t].body, this.drops[k].body, lengthslider.value, `rgba(${((this.drops[t].r)+(this.drops[k].r))/2}, ${((this.drops[t].g)+(this.drops[k].g))/2}, ${((this.drops[t].b)+(this.drops[k].b))/2}, .5)`)
                        
                            
                                // this.drops[t].r = ((this.drops[t].r*100)+(this.drops[k].r))/101
                                // this.drops[t].g = ((this.drops[t].g*100)+(this.drops[k].g))/101
                                // this.drops[t].b = ((this.drops[t].b*100)+(this.drops[k].b))/101
                                // this.drops[k].r = ((this.drops[k].r*100)+(this.drops[t].r))/101
                                // this.drops[k].g = ((this.drops[k].g*100)+(this.drops[t].g))/101
                                // this.drops[k].b = ((this.drops[k].b*100)+(this.drops[t].b))/101

                            if(mode.value == -1){
                                console.log(parseInt(colorrate.value,10)+1)
                            this.drops[t].r = ((this.drops[t].r*(colorrate.value))+(this.drops[k].r))/(parseInt(colorrate.value,10)+1)
                            this.drops[t].g = ((this.drops[t].g*(colorrate.value))+(this.drops[k].g))/(parseInt(colorrate.value,10)+1)
                            this.drops[t].b = ((this.drops[t].b*(colorrate.value))+(this.drops[k].b))/(parseInt(colorrate.value,10)+1)
                            this.drops[k].r = ((this.drops[k].r*(colorrate.value))+(this.drops[t].r))/(parseInt(colorrate.value,10)+1)
                            this.drops[k].g = ((this.drops[k].g*(colorrate.value))+(this.drops[t].g))/(parseInt(colorrate.value,10)+1)
                            this.drops[k].b = ((this.drops[k].b*(colorrate.value))+(this.drops[t].b))/(parseInt(colorrate.value,10)+1)
                            }
                                this.links.push(link)
                                this.drops[t].links.push(k)
                                this.drops[k].links.push(t)
                            }
                        }
                    }
                }
            }
            

            for (let t = 0; t < this.drops.length; t++) {

                while (this.shape.doesPerimeterTouch(this.drops[t].body)) {
                    this.drops[t].body.sxmom += (this.center.x - this.drops[t].body.x) / 100
                    this.drops[t].body.symom += (this.center.y - this.drops[t].body.y) / 100
                    // this.drops[t].body.xmom -= (this.center.x - this.drops[t].body.x) / 10000
                    // this.drops[t].body.ymom -= (this.center.y - this.drops[t].body.y) / 10000
                    this.drops[t].body.xmom *= .85
                    this.drops[t].body.ymom *= .85
                    this.drops[t].body.smove()
                }
            }
            for (let t = 0; t < this.links.length; t++) {
                this.links[t].draw()
            }

            for (let t = 0; t < this.drops.length; t++) {

                while (this.shape.doesPerimeterTouch(this.drops[t].body)) {
                    this.drops[t].body.sxmom += (this.center.x - this.drops[t].body.x) / 100
                    this.drops[t].body.symom += (this.center.y - this.drops[t].body.y) / 100
                    // this.drops[t].body.xmom -= (this.center.x - this.drops[t].body.x) / 10000
                    // this.drops[t].body.ymom -= (this.center.y - this.drops[t].body.y) / 10000
                    this.drops[t].body.xmom *= .85//91
                    this.drops[t].body.ymom *= .85//91
                    this.drops[t].body.smove()
                }
            this.drops[t].body.draw()
        }
            for (let t = 0; t < this.links.length; t++) {
                this.links[t].clean()
            }
            // this.center.draw()
            if (keysPressed[' ']) {
                console.log(this)
            }
        }
    }


    let cup = new Cup()


    function main() {
        if(pause == -1){
            canvas_context.clearRect(0, 0, canvas.width, canvas.height)  // refreshes the image
            // gamepadAPI.update() //checks for button presses/stick movement on the connected controller)
            // game code goes here
            cup.draw()
            // gamepad_control(cup.center, 0)
            if(keysPressed['y']){
                cup = new Cup()
            }
            if(cup.drops.length > drops.value){
                for (let t = 0; t < cup.links.length; t++) {
                    cup.links[t].clean()
                }
                cup.drops.splice(drops.value, 5)
            }
            if(cup.drops.length < drops.value){
                let drop = new Water(cup.center.x, cup.center.y)
                if(Math.random()<.5){
                    drop.r = 255
                }else{
                    drop.r = 0
                }
                if(Math.random()<.5){
                    drop.g = 255
                }else{
                    drop.g = 0
                }
                if(Math.random()<.5){
                    drop.b = 255
                }else{
                    drop.b = 0
                }
                cup.drops.push(drop)
    
            }
        }
    }
})