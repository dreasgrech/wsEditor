var ws = function(textAreaId, editorId) {
	var textArea = textarea(document.getElementById(textAreaId)),
	editor = document.getElementById(editorId),
	editorWidth = 300,
	spaceColour = '#FF7F27',
	tabColour = '#0000FF',
	relevent = {
		space: ' ',
		tab: 'tab',
		lf: 'return'
	},
	characterWidth = 8,
	characterHeight = 18,
	tabCharacterWidth = 65,
	getCharacterSpace = function(c, col) {
		var el = document.createElement('span'),
		width = characterWidth;

		if (col) {
			el.style.backgroundColor = col;
		}
		el.style.cssFloat = 'left';
		switch (c) {
		case relevent.tab:
			width = tabCharacterWidth;
			break;
		}

		el.style.width = width;
		el.style.height = characterHeight;

		if (!isCharValid(c)) {
			el.innerHTML = c;
		}

		return el;
	},
	isCharValid = function(c) {
		var ch;
		for (ch in relevent) {
			if (relevent[ch] === c) {
				return true;
			}
		}
	},
	space = function() {
		editor.appendChild(getCharacterSpace(relevent.space, spaceColour));
	},
	tab = function() {
		console.log('tab');
		editor.appendChild(getCharacterSpace(relevent.tab, tabColour));
	},
	lf = function() {

	},
	addChar = function(c) {
		editor.appendChild(getCharacterSpace(c));
	}, update = function (text) {
		var c, i = 0, j = text.length;
		editor.innerHTML = '';
		for (; i < j; ++i) {
			c = text[i];
			switch (c) {
				case relevent.space:
					space();
					break;
				case '\t':
					tab();
					break;
				case relevent.lf:
					lf();
					break;
				default:
					addChar(c);
			}
		}
	};

	textArea.element.onkeydown = function(e) {
		var keyChar = keycode.getValueByEvent(e);
		if (keyChar === relevent.tab) {
			e.preventDefault(); // the default behaviour of a tab in a textarea loses focus from the textarea
			textArea.appendAtCaret('\t');
		}
	};

	textArea.element.onkeyup = function (e) {
		var textInArea = textArea.text(), keyChar = keycode.getValueByEvent(e);
		update(textInArea);
	};

	editor.style.width = editorWidth;
	textArea.element.style.width = editorWidth;

	return {
		update: update
	};
};

