// http://mathiasbynens.be/notes/oninput#comment-1
$.fn.input = function (fn) {
	var $this = this;
	if (!fn) {
		return $this.trigger('keydown.input');
	}
	return $this.bind({
		'input.input': function (event) {
			$this.unbind('keydown.input');
			fn.call(this, event);
		},
		'keydown.input': function (event) {
			fn.call(this, event);
		}
	});
};

// http://gist.github.com/326491
$.fn.insertAtCaret = function (myValue) {
	return this.each(function () {
		var me = this;
		if (document.selection) { // IE
			me.focus();
			sel = document.selection.createRange();
			sel.text = myValue;
			me.focus();
		} else if (me.selectionStart || me.selectionStart == 0) { // Real browsers
			var startPos = me.selectionStart,
				endPos = me.selectionEnd,
				scrollTop = me.scrollTop;
			me.value = me.value.substring(0, startPos) + myValue + me.value.substring(endPos, me.value.length);
			me.focus();
			me.selectionStart = startPos + myValue.length;
			me.selectionEnd = startPos + myValue.length;
			me.scrollTop = scrollTop;
		} else {
			me.value += myValue;
			me.focus();
		}
	});
};

$(function () {
	$.fn.addScript = function (str, myLib) {
		return this.click(function (event) {
			if (!~$initHTML.val().indexOf(str)) {
				$initHTML.insertAtCaret('<script src="//' + (myLib ? 'www.cinsoft.net/' : 'ajax.googleapis.com/ajax/libs/') + str + '.js">\x3C/script>\n');
			}
			$initHTML.focus();
			event.preventDefault();
		});
	};

	// Title / slug handling
	var $title = $('#title'),
		$slug = $('#slug'),
		$preview = $('mark'),
		$tests = $('#tests'),
		$initHTML = $('#initHTML'),
		$prepJS = $('#setup'),
		$jsFields = $prepJS.add('#setup, #teardown'),
		testHTML = '<div class="test" id="test[1]"><h4>Code snippet 1</h4><div><label for="test[1][title]">Title <em title="This field is required">*</em> </label><input type="text" class="title" name="test[1][title]" id="test[1][title]"></div><div><label for="test[1][defer]">Async </label><label class="inline"><input type="checkbox" value="y" name="test[1][defer]" id="test[1][defer]" class="defer"> (check if this is an <a href="faq.html#async">asynchronous test</a>)</label></div><div><label for="test[1][code]">Code <em title="This field is required">*</em> </label><textarea name="test[1][code]" class="code-js code" id="test[1][code]" maxlength="16777215"></textarea><label>&nbsp;</label><button class="btn-delete-snippet" onclick="deleteCodeSnippet(1)">Delete this code snippet</button></div></fieldset></div>',
		$addTest = $('<button id="add-test" title="Add another code snippet to the test case">Add code snippet</button>').insertBefore('.submit'),
		$addjQuery = $('<button id="add-jquery" title="jQuery v1.x">jQuery</button>').addScript('jquery/1/jquery.min'),
		$addMooTools = $('<button id="add-mootools" title="MooTools v.1.3.x">MooTools</button>').addScript('mootools/1.3/mootools-yui-compressed'),
		$addYUI = $('<button id="add-yui" title="YUI v2.9.0">YUI</button>').addScript('yui/2.9.0/build/yuiloader/yuiloader-min'),
		$addPrototype = $('<button id="add-prototype" title="Prototype v1.x">Prototype</button>').addScript('prototype/1/prototype'),
		$addDojo = $('<button id="add-dojo" title="Dojo v1.x">Dojo</button>').addScript('dojo/1/dojo/dojo.xd'),
		$addExt = $('<button id="add-ext" title="Ext Core v3.x">Ext Core</button>').addScript('ext-core/3/ext-core'),
		$addMyLib = $('<button id="add-mylib" title="My Library v0.99">My Library</button>').addScript('mylib099-min', true),
		$addDiv = $('<div id="add-buttons" />'),
		$authorFields;

	window.jsPerfTestCount = $('fieldset', $tests).length,

		// http://jsperf.com/slugs
		function sluggify(str) {
			return str.toLowerCase().match(/[a-z0-9]+/ig).join('-');
		}

	$addTest.click(function (event) {
		$(testHTML.replace(/1/g, ++window.jsPerfTestCount)).appendTo($tests);
		event.preventDefault();
	});

	// AMIDOINITRITE?
	$addDiv.append($addjQuery).append($addPrototype).append($addMooTools).append($addYUI).append($addDojo).append($addExt).append($addMyLib).insertBefore('#add-libraries');

	if ($slug.length) {
		$title.input(function () {
			if (!$slug.data('x')) {
				if ('' === $.trim(this.value)) {
					$slug.val('');
					$preview.text('slug');
					return;
				}
				var slug = sluggify(this.value);
				$slug.val(slug);
				$preview.text(slug);
			}
		}).trigger('keyup');
		$slug.input(function () {
			if ('' === $.trim(this.value)) {
				if ('' === $.trim($title.val())) {
					return $preview.text('slug');
				} else {
					return $preview.text(sluggify($title.val()));
				};
			};
			$preview.text(sluggify(this.value));
		});
		$slug.change(function () {
			$slug.val(sluggify(this.value));
			var x = true;
			if ('' === $.trim($slug.val())) {
				x = false;
				var slug = sluggify($title.val());
				$slug.val(slug);
				$preview.text(slug);
			}
			$slug.data('x', x);
		});
	}
});
