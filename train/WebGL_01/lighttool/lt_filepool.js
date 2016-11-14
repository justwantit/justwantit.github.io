var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lighttool;
(function (lighttool) {
    var filepool;
    (function (filepool) {
        var folderinfo = (function () {
            function folderinfo() {
            }
            folderinfo.prototype.clone = function () {
                var i = new folderinfo();
                i.name = this.name;
                i.date = this.date;
                i.hash = this.hash;
                return i;
            };
            return folderinfo;
        }());
        filepool.folderinfo = folderinfo;
        var fileinfo = (function () {
            function fileinfo() {
            }
            fileinfo.prototype.clone = function () {
                var i = new fileinfo();
                i.name = this.name;
                i.date = this.date;
                i.hash = this.hash;
                i.size = this.size;
                return i;
            };
            return fileinfo;
        }());
        filepool.fileinfo = fileinfo;
        var filepooltool = (function () {
            function filepooltool() {
            }
            filepooltool.login = function (user, code, fun) {
                var req = new XMLHttpRequest(); //ness
                req.open("POST", filepooltool.baseurl_data);
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 404)
                            fun(null, new Error("onerr 404"));
                        else
                            fun(req.responseText, null);
                    }
                };
                req.onerror = function () {
                    fun(null, new Error("onerr in req:")); //ness
                };
                var fdata = new FormData();
                fdata.append("func", "find");
                fdata.append("user", user);
                fdata.append("code", code);
                req.send(fdata);
            };
            filepooltool.newuser = function (user, code, fun) {
                var req = new XMLHttpRequest(); //ness
                req.open("POST", filepooltool.baseurl_data);
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 404)
                            fun(null, new Error("onerr 404"));
                        else
                            fun(req.responseText, null);
                    }
                };
                req.onerror = function () {
                    fun(null, new Error("onerr in req:")); //ness
                };
                var fdata = new FormData();
                fdata.append("func", "new");
                fdata.append("user", user);
                fdata.append("code", code);
                req.send(fdata);
            };
            filepooltool.data_findpublic = function (user, fun) {
                var req = new XMLHttpRequest(); //ness
                req.open("POST", filepooltool.baseurl_data);
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 404)
                            fun(null, new Error("onerr 404"));
                        else
                            fun(req.responseText, null);
                    }
                };
                req.onerror = function () {
                    fun(null, new Error("onerr in req:")); //ness
                };
                var fdata = new FormData();
                fdata.append("func", "find");
                fdata.append("user", user);
                req.send(fdata);
            };
            filepooltool.data_private_find = function (user, code, datakey, fun) {
                var req = new XMLHttpRequest(); //ness
                req.open("POST", filepooltool.baseurl_data);
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 404)
                            fun(null, new Error("onerr 404"));
                        else
                            fun(req.responseText, null);
                    }
                };
                req.onerror = function () {
                    fun(null, new Error("onerr in req:")); //ness
                };
                var fdata = new FormData();
                fdata.append("func", "find");
                fdata.append("user", user);
                fdata.append("code", code);
                var name = "private." + datakey;
                var json = {};
                json[name] = 1;
                fdata.append("findproj", JSON.stringify(json));
                req.send(fdata);
            };
            filepooltool.data_private_add = function (user, code, datakey, key, value, fun) {
                var req = new XMLHttpRequest(); //ness
                req.open("POST", filepooltool.baseurl_data);
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 404)
                            fun(null, new Error("onerr 404"));
                        else
                            fun(req.responseText, null);
                    }
                };
                req.onerror = function () {
                    fun(null, new Error("onerr in req:")); //ness
                };
                var fdata = new FormData();
                fdata.append("func", "update");
                fdata.append("user", user);
                fdata.append("code", code);
                var name = "private." + datakey + "." + key;
                //var value = { "name": folder, "hash": "", "date": (new Date()).toUTCString() };
                var json = {};
                json[name] = value;
                fdata.append("updateparam", JSON.stringify({ "$set": json }));
                req.send(fdata);
            };
            filepooltool.data_private_remove = function (user, code, datakey, key, value, fun) {
                var req = new XMLHttpRequest(); //ness
                req.open("POST", filepooltool.baseurl_data);
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 404)
                            fun(null, new Error("onerr 404"));
                        else
                            fun(req.responseText, null);
                    }
                };
                req.onerror = function () {
                    fun(null, new Error("onerr in req:")); //ness
                };
                var fdata = new FormData();
                fdata.append("func", "update");
                fdata.append("user", user);
                fdata.append("code", code);
                var name = "private." + datakey + "." + key;
                var json = {};
                json[name] = 1;
                fdata.append("updateparam", JSON.stringify({ "$unset": json }));
                req.send(fdata);
            };
            filepooltool.data_findprivate = function (user, code, fun) {
                var req = new XMLHttpRequest(); //ness
                req.open("POST", filepooltool.baseurl_data);
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 404)
                            fun(null, new Error("onerr 404"));
                        else
                            fun(req.responseText, null);
                    }
                };
                req.onerror = function () {
                    fun(null, new Error("onerr in req:")); //ness
                };
                var fdata = new FormData();
                fdata.append("func", "find");
                fdata.append("user", user);
                fdata.append("code", code);
                fdata.append("findproj", JSON.stringify({ "private.folder": "1" }));
                req.send(fdata);
            };
            filepooltool.data_addfolder = function (user, code, folder, fun) {
                var req = new XMLHttpRequest(); //ness
                req.open("POST", filepooltool.baseurl_data);
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 404)
                            fun(null, new Error("onerr 404"));
                        else
                            fun(req.responseText, null);
                    }
                };
                req.onerror = function () {
                    fun(null, new Error("onerr in req:")); //ness
                };
                var fdata = new FormData();
                fdata.append("func", "update");
                fdata.append("user", user);
                fdata.append("code", code);
                var name = "public.folders." + folder;
                var value = { "name": folder, "hash": "", "date": (new Date()).toUTCString() };
                var json = {};
                json[name] = value;
                fdata.append("updateparam", JSON.stringify({ "$set": json }));
                req.send(fdata);
            };
            filepooltool.data_updatefolder = function (user, code, folder, hash, date, fun) {
                var req = new XMLHttpRequest(); //ness
                req.open("POST", filepooltool.baseurl_data);
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 404)
                            fun(null, new Error("onerr 404"));
                        else
                            fun(req.responseText, null);
                    }
                };
                req.onerror = function () {
                    fun(null, new Error("onerr in req:")); //ness
                };
                var fdata = new FormData();
                fdata.append("func", "update");
                fdata.append("user", user);
                fdata.append("code", code);
                var name = "public.folders." + folder;
                var value = { "name": folder, "hash": hash, "date": date };
                var json = {};
                json[name] = value;
                fdata.append("updateparam", JSON.stringify({ "$set": json }));
                req.send(fdata);
            };
            filepooltool.data_removefolder = function (user, code, folder, fun) {
                var req = new XMLHttpRequest(); //ness
                req.open("POST", filepooltool.baseurl_data);
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 404)
                            fun(null, new Error("onerr 404"));
                        else
                            fun(req.responseText, null);
                    }
                };
                req.onerror = function () {
                    fun(null, new Error("onerr in req:")); //ness
                };
                var fdata = new FormData();
                fdata.append("func", "update");
                fdata.append("user", user);
                fdata.append("code", code);
                var name = "public.folders." + folder;
                var json = {};
                json[name] = 1;
                fdata.append("updateparam", JSON.stringify({ "$unset": json }));
                req.send(fdata);
            };
            filepooltool.sha1 = function (data) {
                var i, j, t;
                var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
                s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
                for (t = new DataView(s.buffer), i = 0; i < l; i++)
                    s[i] = t.getUint32(i << 2);
                s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
                s[l - 1] = data.length << 3;
                var w = [], f = [
                    function () { return m[1] & m[2] | ~m[1] & m[3]; },
                    function () { return m[1] ^ m[2] ^ m[3]; },
                    function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
                    function () { return m[1] ^ m[2] ^ m[3]; }
                ], rol = function (n, c) { return n << c | n >>> (32 - c); }, k = [1518500249, 1859775393, -1894007588, -899497514], m = [1732584193, -271733879, null, null, -1009589776];
                m[2] = ~m[0], m[3] = ~m[1];
                for (i = 0; i < s.length; i += 16) {
                    var o = m.slice(0);
                    for (j = 0; j < 80; j++)
                        w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
                            t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
                            m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
                    for (j = 0; j < 5; j++)
                        m[j] = m[j] + o[j] | 0;
                }
                ;
                t = new DataView(new Uint32Array(m).buffer);
                for (i = 0; i < 5; i++)
                    m[i] = t.getUint32(i << 2);
                var sha1 = new Uint8Array(new Uint32Array(m).buffer);
                var sha1str = "";
                for (i = 0; i < sha1.length; i++) {
                    var ss = sha1[i].toString(16);
                    if (ss.length == 1) {
                        sha1str += "0" + ss;
                    }
                    else
                        sha1str += ss;
                }
                return sha1str;
            };
            filepooltool.sha1str = function (str) {
                var u = filepooltool.stringToUtf8Array(str);
                var u8a = new Uint8Array(u);
                return filepooltool.sha1(u8a);
            };
            filepooltool.stringToUtf8Array = function (str) {
                var bstr = [];
                for (var i = 0; i < str.length; i++) {
                    var c = str.charAt(i);
                    var cc = c.charCodeAt(0);
                    if (cc > 0xFFFF) {
                        throw new Error("InvalidCharacterError");
                    }
                    if (cc > 0x80) {
                        if (cc < 0x07FF) {
                            var c1 = (cc >>> 6) | 0xC0;
                            var c2 = (cc & 0x3F) | 0x80;
                            bstr.push(c1, c2);
                        }
                        else {
                            var c1 = (cc >>> 12) | 0xE0;
                            var c2 = ((cc >>> 6) & 0x3F) | 0x80;
                            var c3 = (cc & 0x3F) | 0x80;
                            bstr.push(c1, c2, c3);
                        }
                    }
                    else {
                        bstr.push(cc);
                    }
                }
                return bstr;
            };
            filepooltool.file_stat = function (hashname, fun) {
                var req = new XMLHttpRequest(); //ness
                req.open("POST", filepooltool.baseurl_filestat);
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 404)
                            fun(null, new Error("onerr 404"));
                        else
                            fun(req.responseText, null);
                    }
                };
                req.onerror = function () {
                    fun(null, new Error("onerr in req:")); //ness
                };
                var fdata = new FormData();
                fdata.append("name", hashname);
                req.send(fdata);
            };
            filepooltool.file_str2blob = function (string) {
                var u8 = new Uint8Array(filepooltool.stringToUtf8Array(string));
                var blob = new Blob([u8]);
                return blob;
            };
            filepooltool.file_u8array2blob = function (array) {
                var blob = new Blob([array]);
                return blob;
            };
            filepooltool.file_upload = function (file, name, fun) {
                var req = new XMLHttpRequest(); //ness
                req.open("POST", filepooltool.baseurl_fileupload);
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 404)
                            fun(null, new Error("onerr 404"));
                        else
                            fun(req.responseText, null);
                    }
                };
                req.onerror = function () {
                    fun(null, new Error("onerr in req:")); //ness
                };
                var fdata = new FormData();
                fdata.append("name", name);
                fdata.append("file", file);
                req.send(fdata);
            };
            filepooltool.file_loadText = function (url, fun) {
                var req = new XMLHttpRequest(); //ness
                req.open("GET", url);
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 404)
                            fun(null, new Error("onerr 404"));
                        else
                            fun(req.responseText, null);
                    }
                };
                req.onerror = function () {
                    fun(null, new Error("onerr in req:")); //ness
                };
                req.send();
            };
            filepooltool.file_loadArrayBuffer = function (url, fun) {
                var req = new XMLHttpRequest(); //ness
                req.open("GET", url);
                req.responseType = "arraybuffer"; //ie 一定要在open之后修改responseType
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 404)
                            fun(null, new Error("onerr 404"));
                        else
                            fun(req.response, null);
                    }
                };
                req.onerror = function () {
                    fun(null, new Error("onerr in req:")); //ness
                };
                req.send();
            };
            ///json 
            filepooltool.formatJson = function (json, reParse, newLineBlock, spaceOnValue) {
                if (reParse === void 0) { reParse = false; }
                if (newLineBlock === void 0) { newLineBlock = true; }
                if (spaceOnValue === void 0) { spaceOnValue = false; }
                var reg = null, formatted = '', pad = 0, PADDING = '    '; // one can also use '\t' or a different number of spaces
                if (reParse) {
                    var _json = JSON.parse(json);
                    json = JSON.stringify(_json);
                }
                // add newline before and after curly braces
                reg = /([\{\}])/g;
                json = json.replace(reg, '\r\n$1\r\n');
                // add newline before and after square brackets
                reg = /([\[\]])/g;
                json = json.replace(reg, '\r\n$1\r\n');
                // add newline after comma
                reg = /(\,)/g;
                json = json.replace(reg, '$1\r\n');
                // remove multiple newlines
                reg = /(\r\n\r\n)/g;
                json = json.replace(reg, '\r\n');
                // remove newlines before commas
                reg = /\r\n\,/g;
                json = json.replace(reg, ',');
                // optional formatting...
                if (!newLineBlock) {
                    reg = /\:\r\n\{/g;
                    json = json.replace(reg, ':{');
                    reg = /\:\r\n\[/g;
                    json = json.replace(reg, ':[');
                }
                if (spaceOnValue) {
                    reg = /\:/g;
                    json = json.replace(reg, ': ');
                }
                var sstar = json.split('\r\n');
                for (var index = 0; index < sstar.length; index++) {
                    var node = sstar[index];
                    var i = 0, indent = 0, padding = '';
                    if (node.match(/\{$/) || node.match(/\[$/)) {
                        indent = 1;
                    }
                    else if (node.match(/\}/) || node.match(/\]/)) {
                        if (pad !== 0) {
                            pad -= 1;
                        }
                    }
                    else {
                        indent = 0;
                    }
                    for (i = 0; i < pad; i++) {
                        padding += PADDING;
                    }
                    formatted += padding + node + '\r\n';
                    pad += indent;
                }
                return formatted;
            };
            ;
            filepooltool.createFileInfoFromUrl = function (url, fun) {
                filepooltool.file_loadArrayBuffer(url, function (bin, err) {
                    var name = "";
                    var ni = url.indexOf("?[");
                    if (ni > 0) {
                        name = url.substr(ni + 2);
                        name = name.substr(0, name.length - 1);
                    }
                    else {
                        ni = url.lastIndexOf("/");
                        name = url.substr(ni + 1);
                        ni = name.indexOf("?");
                        if (ni >= 0)
                            name = name.substr(0, ni);
                    }
                    var _info = new fileinfo();
                    _info.size = bin.byteLength;
                    _info.date = new Date().toUTCString();
                    _info.hash = filepooltool.sha1(new Uint8Array(bin));
                    _info.name = name;
                    fun(_info);
                });
            };
            filepooltool.baseurl_data = "http://redmine.cafegame.cn:999/filepool/data.aspx";
            filepooltool.baseurl_filestat = "http://redmine.cafegame.cn:999/filepool/stat.aspx";
            filepooltool.baseurl_fileupload = "http://redmine.cafegame.cn:999/filepool/upload.aspx";
            return filepooltool;
        }());
        filepool.filepooltool = filepooltool;
        var Folder = (function (_super) {
            __extends(Folder, _super);
            function Folder(name, hash) {
                _super.call(this);
                //name: string;//folder name;
                //date: string;
                //parent: Folder = null;
                //hash: string;//folder hash
                this.newhash = "";
                this.name = name;
                this.hash = hash;
                if (this.hash == null || this.hash == "") {
                    this.subFile = {};
                    this.subFolder = {};
                    this.toJson();
                    this.hash = this.newhash;
                }
            }
            Folder.prototype.fromJson = function (txt) {
                var json = JSON.parse(txt);
                var subfile = json["subfile"];
                var subfolder = json["subfolder"];
                this.subFile = {};
                this.totalsize = 0;
                for (var i = 0; i < subfile.length; i++) {
                    this.totalsize += subfile[i].size;
                    this.subFile[subfile[i].name] = subfile[i];
                }
                this.subFolder = {};
                for (var i = 0; i < subfolder.length; i++) {
                    this.totalsize += subfolder[i].totalsize;
                    this.subFolder[subfolder[i].name] = subfolder[i];
                }
            };
            Folder.getEmptyJson = function () {
                var obj = {
                    "subfile": [],
                    "subfolder": []
                };
                var s = JSON.stringify(obj);
                return s;
            };
            Folder.prototype.toJson = function () {
                var obj = {
                    "subfile": [],
                    "subfolder": []
                };
                this.totalsize = 0;
                for (var key in this.subFile) {
                    if (this.subFile[key] == undefined)
                        continue;
                    obj.subfile.push(this.subFile[key]);
                    this.totalsize += this.subFile[key].size;
                }
                obj.subfile.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
                for (var key in this.subFolder) {
                    if (this.subFolder[key] == undefined)
                        continue;
                    var v = this.subFolder[key];
                    if (v.totalsize == undefined)
                        v.totalsize = 0;
                    obj.subfolder.push({
                        name: v.name,
                        date: v.date,
                        hash: v.hash,
                        totalsize: v.totalsize
                    });
                    if (this.subFolder[key].totalsize != undefined)
                        this.totalsize += this.subFolder[key].totalsize;
                }
                obj.subfolder.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
                var s = JSON.stringify(obj);
                this.newhash = filepooltool.sha1str(s);
                return s;
            };
            Folder.prototype.getURLSelf = function () {
                return "http://7xn12u.com1.z0.glb.clouddn.com/" + this.name + ".folderjson.txt";
            };
            return Folder;
        }(folderinfo));
        filepool.Folder = Folder;
        var FolderTool = (function () {
            function FolderTool(user, path, file) {
                this.user = null;
                this.code = null;
                this.paths = [];
                this.setFile = null;
                this.folders = [];
                this.isInit = false;
                this.user = user;
                if (path != null)
                    this.paths = path.split("/");
                else
                    this.paths = [];
                this.setFile = file;
            }
            FolderTool.createRaw = function () {
                var p = new FolderTool(null, null, null);
                return p;
            };
            FolderTool.createFromCode = function (_code) {
                var user = this.getQueryString("user", _code);
                var type = this.getQueryString("type", _code);
                var path = this.getQueryString("path", _code);
                var code = this.getQueryString("code", _code);
                var _private = this.getQueryString("private", _code);
                var file = "";
                if (type == "file") {
                    var inf = path.lastIndexOf("/");
                    var file = path.substr(inf + 1);
                    path = path.substr(0, inf);
                }
                if (user == null || path == null || type == null)
                    return null;
                var p = new FolderTool(user, path, file);
                if (code != null) {
                    p.setCode(code);
                }
                if (_private == "1") {
                    p.setPrivate();
                }
                return p;
            };
            FolderTool.getQueryString = function (name, srcstr) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = srcstr.match(reg);
                if (r != null)
                    return decodeURIComponent(r[2]);
                return null;
            };
            FolderTool.prototype.setCode = function (code) {
                this.code = code;
            };
            FolderTool.prototype.setPrivate = function () {
                throw new Error("not coding here.");
            };
            FolderTool.prototype.hasInit = function () {
                return this.isInit;
            };
            FolderTool.prototype.getFilename = function () {
                return this.setFile;
            };
            FolderTool.prototype.setFilename = function (name) {
                this.setFile = name;
            };
            FolderTool.prototype.getFileInfo = function () {
                if (this.folders == null || this.folders.length == 0)
                    return null;
                if (this.folders[this.folders.length - 1].subFile[this.setFile] == undefined)
                    return null;
                return this.folders[this.folders.length - 1].subFile[this.setFile];
            };
            FolderTool.prototype.getCurFolderInfo = function () {
                if (this.folders == null || this.folders.length == 0)
                    return null;
                return this.folders[this.folders.length - 1];
            };
            FolderTool.getRootFolderHash = function (user, name, fun) {
                lighttool.filepool.filepooltool.data_findpublic(user, function (txt, err) {
                    var j = JSON.parse(txt);
                    var p = null;
                    if (j != null)
                        p = j["public"];
                    if (p != null) {
                        var folders = p["folders"];
                        var f = folders[name];
                        if (f == undefined) {
                            fun(null);
                        }
                        else {
                            fun(f.hash);
                        }
                    }
                    else {
                        fun(null);
                    }
                });
            };
            FolderTool.prototype.Init = function (finish) {
                var _this = this;
                this.folders = [];
                FolderTool.getRootFolderHash(this.user, this.paths[0], function (hash) {
                    if (hash == null) {
                        _this.folders.push(new Folder(_this.paths[0], hash));
                        _this.updateInfo(null, 1, finish);
                    }
                    else {
                        _this.updateInfo(hash, 0, finish);
                    }
                });
            };
            FolderTool.prototype.InitByRawUrl = function (url, finish) {
                var name = "";
                var ni = url.indexOf("?[");
                if (ni > 0) {
                    name = url.substr(ni + 2);
                    name = name.substr(0, name.length - 1);
                }
                {
                    ni = url.lastIndexOf("/");
                    var hash = url.substr(ni + 1);
                    ni = hash.indexOf(".");
                    if (ni >= 0)
                        hash = hash.substr(0, ni);
                }
                if (name == "")
                    name = hash;
                this.paths = [name];
                this.updateInfo(hash, 0, finish);
            };
            FolderTool.prototype.updateInfo = function (hashFolder, index, finish) {
                var _this = this;
                if (index == this.paths.length) {
                    this.isInit = true;
                    var file = this.folders[this.folders.length - 1].subFile[this.setFile];
                    var filehash = (file == null) ? null : file.hash;
                    if (filehash != null) {
                        var ext = file.name.substr(file.name.indexOf("."));
                        lighttool.filepool.filepooltool.file_stat(filehash + ext, function (txt, err) {
                            var json = JSON.parse(txt);
                            if (json["code"] != 0) {
                                finish(null);
                            }
                            else {
                                var url = json["url"];
                                finish(url);
                            }
                        });
                    }
                    else {
                        finish(null);
                    }
                    return;
                }
                if (hashFolder == null) {
                    this.folders.push(new Folder(this.paths[index], ""));
                    this.updateInfo(null, index + 1, finish);
                    return;
                }
                lighttool.filepool.filepooltool.file_stat(hashFolder + ".folderjson.txt", function (txt, err) {
                    var json = JSON.parse(txt);
                    if (json["code"] != 0) {
                        _this.folders.push(new Folder(_this.paths[index], hashFolder));
                        _this.updateInfo(null, index + 1, finish);
                    }
                    else {
                        var url = json["url"];
                        lighttool.filepool.filepooltool.file_loadText(url, function (txt, err) {
                            _this.folders.push(new Folder(_this.paths[index], hashFolder));
                            _this.folders[index].fromJson(txt);
                            var hf = _this.folders[index].subFolder[_this.paths[index + 1]];
                            var hash = hf == null ? null : hf.hash;
                            _this.updateInfo(hash, index + 1, finish);
                        });
                    }
                });
            };
            FolderTool.prototype.File_Delete = function (finish) {
            };
            FolderTool.prototype.uploadDataInfo = function (filehash, size, finish) {
                var _this = this;
                this.Init(function (url) {
                    var last = _this.folders[_this.folders.length - 1];
                    if (last.subFile[_this.setFile] == null) {
                        last.subFile[_this.setFile] = new lighttool.filepool.fileinfo();
                    }
                    last.subFile[_this.setFile].name = _this.setFile;
                    last.subFile[_this.setFile].date = new Date().toUTCString();
                    last.subFile[_this.setFile].hash = filehash;
                    last.subFile[_this.setFile].size = size;
                    for (var i = _this.folders.length - 1; i >= 0; i--) {
                        var f = _this.folders[i];
                        var finfo = f.toJson();
                        if (f.newhash != f.hash) {
                            var b = lighttool.filepool.filepooltool.file_str2blob(finfo);
                            lighttool.filepool.filepooltool.file_upload(b, f.newhash + ".folderjson.txt", function (txt, err) {
                                var json = JSON.parse(txt);
                            });
                            if (i == 0) {
                                lighttool.filepool.filepooltool.data_updatefolder(_this.user, _this.code, f.name, f.newhash, new Date().toUTCString(), function (txt, err) {
                                    var json = JSON.parse(txt);
                                    if (json["_id"] != null) {
                                        finish();
                                    }
                                });
                            }
                            else {
                                var pfolder = _this.folders[i - 1];
                                pfolder.subFolder[f.name].hash = f.newhash;
                                pfolder.subFolder[f.name].totalsize = f.totalsize;
                            }
                            f.hash = f.newhash;
                        }
                    }
                });
            };
            FolderTool.prototype.File_Save = function (data, finish) {
                var _this = this;
                if (this.setFile == "" || this.setFile == null) {
                    throw new Error("you need a file");
                }
                var sha1 = lighttool.filepool.filepooltool.sha1(data).toUpperCase();
                var iext = this.setFile.indexOf(".");
                var ext = this.setFile.substr(iext).toLowerCase();
                var file = lighttool.filepool.filepooltool.file_u8array2blob(data);
                //文件上传结果，然后InitFolder，然后修改提交
                lighttool.filepool.filepooltool.file_stat(sha1 + ext, function (txt, err) {
                    var json = JSON.parse(txt);
                    if (json["code"] == 0) {
                        _this.uploadDataInfo(sha1, data.length, finish);
                    }
                    else {
                        lighttool.filepool.filepooltool.file_upload(file, sha1 + ext, function (txt, err) {
                            var json = JSON.parse(txt);
                            if (json["code"] == 0) {
                                //上传成功，再上
                                _this.uploadDataInfo(sha1, data.length, finish);
                            }
                            else {
                                throw new Error("文件保存出错");
                            }
                        });
                    }
                });
            };
            return FolderTool;
        }());
        filepool.FolderTool = FolderTool;
    })(filepool = lighttool.filepool || (lighttool.filepool = {}));
})(lighttool || (lighttool = {}));
//# sourceMappingURL=lt_filepool.js.map