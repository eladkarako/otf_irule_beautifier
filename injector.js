//-------------------------------------------------------------------------- current page and frame.
var iframe_window = document.getElementById("contentframe").contentWindow;
var iframe_document = iframe_window.document;
var oText = iframe_document.getElementById("rule_definition");
var myCodeMirror;


//-------------------------------------------------------------------------- function toolkit
iframe_window.toolkit = {};

iframe_window.toolkit.useCache = (!!window["useCache"]) || (!!iframe_window["useCache"]) || false; //way to control outside cache / no cache state.

iframe_window.toolkit.getRND = function () {
    return (Math.random() * 99999).toString(20);
};

iframe_window.toolkit.logMe = function (s) {
    console ? (console.log ? console.log("injector:  >>" + s) : void(0)) : void(0);
};

iframe_window.toolkit.loadJS = function (sURL, window, onload) {
    var id = "js" + iframe_window.toolkit.getRND();
    sURL =  iframe_window.toolkit.useCache ? sURL : sURL + (sURL.indexOf("?") === -1 ? "?" : "&") + ("__=" + id);

    var innerFN = function (id, sURL, window, onload) {
        var s = window.document.createElement("script");
        s.id = id;
        s.name = id;
        s.onload = function (ev) {
            onload.call();
        };
        s.setAttribute("src", sURL);
        s.type = "text/javascript";
        s.setAttribute("async","async");
        iframe_window.toolkit.logMe("... -- loading " + s.getAttribute("type") + " --- " + s.getAttribute("src"));
        window.document.getElementsByTagName("head")[0].appendChild(s);
        console.log(s);
    };
    setTimeout(function () {
        innerFN(id, sURL, window, onload);
    }, 30);
    return id;
};

iframe_window.toolkit.loadCSS = function (sURL, window, onload) {
    var id = "css" + iframe_window.toolkit.getRND();
    sURL =  iframe_window.toolkit.useCache ? sURL : sURL + (sURL.indexOf("?") === -1 ? "?" : "&") + ("__=" + id);
        
    var innerFN = function (id, sURL, window, onload) {
        var s = window.document.createElement("link");
        s.id = id;
        s.name = id;
        s.onload = function (ev) {
            onload.call();
        };
        s.rel = "stylesheet";
        s.type = "text/css";
        s.setAttribute("href", sURL);
        iframe_window.toolkit.logMe("... -- loading " + s.getAttribute("type") + "--- " + s.getAttribute("href"));
        window.document.getElementsByTagName("head")[0].appendChild(s);
        console.log(s);
    };
    setTimeout(function () {
        innerFN(id, sURL, window, onload);
    }, 300);
    return id;
};

//-------------------------------------------------------------------------- done load
iframe_window.toolkit.codemirror_loadComplete = function () {
    iframe_window.toolkit.logMe("codemirror dependencies load success.");

    setTimeout(function () {
        iframe_window.loadCodemirror(iframe_window, iframe_document);
        iframe_window.toolkit.logMe("codemirror object load success.");

        setTimeout(function () {
            iframe_window.loadTCL(iframe_window, iframe_document);
            iframe_window.toolkit.logMe("codemirror object tcl load success.");

            setTimeout(function () {
                iframe_window.toolkit.logMe("codemirror object load all success.");

                myCodeMirror = iframe_window.CodeMirror.fromTextArea(oText);

            }, 300);
        }, 300);
    }, 300);
};

//-------------------------------------------------------------------------- pre-load resources
iframe_window.toolkit.loadJS("https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js", iframe_window, function () {
    iframe_window.toolkit.logMe("jQuery loaded to contentframe");

    iframe_window.toolkit.loadCSS("https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/codemirror.min.css", iframe_window, function () {
        iframe_window.toolkit.logMe("codemirror css loaded to contentframe");

        //loadJS("https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/codemirror.min.js", iframe_window, function(){ 
        iframe_window.toolkit.loadJS("https://raw2.github.com/eladkarako/otf_irule_beautifier/master/windowmod_codemirror.js", iframe_window, function () {
            iframe_window.toolkit.logMe("codemirror js loaded to contentframe");

            //loadJS("https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/mode/tcl/tcl.min.js", iframe_window, function(){ 
            iframe_window.toolkit.loadJS("https://raw2.github.com/eladkarako/otf_irule_beautifier/master/windowmod_codemirror_tcl.js", iframe_window, function () {
                iframe_window.toolkit.logMe("codemirror js tcl loaded to contentframe");

                iframe_window.toolkit.codemirror_loadComplete();

            });

        });

    });

});

//--------------------------------------------------------------------------
