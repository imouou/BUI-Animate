/**
 * 首页模块
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function (requires, exports, module, global) {

    var pageview = {};

    // 模块初始化定义
    pageview.init = function () {

        /* 动画示例,支持链式动画,最后需要执行start(); */
        var uiAnimatePage = bui.animate({
            id: ".box",
            clear: true,
        });
        var uiAnimatePage1 = bui.animate({
            id: ".box1",
            clear: true,
        });

        // 焦点图 js 初始化:
        var uiSlide = bui.slide({
            id: "#uiSlide",
            height: 380,
            autopage: true,
            alignClassName: "bui-align-left",
            direction: "y",
            zoom: false,
            fullscreen: true
        })

        uiSlide.on("to", async function (index) {
            switch (index) {
                case 0:
                    await uiAnimatePage.restart();
                    break;
                case 1:
                    await uiAnimatePage1.start();
                    break;
            }
        }).to(0);

    }

    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})