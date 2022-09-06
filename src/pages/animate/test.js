loader.define(function (require, exports, module) {

    window.uiAnimate = bui.animate({
        id: ".moving",
        clear: true,
    });

    var uiAnimate2 = bui.animate({
        id: ".moving2",
        clear: true,
    });

    // 异步动画
    // uiAnimate.start().then(function () {
    //     // 第一组最后一个动画做完就开始执行
    //     uiAnimate2.start().then(function () {
    //         uiAnimate.reverse().then(function () {
    //             console.log(111)
    //             uiAnimate2.reverse()
    //         });
    //     })

    // })

    async function init() {
        uiAnimate2.start();
        // await uiAnimate.looping(2)
        let res = await uiAnimate.looping(2, [{
            loop: 1, before: function (d, x) {
                console.log("1before", x)
            }, after: function (d, x) {
                console.log("1after", x)
                uiAnimate2.reverse();
            }
        }, {
            loop: 2, before: function (d, x) {
                console.log("2before", x)
            }, after: function (d, x) {
                console.log("2after", x)

            }
        }]);

        await uiAnimate2.start();
    }

    // 同步动画
    init();


})
