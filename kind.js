import Player from "./player.js"
import Inputs from "./Inputs.js"
import State from "./state.js"
import Background from "./backgroun.js"
import { Worm, Fly, Spider, Plant } from "./enemy.js"

/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("cav")
const ctx = canvas.getContext("2d")
canvas.width = innerWidth - 40
canvas.height = innerHeight - 40


let deltatime = 0
let lastframe = 0
let thisframe = 0
let frameinterval = 2000

class Game {
    constructor(players, state, background, enemy) {
        this.play = players
        this.states = state
        this.background = background
        this.enemy = enemy
        this.gameover = false
        this.level = 0
        this.enearr = ["Worm"]
    }
    update(delta) {
        if (Lives <= 0) {
            this.gameover = true
            return;
        }
        this.play.update(this.states, delta)
        this.states.update(delta)
        this.background.forEach(back => back.update())
        this.enemy.forEach(en => {
            en.update(delta)
            if (collision(en.colX, this.play.colX, en.colY, this.play.colY, en.colrad, this.play.colrad)) {
                if (!this.play.power) Lives--
                Lives <= 0 ? en.deleteThis = false : en.deleteThis = true
            }
        })
        this.enemy = this.enemy.filter(e => !e.deleteThis)
    }
    draw() {
        this.background.forEach(back => back.draw(ctx))
        this.enemy.forEach(ene => ene.draw(ctx))
        this.play.draw(ctx)
        ctx.save()
        ctx.fillStyle = "White"
        ctx.font = "30px Arial"
        ctx.fillText("Score : " + Score, 50, 50)
        ctx.fillText("Lives : ", 50, 90)
        for (let i = 0; i < Lives; i++) {
            ctx.drawImage(livesim, 150 + (54 * i), 60)
        }
        ctx.restore()
    }
    addEnemy() {
        if (Score === 100) { this.enearr.push("Fly"); frameinterval = 1500 }
        if (Score === 150) { this.enearr.push("Spider"); frameinterval = 1000 }
        if (Score === 175) { this.enearr.push("Plant"); frameinterval = 300 }
        let e = Math.floor(Math.random() * this.enearr.length)
        if (this.enearr[e] === "Worm") this.enemy.push(new Worm(canvas, this.play))
        else if (this.enearr[e] === "Fly") this.enemy.push(new Fly(canvas, this.play))
        else if (this.enearr[e] === "Spider") this.enemy.push(new Spider(canvas, this.play))
        else if (this.enearr[e] === "Plant" && this.play.speed > 0) this.enemy.push(new Plant(canvas, this.play))
    }
}

function collision(X1, X2, Y1, Y2, rad1, rad2) {
    let dx = X1 - X2
    let dy = Y1 - Y2
    let rad = rad1 + rad2
    let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    if (distance > rad) return false
    else return true
}

let inputs = new Inputs()
let play = new Player(canvas, inputs)
let state = new State(play)
let back = [new Background("./Background/layer-1.png", canvas, play, 0),
new Background("./Background/layer-2.png", canvas, play, 0.1),
new Background("./Background/layer-3.png", canvas, play, 0.2),
new Background("./Background/layer-4.png", canvas, play, 0.4),
new Background("./Background/layer-5.png", canvas, play, 0.6),
new Background("./Background/layer-6.png", canvas, play, 0.9)]

let enemy = []
let Score = 0
let Lives = 3
let livesim = new Image()
livesim.src = "./heart.png"
let Ga = new Game(play, state, back, enemy)

function animate(times) {
    deltatime = times - lastframe
    lastframe = times

    if (thisframe > frameinterval) {
        Ga.addEnemy()
        thisframe = 0
        Score += 5
    }
    thisframe += deltatime
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    Ga.update(deltatime)
    Ga.draw()
    if (!Ga.gameover) requestAnimationFrame(animate)
    else {
        ctx.font = "50px Arial"
        ctx.textAlign = "center"
        ctx.fillText("GameOver!", canvas.width / 2, canvas.height / 2)
        ctx.fillText("Your Score : " + Score, canvas.width / 2, canvas.height / 2 + 50)
    }
}

animate(0)