// String Utility
var strutil = {
    isNullOrEmpty: function (str) {
        return !(typeof (str) === 'string' && str !== "");
    },
    trim: function (str) {
        return this.isNullOrEmpty(str) ? str : str.replace(/^\s*|\s*$/g, "");
    }
};

exports.post = function (request, response) {
    var title = strutil.trim(request.param('title'));
    var content = strutil.trim(request.param('content'));

    var tables = request.service.tables;
    var registrations = tables.getTable('registrations');

    var wns = request.service.push.wns;

    registrations.read({
        success: function(results) {
            for (var i = 0; i < results.length; ++i) {
                var obj = { text1: title, text2: content };
                wns.sendToastText02(results[i].uri, obj);
                wns.sendRaw(results[i].uri, JSON.stringify(obj));
            }
        }
    });
    response.send(200);
};
