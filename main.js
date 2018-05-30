//初始化页面
class Engine {
    constructor() {
        this.aLi = document.getElementById('options').children;
        this.main = document.getElementById('body_main');
        this.hard = 1;
        this.init();
    }
    init() {
        var that = this
        for (var i = 0; i < this.aLi.length; i++) {
            this.aLi[i].onclick = function () {
                this.parentNode.remove()
                that.hrad = this.value;
                that.loading()
            }
        }
    }
    loading() {
        //背景移动
        var iNow = 0
        setInterval(() => {
            iNow += 4;
            this.main.style.backgroundPositionY = iNow + 'px';
        }, 30);
        //飞机大战背景logo
        var logo = createDiv('logo')
        //loading logo
        var loading = createDiv('loading')
        var i = 0
        this.smallTimer = setInterval(() => {
            if (i == 3) {
                i = 1
            } else {
                i++
            }
            loading.style.backgroundImage = 'url(images/loading' + i + '.png)'
        }, 400);
        setTimeout(() => {
            logo.remove();
            loading.remove();
            clearInterval(this.smallTimer);
            this.gameStart()
        }, 200);
    }
    gameStart() {
        // 大盒子传到飞机中
        plane.init(this.main);
        //飞机发射子弹
        setInterval(() => {
            plane.fire();
        }, 500);
        //敌机诞生
        new Enemy(this.main);
    }
}
new Engine()

// 飞机
var plane = {
    init: function (main) {
        this.main = main;
        this.ele = createDiv('my-warplain');
        this.ele.style.bottom = 0;
        this.ele.style.left = this.main.offsetWidth / 2 - this.ele.offsetWidth / 2 + 'px';
        this.move();
    },
    move: function () {
        var that = this;
        document.onmousemove = function (eve) {
            var e = eve || window.event
            var l = e.clientX - that.main.offsetLeft - that.ele.offsetWidth / 2;
            var t = e.clientY - that.ele.offsetHeight / 2;
            if (l < 0) l = 0;
            if (t < 0) t = 0;
            if (l > that.main.offsetWidth - that.ele.offsetWidth) l = that.main.offsetWidth - that.ele.offsetWidth;
            that.ele.style.left = l + 'px';
            that.ele.style.top = t + 'px';
        }
    },
    fire: function () {
        new Bullet();
    }
}

class Bullet {
    constructor() {

        this.init();
    }
    init() {
        this.ele = createDiv('bullet')
        this.ele.style.left = plane.ele.offsetLeft + plane.ele.offsetWidth / 2 - this.ele.offsetWidth / 2 + 'px';
        this.ele.style.top = plane.ele.offsetTop - this.ele.offsetHeight + 'px';
        this.move();
    }
    move() {
        this.ele.timer = setInterval(() => {
            this.ele.style.top = this.ele.offsetTop - 4 + 'px';
            if (this.ele.offsetTop <= 100) {
                this.die();
            }
        }, 30);
    }
    die() {
        this.ele.className = 'bullet_die';
        var i = 0;
        setInterval(() => {
            if (i == 2) {
                //图片切换速度跟不上,添加延时器
                setTimeout(() => {
                    this.ele.remove();
                    clearInterval(this.ele.timer);
                }, 100);
            } else {
                i++
            }
            this.ele.style.backgroundImg = 'url(images/die' + i + '.png)'
        }, 50);
    }
}

class Enemy {
    constructor(main) {
        this.main = main;
        this.init();
    }
    init() {
        this.ele = createDiv('enemy-small');
        this.ele.style.left = randomNum(this.main.offsetWidth - this.ele.offsetWidth, 0) + 'px';
        this.move()
    }
    move() {

    }
}

//封装生成div函数
function createDiv(style) {
    var div = document.createElement('div');
    div.className = style;
    document.getElementById('body_main').appendChild(div);
    //返回值
    return div;
}

//随机数封装
function randomNum(a, b) {
    return Math.round(Math.random() * (b - a) + a);
}