import React, { Component } from 'react'
// import('./GreedySnake.less')
import './GreedySnake.css'
import { toast } from 'react-toastify';


export default class GreedySnake extends Component {

    render() {
        return (
            <div>
                <div className="main">

                    <div className="stage">
                        <div className="snake">
                            <div></div>
                        </div>
                        <div className="food">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>

                    <div className="score-panel">
                        <div >
                            SCORE: <span className="score">0</span>
                        </div>
                        <div >
                            LEVEL: <span className="level">1</span>
                        </div>
                    </div>

                </div>
                <button className="g"></button>
            </div>

        )
    }

    componentDidMount() {
        new GameControler()
        toast.warning('使用方向键控制贪吃蛇')
    }

}


// 食物
class Food {
    element: HTMLElement;
    constructor() {
        this.element = document.querySelector('.food')!

    }
    get x() {
        return this.element.offsetLeft
    }
    get y() {
        return this.element.offsetTop
    }

    change() {

        this.element.style.left = Math.round(Math.random() * 29) * 10 + 'px'
        this.element.style.top = Math.round(Math.random() * 29) * 10 + 'px'
    }
}


// 计分板
class ScorePanel {
    score: number = 0
    level: number = 1
    levelUpEveryScore: number
    maxLevel: number
    scoreE = document.querySelector('.score')!
    levelE = document.querySelector('.level')!
    constructor(levelUpEveryScore = 10, maxLevel = 10) {
        this.levelUpEveryScore = levelUpEveryScore
        this.maxLevel = maxLevel
    }
    addScore() {
        this.scoreE.innerHTML = ++this.score + ''
        if (this.score % this.levelUpEveryScore === 0 && this.level < this.maxLevel) {
            this.levelUp()
        }
        
    }
    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelE.innerHTML = ++this.level + ''
        }
        if (this.level === this.maxLevel){
            toast.warning('满级啦')
        }
    }

    fullLevel(){
        this.level=this.maxLevel
        this.levelE.innerHTML=this.maxLevel + '';
        toast.warning('满级啦')
    }

}


// 蛇
class Snake {
    element: HTMLElement
    head: HTMLElement
    body: HTMLCollection
    constructor() {
        this.element = document.getElementsByClassName('snake')[0] as HTMLElement
        this.head = document.querySelector('.snake > div') as HTMLElement
        this.body = this.element.getElementsByTagName('div')
    }
    get x() {
        return this.head.offsetLeft
    }
    get y() {
        return this.head.offsetTop
    }
    set x(v: number) {
        if (this.x === v) {
            return
        }
        if (this.body[1] && v === (this.body[1] as HTMLElement).offsetLeft) {
            if (v > this.x) {
                v = this.x - 10
            } else {
                v = this.x + 10
            }
        }
        if (v < 0 || v > 290) {
            throw new Error('撞墙了')
        }
        this.moveBody()
        this.head.style.left = v + 'px'
        this.check()

    }
    set y(v: number) {
        if (this.y === v) {
            return
        }
        if (this.body[1] && v === (this.body[1] as HTMLElement).offsetTop) {
            if (v > this.y) {
                v = this.y - 10
            } else {
                v = this.y + 10
            }
        }
        if (v < 0 || v > 290) {
            throw new Error('撞墙了')
            
        }
        this.moveBody()
        this.head.style.top = v + 'px'
        this.check()
    }

    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
        // console.log(this.element)
    }

    moveBody() {
        // console.log(this.body.length)
        for (let i = this.body.length - 1; i > 0; i--) {
            (this.body[i] as HTMLElement).style.left = (this.body[i - 1] as HTMLElement).offsetLeft + 'px';
            (this.body[i] as HTMLElement).style.top = (this.body[i - 1] as HTMLElement).offsetTop + 'px';
        }
    }

    check() {
        for (let i = 1; i < this.body.length; i++) {
            let t = this.body[i] as HTMLElement
            if (this.x === t.offsetLeft && this.y === t.offsetTop) {
                // console.log(this.x,t.offsetLeft,this.y,t.offsetTop)
                throw new Error('撞自己了')
            }
        }
    }

    // checkTurn(v: number) {
    //     if (this.body[2]) {
    //         let t = this.body[2] as HTMLElement

    //         if (t.offsetLeft > this.x && v > this.x) {
    //             return  this.x-10
    //         }
    //         if (t.offsetLeft < this.x && v < this.x) {
    //             return this.x+10
    //         }
    //         if (t.offsetTop > this.y && v > this.y) {
    //             return v = this.y-10
    //         }
    //         if (t.offsetLeft < this.y && v < this.y) {
    //             return v = this.y+10
    //         }
    //     }

    // }
}

//控制器
class GameControler {
    snake: Snake
    food: Food
    scorePanel: ScorePanel
    direction: string = ''
    isAlive = true
    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.init()
    }
    init() {
        
        document.querySelector('.g')!.addEventListener('click',()=>{this.scorePanel.fullLevel()})
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowUp':
                case 'Up':
                case 'ArrowDown':
                case 'Down':
                case 'ArrowLeft':
                case 'Left':
                case 'ArrowRight':
                case 'Right':
                    this.direction = e.key

            }
        })
        this.run()
    }
    run() {
        let X = this.snake.x
        let Y = this.snake.y
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10
                break
            case 'ArrowDown':
            case 'Down':
                Y += 10
                break
            case 'ArrowLeft':
            case 'Left':
                X -= 10
                break
            case 'ArrowRight':
            case 'Right':
                X += 10
                break
        }

        this.eat(X, Y)

        try {
            this.snake.x = X
            this.snake.y = Y
            // this.snake.moveBody()
        }
        catch (e){
            this.isAlive = false
            // console.log(e)
            toast.dark('Game Over!')
        }



        this.isAlive && setTimeout(() => {
            this.run()
        }, 200 - (this.scorePanel.level / (this.scorePanel.maxLevel + 1) * 200));
    }


    eat(x: number, y: number) {
        if (x === this.food.x && y === this.food.y) {
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }
}