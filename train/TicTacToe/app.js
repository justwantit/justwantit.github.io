/// <reference path="./lighttool/lt_jsloader.d.ts" />
/// <reference path="./lighttool/lt_htmlui.d.ts" />
/// <reference path="./lighttool/lt_filepool.d.ts" />
window.onload = function () {
    lighttool.JSLoader.instance().addImportScript("lighttool/lt_htmlui.js");
    lighttool.JSLoader.instance().addImportScript("lighttool/lt_filepool.js");
    lighttool.JSLoader.instance().addImportScript("StateGame.js");
    lighttool.JSLoader.instance().preload(function () {
        //初始化面板
        var panel = document.getElementById("panel");
        lighttool.htmlui.panelMgr.instance().init(panel);
        var ide = new IDE.App();
        ide.changeState(new IDE.StateGame());
    });
};
var IDE;
(function (IDE) {
    var App = (function () {
        function App() {
            this.curState = null;
            this.data = new AppData();
        }
        App.prototype.changeState = function (s) {
            if (this.curState != null) {
                this.curState.onExit();
            }
            this.curState = s;
            if (this.curState != null) {
                this.curState.onInit(this);
            }
        };
        return App;
    }());
    IDE.App = App;
    var AppData = (function () {
        function AppData() {
            this.user_sha1 = "";
            this.code_sha1 = "";
        }
        return AppData;
    }());
    IDE.AppData = AppData;
})(IDE || (IDE = {}));
//# sourceMappingURL=app.js.map