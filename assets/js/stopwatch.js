;(function(){
    'use strict'

    const get = (target) =>{
        return document.querySelector(target)
    }

    class Stopwatch{
        constructor(element){
            this.timer = element
            this.interval = null
            this.defaultTime = '00:00.00'
            this.startTime = 0
            this.elapsedTime = 0
        }

        //숫자 한자리수에서 두자리수로 변경
        addZero(number){
            if(number < 10){
                return '0' + number
            }
            if(number > 99){
                return number.toString().slice(0, -1)
            }
            return number
        }

        //setInterval 시간으로 변경
        timeToString(time){
            const date = new Date(time)
            const minutes = date.getUTCMinutes()
            const seconds = date.getUTCSeconds()
            const millisecond = date.getUTCMilliseconds()
            return `${this.addZero(minutes)}:${this.addZero(seconds)}.${this.addZero(millisecond)}`
        }

        print(text){
            this.timer.innerHTML = text
        }

        startTimer(){
            this.elapsedTime = Date.now() - this.startTime
            const time = this.timeToString(this.elapsedTime)
            this.print(time)
        }

        //시작버튼 함수
        start(){
            clearInterval(this.interval) //Start버튼을 여러번 눌러도 stop누르면 멈출수 잇게 초기화
            this.startTime = Date.now() - this.elapsedTime
            this.interval = setInterval(this.startTimer.bind(this), 10)
        }

        //멈춤버튼 함수
        stop(){
            clearInterval(this.interval)
        }

        //새로고침 함수
        reset(){
            clearInterval(this.interval)
            this.print(this.defaultTime)
            this.interval = null
            this.startTime = 0
            this.elapsedTime = 0
        }
    }

    const $startButton = get('.timer_button.start')
    const $stopButton = get('.timer_button.stop')
    const $resetButton = get('.timer_button.reset')
    const $timer = get('.timer')
    const stopwatch = new Stopwatch($timer)

    $startButton.addEventListener('click', ()=>{
        stopwatch.start()
    })

    $stopButton.addEventListener('click', ()=>{
        stopwatch.stop()
    })

    $resetButton.addEventListener('click', ()=>{
        stopwatch.reset()
    })
})()