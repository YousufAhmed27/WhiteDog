import { Particle } from "./particle.js"

const States = {
    Idle_Right: 0,
    Idle_Left: 1,
    Jump_Right: 2,
    Jump_Left: 3,
    Land_Right: 4,
    Land_Left: 5,
    Run_Right: 6,
    Run_Left: 7,
    Lay_Right: 8,
    Lay_Left: 9,
    Roll_Right: 10,
    Roll_Left: 11,
}

export default class State {
    constructor(player) {
        this.player = player
        this.currentState = ""
        this.boss = false
        this.particle = []
        this.fire = false
    }
    update(boss) {
        this.boss = boss
        if (this.currentState === "" && this.player.onground()) !boss ? this.Run_Right() : this.Idle()
        else if (this.currentState === "Run_Right") this.Run_Right()
        else if (this.currentState === "Run_Left") this.Run_Left()
        else if (this.currentState === "Jump") this.Jump()
        else if (this.player.dy < 0 && !this.player.onground()) this.Fall()
        else if (this.currentState === "Lay" && this.player.onground()) this.Lay()
        else if (this.currentState === "Roll" && this.player.onground()) this.Roll()
        else if (this.currentState === "Fire") this.Fire()
    }
    Idle() {
        this.player.power = false
        this.player.speed = 0
        this.player.speedback = 0
        this.player.frameY = this.player.idle
        this.player.maxFrame = 5
    }
    Run_Right() {
        this.player.power = this.fire
        this.player.frameY = States["Run_Right"]
        this.player.speed = 5
        this.player.speedback = this.boss ? 10 : 5
        this.player.maxFrame = 7
        this.player.idle = 0
        if (this.fire) this.player.particle.push(new Particle(this.player.X - 100,
            this.player.Y + this.player.height * 0.2,
            this.player.speed, this.player.width,
            this.player.height))
    }
    Run_Left() {
        this.player.power = this.fire
        this.player.frameY = States["Run_Left"]
        this.player.speed = 0
        this.player.speedback = this.boss ? -10 : -5
        this.player.maxFrame = 7
        this.player.idle = 1
        if (this.fire) this.player.particle.push(new Particle(this.player.X + this.player.width * 0.5,
            this.player.Y + this.player.height * 0.2,
            this.player.speed, this.player.width,
            this.player.height))
    }
    Jump() {
        this.player.power = this.fire
        this.player.dy = 40
        this.player.weight = 1.5
        this.player.maxFrame = 5
        this.player.frameY = this.player.idle === 0 ? States["Jump_Right"] : States["Jump_Left"]
        if (this.fire) this.player.particle.push(new Particle(this.player.X - 100,
            this.player.Y + this.player.height * 0.2,
            this.player.speed, this.player.width,
            this.player.height))
    }
    Fall() {
        this.player.maxFrame = 5
        this.player.power = this.fire
        this.player.frameY = this.player.idle === 0 ? States["Land_Right"] : States["Land_Left"]
        if (this.fire) this.player.particle.push(new Particle(this.player.X - 100,
            this.player.Y + this.player.height * 0.2,
            this.player.speed, this.player.width,
            this.player.height))
    }
    Lay() {
        this.player.speed = 0
        this.player.power = false
        this.player.speedback = 0
        this.player.maxFrame = 3
        this.player.frameY = this.player.idle === 0 ? States["Lay_Right"] : States["Lay_Left"]
    }
    Roll() {
        this.player.maxFrame = 5
        this.player.power = true
        this.player.speed = this.player.idle === 0 ? 10 : 0
        this.player.speedback = this.boss ? this.player.idle === 0 ? 20 : -20 : this.player.idle === 0 ? 10 : -10
        this.player.frameY = this.player.idle === 0 ? States["Roll_Right"] : States["Roll_Left"]
    }
    Fire() {
        this.fire = true
        setTimeout(_ => this.fire = false, 5000)
    }
}