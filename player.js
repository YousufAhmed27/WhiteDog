export default class Player {
    constructor(can, input) {
        this.canvas = can
        this.spriteWidth = 200
        this.spriteHeight = 181.83
        this.width = this.spriteWidth / 1
        this.height = this.spriteHeight / 1
        this.image = new Image()
        this.image.src = "dog_left_right_white.png"
        this.frameX = 0
        this.maxFrame = 5
        this.frameY = 0
        this.idle = 0
        this.interval = 100
        this.frame = 0
        this.X = 30 + this.width
        this.ground = this.canvas.height - this.height - 80
        this.marginX = this.canvas.width / 2 + this.canvas.width / 4
        this.Y = this.ground
        this.dy = 0
        this.weight = 0
        this.speed = 0
        this.speedback = 0
        this.input = input.key
        this.colX = this.X + this.width / 2 + 10
        this.colY = this.Y + this.height / 2 + 20
        this.colrad = 70
        this.power = false
    }
    update(state, delta) {
        if (this.input.includes("ArrowRight")) state.currentState = "Run_Right"
        else if (this.input.includes("ArrowLeft")) state.currentState = "Run_Left"
        else if (this.input.includes("ArrowDown")) state.currentState = "Lay"
        else if (this.input.includes("x")) state.currentState = "Roll"
        else state.currentState = ""
        if (this.input.includes("ArrowUp") && this.onground()) state.currentState = "Jump"
        if (this.frame > this.interval) {
            this.frame = 0
            this.frameX > this.maxFrame ? this.frameX = 0 : this.frameX++
        }
        this.frame += delta
        this.X += this.speedback
        this.Y -= this.dy
        this.dy -= this.weight

        if (this.onground()) {
            this.dy = 0
            this.weight = 0
            this.Y = this.ground
        }

        if (this.X > this.marginX) this.X = this.marginX
        if (this.X < 0) this.X = 0

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
}