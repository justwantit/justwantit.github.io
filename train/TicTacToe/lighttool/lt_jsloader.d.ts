declare namespace lighttool {
    class JSLoader {
        private static _instance;
        private importList;
        private _complete;
        static instance(): JSLoader;
        private static getXHR();
        preload(complete: Function): void;
        addImportScript(path: string): void;
        private onAllLoadComplete();
        private startLoadScript(e);
        private loadScriptError(e);
    }
}
