var IDE;
(function (IDE) {
    var StateGame = (function () {
        function StateGame() {
            this.state = new Array(9);
            this.stateImg = new Array(9);
            this.spaceW = 18;
            this.spaceH = 3;
        }
        StateGame.prototype.onInit = function (app) {
            var _this = this;
            this.app = app;
            this.login = lighttool.htmlui.panelMgr.instance().createPanel("main", 600, 650);
            this.login.canDrag = false;
            this.login.toCenter();
            this.login.setTitle("GameView", "res_img/oo.png");
            var gui = new lighttool.htmlui.gui(this.login.divContent);
            gui.onchange = function () { _this.onGUI(gui); };
            this.initGameData();
            gui.update();
            //lighttool.htmlui.panelMgr.instance().setbackImg("res_img/back.jpg");
        };
        StateGame.prototype.initGameData = function () {
            for (var i = 0; i < 9; i++) {
                this.state[i] = 0;
            }
            this.curPlayer = 1;
            this.contStep = 0;
            this.gameoverState = 0;
            this.curstr = "turn O";
        };
        StateGame.prototype.caclImg = function () {
            for (var i = 0; i < 9; i++) {
                switch (this.state[i]) {
                    case 0:
                        this.stateImg[i] = "res_img/ox.png";
                        break;
                    case 1:
                        this.stateImg[i] = "res_img/oo.png";
                        break;
                    case -1:
                        this.stateImg[i] = "res_img/xx.png";
                        break;
                    default:
                        break;
                }
            }
        };
        StateGame.prototype.addBtn = function (gui, i) {
            gui.add_Space(this.spaceW, this.spaceH);
            if (gui.add_ButtonImg("", this.stateImg[i], "", { "width": "30%", "height": "30%" })) {
                if (this.state[i] != 0 || this.gameoverState != 0)
                    return;
                this.state[i] = this.curPlayer;
                this.contStep++;
                this.gameoverState = this.isGameOver();
                this.curPlayer = this.curPlayer == 1 ? -1 : 1;
                //this.curstr = this.curPlayer == 1 ? "turn O" : "turn X";
                gui.update();
            }
        };
        StateGame.prototype.onGUI = function (gui) {
            //this.tt++;
            //gui.add_Span(this.tt.toString());
            this.caclImg();
            gui.add_Space(this.spaceW, this.spaceH);
            for (var i = 0; i < 9; i++) {
                if (i % 3 == 0) {
                    if (i != 0) {
                        gui.endLayout();
                        gui.add_Space(this.spaceW, this.spaceH);
                    }
                    gui.beginLayout_H();
                }
                this.addBtn(gui, i);
            }
            gui.endLayout();
            if (this.gameoverState != 0) {
                this.curstr = this.showResult();
                gui.add_P(this.curstr, "", { "position": "absolute", "left": "100px", "top": "480px", "color": "#FF0033", "font-size": "250%" });
                gui.beginLayout_H();
                {
                    if (gui.add_Button("restart", "", { "font-size": "150%", "width": "80px", "height": "40px" })) {
                        this.initGameData();
                        gui.update();
                    }
                }
                gui.endLayout();
            }
            else if (this.curPlayer == -1) {
                this.caclStep();
            }
        };
        StateGame.prototype.caclStep = function () {
            //先找个格子  看能否结束游戏  包含己方胜利和平局
            for (var i = 0; i < 9; i++) {
                if (this.state[i] != 0)
                    continue;
                this.state[i] = this.curPlayer;
                this.contStep++;
                if (this.isGameOver() != 0) {
                    this.gameoverState = this.isGameOver();
                    return;
                }
                this.contStep--;
                this.state[i] = 0;
            }
            //再看对方下一步有没有可胜的地方
            for (var i = 0; i < 9; i++) {
                if (this.state[i] != 0)
                    continue;
                this.state[i] = this.curPlayer == 1 ? -1 : 1;
                if (this.isGameOver() != 0) {
                    this.contStep++;
                    this.state[i] = this.curPlayer;
                    this.curPlayer = this.curPlayer == 1 ? -1 : 1;
                    //this.curstr = this.curPlayer == 1 ? "turn O" : "turn X";
                    return;
                }
                this.state[i] = 0;
            }
            //顺便找个地方下
            for (var i = 0; i < 9; i++) {
                if (this.state[i] != 0)
                    continue;
                this.state[i] = this.curPlayer;
                this.contStep++;
                this.curPlayer = this.curPlayer == 1 ? -1 : 1;
                //this.curstr = this.curPlayer == 1 ? "turn O" : "turn X";
                return;
            }
        };
        StateGame.prototype.showResult = function () {
            var str;
            switch (this.gameoverState) {
                case 2:
                    str = "平局";
                    break;
                case 1:
                    str = "敢不敢继续";
                    break;
                case -1:
                    str = "这种蠢逼ai你都赢不了，丢人不！";
                    break;
                default:
                    break;
            }
            return str;
        };
        StateGame.prototype.isGameOver = function () {
            if (this.contStep >= 9) {
                return 2;
            }
            if (Math.abs(this.state[0] + this.state[4] + this.state[8]) == 3 ||
                Math.abs(this.state[2] + this.state[4] + this.state[6]) == 3 ||
                Math.abs(this.state[0] + this.state[1] + this.state[2]) == 3 ||
                Math.abs(this.state[3] + this.state[4] + this.state[5]) == 3 ||
                Math.abs(this.state[6] + this.state[7] + this.state[8]) == 3 ||
                Math.abs(this.state[0] + this.state[3] + this.state[6]) == 3 ||
                Math.abs(this.state[1] + this.state[4] + this.state[7]) == 3 ||
                Math.abs(this.state[2] + this.state[5] + this.state[8]) == 3) {
                return this.curPlayer;
            }
            return 0;
        };
        StateGame.prototype.onExit = function () {
            lighttool.htmlui.panelMgr.instance().removePanel(this.login);
        };
        return StateGame;
    }());
    IDE.StateGame = StateGame;
})(IDE || (IDE = {}));
//# sourceMappingURL=StateGame.js.map