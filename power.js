class Powers {
    constructor(input) {
        this.input = input
        this.X = 0
    }
    update() {
        if (this.input.key.includes(this.Key.toLowerCase())) {
            setTimeout(_ => {
                this.power = false
                this.powercolor = "rgb(255, 255, 255, 0.2)"
            }, this.activation)
            setTimeout(_ => {
                this.power = true
                this.powercolor = "rgb(255, 255, 255)"
            }, this.delay)
        }
    }
    draw(ctx, canvas) {
        ctx.save()
        ctx.fillStyle = this.powercolor
        ctx.beginPath()
        ctx.arc(canvas.width / 40 + this.X, canvas.height - 55, 40, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = "black"
        ctx.font = "40px arial"
        ctx.textAlign = "center"
        ctx.fillText(this.Key, canvas.width / 40 + this.X, canvas.height - 40)
        ctx.restore()
    }
}

export class Roll extends Powers {
    constructor(inputs) {
        super(inputs)
        this.power = true
        this.powercolor = "rgb(255, 255, 255)"
        this.Key = "X"
        this.activation = 2000
        this.delay = 20000
    }
}

export class Fire extends Powers {
    constructor(inputs) {
        super(inputs)
        this.X = 90
        this.power = true
        this.powercolor = "rgb(255, 255, 255)"
        this.Key = "Z"
        this.activation = 5000
        this.delay = 30000
    }
}