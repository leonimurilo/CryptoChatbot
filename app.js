(function () {
    "use strict";
    const express = require("express"),
        app  = express(),
        path = require("path"),
        bodyParser = require("body-parser"),
        queryString = require("querystring"),
        request = require("request"),
        cfenv = require("cfenv"),
        http = require("http"),
        cors = require("cors"),
        // watsonConversation = require("./server/helpers/WatsonConversation")(null),
        port = process.env.PORT || process.env.VCAP_APP_PORT || 6010;


    app.use(express.static(path.join(__dirname + '/client')));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json({limit: "50mb"}));
    app.use(cors());

    require('./server/routes/index.js')(app);


    app.listen(port, function () {
        console.log('Server running on port: %d', port);
    });
}());