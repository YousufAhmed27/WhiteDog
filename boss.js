import { Bat, Digger, Glyer } from "./enemy.js"
import { Enemy1, Waver, Pather, Randomizer } from "./enemy.js"
import { Bullet } from "./particle.js"

function GetDistance(X1, X2, Y1, Y2, rad1, rad2) {
    let dx = X1 - X2
    let dy = Y1 - Y2
    let dis = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    let rad = rad1 + rad2
    if (dis > rad) return false
    return true
}

// Boss Level 1

export class WalkingMonster {
    constructor(canvas, player) {
        this.canvas = canvas
        this.player = player
        this.image = WalkingMonsterDark
        this.Lives = 50
        this.spriteW = 1214
        this.spriteH = 787
        this.width = this.spriteW / 2.5
        this.height = this.spriteH / 2.5
        this.X = canvas.width
        this.Y = canvas.height - this.height - 67
        this.speed = 10
        this.frameX = 0
        this.maxFrame = 8
        this.frameY = 0
        this.interval = 100 // interval for frames
        this.intervalene = 1000 // interval for spawning enemy
        this.thisfame = 0
        this.thisfameene = 0
        this.first = true //contorl the first entry
        this.one = false // cosntrol times to play animation
        this.stand = false // control if the monster moves
        this.enemy = [] // Enemies summoned
        this.enearr = ["Bat", "Digger", "Glyer"] //to choose enemies from
        this.damage = true // indicate if the monster can take damage
    }
    update(delta) {
        this.thisfame += delta
        if (this.thisfame > this.interval) {
            this.thisfame = 0
            if (!this.one && !this.stand) this.frameX >= this.maxFrame ? this.frameX = 0 : this.frameX++
            if (this.one) this.frameX >= this.maxFrame ? this.frameX = 9 : this.frameX++
        }
        if (this.Lives > 0) {
            this.thisfameene += delta
            if (this.player.X < this.X + 20 + this.width - 70 &&
                this.player.X + this.player.width > this.X + 20 &&
                this.player.Y < this.Y + 30 + this.height - 90 &&
                this.player.Y + this.player.height > this.Y + 30) {
                if (this.player.power && this.damage) { this.Lives -= 5; this.damage = false; setTimeout(() => this.damage = true, 2000) }
                else if (!this.player.power) this.player.life--

                if (!this.stand) {
                    if (this.frameY === 0) this.player.X = this.X + this.width + 100
                    else if (this.frameY === 1) this.player.X = this.X - this.player.width - 100
                }
                else {
                    if (this.frameY === 0) this.player.X = this.X - this.player.width - 100
                    else if (this.frameY === 1) this.player.X = this.X + this.width + 100
                }
            }

            if (this.thisfameene > this.intervalene && this.stand) { this.addEnemy(); this.frameX; this.thisfameene = 0 }
            this.enemy = this.enemy.filter(e => !e.deleteThis)


            if (this.first) { this.Walk(); if (this.X < this.canvas.width - this.width) this.first = false }
            else if (!this.stand) {
                if (this.X > this.canvas.width - this.width || this.X < 0) Math.random() > 0.5 ? this.Idle() : this.Walk()
            }
            this.X += this.speed
        }
        else {
            if (!this.one) this.frameX = 0
            this.one = true
            if (this.frameY === 0) this.frameY = 2
            else if (this.frameY === 1) this.frameY = 3
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteW, this.frameY * this.spriteH, this.spriteW, this.spriteH,
            this.X, this.Y, this.width, this.height
        )
        ctx.save()
        ctx.textAlign = "center"
        ctx.font = "50px Arial"
        ctx.fillText("Walking Monster", this.canvas.width / 2, 50, this.canvas.width * 0.5, 40)
        if (this.Lives <= 0) ctx.fillText("Go →", this.canvas.width / 2, this.canvas.height / 2, this.canvas.width * 0.5, 40)
        ctx.restore()
        for (let i = 0; i < this.Lives; i++) {
            ctx.fillRect(this.canvas.width / 2 - this.canvas.width * 0.25 + (i * this.canvas.width * 0.01 - 3),
                60, this.canvas.width * 0.02, 40)
        }
    }
    Walk() {
        if (this.X > this.canvas.width - this.width) {
            this.speed = -10
            this.frameY = 0
        }
        else if (this.X < 0) {
            this.speed = 10
            this.frameY = 1
        }
    }
    Idle() {
        this.stand = true
        this.frameX = 0
        this.speed = 0
        this.X > this.canvas.width - this.width ? this.frameY = 0 : this.frameY = 1
        setTimeout(() => { this.stand = false }, 5000)
    }
    addEnemy() {
        let ind = Math.floor(Math.random() * this.enearr.length)
        if (this.enearr[ind] === "Bat") this.enemy.push(new Bat(this.canvas, this.player))
        else if (this.enearr[ind] === "Digger") this.enemy.push(new Digger(this.canvas, this.player))
        else if (this.enearr[ind] === "Glyer") this.enemy.push(new Glyer(this.canvas, this.player))
    }
}

// Boss Level 2


let State = {
    IdleRight: 0,
    IdleLeft: 1,
    JumpRight: 2,
    JumpLeft: 3,
    FallRight: 4,
    FallLeft: 5,
    RunRight: 6,
    RunLeft: 7,
    LayRight: 8,
    LayLeft: 9,
    RollRight: 10,
    RollLeft: 11,
}

export class ShadowDog {
    constructor(canvas, play) {
        this.pose = false
        this.player = play
        this.canvas = canvas
        this.image = ShadowDogg
        this.spritew = 200
        this.spriteh = 181.8
        this.width = this.spritew * 2
        this.height = this.spriteh * 2
        this.X = this.canvas.width + this.width + 100
        this.Y = this.canvas.height - this.height - 90
        this.frameX = 0
        this.frameY = State["LayLeft"]
        this.max = [5, 5, 5, 5, 5, 5, 7, 7, 3, 3, 5, 5]
        this.maxframe = this.max[this.frameY]
        this.now = 0
        this.interval = 150
        this.speed = 10

        // collision detection rectangle
        this.recX = this.X + 80
        this.recY = this.Y + 100
        this.recw = this.width * 0.7
        this.rech = this.height * 0.7

        // collision detection circle
        this.colX = this.X + this.width * 0.5
        this.colY = this.Y + this.height * 0.5
        this.colrad = 90

        // climb coordination and movement
        this.cliX = this.canvas.width / 2
        this.cliY = this.canvas.height / 2
        this.cliR = false
        this.cliL = false
        this.cliU = false
        this.cliD = false
        this.clispeed = 10

        this.init = true
        this.actionnum = 7
        this.action = -1 // control action
        this.Idle = 0 // contorl R or L
        this.rotate = 0
        this.para = false //heal
        this.dashing = 15
        this.rolling = 50
        this.notnow = false // control delay between actions

        this.Lives = 100
        this.dead = false
        this.damage = true // does it take damage

        this.bullets = []
        this.enemy = []
        this.enearr = ["Enemy1", "Waver", "Pather", "Randomizer"]
        this.num = 0
        this.enemycount = 0
        this.enemymax = 5

        this.moh = 0
    }
    update(deltatime) {
        this.now += deltatime
        if (this.now > this.interval) {
            this.now = 0
            this.frameX > this.maxframe ? this.frameX = 0 : this.frameX++
        }

        if (this.action !== 2) {
            this.colX = this.X + this.width * 0.5
            this.colY = this.Y + this.height * 0.5
            this.recX = this.X + 80
            this.recY = this.Y + 100
        }
        else {
            this.colX = this.canvas.width * 1.5
            this.recX = this.canvas.width * 1.5
        }

        if (this.init) this.initial()
        else {
            if (this.Lives <= 0 && !this.dead) this.die()
            else if (!this.dead) {

                if (this.action === -1 && !this.notnow && !this.dead) { this.notnow = true; setTimeout(_ => { this.action = Math.floor(Math.random() * this.actionnum) }, 2000) }
                else if (this.action === 0) this.paralize()
                else if (this.action === 1) { this.moh += deltatime; if (this.moh > 1000) { this.spawn(); this.moh = 0 } }
                else if (this.action === 2) this.climb()
                else if (this.action === 3) this.protect()
                else if (this.action === 4) this.teleport()
                else if (this.action === 5) this.dash()
                else if (this.action === 6) this.roll()
                if (this.player.X < this.recX + this.recw &&
                    this.player.X + this.player.width > this.recX &&
                    this.player.Y < this.recY + this.rech &&
                    this.player.Y + this.player.height > this.recY) {
                    console.log(this.damage)
                    if (this.player.power && this.damage) { this.Lives -= 5; this.damage = false; setTimeout(() => this.damage = true, 2000) }
                    else if (!this.player.power) this.player.life--

                    if (this.action === 5 || this.action === 6) {
                        if (this.Idle === 0) this.player.X = this.X + this.width + 100
                        else if (this.Idle === 1) this.player.X = this.X - this.player.width - 100
                    }
                    else {
                        if (this.Idle === 0) this.player.X = this.X - this.player.width - 100
                        else if (this.Idle === 1) this.player.X = this.X + this.width + 100
                    }
                }
            }
        }
        this.bullets.forEach(e => e.update())
        this.bullets = this.bullets.filter(e => !e.del)
    }
    draw(ctx) {
        this.bullets.forEach(e => e.draw(ctx))
        if (this.action !== 2 && !this.dead) {
            ctx.drawImage(this.image, this.frameX * this.spritew, this.frameY * this.spriteh, this.spritew, this.spriteh,
                this.X, this.Y, this.width, this.height
            )
        }
        else if (this.action === 2 && !this.dead) {
            ctx.save();
            ctx.translate(this.cliX, this.cliY);
            ctx.rotate(this.rotate * Math.PI / 180);
            ctx.drawImage(this.image, this.frameX * this.spritew, this.frameY * this.spriteh, this.spritew, this.spriteh,
                0, 0, this.width, this.height
            )
            ctx.restore();
        }

        ctx.save()
        ctx.textAlign = "center"
        ctx.font = "50px Arial"
        ctx.fillText("Shadow Dog", this.canvas.width / 2, 50, this.canvas.width * 0.5, 40)
        if (this.Lives <= 0) ctx.fillText("Go →", this.canvas.width / 2, this.canvas.height / 2, this.canvas.width * 0.5, 40)
        ctx.restore()
        for (let i = 0; i < this.Lives; i++) {
            ctx.fillRect(this.canvas.width / 6 + (i * this.canvas.width * 0.007 - 3),
                60, this.canvas.width * 0.02, 40)
        }
    }
    initial() {
        this.X -= (this.player.speed * 2.5)
        if (this.X < this.canvas.width - this.width - 20) {
            this.frameY = State["RollLeft"]
            this.X -= 200
        }
        if (this.X <= this.player.X) {
            this.init = false
            this.X = this.player.X + this.player.width * 0.5 - 80
            this.Pause()
        }
    }
    Pause() {
        this.pose = true
        setTimeout(_ => {
            this.pose = false
            this.again()
        }, 3000)
    }
    again() {
        this.X = this.canvas.width - this.width
        this.Y = this.canvas.height - this.height - 90
        this.frameX = 0
        this.frameY = State["IdleLeft"]
    }
    paralize() {
        this.bullets.push(new Bullet(this.X + this.width * 0.5, this.Y + this.height * 0.5, this.player.colX, this.player.colY, this.player, this.canvas))
        this.notnow = false
        this.action = -1
    }
    climb() {
        if (this.frameY !== State["RunRight"] && this.frameY !== State["RunLeft"]) {
            if (this.Idle === 0) {
                this.rotate = 270
                this.cliX = this.canvas.width - this.width + 50
                this.cliY = this.canvas.height
                this.frameY = State["RunRight"]
            } else {
                this.rotate = 90
                this.cliX = this.height
                this.cliY = this.canvas.height - this.height
                this.frameY = State["RunLeft"]
            }
            this.cliU = true
        }

        if (this.Idle === 0) {
            if (this.cliY <= this.width && this.cliU) {
                this.cliU = false
                this.rotate = 180
                this.cliX = this.canvas.width
                this.cliY = this.height
                this.cliL = true
            }

            if (this.cliX <= this.width && this.cliL) {
                this.cliL = false
                this.cliX = this.width - 50
                this.rotate = 90
                this.cliY = 0
                this.cliD = true
            }

            if (this.cliY >= this.canvas.height - this.width && this.cliD) {
                this.cliD = false
                this.rotate = 0
                this.cliX = 0
                this.frameY = State["IdleRight"]
                this.Idle = 1
                this.cliY = this.canvas.height - this.height - 90
                this.X = this.cliX
                this.Y = this.cliY
                this.notnow = false
                this.action = -1
            }
        }
        else {

            if (this.cliY <= 0 && this.cliU) {
                this.cliU = false
                this.rotate = 180
                this.cliX = this.width
                this.cliY = this.height
                this.cliR = true
            }

            if (this.cliX >= this.canvas.width && this.cliR) {
                this.cliR = false
                this.rotate = 270
                this.cliX = this.canvas.width - this.height
                this.cliY = this.width
                this.cliD = true
            }

            if (this.cliY >= this.canvas.height && this.cliD) {
                this.cliD = false
                this.rotate = 0
                this.cliX = this.canvas.width - this.width
                this.cliY = this.canvas.height - this.height - 90
                this.frameY = State["IdleLeft"]
                this.Idle = 0
                this.X = this.cliX
                this.Y = this.cliY
                this.notnow = false
                this.action = -1
            }
        }
        if (this.cliU) this.cliY -= this.clispeed
        else if (this.cliD) this.cliY += this.clispeed
        else if (this.cliR) this.cliX += this.clispeed
        else if (this.cliL) this.cliX -= this.clispeed
    }
    protect() {
        // increase HP
        for (let i = 0; i < 50; i++)this.bullets.push(new Bullet(Math.random() * this.canvas.width, 0, this.colX, this.colY, this, this.canvas))
        this.action = -1
        this.notnow = false
    }
    teleport() {
        let rand = Math.random()
        if (rand > 0.5) {
            if (this.Idle === 0 && this.bullets.length === 0) {
                this.bullets.push(new Bullet(this.colX, (this.canvas.height - this.height) + Math.random() * this.height, 0, this.canvas.height - 100, this.player, this.canvas))
                this.bullets.push(new Bullet(this.colX, (this.canvas.height - this.height) + Math.random() * this.height, 0, this.canvas.height - 100, this.player, this.canvas))
                this.bullets.push(new Bullet(this.colX, (this.canvas.height - this.height) + Math.random() * this.height, 0, this.canvas.height - 100, this.player, this.canvas))
                setTimeout(_ => {
                    this.frameY = State["IdleRight"]
                    this.Idle = 1
                    this.X = 0
                    this.Y = this.canvas.height - this.height - 90
                }, 1500)
            }
            else if (this.Idle === 1 && this.bullets.length === 0) {
                this.bullets.push(new Bullet(this.colX, (this.canvas.height - this.height) + Math.random() * this.height, this.canvas.width, this.canvas.height - 100, this.player, this.canvas))
                this.bullets.push(new Bullet(this.colX, (this.canvas.height - this.height) + Math.random() * this.height, this.canvas.width, this.canvas.height - 100, this.player, this.canvas))
                this.bullets.push(new Bullet(this.colX, (this.canvas.height - this.height) + Math.random() * this.height, this.canvas.width, this.canvas.height - 100, this.player, this.canvas))
                setTimeout(_ => {
                    this.frameY = State["IdleLeft"]
                    this.Idle = 0
                    this.X = this.canvas.width - this.width
                    this.Y = this.canvas.height - this.height - 90
                }, 1500)
            }
        }
        else {
            let X = Math.random() * this.canvas.width
            let Y = Math.random() * this.canvas.height
            this.bullets.push(new Bullet(this.colX, this.colY, this.player.colX, this.player.colY, this.player, this.canvas))
            this.bullets.push(new Bullet(this.colX, this.colY, X, Y, this.player, this.canvas))
            setTimeout(_ => {
                if (this.player.para) {
                    this.player.X = X
                    this.player.Y = Y
                }
            }, 1500)
        }

        this.action = -1
        this.notnow = false
    }
    dash() {
        let st = Math.random()
        if (this.Idle === 0) {
            this.frameY = State["RunLeft"]
            this.dashing = 15
            if (this.X <= 0) {
                this.Idle = 1
                if (st > 0.5) { this.notnow = false; this.action = -1; this.frameY = State["IdleRight"] }
            }
        } else {
            this.frameY = State["RunRight"]
            this.dashing = -15
            if (this.X >= this.canvas.width - this.width) {
                this.Idle = 0
                if (st > 0.5) { this.notnow = false; this.action = -1; this.frameY = State["IdleLeft"] }
            }
        }
        this.X -= this.dashing
    }
    roll() {
        let st = Math.random()
        if (this.Idle === 0) {
            this.frameY = State["RollLeft"]
            this.rolling = 50
            if (this.X <= 0) {
                this.Idle = 1
                if (st > 0.5) { this.notnow = false; this.action = -1; this.frameY = State["IdleRight"] }
            }
        } else {
            this.frameY = State["RollRight"]
            this.rolling = -50
            if (this.X >= this.canvas.width - this.width) {
                this.Idle = 0
                if (st > 0.5) { this.notnow = false; this.action = -1; this.frameY = State["IdleLeft"] }
            }
        }
        this.X -= this.rolling
    }
    spawn() {
        if (this.num < 5 && this.enemycount < this.enemymax) {
            this.enemy.push(new Enemy1(this.canvas, this.player))
            this.enemy.push(new Enemy1(this.canvas, this.player))
            this.enemycount++
        }
        else if (this.num < 10 && this.enemycount < this.enemymax) {
            this.enemy.push(new Waver(this.canvas, this.player))
            this.enemy.push(new Waver(this.canvas, this.player))
            this.enemycount++
        }
        else if (this.num < 15 && this.enemycount < this.enemymax) {
            this.enemy.push(new Pather(this.canvas, this.player))
            this.enemy.push(new Pather(this.canvas, this.player))
            this.enemycount++
        }
        else if (this.num < 20 && this.enemycount < this.enemymax) {
            this.enemymax = 10
            this.enemy.push(new Randomizer(this.canvas, this.player))
            this.enemy.push(new Randomizer(this.canvas, this.player))
            this.enemycount++
        }
        else if (this.num > 20 && this.enemycount < this.enemymax) {
            let r = Math.floor(Math.random() * this.enearr.length)
            if (this.enearr[r] === "Enemy1") this.enemy.push(new Enemy1(this.canvas, this.player))
            if (this.enearr[r] === "Waver") this.enemy.push(new Waver(this.canvas, this.player))
            if (this.enearr[r] === "Pather") this.enemy.push(new Pather(this.canvas, this.player))
            if (this.enearr[r] === "Randomizer") this.enemy.push(new Randomizer(this.canvas, this.player))
            this.enemycount += 3
        }
        else {
            this.num++
            this.enemycount = 0
            this.enemymax += 1
            this.notnow = false
            this.action = -1
        }
    }
    die() {
        for (let i = 0; i < 100; i++) this.bullets.push(new Bullet(this.X, this.Y, Math.random() * this.canvas.width, 0, this, this.canvas))
        this.dead = true
    }
}