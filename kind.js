/**@type {HTMLCanvasElement} */
import Player from "./player.js"
import { Roll, Fire } from "./power.js"
import Inputs from "./Inputs.js"
import State from "./state.js"
import { Level1, Level2, LevelWin } from "./levels.js"
window.addEventListener("load", function () {
    const d = division
    d.classList.add("go")
    const canvas = document.getElementById("cav")
    const ctx = canvas.getContext("2d")
    canvas.width = 2300
    canvas.height = 1157

    let deltatime = 0
    let lastframe = 0
    let thisframe = 0
    let frameinterval = 2000

    class Game {
        constructor(players, state, power, levels) {
            this.play = players
            this.states = state
            this.power = power
            this.levels = levels
            this.gameover = false
            this.Pause = false
            this.Boss = false
            this.win = false
        }
        update(delta) {
            //control the whole game => {Start - End - Background}
            if (this.play.life <= 0) { this.gameover = true; return; }

            // control each level
            if (level === 0 && Score > 250 && !this.Boss) Score = 250
            if (level === 1 && Score > 550 && !this.Boss) Score = 550
            this.levels[level].update(delta, Score)
            if (Score === 250) Score += 5
            if (Score === 550) Score += 5
            this.Pause = this.levels[level].Pause
            this.Boss = this.levels[level].Bossb
            this.win = this.levels[level].Win
            if (this.Pause) this.play.init()
            if (this.levels[level].Next) level++

            // control player
            if (level === 1 && this.power.length === 1) this.power.push(new Fire(inputs))
            this.play.update(this.states, delta, this.power, this.Boss)
            this.play.level = level + 1
            this.states.update(this.Boss)
            this.power.forEach(e => e.update())
            this.play.particle.forEach(e => e.update())
            this.play.particle = this.play.particle.filter(e => !e.deleteit)
        }
        draw() {
            this.levels[level].draw(ctx)
            if (!this.Pause) {
                //draw Player + Power
                this.play.draw(ctx)
                this.play.particle.forEach(e => e.draw(ctx))
                this.power.forEach(e => e.draw(ctx, canvas))

                // Score + Lives
                ctx.save()
                ctx.fillStyle = "White"
                ctx.font = "30px Arial"
                ctx.textAlign = "left"
                ctx.fillText("Score : " + Score, canvas.width / 40, 90)
                ctx.fillText("Lives : ", canvas.width / 40, 150)
                for (let i = 0; i < this.play.life; i++) { ctx.drawImage(livesim, 150 + (54 * i), 120) }
                ctx.restore()
            }
        }
    }

    let inputs = new Inputs()
    let play = new Player(canvas, inputs)
    let state = new State(play)
    let powRoll = new Roll(inputs)

    let powersarr = [powRoll]
    let level = 0
    let Score = level * 255
    let livesim = HeartPic

    let levels = [new Level1(canvas, play), new Level2(canvas, play), new LevelWin(canvas, play)]
    let Ga = new Game(play, state, powersarr, levels)

    function Initial() {
        thisframe = 0
        Score = level * 255
        inputs = new Inputs()
        play.init()
        state = new State(play)
        levels = [new Level1(canvas, play), new Level2(canvas, play), new LevelWin(canvas, play)]
        Ga = new Game(play, state, powersarr, levels)
        animate(0)
    }

    function animate(times) {
        deltatime = times - lastframe
        lastframe = times
        thisframe += deltatime

        if (!Ga.Pause && !Ga.Boss) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            if (thisframe > frameinterval && !Ga.win) { thisframe = 0; Score += 5 }
        }
        else {
            if (thisframe > 30) {
                ctx.save()
                ctx.fillStyle = "rgb(0, 0, 0, 0.2)"
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.restore()
                thisframe = 0
            }
        }

        Ga.update(deltatime)
        Ga.draw()

        if (!Ga.gameover) requestAnimationFrame(animate)
        else {
            ctx.font = "50px Arial"
            ctx.textAlign = "center"
            ctx.fillText("GameOver!", canvas.width / 2, canvas.height / 2)
            ctx.fillText("Your Score : " + Score, canvas.width / 2, canvas.height / 2 + 50)
            ctx.fillText("Press Enter To Play Again", canvas.width / 2, canvas.height / 2 + 100)
        }
    }
    window.addEventListener("keydown", (e) => { if (e.key === "Enter" && Ga.gameover) { Initial() } })
    animate(0)
})