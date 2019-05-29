// Ajax-Hook https://github.com/wendux/Ajax-hook
; (function (global, undefined) {
    global.hookAjax = function (proxy) {
        window._ahrealxhr = window._ahrealxhr || XMLHttpRequest
        XMLHttpRequest = function () {
            this.xhr = new window._ahrealxhr;
            for (var attr in this.xhr) {
                var type = "";
                try {
                    type = typeof this.xhr[attr]
                } catch (e) { }
                if (type === "function") {
                    this[attr] = hookfun(attr);
                } else {
                    Object.defineProperty(this, attr, {
                        get: getFactory(attr),
                        set: setFactory(attr)
                    })
                }
            }
        }

        function getFactory(attr) {
            return function () {
                var v = this.hasOwnProperty(attr + "_") ? this[attr + "_"] : this.xhr[attr];
                var attrGetterHook = (proxy[attr] || {})["getter"]
                return attrGetterHook && attrGetterHook(v, this) || v
            }
        }

        function setFactory(attr) {
            return function (v) {
                var xhr = this.xhr;
                var that = this;
                var hook = proxy[attr];
                if (typeof hook === "function") {
                    xhr[attr] = function () {
                        proxy[attr](that) || v.apply(xhr, arguments);
                    }
                } else {
                    //If the attribute isn't writeable, generate proxy attribute
                    var attrSetterHook = (hook || {})["setter"];
                    v = attrSetterHook && attrSetterHook(v, that) || v
                    try {
                        xhr[attr] = v;
                    } catch (e) {
                        this[attr + "_"] = v;
                    }
                }
            }
        }

        function hookfun(fun) {
            return function () {
                var args = [].slice.call(arguments)
                if (proxy[fun] && proxy[fun].call(this, args, this.xhr)) {
                    return;
                }
                return this.xhr[fun].apply(this.xhr, args);
            }
        }
        return window._ahrealxhr;
    }
    global.unHookAjax = function () {
        if (window._ahrealxhr) XMLHttpRequest = window._ahrealxhr;
        window._ahrealxhr = undefined;
    }
}(window));

// helpers
var PREFIX_ISSETTED = "_isHas_";
// headers
var customHeaders = {
    "X-Requested-With": "XMLHttpRequest",
};
// response
var verifyResponse = function (xhr) {
    if (xhr.status === 200) {
        var res;
        // 非 text 时，用response
        if (xhr.responseType || "text" !== "text") {
            res = xhr.response;
        } else { // text时，用responseText
           res = xhr.responseText;
        }
        
        var body;
        try {
            body = JSON.parse(res);
        } catch (e) {
            body = res;
        }
        var isKicked = body["Code"] === 401;
        if (isKicked) {
            if (typeof window.httpErrorFallBack === "function") {
                window.httpErrorFallBack(body["Message"]);
                return true;
            }
            window.alert(body["Message"]);
            // prevent xhr
            return true;
        }
    }
};

hookAjax({
    setRequestHeader: function (args, xhr) {
        if (args[0] === null) { return };
        var key = args[0];

        for (var headKey in customHeaders) {
            var isSetted = key.toLowerCase() === headKey.toLowerCase();
            var oldSetted = !!xhr[PREFIX_ISSETTED + headKey];
            !oldSetted && (xhr[PREFIX_ISSETTED + headKey] = isSetted); // 设置过之后不再赋值
        }
    },
    // beforeSend
    send: function (args, xhr) {
        for (var headKey in customHeaders) {
            !xhr[PREFIX_ISSETTED + headKey] && xhr.setRequestHeader(headKey, customHeaders[headKey]);
        }
    },
    // response
    onreadystatechange: function (xhr) {
        if (xhr.readyState === 4) {
            return verifyResponse(xhr);
        }
    },
    onload: function (xhr) {
        return verifyResponse(xhr); // for jquery
    },
});
