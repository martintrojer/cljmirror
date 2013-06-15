// contains [line, widget-obj] entries.
// sorted by line (thus 'last' widget at end)
var widgets = [];

function removeWidgetsBelow(line) {
	while(widgets.length > 0) {
		var w = widgets[widgets.length - 1];
		// TODO -- this doesn't really work. cm.getLineNumber(w) would be better
		// since you can re-edit 'above' the widgets and thus the line
		// in widget is wrong.
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
		if (data.error != null) {
			var txt = document.createTextNode(data.error);
			msg.className = "eval-error";
		}
		// a widget can only be one line, thus this is a bit broken
		else if (data.out != null && data.out != "") {
			var txt = document.createTextNode(data.out);
			msg.className = "eval-out";
		}
		// .. you also want widgets for both out and result when available
		else {
			var txt = document.createTextNode(" ;; " + data.result);
			msg.className = "eval-result";
		}
		msg.appendChild(txt);
		var cnt = cm.lineCount()-1
		// add line to doc if we evaling on the last line
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
		removeWidgetsBelow(line);
		if (widgets.length > 0)
			top = widgets[widgets.length - 1][0]

		// eval all code between current line and last eval (i.e. lastt 'widget')
		var code = "(do " + cm.getRange({line: top}, {line: line}) + ")";

		$.post("/eval", {code: code}, evalResultFn(cm, line));
	}
}

// ---

$(document).ready(function() {
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
