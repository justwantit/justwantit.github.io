/// <reference path="./lighttool/lt_jsloader.d.ts" />
/// <reference path="./lighttool/lt_htmlui.d.ts" />
/// <reference path="./lighttool/lt_filepool.d.ts" />

window.onload = () =>
{
    lighttool.JSLoader.instance().addImportScript("lighttool/lt_htmlui.js");
    lighttool.JSLoader.instance().addImportScript("lighttool/lt_filepool.js");
    lighttool.JSLoader.instance().addImportScript("StateGame.js");

    lighttool.JSLoader.instance().preload(() =>
    {
        //初始化面板
        var panel = document.getElementById("panel") as HTMLDivElement;
        lighttool.htmlui.panelMgr.instance().init(panel);


        var ide = new IDE.App();
        ide.changeState(new IDE.StateGame());

    });
}

namespace IDE
{
    export interface IState
    {
        onInit(app: App);
        onExit();
    }
    export class App
    {
        curState: IState = null;
        changeState(s: IState)
        {
            if (this.curState != null)
            {
                this.curState.onExit();
            }
            this.curState = s;
            if (this.curState != null)
            {
                this.curState.onInit(this);
            }
        }
        data: AppData = new AppData();
    }
    export class AppData
    {
        user_sha1: string = "";
        code_sha1: string = "";

    }
}