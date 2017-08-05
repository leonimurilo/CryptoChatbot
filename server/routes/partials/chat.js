(function () {
    "use strict";

    module.exports = function (app, watsonConversation) {

        app.get("/api/test", function (req, res) {
            res.status(200).send("Test working");
        });

        app.post("/api/message", function (req, res) {
            console.log(req.body);
            setTimeout(function(){ res.status(200).send("Response123"); }, 3000);

        });

    };

}());