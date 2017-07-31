(function (app) {
    "use strict";

    module.exports = function (app) {

        app.get("/api/test", function (req, res) {
            res.status(200).send("Test working");
        });

    };

}());