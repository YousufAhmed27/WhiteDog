class Enemy {
    constructor(canvas, player) {
        this.canvas = canvas
        this.play = player
        this.image = new Image()
        this.speed = Math.random() * 10
        this.modiefier = 0
        this.now = 0
        this.interval = Math.random() * 100 + 50
        this.deleteThis = false
    }
    update(delta) {
        this.modiefier = this.play.speed
        this.X -= this.speed + this.modiefier

        if (this.now > this.interval) {
            this.frame >= this.maxFrame ? this.frame = 0 : this.frame++
            this.now = 0
        }
        this.now += delta

        if (this.X + this.width < 0) this.deleteThis = true
        if (this.Y + this.height < 0) this.deleteThis = true
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.frame * this.spritewidth, 0, this.spritewidth, this.spriteheight,
            this.X, this.Y, this.width, this.height
        )
    }
}

export class Worm extends Enemy {
    constructor(canvas, modi) {
        super(canvas, modi)
        this.image.src = "./enemy/enemy_worm.png"
        this.spritewidth = 229
        this.spriteheight = 171
        this.width = this.spritewidth / 2
        this.height = this.spriteheight / 2
        this.X = this.canvas.width + this.width
        this.Y = this.canvas.height - this.height - 80
        this.frame = 0
        this.maxFrame = 5
        this.colX = this.X + this.width / 2 - 15
        this.colY = this.Y + this.height / 2
        this.colrad = 40
    }
    update(delta) {
        super.update(delta)
        this.colX = this.X + this.width / 2 - 15
        this.colY = this.Y + this.height / 2
    }
}

export class Fly extends Enemy {
    constructor(canvas, modi) {
        super(canvas, modi)
        this.image.src = "./enemy/enemy_fly.png"
        this.spritewidth = 60
        this.spriteheight = 44
        this.width = this.spritewidth
        this.height = this.spriteheight
        this.X = this.canvas.width + this.width
        this.Y = Math.random() * this.canvas.height / 1.5 + 30
        this.frame = 0
        this.maxFrame = 5
        this.colX = this.X + this.width / 2
        this.colY = this.Y + this.height / 2
        this.colrad = 20
    }
    update(delta) {
        super.update(delta)
        this.colX = this.X + this.width / 2
        this.colY = this.Y + this.height / 2
    }
}

export class Spider extends Enemy {
    constructor(canvas, modi) {
        super(canvas, modi)
        this.image.src = "./enemy/enemy_spider.png"
        this.spritewidth = 310
        this.spriteheight = 175
        this.width = this.spritewidth / 2
        this.height = this.spriteheight / 2
        this.X = Math.random() * this.canvas.width
        this.Y = -this.height
        this.dy = Math.random() * canvas.height - 20
        this.speedY = Math.random() * 10 + 5
        this.speed = 0
        this.frame = 0
        this.maxFrame = 5
        this.colX = this.X + this.width / 2
        this.colY = this.Y + this.height / 2
        this.colrad = 40
    }
    update(delta) {
        super.update(delta)

        if (this.Y >= this.dy) this.speedY *= -1
        this.Y += this.speedY

        this.colX = this.X + this.width / 2
        this.colY = this.Y + this.height / 2
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(this.X + this.width / 2, 0)
        ctx.lineTo(this.X + this.width / 2, this.Y + this.height / 2)
        ctx.stroke()
        super.draw(ctx)
    }

}


export class Plant extends Enemy {
    constructor(canvas, modi) {
        super(canvas, modi)
        this.image.src = "./enemy/enemy_plant.png"
        this.spritewidth = 60
        this.spriteheight = 87
        this.width = this.spritewidth * 2
        this.height = this.spriteheight * 2
        this.X = this.canvas.width + this.width
        this.Y = this.canvas.height - this.height - 80
        this.frame = 0
        this.maxFrame = 1
        this.colX = this.X + this.width / 2
        this.colY = this.Y + this.height / 2 - 10
        this.colrad = 60
        this.speed = 0
    }
    update(delta) {
        super.update(delta)
        this.colX = this.X + this.width / 2
        this.colY = this.Y + this.height / 2 - 10
    }
}
