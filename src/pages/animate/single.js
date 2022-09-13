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

        uiAnimatePage.start();
    }

    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})