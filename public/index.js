$(function () {
    var id = getParameterByName('id');
    if (id) {
        //load suite from local storage
        var suite = JSON.parse(localStorage.getItem(id));
        //populate the form with the suite data
        $("#id").val(suite.id);
        $("#author").val(suite.author);
        $('#author').val(suite.author);
        $('#authorEmail').val(suite.email);
        $('#authorURL').val(suite.url);
        $('#title').val(suite.title);
        $('#info').val(suite.info);
        $('#initHTML').val(suite.initHTML);
        $('#setup').val(suite.setup);
        $('#teardown').val(suite.teardown);
        for (var i = 1; i <= suite.tests.length; i++) {
            var prefix = 'test[' + i + ']';
            var test = suite.tests[i - 1];
            //create a new snippet
            $("#add-test").click();
            document.getElementById(prefix + '[title]').value = test.title;
            document.getElementById(prefix + '[defer]').checked = test.defer;
            document.getElementById(prefix + '[code]').value = test.code;
        }
    } else {
        //populate two test snippets
        $("#add-test").click().click();
    }
});


function getFormData() {
    var form = $('form').first();
    var suite = {
        id: $('#id').val(),
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
    if (!suite.id) {
        suite.id = nanoid();
    }

    var i = 1;
    var snippetData;
    while (snippetData = getSnippetData(i++)) {
        suite.tests.push(snippetData);
    }

    //save the suite to local storage
    localStorage.setItem(suite.id, JSON.stringify(suite));
    console.log(suite.id, suite);
}

function getSnippetData(index) {
    var prefix = 'test[' + index + ']';
    var titleElement = document.getElementById(prefix + '[title]');
    if (titleElement) {
        return {
            title: titleElement.value,
            defer: document.getElementById(prefix + '[defer]').checked,
            code: document.getElementById(prefix + '[code]').value
        };
    }
}