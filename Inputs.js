export default class Inputs {
    constructor() {
        this.key = []
        window.addEventListener("keydown", e => {
            if (e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "ArrowRight" ||
                e.key === "ArrowLeft" ||
                e.key === "x"
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
                e.key === "x"
            ) {
                this.key.splice(this.key.indexOf(e.key), 1)
            }
        })
    }
}