var textarea = function(el) {
	var element = el,
	text = function() {
		return el.value;
	},
	appendAtCaret = function(value) {
		var sel, startPos, endPos;
		if (document.selection) { // IE
			sel = document.selection.createRange();
			sel.text = value;
			return;
		}

		if ( + element.selectionStart >= 0) {
			startPos = element.selectionStart;
			endPos = element.selectionEnd;
			element.value = element.value.substring(0, startPos) + value + element.value.substring(endPos, element.value.length);
			element.selectionStart = startPos + value.length;
			element.selectionEnd = endPos + value.length;

			return;
		}

		//element.value += value; //not sure if this is needed
	};

	return {
		element: element,
		text: text,
		appendAtCaret: appendAtCaret
	};
};
