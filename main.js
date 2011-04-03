var ws = function(textAreaId, editorId) {
	var textArea = document.getElementById(textAreaId),
	editor = document.getElementById(editorId),
	spaceColour = '#FF7F27',
	tabColour = '#0000FF',
	relevent = {
		space: ' ',
		tab: 'tab',
		lf: 'return'
	},
	getCharacterSpace = function (c, col) {
		var el = document.createElement('div');
		//el.innerHTML = c;
		el.style.backgroundColor = col;
		el.style.cssFloat = 'left';
		switch (c) {
			case relevent.space: el.style.width = 10; break;
			case relevent.tab: el.style.width = 15; break;
		}

		el.style.height = 10;

		return el;
	},
	appendAtCaret = function (value) {
		var sel = document.selection.createRange();
		if (document.selection) { // IE
			sel = document.selection.createRange();
			sel.text = value;
			return;
		}
		console.log(textArea.selectionStart);
		if (+textArea.selectionStart >= 0) {

		}

	
	},
	space= function() {
		editor.appendChild(getCharacterSpace(relevent.space, spaceColour));
	},
	tab= function() {
		editor.appendChild(getCharacterSpace(relevent.tab, tabColour));
	},
	lf= function() {

	},
	update = function(keyChar) {
		switch (keyChar) {
			case relevent.space: space(); break;
			case relevent.tab: tab(); break;
		}
	};

	textArea.onkeydown = function(e) {
		var keyChar = keycode.getValueByEvent(e);
		update(keyChar);
		if (keyChar === relevent.tab) {
			e.preventDefault();
		}
	};

	return {
		update: update
	};
};

