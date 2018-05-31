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
        // 大盒子属性传到飞机中
        plane.init(this.main);
        //飞机发射子弹
        setInterval(() => {
            plane.fire();
        }, 300);
        //敌机诞生
        // new Enemy(this.main);
        setInterval(() => {
            if (Math.random() > 0.5) new Enemy(this.main, 1);
        }, 1500);
        setInterval(() => {
            if (Math.random() > 0.7) new Enemy(this.main, 2);
        }, 3000);
        setInterval(() => {
            if (Math.random() > 0.85) new Enemy(this.main, 3);
        }, 6000);
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
        // new Bullet();
        this.aBullet.push(new Bullet());
    },
    aBullet: []
}
//子弹
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
            if (this.ele.offsetTop <= 0) {
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
        for (var j = 0; j < plane.aBullet.length; j++) {
            if (plane.aBullet[j].ele == this.ele) {
                plane.aBullet.splice(j, 1)
                break;
            }
        }
        // console.log(plane.aBullet);
    }
}
//敌机
class Enemy {
    constructor(main, value) {
        this.main = main;
        this.value = value;
        this.init();
    }
    init() {
        switch (this.value) {
            case 1:
                this.ele = createDiv('enemy-small');
                this.speed = 3;
                this.img = 3;
                this.num = 1;
                this.hp = 2;
                break;
            case 2:
                this.ele = createDiv('enemy-middle');
                this.speed = 2;
                this.img = 4;
                this.num = 2;
                this.hp = 5;
                break;
            case 3:
                this.ele = createDiv('enemy-large');
                this.speed = 1;
                this.img = 6;
                this.num = 3;
                this.hp = 10;
                break;
        }
        this.ele.style.left = randomNum(this.main.offsetWidth - this.ele.offsetWidth, 0) + 'px';
        this.move()
    }
    move() {
        this.ele.timer = setInterval(() => {
            this.ele.style.top = this.ele.offsetTop + this.speed + 'px'
            if (this.ele.offsetTop >= this.main.offsetHeight + this.ele.offsetHeight) {
                this.die()
            }
            // 碰撞检测,根据敌机运动or子弹运动轨迹判断
            // 遍历bullet判断位置
            for (var i = 0; i < plane.aBullet.length; i++) {
                //左
                if (this.ele.offsetLeft - plane.aBullet[i].ele.offsetLeft < plane.aBullet[i].ele.offsetWidth) {
                    // 右
                    if (plane.aBullet[i].ele.offsetLeft < this.ele.offsetLeft + this.ele.offsetWidth) {
                        console.log(1);
                        // 中间下
                        if (plane.aBullet[i].ele.offsetTop < this.ele.offsetTop + this.ele.offsetHeight) {
                            //中间上
                            if (plane.aBullet[i].ele.offsetTop > this.ele.offsetTop) {
                                plane.aBullet[i].die();
                                this.hp--;
                                if (this.hp <= 0) {
                                    this.die();
                                }
                            }
                        }
                    }
                }

            }
        }, 30);
    }
    die() {
        var i = 0;
        setInterval(() => {
            if (i == this.img) {
                setTimeout(() => {
                    this.ele.remove()
                    clearInterval(this.ele.timer)
                }, 80);
            } else {
                i++
            }
            this.ele.style.backgroundImage = 'url(images/plane' + this.num + '_die' + i + '.png)'
        }, 50);
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