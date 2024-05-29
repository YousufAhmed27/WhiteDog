export class Particle {
    constructor(X, Y, s, SiW, SiH) {
        this.image = new Image()
        this.image.src = "./asset/fire.png"
        this.X = X + s + Math.random() * 50
        this.Y = Y + s + Math.random() * 50
        this.speedX = Math.random()
        this.speedY = Math.random()
        this.width = SiW
        this.height = SiH
        this.deleteit = false
        this.size = Math.random() * 10 + 10
    }
    update() {
        this.width *= 0.90
        this.height *= 0.90
        if (this.width < 3) this.deleteit = true
        this.X -= this.speedX
        this.Y -= this.speedY
    }
    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, 100, 90, this.X, this.Y, this.width, this.height)
    }
}

export class Bullet {
    constructor(X, Y, X2, Y2, play, canvas) {
        this.canvas = canvas
        this.width = 90
        this.height = 90
        this.player = play
        this.X = X
        this.Y = Y
        this.X2 = X2
        this.Y2 = Y2
        this.angle = Math.atan2(Y - Y2, X - X2)
        this.del = false
        this.particle = []
    }
    update() {
        this.X -= Math.cos(this.angle) * 20
        this.Y -= Math.sin(this.angle) * 20
        this.particle.push(new ParticleBlack(this.X, this.Y, this.width * 0.5))
        if (this.GetDistance(this.X, this.player.colX, this.Y, this.player.colY, 20, this.player.colrad) && !this.player.power) {
            this.player.para = true
            this.del = true
        }
        if (this.X > this.canvas.width || this.X < 0 || this.Y < 0 || this.Y > this.canvas.height) this.del = true
        this.particle.forEach(p => p.update())
        this.particle = this.particle.filter(e => !e.deleteit)
    }
    draw(ctx) {
        this.particle.forEach(p => p.draw(ctx))
    }
    GetDistance(X1, X2, Y1, Y2, rad1, rad2) {
        let dx = X1 - X2
        let dy = Y1 - Y2
        let dis = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
        let rad = rad1 + rad2
        if (dis > rad) return false
        return true
    }
}

export class ParticleBlack {
    constructor(X, Y, s) {
        this.image = new Image()
        this.image.src = "./boss/level2/fire.png"
        this.X = X - s + Math.random() * 50
        this.Y = Y - s + Math.random() * 50
        this.speedX = Math.random()
        this.speedY = Math.random()
        this.width = 90
        this.height = 90
        this.deleteit = false
        this.size = Math.random() * 10 + 10
    }
    update() {
        this.width *= 0.90
        this.height *= 0.90
        if (this.width < 3) this.deleteit = true
        this.X -= this.speedX
        this.Y -= this.speedY
    }
    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, 100, 90, this.X, this.Y, this.width, this.height)
    }
}
