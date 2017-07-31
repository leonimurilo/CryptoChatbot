(function () {
    "use strict";

    const chat = require('./partials/chat.js');

    module.exports = function (app) {
        chat(app);

        app.get("*", function (req, res) {
            res.sendFile('index.html', { root: './client'});
        });
    };
}());