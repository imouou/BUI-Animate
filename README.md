# BUI 动画控制器示例

使用Node按以下方式运行即可，也可以使用IIS等服务器运行。

```bash

# node 12.x - 16.x
node -v
# 安装依赖
npm i
# 运行
npm run dev
```

国内如果安装失败，按以下顺序尝试

```bash
# 先设置国内淘宝源
npm config set registry=https://registry.npmmirror.com
# 安装依赖
npm i
# 运行
npm run dev
```


# 玩转BUI系列一--动画控制交互篇：bui.animate

## 介绍

早在BUI 1.0 版本就已经加入了这个动画控制器，利用transform 进行上下左右旋转放大缩小等操作，简单的操控元素按步骤做动画。原本是打算在BUI控件里面用的，后面采用了`bui.toggle`来处理交互动画，用animate比较少，就一直搁着。直到最近1.7.3版本开始，才对这个动画控制器进行改造，改造后，现在支持属性动画，同步动画，顺序动画，循环动画等等，方便了许多。

## 改造前动画实例

### 单个动画原理
```html
<style>
    #animate {width:.6rem;height:.6rem;background:red;}
</style>
<div id="#animate"></div>
```

```js
/* 单个动画 */
var uiAnimate = bui.animate('#animate');
    uiAnimate.left(100).start();
```

效果图预览

![单个动画](https://www.easybui.com/uploads/20220913/656691f5fecaf14552874397ebe8bd27.gif)

相当于

```js
$("#animate").css({
    transiton: "all 300ms ease 0s";
    transform:"translateX(-100px)";
})
```

> 那用`$`来操控，看上去好像还更简单些？

BUI 默认是等比缩放的，画布的宽是有限的，比方：位移的值是750px, 在小屏幕640px的大小，就会超出屏幕110px，bui.animate的数值会转换成等比rem值，另外left,right 等方法操作的是正数，方便理解动画的位置，另外值是可以累积的，会记录之前的位置，继续做动画，这个就是`bui.animate`跟`$`操控的不同之处。

### 连续动画

```js
var uiAnimate = bui.animate({
    id: ".box"
});
// 连续动画
uiAnimate.clear().left(100).start(function () {
    this.skewX(10).start(function () {
        this.left(200).start()
    });
})
```


### 改造后的连续动画

```js

async function init() {
    var uiAnimate = bui.animate({
        id: ".box"
    });

    await uiAnimate.clear().left(100).start();
    await uiAnimate.skewX(10).start();
    await uiAnimate.left(200).start();
}
// 执行初始化
init();

```

![连续动画](https://www.easybui.com/uploads/20220913/799fe9aad209d27db4edab91ec5506fe.gif)

[点击预览](https://www.easybui.com/demo/#pages/animate/handle)


## 属性动画

通过一个元素需要初始化一个animate，做动画比较简单，但元素一多，逻辑就容易乱。所以改造的方向是让其支持样式，并支持属性动画，属性动画可以针对每个元素设置不同的动画时间，通过时间差组合更多形式的交互。


### 1.支持多个动画

```html
<style>
    .box {width:2rem;height:2rem;}
</style>
<div class="box success" anim-right="300"></div>
<div class="box warning" anim-right="300" anim-transition="500ms"></div>
```

```js
/* 一组动画 */
var uiAnimate = bui.animate({
    id: ".box",
    clear: true,
});
// clear 参数会清除默认的动画记录，每次都重新开始
// 开始动画
uiAnimate.start();
```

![同步动画](https://www.easybui.com/uploads/20220913/81e360c305fe4a8cf63cb9d056ea2b13.gif)

### 2.延迟顺序动画

```html
<style>
    .box {width:2rem;height:2rem;}
</style>
<div class="box success" anim-right="300"></div>
<div class="box warning" anim-right="300" anim-delay="200ms"></div>
```

```js
/* 一组动画 */
var uiAnimate = bui.animate({
    id: ".box",
    clear: true,
});
// 开始动画
uiAnimate.start();
```

![顺序出场动画](https://www.easybui.com/uploads/20220913/76c30fcb61abd7fcfa600520c6d9c2fd.gif)


### 3.反向动画

```html
<style>
    .box {width:2rem;height:2rem;}
</style>
<div class="box success" anim-right="300"></div>
<div class="box warning" anim-right="300" anim-delay="200ms"></div>
```

```js
/* 一组动画 */
var uiAnimate = bui.animate({
    id: ".box",
    clear: true,
});
// 开始动画
uiAnimate.reversestart();
```

![反序动画](https://www.easybui.com/uploads/20220913/24a2379a84ed9d1e3a8b5ea9aec4e37b.gif)


### 4. 分步V字动画-脚本操控

```html
<style>
    .box,.box1 {width:2rem;height:2rem;}
</style>
<div class="box success"></div>
```

```js
async function init() {
    /* 动画示例,支持链式动画,最后需要执行start(); */
    var uiAnimate = bui.animate({
        id: ".box"
    });

    await uiAnimate.right(200).down(200).start();
    await uiAnimate.right(200).up(200).start();
}
// 执行初始化
init();
```

![v字动画](https://www.easybui.com/uploads/20220913/164f1cbaf921a416f9392d6fd2403af5.gif)


### 5. 循环动画

```html
<style>
    .box {width:2rem;height:2rem;}
</style>
<div class="box success" anim-right="300"></div>
```

```js
// 初始化
var uiAnimate = bui.animate({
    id: ".box"
});

// 循环5次
uiAnimate.loop(5);
```

![循环动画](https://www.easybui.com/uploads/20220913/ca089941fd12aa6cebcd51dfcae40996.gif)


这些只是基本的transform 动画，它还可以做 property属性动画, 3d动画（需要浏览器支持），更改坐标等，更多方式请参考API自行摸索。


## 综合案例-分屏动画

朋友圈常见的推广宣传就很适合用这个来做动画了，结合 `bui.slide` 做一个多页例子，复制代码保存成html即可运行。

```html

<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <title>BUI</title>
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no,viewport-fit=cover">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/buijs@latest/lib/latest/bui.css" />

    <style>
        
        .bui-slide-fullscreen {
            background: #ddd;
        }
        .box1,
        .box {
            width: .6rem;
            height: .6rem;
            margin: .2rem;
        }
    </style>
</head>
<body>

    <div id="uiSlide" class="bui-slide">
        <div class="bui-slide-main">
            <ul>
                <li>
                    <div class="title">第一屏动画：每次进入播放一次</div>
                    <!-- 第1屏 -->
                    <div class="box success" anim-right="300"></div>
                    <div class="box success" anim-transition="500ms" anim-right="400" anim-delay="100ms"></div>
                    <div class="box warning" anim-transition="all 500ms ease-out" anim-right="500"
                        anim-delay="300ms">
                    </div>
                    <div class="box warning bui-right" anim-transition="all 500ms ease-out" anim-left="300">
                    </div>
                </li>
                <li style="display:none;">
                    <div class="title">第2屏动画:只播放一次</div>
                    <!--第2屏-->
                    <div class="box1 success" anim-right="300"></div>
                    <div class="box1 success" anim-transition="500ms" anim-right="400" anim-delay="100ms"></div>
                    <div class="box1 warning" anim-transition="all 500ms ease-out" anim-right="500"
                        anim-delay="300ms">
                    </div>
                    <div class="box1 warning bui-right" anim-transition="all 500ms ease-out" anim-left="300">
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/zepto.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/latest/bui.js"></script>
    <script>
    bui.ready(function () {
        // 业务及控件初始化
        var uiAnimate = bui.animate({
            id: ".box",
            clear: true,
        });
        var uiAnimate1 = bui.animate({
            id: ".box1",
            clear: true,
        });

        // 焦点图 js 初始化全屏:
        var uiSlide = bui.slide({
            id: "#uiSlide",
            alignClassName: "bui-align-left",   // 默认是上下左右垂直居中，这里修改为默认左对齐
            direction: "y", // 往上滑动
            fullscreen: true, // 全屏动画
            zoom: false,    // 全屏不需要等比缩放

        })
        // 每次切换的时候,根据索引改变不同动画
        uiSlide.on("to", async function (index) {
            switch (index) {
                case 0:
                    await uiAnimate.restart();
                    break;
                case 1:
                    await uiAnimate1.start();
                    break;
            }
        }).to(0);
    })
    </script>
</body>
</html>

```

![](https://www.easybui.com/uploads/20220913/34b785d1bb03bdebc62f45bb1443f769.gif)


效果预览: https://www.easybui.com/demo/#pages/animate/slide
所有示例预览：https://www.easybui.com/demo/#pages/animate/index


## 综合案例-中秋佳节


![预览](https://www.easybui.com/uploads/20220913/0cd68204cd30cba5efc537de3ef65a2f.jpg)

图片来源于网络

[打开链接预览](https://easybui.com/demo/#pages/animate/case/index)


