loader.define(function (requires, exports, module, global) {

    // 合并接收默认参数
    let props = $.extend(true, {
        name: "",
        other: "",
        content: ""
    }, module.props);

    var uiDialog = bui.dialog({
        id: "#uiDialog"
    });
    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "wish",
        data: {
            datas: props
        },
        methods: {
            anim() {
                /* 月亮升起动画 */
                var animMoon = bui.animate({ id: ".moon", clear: true });
                animMoon.start();

                /* 流星循环动画  */
                var animStar = bui.animate({ id: ".star,.star1", clear: true });
                animStar.loop({
                    type: "restart"
                });

                /* 标题跟内容动画 */
                var animTitle = bui.animate({ id: ".title,.desc,.desc-block", clear: true });
                animTitle.start();
            },
            custom(opt) {
                // 定制祝福
                uiDialog.open();
            },
            preview() {
                // 获取页面的Hash
                var currentHash = bui.history.getHash();

                uiDialog.close();

                bui.load({
                    url: currentHash.url,
                    param: this.$data.datas,
                    replace: true
                })
            }
        },
        watch: {
            "datas.name": function (val) {
                window.document.title = val ? val + "的中秋祝福" : "中秋祝福";
            }
        },
        computed: {},
        templates: {
            tplWish(data) {
                let html = "";
                let defaultContent = `<div class="desc-line">走了那么多地方</div>
                <div class="desc-line">最圆的月亮</div>
                <div class="desc-line">还是在家的方向</div>`

                html += `<div class="desc-line">祝${data.other}</div><div class="desc-line">${data.content}</div><div class="desc-line">${data.name ? '--' + data.name : ""}</div>`;

                let newhtml = data.name || data.other || data.content ? html : defaultContent;

                return newhtml;
            }
        },
        mounted: function () {
            // 数据解析后执行
            this.anim();
        }
    })

})