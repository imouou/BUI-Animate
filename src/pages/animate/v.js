/**
 * 首页模块
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function (requires, exports, module, global) {

    var pageview = {};

    // 模块初始化定义
    pageview.init = async function () {
        /* 动画示例,支持链式动画,最后需要执行start(); */
        var uiAnimatePage = bui.animate({
            id: ".box"
        });

        await uiAnimatePage.right(200).down(200).start();
        await uiAnimatePage.right(200).up(200).start();

    }

    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})