/// <reference path="./lighttool/lt_jsloader.d.ts" />
/// <reference path="./lighttool/lt_htmlui.d.ts" />
/// <reference path="./lighttool/lt_filepool.d.ts" />
window.onload = () =>
{
    lighttool.JSLoader.instance().addImportScript("lighttool/lt_htmlui.js");
    lighttool.JSLoader.instance().addImportScript("lighttool/lt_filepool.js");
    lighttool.JSLoader.instance().addImportScript("MenuMgr.js");
    lighttool.JSLoader.instance().addImportScript("Cylinder.js");
    //lighttool.JSLoader.instance().addImportScript("lighttool/lt_babylon.js");
    //lighttool.JSLoader.instance().addImportScript("lighttool/lt_gd3d.js");


    lighttool.JSLoader.instance().preload(() =>
    {
        var canv: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
        var panel = document.getElementById("panel") as HTMLDivElement;

        canv.width = 1000;
        canv.height = 600;
        var gl = canv.getContext("webgl");

        lighttool.htmlui.panelMgr.instance().init(panel);
        var menuMgr = new MenuMgr();
        menuMgr.onInit(gl, canv);
        
    });

};