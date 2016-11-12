declare namespace lighttool.filepool {
    class folderinfo {
        name: string;
        date: string;
        hash: string;
        totalsize: number;
        clone(): folderinfo;
    }
    class fileinfo {
        name: string;
        date: string;
        hash: string;
        size: number;
        clone(): fileinfo;
    }
    class filepooltool {
        static baseurl_data: string;
        static baseurl_filestat: string;
        static baseurl_fileupload: string;
        static login(user: string, code: string, fun: (txt: string, err: Error) => void): void;
        static newuser(user: string, code: string, fun: (txt: string, err: Error) => void): void;
        static data_findpublic(user: string, fun: (txt: string, err: Error) => void): void;
        static data_private_find(user: string, code: string, datakey: string, fun: (txt: string, err: Error) => void): void;
        static data_private_add(user: string, code: string, datakey: string, key: string, value: any, fun: (txt: string, err: Error) => void): void;
        static data_private_remove(user: string, code: string, datakey: string, key: string, value: any, fun: (txt: string, err: Error) => void): void;
        static data_findprivate(user: string, code: string, fun: (txt: string, err: Error) => void): void;
        static data_addfolder(user: string, code: string, folder: string, fun: (txt: string, err: Error) => void): void;
        static data_updatefolder(user: string, code: string, folder: string, hash: string, date: string, fun: (txt: string, err: Error) => void): void;
        static data_removefolder(user: string, code: string, folder: string, fun: (txt: string, err: Error) => void): void;
        static sha1(data: Uint8Array): string;
        static sha1str(str: string): string;
        static stringToUtf8Array(str: string): number[];
        static file_stat(hashname: string, fun: (txt: string, err: Error) => void): void;
        static file_str2blob(string: string): Blob;
        static file_u8array2blob(array: Uint8Array): Blob;
        static file_upload(file: Blob, name: string, fun: (txt: string, err: Error) => void): void;
        static file_loadText(url: string, fun: (_txt: string, _err: Error) => void): void;
        static file_loadArrayBuffer(url: string, fun: (_bin: ArrayBuffer, _err: Error) => void): void;
        static formatJson(json: string, reParse?: boolean, newLineBlock?: boolean, spaceOnValue?: boolean): string;
        static createFileInfoFromUrl(url: string, fun: (_info: fileinfo) => void): void;
    }
    class Folder extends folderinfo {
        constructor(name: string, hash: string);
        newhash: string;
        subFolder: {
            [id: string]: folderinfo;
        };
        subFile: {
            [id: string]: fileinfo;
        };
        fromJson(txt: string): void;
        static getEmptyJson(): string;
        toJson(): string;
        getURLSelf(): string;
    }
    class FolderTool {
        static createRaw(): FolderTool;
        static createFromCode(_code: string): FolderTool;
        private static getQueryString(name, srcstr);
        constructor(user: string, path: string, file: string);
        setCode(code: string): void;
        setPrivate(): void;
        private user;
        private code;
        private paths;
        private setFile;
        private folders;
        private isInit;
        hasInit(): boolean;
        getFilename(): string;
        setFilename(name: string): void;
        getFileInfo(): fileinfo;
        getCurFolderInfo(): folderinfo;
        private static getRootFolderHash(user, name, fun);
        Init(finish: (url: string) => void): void;
        InitByRawUrl(url: string, finish: (url: string) => void): void;
        private updateInfo(hashFolder, index, finish);
        File_Delete(finish: () => void): void;
        private uploadDataInfo(filehash, size, finish);
        File_Save(data: Uint8Array, finish: () => void): void;
    }
}
