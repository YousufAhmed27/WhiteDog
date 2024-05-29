import { ParticleBlack } from "./particle.js"

export default class Player {
    constructor(can, input) {
        this.canvas = can
        this.spriteWidth = 200
        this.spriteHeight = 181.83
        this.width = this.spriteWidth
        this.height = this.spriteHeight
        this.image = PlayerDog
        this.frameX = 0
        this.maxFrame = 5
        this.frameY = 0
        this.idle = 0 // to tell which way the player is looking {Right - Left}
        this.interval = 100
        this.frame = 0
        this.X = 30 + this.width
        this.ground = this.canvas.height - this.height - 80
        this.marginX = this.canvas.width / 2 + this.canvas.width / 4
        this.Y = this.ground
        this.dy = 0
        this.weight = 0
        this.speed = 0 // speed of the background and enemies related to player
        this.speedback = 0 // real player speed
        this.input = input.key

        // collision circle
        this.colX = this.X + this.width / 2 + 10
        this.colY = this.Y + this.height / 2 + 20
        this.colrad = 70


        this.power = false // indicate if the player can't take damage
        this.Powers = true // indicate if the power is ready to be used
        this.life = 10
        this.particle = []
        this.level = 1

        this.gravity = 5

        // effects
        this.para = false
        this.ok = true
    }
    update(state, delta, powers, boss) {
        this.Powers = powers
        if (!this.para) {
            if (this.input.includes("ArrowRight")) state.currentState = "Run_Right"
            else if (this.input.includes("ArrowLeft")) state.currentState = "Run_Left"
            else if (this.input.includes("ArrowDown")) state.currentState = "Lay"
            else state.currentState = ""

            if (this.input.includes("x") && this.Powers[0].power) state.currentState = "Roll"
            else if (this.input.includes("z") && this.level === 2 && this.Powers[1].power) state.currentState = "Fire"

            if (this.input.includes("ArrowUp") && this.onground()) state.currentState = "Jump"
            if (this.frame > this.interval) {
                this.frame = 0
                this.frameX > this.maxFrame ? this.frameX = 0 : this.frameX++
            }
            this.frame += delta
            this.ok = true
        }
        else {
            this.speedback = 0
            this.particle.push(new ParticleBlack(this.X + this.width / 2, this.colY, 0))
            if (this.ok) setTimeout(_ => this.para = false, 3000)
            this.ok = false
        }
        this.X += this.speedback
        this.Y -= this.dy
        this.dy -= this.weight

        if (this.onground()) {
            this.dy = 0
            this.weight = 0
            this.Y = this.ground
        }
        else if (this.dy === 0) {
            this.weight = 1.5
        }

        if (this.X > this.marginX && !boss) this.X = this.marginX
        if (this.X + this.width > this.canvas.width && boss) this.X = this.canvas.width - this.width
        if (this.X < 0) this.X = 0
        if (this.Y < 0) this.Y = 0

        this.colX = this.X + this.width / 2 + 10
        this.colY = this.Y + this.height / 2 + 20

    }
    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight, this.X, this.Y, this.width, this.height
        )
    }
    onground() {
        if (this.Y >= this.ground) return true
        return false
    }
    init() {
        this.X = 30 + this.width
        this.Y = this.ground
        this.speed = 0
        this.speedback = 0
        this.life = 10
    }
}