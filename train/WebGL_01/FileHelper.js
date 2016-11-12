var FileHelper = (function () {
    function FileHelper() {
    }
    FileHelper.SaveFile = function (fileName, url) {
        var alink = document.createElement('a');
        alink.download = fileName;
        alink.href = url;
        alink.click();
    };
    FileHelper.SaveStringFile = function (fileName, fileContent) {
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
    };
    return FileHelper;
}());
//# sourceMappingURL=FileHelper.js.map