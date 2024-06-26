export default class Inputs {
    constructor() {
        this.key = []
        window.addEventListener("keydown", e => {
            if (e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "ArrowRight" ||
                e.key === "ArrowLeft" ||
                e.key === "x" ||
                e.key === "z" ||
                e.key === "Enter"
            ) {
                if (this.key.indexOf(e.key) === -1) {
                    this.key.push(e.key)
                }
            }
        })
        window.addEventListener("keyup", e => {
            if (e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "ArrowRight" ||
                e.key === "ArrowLeft" ||
                e.key === "x" ||
                e.key === "z" ||
                e.key === "Enter"
            ) {
                this.key.splice(this.key.indexOf(e.key), 1)
            }
        })
    }
}