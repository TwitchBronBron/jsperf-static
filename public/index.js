
function getFormData() {
    var form = $('form').first();
    var suite = {
        author: $('#author').val(),
        email: $('#authorEmail').val(),
        url: $('#authorURL').val(),
        title: $('#title').val(),
        info: $('#info').val(),
        initHTML: $('#initHTML').val(),
        setup: $('#setup').val(),
        teardown: $('#teardown').val(),
        tests: []
    };

    var testElements = $('.test');
    for (var i = 0; i < testElements.length; i++) {
        var prefix = 'test[' + i + ']';
        suite.tests.push({
            title: document.getElementById(prefix + '[title]').value,
            defer: document.getElementById(prefix + '[defer]').value,
            code: document.getElementById(prefix + '[code]').value
        });
    }

    console.log(suite);
}