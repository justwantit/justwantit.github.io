var MenuMgr = (function () {
    function MenuMgr() {
        this.imgs = new Array();
    }
    MenuMgr.prototype.onInit = function (gl, canv) {
        var _this = this;
        this.gl = gl;
        this.canv = canv;
        this.imgs.push("res/1.jpg");
        this.imgs.push("res/2.jpg");
        this.imgsrcidx = 0;
        this.curMenu = lighttool.htmlui.panelMgr.instance().createPanel("main", 400, 300);
        this.curMenu.canDrag = true;
        this.curMenu.canDock = false;
        this.curMenu.toCenter();
        this.curMenu.setTitle("MenuMgr");
        var gui = new lighttool.htmlui.gui(this.curMenu.divContent);
        gui.onchange = function () { _this.onGUI(gui); };
        gui.update();
    };
    MenuMgr.prototype.creatCylinder = function (n) {
        var _this = this;
        var img = new Image();
        img.onload = function () {
            _this.cylinder = new Cylinder(_this.gl, _this.canv, n, 0.4, 1);
            _this.cylinder.initdata(); //初始化模型数据
            _this.cylinder.initImg(img); //初始化贴图信息
            _this.cylinder.drawself();
        };
        img.src = this.imgs[this.imgsrcidx];
    };
    MenuMgr.prototype.changepre = function (n) {
        this.cylinder.n = n;
        this.cylinder.initdata();
    };
    MenuMgr.prototype.changeImg = function () {
        var _this = this;
        if (this.cylinder == null) {
            alert("先生成再切图");
            return;
        }
        var img = new Image();
        img.onload = function () {
            _this.cylinder.initImg(img);
        };
        img.src = this.imgs[this.imgsrcidx = this.imgsrcidx == 0 ? 1 : 0];
    };
    MenuMgr.prototype.exportCyleinder = function () {
        if (this.cylinder == null) {
            alert("先生成再导出");
            return;
        }
        this.cylinder.getcurfiles("1.jpg", "res/1.jpg", "cyl.obj", "cyl.mtl");
    };
    MenuMgr.prototype.onGUI = function (gui) {
        gui.beginLayout_H();
        gui.add_A("输入切分数:");
        var str = gui.add_Textbox("20");
        if (gui.add_Button("生成")) {
            var n = Number(str);
            if (!isNaN(n)) {
                if (this.cylinder == null) {
                    this.creatCylinder(n);
                }
                else {
                    this.changepre(n);
                }
            }
            else {
                alert("输入正确的数字");
            }
        }
        gui.endLayout();
        gui.add_Space();
        if (gui.add_Button("change img")) {
            this.changeImg();
        }
        gui.add_Space();
        if (gui.add_Button("export")) {
            this.exportCyleinder();
        }
        //gui.beginLayout_H();
        //gui.add_A("拖拽上传文件");
        //var file = gui.add_DragFile();
        //gui.endLayout();
        //gui.add_Space();
    };
    return MenuMgr;
}());
//# sourceMappingURL=MenuMgr.js.map