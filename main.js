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
        }, 2000);
    }
    gameStart() {
        // 大盒子传到飞机中
        plane.init(this.main);
    }
}
new Engine()

// 飞机
var plane = {
    init: function (main) {
        this.ele = createDiv('my-warplain');
        this.main = main;
        this.move();
    }
    move: function () {
        document.onmousemove = function (eve) {
            var e = eve || window.event
            var l = e.clientX - this.ele.offsetLeft;
            var t = e.clientY
        }
    }
}

function createDiv(style) {
    var div = document.createElement('div');
    div.className = style;
    document.getElementById('body_main').appendChild(div);
    //返回值
    return div;
}