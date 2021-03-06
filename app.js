(function () {
    "use strict";

    require('dotenv').config();
    const conversationCredentials = {
        username: process.env.CONVERSATION_USERNAME,
        password: process.env.CONVERSATION_PASSWORD,
        version:process.env.CONVERSATION_VERSION,
        workspace_id: process.env.CONVERSATION_WORKSPACE
    };

    const express = require("express"),
        app  = express(),
        path = require("path"),
        bodyParser = require("body-parser"),
        cfenv = require("cfenv"),
        http = require("http"),
        cors = require("cors"),
        watsonConversation = require("./server/helpers/WatsonConversation")(conversationCredentials),
        port = process.env.PORT || process.env.VCAP_APP_PORT || 6010;


    app.use(express.static(path.join(__dirname + '/client')));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json({limit: "50mb"}));
    app.use(cors());

    require('./server/routes/index.js')(app, watsonConversation);

    // if intent needs API, the watson response is changed
    // else it will be returned

    // watsonConversation.sendMessage({
    //     text:"hallo",
    //     context: {}
    // }).then(function (data) {
    //     console.log(data.response.entities);
    // }).catch(function (err) {
    //     console.log("ERROR: ",err);
    // });

    app.listen(port, function () {
        console.log('Server running on port: %d', port);
    });
}());