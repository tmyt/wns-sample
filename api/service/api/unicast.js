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
    var friendly = strutil.trim(request.param('friendly'));
    var title = strutil.trim(request.param('title'));
    var content = strutil.trim(request.param('content'));

    if (strutil.isNullOrEmpty(friendly)) {
        response.send(400);
        return;
    }

    var tables = request.service.tables;
    var registrations = tables.getTable('registrations');

    registrations.where({
        friendly: friendly
    }).read({
        success: function (results) {
            for (var i = 0; i < results.length; ++i) {
                request.service.push.wns.sendToastText02(results[i].uri, { text1: title, text2: content });
            }
        }
    });
    response.send(200);
};
