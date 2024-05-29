export default class Background {
    constructor(image, ca, player, speed) {
        this.width = 1667 * 2.5
        this.height = ca.height
        this.X = 0
        this.Y = 0
        this.image = image
        this.player = player
        this.modifier = speed
        this.speed = 0
    }
    update() {
        this.speed = this.player.speed * this.modifier * 3
        this.X + this.width < 0 ? this.X = 0 : this.X -= this.speed
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.X, this.Y, this.width, this.height)
        ctx.drawImage(this.image, this.X + this.width - 1, this.Y, this.width, this.height)
    }
}