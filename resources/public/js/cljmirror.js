$(document).ready(function(){
   var init = window.location.search.substring(1);
   var con = new SoleMirror(document.getElementById('console'), unescape(init));
   $("button").click(function(){
      $.post("/eval", {code: "(+ 1 1)"},
             function(data, status) {
                alert(data.result + "\n" + status);
             });
   });
});
