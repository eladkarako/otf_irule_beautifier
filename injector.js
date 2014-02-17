var loadJS = function(src,window,onload){
    var innerFN = function(src,window,onload){
        var s = window.document.createElement("script");
        s.onload = function(ev){ onload.call(); };
        s.src = src;
        window.document.getElementsByTagName("head")[0].appendChild(s);
    };
    setTimeout(function(){
        innerFN(src,window,onload);
    },30);
};
var loadCSS = function(src,window,onload){
    var innerFN = function(src,window,onload){
        var s = window.document.createElement("link");
        s.onload = function(ev){ onload.call(); };
        s.rel = "stylesheet";
        s.type = "text/css";
        s.href = src;
        window.document.getElementsByTagName("head")[0].appendChild(s);
    };
    setTimeout(function(){
        innerFN(src,window,onload);
    },30);
};



var iframe_window = document.getElementById("contentframe").contentWindow;
var iframe_document = iframe_window.document;
var oText = iframe_document.getElementById("rule_definition");


loadJS("https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js", iframe_window, function(){ console.log("jQuery loaded to contentframe"); });

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
