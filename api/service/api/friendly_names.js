exports.get = function (request, response) {
    var tables = request.service.tables;
    var registrations = tables.getTable('registrations');

    registrations.read({
        success: function(results) {
            var names = [];
            for (var i = 0; i < results.length; ++i) {
                names.push(results[i].friendly);
            }
            response.send(200, names);
        }
    });
};