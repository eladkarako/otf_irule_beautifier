//-------------------------------------------------------------------------- current page and frame.
var iframe_window = document.getElementById("contentframe").contentWindow;
var iframe_document = iframe_window.document;
var oText = iframe_document.getElementById("rule_definition");
var myCodeMirror;

//-------------------------------------------------------------------------- function toolkit
var getRND = function () {
    return (Math.random() * 99999).toString(20);
};

var logMe = function (s) {
    console ? (console.log ? console.log("injector:  >>" + s) : void(0)) : void(0);
};

var loadJS = function (src, window, onload) {
    var id = "js" + getRND();
    var innerFN = function (id, src, window, onload) {
        var s = window.document.createElement("script");
        s.id = id;
        s.name = id;
        s.onload = function (ev) {
            onload.call();
        };
        s.src = src;
        window.document.getElementsByTagName("head")[0].appendChild(s);
    };
    setTimeout(function () {
        innerFN(id, src, window, onload);
    }, 30);
    return id;
};

var loadCSSStyle = function (txt, window, onload) {
    var id = "css_style" + getRND();
    var innerFN = function (id, txt, window, onload) {
        var s = window.document.createElement("style");
        s.id = id;
        s.name = id;
        s.onload = function (ev) {
            onload.call();
        };
        s.type = "text/css";
        var t = window.document.createTextNode(txt);
        s.appendChild(t);
        window.document.getElementsByTagName("head")[0].appendChild(s);
    };
    setTimeout(function () {
        innerFN(id, txt, window, onload);
    }, 300);
    return id;
};
var loadCSS = function (src, window, onload) {
    var id = "css" + getRND();
    var innerFN = function (id, src, window, onload) {
        var s = window.document.createElement("link");
        s.id = id;
        s.name = id;
        s.onload = function (ev) {
            onload.call();
        };
        s.rel = "stylesheet";
        s.type = "text/css";
        s.href = src;
        window.document.getElementsByTagName("head")[0].appendChild(s);
    };
    setTimeout(function () {
        innerFN(id, src, window, onload);
    }, 300);
    return id;
};

//-------------------------------------------------------------------------- done load
var codemirror_loadComplete = function () {
    logMe("codemirror dependencies load success.");

    setTimeout(function () {
        iframe_window.loadCodemirror(iframe_window, iframe_document);
        logMe("codemirror object load success.");

        setTimeout(function () {
            iframe_window.loadTCL(iframe_window, iframe_document);
            logMe("codemirror object tcl load success.");

            setTimeout(function () {
                logMe("codemirror object load all success.");

                myCodeMirror = iframe_window.CodeMirror.fromTextArea(oText.id, {
                    mode: "text/x-tcl",
                    lineNumbers: true,
                    gutters: ["CodeMirror-linenumbers", "breakpoints"]
                });

            }, 300);
        }, 300);
    }, 300);
};

//-------------------------------------------------------------------------- pre-load resources
loadJS("https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js", iframe_window, function () {
    logMe("jQuery loaded to contentframe");

    loadCSS("https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/codemirror.min.css", iframe_window, function () {
        logMe("codemirror css loaded to contentframe");

        loadCSSStyle(".breakpoints{width:.8em;} .breakpoint{color:#822;} .CodeMirror{border:1px solid #aaa;}", iframe_window, function () {

            //loadJS("https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/codemirror.min.js", iframe_window, function(){ 
            loadJS("https://raw2.github.com/eladkarako/otf_irule_beautifier/master/windowmod_codemirror.js", iframe_window, function () {
                logMe("codemirror js loaded to contentframe");

                //loadJS("https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/mode/tcl/tcl.min.js", iframe_window, function(){ 
                loadJS("https://raw2.github.com/eladkarako/otf_irule_beautifier/master/windowmod_codemirror_tcl.js", iframe_window, function () {
                    logMe("codemirror js tcl loaded to contentframe");

                    codemirror_loadComplete();

                });
            });
        });
    });

});

//-------------------------------------------------------------------------- 



/*
loadCSS(
  "https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/codemirror.min.css"
  ,iframe_window
  function(){
    load
  }


s = iframe_s__document.createElement("script");
s.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js";
s.onload = function(ev){
  setTimeout(jQueryLoadComplete, 20);
};
iframe_s__document_head.appendChild(s);



var codemirrormincomplete = function(){
};

var jQueryLoadComplete = function(){
    s = document.createElement("link");
    s.rel = "stylesheet";
    s.type = "text/css";
    s.href = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/codemirror.min.css";
    iframe_s__document.getElementsByTagName('head')[0].appendChild(s);


    s = iframe_s__document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/codemirror.min.js";
    s.onload = function(ev){
      setTimeout(codemirrormincomplete, 20);
    };
    iframe_s__document_head.appendChild(s);
};

/*

jQuery.getScript(
"https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/codemirror.min.js"
).done(function(script,textStatus) {

  jQuery.getScript(
    "https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/mode/tcl/tcl.min.js"
  ).done(function(script,textStatus) {
    console.log("code mirror is " +    !!(iframe_s__window.CodeMirror) ? "loaded" : "not loaded" );
    myCodeMirror = iframe_s__window.CodeMirror.fromTextArea(irule_txt);
  })

})


/*
irule_txt.setAttribute("class","prettyprint lang-tcl linenums " + irule_txt.getAttribute("class") );
irule_txt.className = "prettyprint lang-tcl linenums";

irule_txt.parentNode.innerHTML = irule_txt.parentNode.innerHTML.replace("textarea","pre");

s = document.createElement("script");
s.src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js?lang=tcl";

iframe_s__document.getElementsByTagName("head")[0].appendChild(s);
*/
