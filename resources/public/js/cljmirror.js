var widgets = [];

function removeWidgets(line) {
	while(widgets.length > 0) {
		var w = widgets[widgets.length - 1];
		if (w[0] >= line) {
			w[1].clear();
			widgets.pop();
		} else break;
	}
}

function evalResultFn(cm, line) {
	return function(data, status) {
		// TODO check status
		var msg = document.createElement("div");
		msg.className = "eval-result";
		msg.appendChild(document.createTextNode(" ;; " + data.result));
		var cnt = cm.lineCount()-1
		if (cnt <= line) cm.setValue(cm.getValue()+"\n");
		widgets.push([line, cm.addLineWidget(line, msg, {})]);
		widgets.sort(function(a,b) {a[0] - b[0]});
		cm.setCursor({line: line+1});
		}
}

function doEvalFn(cm) {
	return function() {
		var line = cm.getCursor().line
		var top = 0
		removeWidgets(line);
		if (widgets.length > 0)
			top = widgets[widgets.length - 1][0]

		var code = "(do " + cm.getRange({line: top}, {line: line}) + ")";

		$.post("/eval", {code: code}, evalResultFn(cm, line));
	}
}

// ---

$(document).ready(function() {
	var widgets = []
	var cm = CodeMirror(
		document.getElementById('console'),
		{value :
		 ";; Ctrl-Enter to evaluate\n\n"+
		 "(defn fact [n]\n"+
		 "  (if (zero? n) 1\n"+
		 "    (* n (fact (dec n)))))\n"+
		 "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
		 mode: "clojure",
		 lineNumbers: true,
		 autoCloseBrackets: true,
		 matchBrackets: true});
	cm.addKeyMap({"Ctrl-Enter": doEvalFn(cm)});
});
