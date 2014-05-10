// String Utility
var strutil = {
    isNullOrEmpty: function (str) {
        return !(typeof (str) === 'string' && str !== "");
    },
    trim: function (str) {
        return this.isNullOrEmpty(str) ? str : str.replace(/^\s*|\s*$/g, "");
    }
};

// GUID generator
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
}

exports.post = function (request, response) {
    var uri = strutil.trim(request.param('uri'));
    var friendly = strutil.trim(request.param('friendly'));

    if (strutil.isNullOrEmpty(uri)) {
        response.send(400);
        return;
    }

    if (strutil.isNullOrEmpty(friendly)) {
        friendly = guid();
    }

    var tables = request.service.tables;
    var registrations = tables.getTable('registrations');

    registrations.where({
        uri: uri
    }).read({
        success: function(results) {
            if (results.length != 0) {
                response.send(409);
                return;
            }
            registrations.insert({
                uri: uri,
                friendly: friendly
            });
            response.send(200);
        }
    });
};
