exports.get = function (request, response) {
    var tables = request.service.tables;
    var registrations = tables.getTable('registrations');

    registrations.read({
        success: function (results) {
            if (results.length == 0) {
                response.send(404);
                return;
            }
            for(var i = 0; i < results.length; ++i){
                registrations.del(results[i].id);
            }
            response.send(200);
        }
    });
};
