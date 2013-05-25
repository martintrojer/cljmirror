$(document).ready(
	function() {
		var widgets = []
		var cm = CodeMirror(document.getElementById('console'),
								  {value :
									";; Ctrl-Enter to evaluate\n\n"+
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
													  var msg = document.createElement("div");
													  msg.className = "eval-result";
													  msg.appendChild(document.createTextNode(" ;; " + data.result));
													  var line = cm.getCursor().line
													  var cnt = cm.lineCount()-1
													  if (cnt <= line) {
														  cm.setValue(cm.getValue()+"\n");
													  }
													  cm.addLineWidget(line, msg, {});
													  cm.setCursor({line: line+1});
												  });}
									}})
	});
