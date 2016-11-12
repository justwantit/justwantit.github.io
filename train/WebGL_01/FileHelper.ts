class FileHelper {
    public static SaveFile(fileName: string,url: string) {
        var alink = document.createElement('a');
        alink.download = fileName;
        alink.href = url;
        alink.click();
    }

    public static SaveStringFile(fileName: string, fileContent: string): void {
        var blob = new Blob([fileContent]);
        try {
            window.navigator.msSaveBlob(blob, fileName);
            console.log("msSaveBlob");
        }
        catch (e) {
            console.log("不支持msSaveBlob");
            var alink = document.createElement('a');
            alink.download = fileName;
            alink.href = URL.createObjectURL(blob);
            alink.click();
        }
    }
}