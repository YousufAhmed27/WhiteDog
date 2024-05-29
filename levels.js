import Background from "./backgroun.js"

// Level 1
import { Worm, Fly, Spider, Plant } from "./enemy.js"
import { WalkingMonster } from "./boss.js"

// Level 2
import { Zombie, Grounder, Tracker, SpiderBig } from "./enemy.js"
import { ShadowDog } from "./boss.js"


function collision(X1, X2, Y1, Y2, rad1, rad2) {
    let dx = X1 - X2
    let dy = Y1 - Y2
    let rad = rad1 + rad2
    let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    if (distance > rad) return false
    else return true
}

class Level {
    constructor(canvas, play) {
        this.Pause = false
        this.Bossb = false
        this.Next = false
        this.enemy = []  // enemy alive now
        this.canvas = canvas
        this.play = play
        this.now = 0
        this.Win = false
    }
    update(delta, Score) {
        // control background
        if (!this.Pause && !this.Bossb) this.background.forEach(back => back.update())

        // control Boss
        if (this.Bossb && !this.Pause) {
            this.boss.update(delta)
            this.enemy = this.boss.enemy
        }
        if (this.Bossb && this.boss.Lives <= 0 && this.play.X + this.play.width + 50 > this.canvas.width) {
            this.Next = true
            this.GoBack()
        }

        // control enemies
        this.enemy.forEach(en => {
            en.update(delta)
            if (collision(en.colX, this.play.colX, en.colY, this.play.colY, en.colrad, this.play.colrad)) {
                if (!this.play.power) this.play.life--
                this.play.life <= 0 ? en.deleteThis = false : en.deleteThis = true
            }
        })
        this.enemy = this.enemy.filter(e => !e.deleteThis)
        this.now += delta
        if (this.now > this.interval) {
            this.addEnemy(Score)
            this.now = 0
        }
    }
    draw(ctx) {
        if (!this.Pause) {
            // draw Background
            this.background.forEach(back => back.draw(ctx))

            //draw Enemies + Player + Power
            this.enemy.forEach(ene => ene.draw(ctx))
        }
        if (this.Bossb) this.boss.draw(ctx)
    }
    BossFight() {
        this.Pause = true
        this.enemy = []
        setTimeout(() => {
            this.Bossb = true
            this.Pause = false
        }, 2000)
    }
    GoBack() {
        this.Pause = true
        this.enemy = []
        setTimeout(() => {
            this.Bossb = false
            this.Pause = false
        }, 2000)
    }
}

export class Level1 extends Level {
    constructor(canvas, play) {
        super(canvas, play)
        this.background = [
            new Background(BackL1L1, canvas, play, 0),
            new Background(BackL1L2, canvas, play, 0.1),
            new Background(BackL1L3, canvas, play, 0.2),
            new Background(BackL1L4, canvas, play, 0.4),
            new Background(BackL1L5, canvas, play, 0.6),
            new Background(BackL1L6, canvas, play, 0.9)
        ]
        this.enearr = ["Worm"] // enemy of the level
        this.boss = new WalkingMonster(canvas, play)
        this.interval = 2000
    }
    addEnemy(Score) {
        if (Score === 100) { this.enearr.push("Fly"); this.interval = 1500 }
        if (Score === 150) { this.enearr.push("Spider"); this.interval = 1000 }
        if (Score === 175 && !this.enemy.includes(new Plant(this.canvas, this.play))) { this.enearr.push("Plant"); this.interval = 300 }
        if (Score === 250) { this.BossFight() }

        let e = Math.floor(Math.random() * this.enearr.length)

        if (this.enearr[e] === "Worm") this.enemy.push(new Worm(this.canvas, this.play))
        else if (this.enearr[e] === "Fly") this.enemy.push(new Fly(this.canvas, this.play))
        else if (this.enearr[e] === "Spider") this.enemy.push(new Spider(this.canvas, this.play))
        else if (this.enearr[e] === "Plant" && this.play.speed > 0) this.enemy.push(new Plant(this.canvas, this.play))
    }
}

export class Level2 extends Level {
    constructor(canvas, play) {
        super(canvas, play)
        this.background = [
            new Background(BackL2L1, canvas, play, 0),
            new Background(BackL2L2, canvas, play, 0.2),
            new Background(BackL2L3, canvas, play, 0.4),
            new Background(BackL2L4, canvas, play, 0.6),
            new Background(BackL2L5, canvas, play, 0.9),
        ]
        this.enearr = ["Zombie"] // enemy of the level
        this.boss = new ShadowDog(canvas, play)
        this.interval = 2000
    }
    update(delta, Score) {
        if (this.Bossb) this.Pause = this.boss.pose
        super.update(delta, Score)
    }
    addEnemy(Score) {
        if (Score === 350) { this.enearr.push("Grounder"); this.interval = 800 }
        if (Score === 380) { this.enearr.push("Tracker"); this.interval = 1000 }
        if (Score === 450) { this.enearr.push("SpiderBig"); this.interval = 1000 }
        if (Score === 550) { this.BossFight() }

        let e = Math.floor(Math.random() * this.enearr.length)

        if (this.enearr[e] === "Zombie") this.enemy.push(new Zombie(this.canvas, this.play))
        else if (this.enearr[e] === "Grounder" && this.play.speed > 0) this.enemy.push(new Grounder(this.canvas, this.play))
        else if (this.enearr[e] === "Tracker") this.enemy.push(new Tracker(this.canvas, this.play))
        else if (this.enearr[e] === "SpiderBig") this.enemy.push(new SpiderBig(this.canvas, this.play))
    }
}


export class LevelWin extends Level {
    constructor(canvas, play) {
        super(canvas, play)
        this.background = [
            new Background("./Background/level1/layer-1.png", canvas, play, 0),
            new Background("./Background/level1/layer-2.png", canvas, play, 0.1),
            new Background("./Background/level1/layer-3.png", canvas, play, 0.3),
            new Background("./Background/level1/layer-4.png", canvas, play, 0.5),
            new Background("./Background/level1/layer-5.png", canvas, play, 0.7),
            new Background("./Background/level1/layer-6.png", canvas, play, 0.9),
        ]
        this.Score = 0
        this.Win = true
    }
    update(delta, Score) {
        this.Score = Score
        this.background.forEach(back => back.update())
    }
    draw(ctx) {
        this.background.forEach(back => back.draw(ctx))
        ctx.save()
        ctx.font = "50px Arial"
        ctx.textAlign = "center"
        ctx.fillText("You Have Won!!", this.canvas.width * 0.5, this.canvas.height * 0.5)
        ctx.fillText("Thanks For Playing", this.canvas.width * 0.5, this.canvas.height * 0.5 + 50)
        ctx.fillText("Your Score Is : " + this.Score, this.canvas.width * 0.5, this.canvas.height * 0.5 + 100)
        ctx.restore()
    }
}
