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

        this.now += delta
        if (this.now > this.interval) {
            this.frame >= this.maxFrame ? this.frame = 0 : this.frame++
            this.now = 0
        }

        if (this.X + this.width < 0) this.deleteThis = true
        if (this.Y + this.height < 0) this.deleteThis = true
        if (this.Y > this.canvas.height) this.deleteThis = true
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.frame * this.spritewidth, 0, this.spritewidth, this.spriteheight,
            this.X, this.Y, this.width, this.height
        )
    }
}

// monsters for level 1
export class Worm extends Enemy {
    constructor(canvas, modi) {
        super(canvas, modi)
        this.image.src = "./enemy/level1/enemy_worm.png"
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
        this.image.src = "./enemy/level1/enemy_fly.png"
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
        this.image.src = "./enemy/level1/enemy_spider.png"
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
        this.image.src = "./enemy/level1/enemy_plant.png"
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

// monsters for Boss 1
export class Bat extends Enemy {
    constructor(canvas, modi) {
        super(canvas, modi)
        this.image.src = "./enemy/level1/enemy_bat_2.png"
        this.spritewidth = 238
        this.spriteheight = 167
        this.width = this.spritewidth / 2
        this.height = this.spriteheight / 2
        this.speed = Math.random() * 10 + 3
        this.dy = 0
        this.X = this.canvas.width + this.width
        this.Y = Math.random() * this.canvas.height / 1.5 + 30
        this.frame = 0
        this.maxFrame = 7
        this.colX = this.X + this.width / 2
        this.colY = this.Y + 10 + this.height / 2
        this.colrad = 40
        this.delay = Math.random() * 2000 // indicate time before diving
    }
    update(delta) {
        super.update(delta)
        this.Y += this.dy
        this.colX = this.X + this.width / 2
        this.colY = this.Y + 10 + this.height / 2
        this.delay -= delta
        if (Math.random() * 10 + 5 > 14 && this.delay < 0) this.dy = 20
    }
}

export class Digger extends Enemy {
    constructor(canvas, modi) {
        super(canvas, modi)
        this.image.src = "./enemy/level1/enemy_digger.png"
        this.spritewidth = 260
        this.spriteheight = 178
        this.width = this.spritewidth * 0.6
        this.height = this.spriteheight * 0.6
        this.X = Math.random() * this.canvas.width
        this.Y = this.canvas.height - this.height - 80
        this.frame = 0
        this.maxFrame = 7
        this.colX = this.X + this.width / 2
        this.colY = this.Y + this.height / 2 - 10
        this.colrad = 40
        this.speed = 0
        this.delay = 2000 // indicate time to show
    }
    update(delta) {
        super.update(delta)
        this.X += this.speed + this.modiefier
        this.colX = this.X + this.width / 2
        this.colY = this.Y + this.height / 2 - 10
        this.delay -= delta
        if (this.delay < -3000) this.deleteThis = true
    }
    draw(ctx) {
        if (this.delay < 0) super.draw(ctx)
        else {
            ctx.save()
            ctx.beginPath()
            ctx.ellipse(this.colX, this.colY + 50, this.colrad, this.colrad - 30, 0, Math.PI * 2, false)
            ctx.fillStyle = "rgb(0, 0, 0, 0.8)"
            ctx.fill()
            ctx.restore()
        }
    }
}

export class Glyer extends Enemy {
    constructor(canvas, modi) {
        super(canvas, modi)
        this.image.src = "./enemy/level1/enemy_ghost_4.png"
        this.spritewidth = 60
        this.spriteheight = 70
        this.width = this.spritewidth * 2
        this.height = this.spriteheight * 2
        this.X = this.canvas.width + this.width
        this.Y = Math.random() * this.canvas.height / 1.5 + 30
        this.speed = Math.random() * 10 + 5
        this.frame = 0
        this.maxFrame = 5
        this.colX = this.X + this.width / 2
        this.colY = this.Y + this.height / 2 - 10
        this.colrad = 60
        this.delay = 2000
        this.shoot = false
        this.angles = 0
    }
    update(delta) {
        super.update(delta)
        this.colX = this.X + this.width / 2
        this.colY = this.Y + this.height / 2 - 10
        this.delay -= delta
        if (this.delay < 0 && !this.shoot) {
            this.shoot = true
            this.angles = Math.atan2((this.play.Y + this.play.height / 2) - (this.Y + this.height / 2),
                (this.play.X + this.play.width / 2) - (this.X + this.width / 2))
        }

        if (this.shoot) {
            this.X += this.speed + this.modiefier

            this.X += Math.cos(this.angles) * 10
            this.Y += Math.sin(this.angles) * 10
            if (this.delay < -3000) this.deleteThis = true
        }
    }
}

// monsters for level 2
export class Zombie extends Enemy {
    constructor(canvas, modi) {
        super(canvas, modi)
        this.image.src = "./enemy/level2/enemy_zombie.png"
        this.spritewidth = 292
        this.spriteheight = 410
        this.width = this.spritewidth / 1.5
        this.height = this.spriteheight / 1.5
        this.X = this.canvas.width + this.width
        this.Y = this.canvas.height - this.height - 80
        this.frame = 0
        this.maxFrame = 7
        this.colX = this.X + this.width / 2 + 15
        this.colY = this.Y + this.height / 2 - 50
        this.colrad = 60
    }
    update(delta) {
        super.update(delta)
        this.colX = this.X + this.width / 2 + 15
        this.colY = this.Y + this.height / 2 - 50
    }
}

export class Grounder extends Enemy {
    constructor(canvas, modi) {
        super(canvas, modi)
        this.image.src = "./enemy/level2/enemy_ground_zombie.png"
        this.spritewidth = 120.1
        this.spriteheight = 90
        this.width = this.spritewidth * 2
        this.height = this.spriteheight * 2
        this.X = this.canvas.width + this.width
        this.Y = this.canvas.height - this.height - 80
        this.frame = 0
        this.maxFrame = 7
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

export class Tracker extends Enemy {
    constructor(canvas, modi) {
        super(canvas, modi)
        this.image.src = "./enemy/level2/enemy_ghost.png"
        this.spritewidth = 261
        this.spriteheight = 209
        this.width = this.spritewidth * 0.7
        this.height = this.spriteheight * 0.7
        this.X = this.canvas.width + this.width
        this.Y = Math.random() * this.canvas.height / 1.5 + 30
        this.frame = 0
        this.maxFrame = 5
        this.colX = this.X + this.width / 2
        this.colY = this.Y + this.height / 2
        this.colrad = 65
        this.speedY = 0
    }
    update(delta) {
        super.update(delta)
        if (this.X + 30 < this.play.X + this.play.width) this.speedY = 20
        this.Y += this.speedY
        this.colX = this.X + this.width / 2
        this.colY = this.Y + this.height / 2
    }
    draw(ctx) {
        ctx.save()
        ctx.globalAlpha = "0.2"
        super.draw(ctx)
        ctx.restore()
    }
}

class Bullets {
    constructor(X, Y, player, canvas) {
        this.X = X
        this.Y = Y
        this.player = player
        this.canvas = canvas
        this.rad = 10
        this.angle = Math.atan2((this.player.Y + this.player.height / 2) - this.Y,
            (this.player.X + this.player.width / 2) - this.X)
        this.del = false
    }
    update() {
        this.X += Math.cos(this.angle) * 10
        this.Y += Math.sin(this.angle) * 10
        if (this.X > this.canvas.width || this.X < 0 || this.Y > this.canvas.height || this.Y < 0) this.del = true
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.X, this.Y, this.rad, 0, Math.PI * 2)
        ctx.fill()
    }
}
export class SpiderBig extends Enemy {
    constructor(canvas, modi) {
        super(canvas, modi)
        this.image.src = "./enemy/level2/enemy_spider_big.png"
        this.spritewidth = 120
        this.spriteheight = 144
        this.width = this.spritewidth
        this.height = this.spriteheight
        this.X = Math.random() * this.canvas.width
        this.Y = -this.height
        this.dy = 100
        this.speedY = Math.random() * 10 + 5
        this.speed = 0
        this.frame = 0
        this.maxFrame = 5
        this.colX = this.X + this.width / 2
        this.colY = this.Y + this.height / 2
        this.colrad = 10
        this.angle = 0
        this.nows = 0
        this.number = 0
        this.bullet = []
    }
    update(delta) {
        super.update(delta)
        this.nows += delta
        this.Y += this.speedY
        if (this.Y >= this.dy) {
            this.Y = this.dy
            if (this.nows > 1000) {
                this.nows = 0
                this.colX = this.X + this.width / 2
                this.colY = this.Y + this.height / 2
                this.angle = Math.atan2((this.play.Y + this.play.height / 2) - this.Y,
                    (this.play.X + this.play.width / 2) - this.X)
                this.bullet.push(new Bullets(this.colX, this.colY, this.play, this.canvas))
                console.log(this.bullet)
            }
            this.bullet.forEach(e => e.update())
            this.bullet = this.bullet.filter(e => !e.del)
            if (this.bullet.length > 0) {
                this.colX = this.bullet[0].X
                this.colY = this.bullet[0].Y
            }
        }
    }
    draw(ctx) {
        this.bullet.forEach(e => e.draw(ctx))
        ctx.beginPath()
        ctx.moveTo(this.X + this.width / 2, 0)
        ctx.lineTo(this.X + this.width / 2, this.Y + this.height / 2)
        ctx.stroke()
        super.draw(ctx)
    }
}

// monsters for Boss 2
export class Enemy1 extends Enemy {
    constructor(canvas, player) {
        super(canvas, player)
        this.image.src = "./enemy/level2/enemy1.png"
        this.spritewidth = 293
        this.spriteheight = 155
        this.width = this.spritewidth / 2.5
        this.height = this.spriteheight / 2.5
        this.X = Math.random() * this.canvas.width
        this.Y = Math.random() * this.canvas.height
        this.frame = 0
        this.maxFrame = 5
        this.speed = Math.random() * 5 - 2.5
        this.speedY = Math.random() * 5 - 2.5

        // circle detection
        this.colX = this.X + this.width * 0.5
        this.colY = this.Y + this.height * 0.5
        this.colrad = 30
        setTimeout(_ => this.deleteThis = true, 5000)
    }
    update(delta) {
        this.speed = Math.random() * 5 - 2.5
        super.update(delta)
        this.X += this.speed + this.modiefier

        this.X += this.speed
        this.speedY = Math.random() * 5 - 2.5
        this.Y += this.speedY
        this.colX = this.X + this.width * 0.5
        this.colY = this.Y + this.height * 0.5
    }
}

export class Waver extends Enemy {
    constructor(canvas, play) {
        super(canvas, play)
        this.image = new Image()
        this.image.src = "./enemy/level2/waver.png"
        this.spritewidth = 266
        this.spriteheight = 188
        this.width = this.spritewidth / 2.5
        this.height = this.spriteheight / 2.5
        this.X = this.canvas.width
        this.Y = Math.random() * (this.canvas.height - this.height - 100)
        this.frame = 0
        this.maxFrame = 5

        this.colX = this.X + this.width * 0.5
        this.colY = this.Y + this.height * 0.5
        this.colrad = 30

        this.speed = Math.random() * 10 + 5
        this.speedY = Math.random() * 5 + 5
        this.curve = 0
        this.curvespeed = Math.random() * 0.5
    }
    update(delta) {
        super.update(delta)
        this.Y += Math.sin(this.curve) * this.speedY
        this.curve += Math.random() * this.curvespeed
        this.colX = this.X + this.width * 0.5
        this.colY = this.Y + this.height * 0.5
    }
    draw(ctx) {
        super.draw(ctx)
        ctx.beginPath()
        ctx.arc(this.colX, this.colY, this.colrad, 0, Math.PI * 2)
        ctx.stroke()
    }
}

export class Pather extends Enemy {
    constructor(canvas, play) {
        super(canvas, play)
        this.image = new Image()
        this.image.src = "./enemy/level2/pathing.png"
        this.spritewidth = 218
        this.spriteheight = 177
        this.width = this.spritewidth / 2.5
        this.height = this.spriteheight / 2.5
        this.X = this.canvas.width
        this.Y = Math.random() * this.canvas.height
        this.frame = 0
        this.maxFrame = 5

        this.speed = Math.random() * 5
        this.curve = 0
        this.curvespeed = Math.random() * 3

        this.colX = this.X + this.width * 0.5
        this.colY = this.Y + this.height * 0.5
        this.colrad = 30
        setTimeout(_ => this.deleteThis = true, 15000)
    }
    update(delta) {
        this.X = this.canvas.width / 3 * Math.sin(this.curve * Math.PI / 180) + (this.canvas.width / 2 - this.width / 2)
        this.Y = this.canvas.height / 2.5 * Math.sin(this.curve * Math.PI / 270) + (this.canvas.height / 2 - this.height / 2)

        this.now += delta
        if (this.now > this.interval) {
            this.frame >= this.maxFrame ? this.frame = 0 : this.frame++
            this.now = 0
        }

        this.curve += Math.random() * this.curvespeed
        this.colX = this.X + this.width * 0.5
        this.colY = this.Y + this.height * 0.5
    }
}

export class Randomizer extends Enemy {
    constructor(canvas, play) {
        super(canvas, play)
        this.image = new Image()
        this.image.src = "./enemy/level2/randomizer.png"
        this.spritewidth = 213
        this.spriteheight = 212
        this.width = this.spritewidth / 2.5
        this.height = this.spriteheight / 2.5
        this.frame = 3
        this.maxFrame = 8
        this.interval = Math.random() * 50 + 10

        this.X = Math.random() * this.canvas.width
        this.Y = Math.random() * this.canvas.height - 100

        this.newX = Math.random() * this.canvas.width
        this.newY = Math.random() * this.canvas.height

        this.speed = 0
        this.gameframe = 0
        this.intervall = Math.floor(Math.random() * 2000 + 1000)

        this.colX = this.X + this.width * 0.5
        this.colY = this.Y + this.height * 0.5
        this.colrad = 30

        setTimeout(_ => this.deleteThis = true, 7000)
    }
    update(delta) {
        super.update(delta)
        this.colX = this.X + this.width * 0.5
        this.colY = this.Y + this.height * 0.5
        this.gameframe += delta
        if (this.gameframe > this.intervall) {
            this.gameframe = 0
            this.newX = Math.random() * (this.canvas.width - this.width)
            this.newY = Math.random() * (this.canvas.height - this.height)
        }
        let dx = this.X - this.newX
        let dy = this.Y - this.newY
        this.X -= dx / 50
        this.Y -= dy / 50
    }
}