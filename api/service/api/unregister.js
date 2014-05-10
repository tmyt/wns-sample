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
    var uri = strutil.trim(request.param('uri'));

    if (strutil.isNullOrEmpty(uri)) {
        response.send(400);
        return;
    }

    var tables = request.service.tables;
    var registrations = tables.getTable('registrations');

    registrations.where({
        uri: uri
    }).read({
        success: function (results) {
            if (results.length == 0) {
                response.send(404);
                return;
            }
            registrations.del(results[0].id);
            response.send(200);
        }
    });
};
