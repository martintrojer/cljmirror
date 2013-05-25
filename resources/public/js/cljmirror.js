$(document).ready(
	function() {
		var init = window.location.search.substring(1);
		var cm = CodeMirror(document.getElementById('console'),
								  {value :"(+ 1 1)\n",
									mode: "clojure",
									lineNumbers: true,
									autoCloseBrackets: true,
									matchBrackets: true,
									extraKeys:
									{"Ctrl-Enter":
									 function() {
										 var code = cm.getValue();
										 $.post("/eval", {code: code},
												  function(data, status) {
													  alert(data.result);
												  });}
									}})
	});
