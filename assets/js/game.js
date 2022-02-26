;
(() => {
    'use strict'

    const get = (element) => document.querySelector(element)

    const keyEvent = (control, func) => {
        document.addEventListener(control, func, false)
    }

    class BrickBreak {
        constructor(parent = 'body', data = {}) {
            this.parent = get(parent)
            this.canvas = document.createElement('canvas')
            this.canvas.setAttribute('width', 480)
            this.canvas.setAttribute('height', 340)
            this.ctx = this.canvas.getContext('2d')
            this.fontFamily = "12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            this.score = 0
            this.lives = data.lives
            this.speed = data.speed
            this.image = document.createElement('img')
            this.bg = data.bg
            this.radius = 10
            this.ballX = this.canvas.width / 2
            this.ballY = this.canvas.height - 30
            this.directX = data.speed
            this.directY = -data.speed
            this.paddleWidth = data.paddleWidth
            this.paddleHeight = data.paddleHeight
            this.rightPressed = false
            this.leftPressed = false
            this.paddleX = (this.canvas.width - this.paddleWidth) / 2
            this.brickRow = data.brickRow
            this.brickCol = data.brickCol
            this.brickWidth = data.brickWidth
            this.brickHeight = data.brickHeight
            this.brickPad = data.brickPad
            this.brickPosX = data.brickPosX
            this.brickPosY = data.brickPosY
            this.ballColor = data.ballColor
            this.paddleColor = data.paddleColor
            this.fontColor = data.fontColor
            this.brickStartColor = data.brickStartColor
            this.brickEndColor = data.brickEndColor
            this.image.setAttribute('src', this.bg)
            this.parent.appendChild(this.canvas)
            this.bricks = []
        }

        init = () => {
            //벽돌 배열 만들기
            for (let colIndex = 0; colIndex < this.brickCol; colIndex++) {
                this.bricks[colIndex] = []
                for (let rowIndex = 0; rowIndex < this.brickRow; rowIndex++) {
                    this.bricks[colIndex][rowIndex] = {
                        x: 0,
                        y: 0,
                        status: 1
                    }
                }
            }
            this.keyEvent()
            this.draw()
        }

        keyupEvent = (event) => {
            if ('Right' === event.key || 'ArrowRight' === event.key) {
                this.rightPressed = false
            } else if ('Left' === event.key || 'ArrowLeft' === event.key) {
                this.leftPressed = false
            }
        }

        keydownEvent = (event) => {
            if ('Right' === event.key || 'ArrowRight' === event.key) {
                this.rightPressed = true
            } else if ('Left' === event.key || 'ArrowLeft' === event.key) {
                this.leftPressed = true
            }
        }

        mousemoveEvent = (event) => {
            const positionX = (event.clientX - this.canvas.offsetLeft) / 3
        
            if (0 < positionX > 0 && positionX < this.canvas.width) {

                this.paddleX = positionX - this.paddleWidth / 2
            }
        }

        keyEvent = () => {
            keyEvent('keyup', this.keyupEvent)
            keyEvent('keydown', this.keydownEvent)
            keyEvent('mousemove', this.mousemoveEvent)
        }

        drawBall = () => {
            this.ctx.beginPath()
            this.ctx.fillStyle = this.ballColor
            this.ctx.arc(this.ballX, this.ballY, this.radius, 0, Math.PI * 2)
            this.ctx.fill()
            this.ctx.closePath()
        }

        drawPaddle = () => {
            this.ctx.beginPath()
            this.ctx.rect(
                this.paddleX,
                this.canvas.height - this.paddleHeight,
                this.paddleWidth,
                this.paddleHeight
            )
            this.ctx.fillStyle = this.paddleColor
            this.ctx.fill()
            this.ctx.closePath()
        }

        drawBricks = () => {
            let brickX = 0
            let brickY = 0
            let gradient = this.ctx.createLinearGradient(0, 0, 200, 0)
            gradient.addColorStop(0, this.brickStartColor)
            gradient.addColorStop(1, this.brickEndColor)

            for (let colIndex = 0; colIndex < this.brickCol; colIndex++) {
                for (let rowIndex = 0; rowIndex < this.brickRow; rowIndex++) {
                    if (1 !== this.bricks[colIndex][rowIndex].status) {
                        continue
                    }
                    brickX = colIndex * (this.brickWidth + this.brickPad) + this.brickPosX
                    brickY = rowIndex * (this.brickHeight + this.brickPad) + this.brickPosY

                    this.bricks[colIndex][rowIndex].x = brickX
                    this.bricks[colIndex][rowIndex].y = brickY

                    this.ctx.beginPath()
                    this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight)
                    this.ctx.fillStyle = gradient
                    this.ctx.fill()
                    this.ctx.closePath()
                }
            }
        }

        drawScore = () => {
            this.ctx.font = this.fontFamily
            this.ctx.fillStyle = '#ffffff'
            this.ctx.fillText('점수 : ' + this.score, 10, 25)
        }

        // drawLives = () => {
        //     this.ctx.font = this.fontFamily
        //     this.ctx.fillStyle = '#ffffff'
        //     this.ctx.fillText('목숨 : ' + this.lives, this.canvas.width - 50, 25)
        // }

        detectCollision = () => {
            let currentBrick = {}

            for (let colIndex = 0; colIndex < this.brickCol; colIndex++) {
                for (let rowIndex = 0; rowIndex < this.brickRow; rowIndex++) {
                    currentBrick = this.bricks[colIndex][rowIndex]
                    if (1 !== currentBrick.status) {
                        continue
                    }

                    if (this.ballX > currentBrick.x && this.ballX < currentBrick.x + this.brickWidth && this.ballY > currentBrick.y && this.ballY < currentBrick.y + this.brickHeight) {
                        this.directY = -this.directY
                        currentBrick.status = 0

                        this.score++

                        if(this.score !== this.brickCol * this.brickRow){
                            continue;
                        }
                            alert('YOU WIN!')
                            this.ctx.fillText(' YOU WIN ',this.canvas.width/2-20, this.canvas.height/2+20)
                            document.querySelector('.gameBtn').style.opacity = '1'
                            this.reset(true)
                            // return
                    }
                }
            }
        }

        draw = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            this.ctx.drawImage(
                this.image,
                this.canvas.width / 2 - this.image.width / 2,
                this.canvas.height / 2 - this.image.height / 2
            )

            this.drawBall()
            this.drawPaddle()
            this.drawBricks()
            this.drawScore()
            // this.drawLives()
            this.detectCollision()

            //공이 벽에 닿을 때 튕겨나가게 하기
            if (this.ballX + this.directX > this.canvas.width - this.radius || this.ballX + this.directX < this.radius) {
                this.directX = -this.directX
            }
            if (this.ballY + this.directY < this.radius) {
                this.directY = -this.directY
            } else if (this.ballY + this.directY > this.canvas.height - this.radius) {
                if (
                    this.ballX > this.paddleX && this.ballX < this.paddleX + this.paddleWidth
                ) {
                    this.directY = -this.directY
                } else {
                    this.lives--
                    if (0 === this.lives) {
                        this.ctx.font = this.fontFamily
                        this.ctx.fillText(' GAME OVER ',this.canvas.width/2-30, this.canvas.height/2+20)
                        alert('GAME OVER!')
                            document.querySelector('.gameBtn').style.opacity = '1'
                            this.reset(true)
                            return
                    } else {
                        this.ballX = this.canvas.width / 2
                        this.ballY = this.canvas.height - this.paddleHeight
                        this.directX = this.speed
                        this.directY = -this.speed
                        this.paddleX = (this.canvas.width - this.paddleWidth) / 2
                    }
                }
            }

            if (this.rightPressed && this.paddleX < this.canvas.width - this.paddleWidth) {
                this.paddleX += 7
            } else if (this.leftPressed && 0 < this.paddleX) {
                this.paddleX -= 7
            }

            this.ballX += this.directX
            this.ballY += this.directY

            requestAnimationFrame(this.draw)
        }

        reset = () => {
            document.location.reload()
            // document.querySelector('.gameBtn').style.opacity = '1'
        }
    }

    const data = {
        lives: 1,
        speed: 10,
        paddleHeight: 10,
        paddleWidth: 75,
        bg: './assets/img/game.jpg',
        ballColor: "#ff9",
        paddleColor: "#e27575",
        fontColor: "#f2bb16",
        brickStartColor: "#f29f05",
        brickEndColor: "#f37712",
        brickRow: 3,
        brickCol: 5,
        brickWidth: 75,
        brickHeight: 20,
        brickPad: 10,
        brickPosX: 30,
        brickPosY: 30,
    }

    const brickBreak = new BrickBreak('.canvas', data)
    // brickBreak.init()

    //클릭 시 나타나는 게임창
    document.querySelector('.gameBtn').addEventListener('click', function(e){
            brickBreak.init()
            this.style.opacity = '0'
    })

})()