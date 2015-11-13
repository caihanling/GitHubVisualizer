/**
 * repo https://github.com/artzub/JSONP
 */

(function( window, undefined) {
    if (!window || !window.document)
        return;

    var seq = 0, // sequent
        document = window.document;

    /**
     * JSONP
     * @param {String} uri The URL you are requesting with the JSON data (you may include URL params).
     * @param {Function} callback The callback function which you want to execute for JSON data (JSON response is first argument).
     * @param {Object} params The params contains data about callback param's name, onload function and onerror function.
     * Params have next structure:
     * params = {
     *      callbackParam : '', default is callback
     *      onerror_callback : function() {},
     *      onload_callback : function() {},
     *      script_order : 'defer' | 'async' (is default)
     *      charset : ''
     *}
     */
    window.JSONP = window.JSONP || function(uri, callback, params) {        //uri = "https://api.github.com/users/caihanling?client_id=c45417c5d6249959a91d&client_secret=3630a057d4ebbbdbfc84f855376f3f46f58b9710", callback =
        if (!arguments.length || arguments.length < 2)      //arguments = ["https://api.github.com/users/caihanling?client_id=…t_secret=3630a057d4ebbbdbfc84f855376f3f46f58b9710", function, Object]
            return;

        uri = uri || '';        //uri = "https://api.github.com/users/caihanling?client_id=c45417c5d6249959a91d&client_secret=3630a057d4ebbbdbfc84f855376f3f46f58b9710
        callback = callback || function() {};       //callback = function(req)
        params = params || {};      //params = Object {callbackParam: "callback"}

        params.callbackParam = params.callbackParam || 'callback'

        uri += uri.indexOf('?') === -1 ? '?' : '&';

        function clear() {
            try {
                delete window[id];      //id = "_JSONP_0"
            } catch(e) {
                window[id] = null;
            }
            document.documentElement.removeChild(script);       //script = script
        }

        function response() {
            clear();
            callback.apply(this, arguments);
        }

        function doError() {
            clear();
            params.onerror && params.onerror.apply(this, arguments);
        }

        function doLoad() {
            params.onload && params.onload.apply(this, arguments);
        }

        var id = '_JSONP_' + seq++,     //id = "_JSONP_0"
            script = document.createElement('script');

        window[id] = response;

        params.script_order = params.script_order || 'async';       //params = Object {callbackParam: "callback", script_order: "async"}

        script.onload = doLoad;
        script.onerror = doError;
        script.setAttribute('charset', params.charset || 'UTF-8');
        script.setAttribute(params.script_order, params.script_order);
        script.setAttribute('src', uri + params.callbackParam + '=' + id);      //uri = "https://api.github.com/users/caihanling?client_id=c45417c5d6249959a91d&client_secret=3630a057d4ebbbdbfc84f855376f3f46f58b9710&", id = "_JS

        document.documentElement.insertBefore(
            script,
            document.documentElement.lastChild
        );
    }
})(window);
