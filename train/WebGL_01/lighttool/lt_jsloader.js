var lighttool;
(function (lighttool) {
    var JSLoader = (function () {
        function JSLoader() {
            this.importList = [];
        }
        JSLoader.instance = function () {
            if (!JSLoader._instance) {
                JSLoader._instance = new JSLoader();
            }
            return JSLoader._instance;
        };
        JSLoader.getXHR = function () {
            var xhr = null;
            if (window["XMLHttpRequest"]) {
                xhr = new window["XMLHttpRequest"]();
            }
            else {
                xhr = new ActiveXObject("MSXML2.XMLHTTP");
            }
            return xhr;
        };
        JSLoader.prototype.preload = function (complete) {
            var _this = this;
            this._complete = complete;
            requestAnimationFrame(function () {
                if (_this.importList.length > 0) {
                    _this.startLoadScript(null);
                }
                else {
                    _this.onAllLoadComplete();
                }
            });
        };
        JSLoader.prototype.addImportScript = function (path) {
            this.importList.push(path);
        };
        JSLoader.prototype.onAllLoadComplete = function () {
            if (this._complete) {
                this._complete();
            }
        };
        JSLoader.prototype.startLoadScript = function (e) {
            var _this = this;
            if (this.importList.length > 0) {
                var s = this.importList.shift();
                if (s.toLowerCase().indexOf(".js") >= 0) {
                    var script = document.createElement("script");
                    script.src = s;
                    script.onload = function (e) { return _this.startLoadScript(e); };
                    script.onerror = function (e) { return _this.loadScriptError(e); };
                    document.head.appendChild(script);
                }
                else if (s.toLowerCase().indexOf(".css") >= 0) {
                    var link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = s;
                    link.onload = function (e) { return _this.startLoadScript(e); };
                    link.onerror = function (e) { return _this.loadScriptError(e); };
                    document.head.appendChild(link);
                }
            }
            else {
                console.log("all complete");
                this.onAllLoadComplete();
            }
        };
        JSLoader.prototype.loadScriptError = function (e) {
            var error = "load Script Error \r\n no file:" + e.srcElement.src;
            alert(error);
            this.startLoadScript(null);
        };
        return JSLoader;
    }());
    lighttool.JSLoader = JSLoader;
})(lighttool || (lighttool = {}));
//# sourceMappingURL=lt_jsloader.js.map