$(document).ready(
	function() {
		var init = window.location.search.substring(1);
		var cm = CodeMirror(document.getElementById('console'),
								  {value :
									"(defn fact [n]\n"+
									"  (if (zero? n) 1\n"+
									"    (* n (fact (dec n)))))\n",
									mode: "clojure",
									lineNumbers: true,
									autoCloseBrackets: true,
									matchBrackets: true,
									extraKeys:
									{"Ctrl-Enter":
									 function() {
										 var code = "(do " + cm.getValue() + ")";
										 $.post("/eval", {code: code},
												  function(data, status) {
													  alert(data.result);
												  });}
									}})
	});
