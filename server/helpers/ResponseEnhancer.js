(function () {

    const axios = require("axios");
    const _ = require("lodash");
    const idMapping = require("../../idMapping.json");

    function topEnhancement(rawResponse, res) {
        let clone = new Array(rawResponse.output.text);

        let values = _(rawResponse.entities)
            .filter(entity => entity.entity === "sys-number")
            .map('value')
            .value();

        const limit = values[0] || 5;

        axios.get("https://api.coinmarketcap.com/v1/ticker/", {params: {limit}}).then(function (response) {

            if(response.status < 200 || response.status >= 300)
                throw new Error("Axios request returned status " + response.status);

            response.data.forEach(function (currency) {
                clone.push("\n"+currency.rank + ". " + currency.name);
            });

            console.log(clone.length);
            return res.status(200).send({
                output: clone,
                context: rawResponse.context
            });

        }).catch(function (err) {
            console.log(err);
            return res.status(200).send({
                output: rawResponse.output.text,
                context: rawResponse.context
            });
        });
    }

    function priceEnhancement(rawResponse, res) {
        let clone = new Array(rawResponse.output.text);
        let coinId = idMapping[rawResponse.entities[0].value].id;

        axios.get("https://api.coinmarketcap.com/v1/ticker/"+coinId).then(function (response) {

            clone.push("$"+response.data[0].price_usd);
            clone.push("This is equivalent to "+response.data[0].price_btc + " Bitcoins.");

            return res.status(200).send({
                output: clone,
                context: rawResponse.context
            });

        }).catch(function (err) {
            console.log(err);
            return res.status(200).send({
                output: rawResponse.output.text,
                context: rawResponse.context
            });
        });

    }

    function changeEnhancement(rawResponse, res) {
        let clone = new Array(rawResponse.output.text);
        let promises = [];
        let coinIds = [];

        rawResponse.entities.forEach(function (entity) {
            let coinId = idMapping[entity.value].id;
            coinIds.push(coinId);
            promises.push(axios.get("https://api.coinmarketcap.com/v1/ticker/" + coinId));
        });
        
        Promise.all(promises).then(function (responses) {
            for (let i = 0; i<responses.length; i++){
                let hour = Number(responses[i].data[0].percent_change_1h);
                let day =  Number(responses[i].data[0].percent_change_24h);
                let week =  Number(responses[i].data[0].percent_change_7d);

                if(i===0){
                    if(hour >= 0 && day >= 0 && week >= 0){
                        clone[clone.length-1] += "the " + rawResponse.entities[i].value + " didn't fall in the last 7 days. Here is what I've got: ";
                    }else{
                        clone[clone.length-1] += "the " + rawResponse.entities[i].value + " did fall in the last 7 days. Here is what I've got: ";
                    }
                }else{
                    if(hour >= 0 && day >= 0 && week >= 0){
                        clone.push(rawResponse.entities[i].value + " didn't fall in the last 7 days. Here is what I've got: ");
                    }else{
                        clone.push(rawResponse.entities[i].value + " did fall in the last 7 days. Here is what I've got: ");
                    }
                }

                clone.push("1h change: "+ hour + "%");
                clone.push("24h change: "+ day + "%");
                clone.push("7 day change: "+ week + "%");

                if(week > 20)
                    clone.push("As you can see, the 7 day change for " + rawResponse.entities[i].value + " was very significant.");

                const url = "https://coinmarketcap.com/currencies/"+coinIds[i];
                clone.push("You can see more information in "+url);

            }
            return res.status(200).send({
                output: clone,
                context: rawResponse.context
            });
        }).catch(function (err) {
            console.log(err);
            return res.status(200).send({
                output: rawResponse.output.text,
                context: rawResponse.context
            });
        });

    }

    function activeEnhancement(rawResponse, res) {
        let clone = new Array(rawResponse.output.text);

        axios.get("https://api.coinmarketcap.com/v1/global/").then(function (response) {

            clone.push("There are currently " + response.data.active_currencies + " active cryptocurrencies" +
                " and " + response.data.active_assets + " assets.");

            return res.status(200).send({
                output: clone,
                context: rawResponse.context
            });

        }).catch(function (err) {
            console.log(err);
            return res.status(200).send({
                output: rawResponse.output.text,
                context: rawResponse.context
            });
        });
    }

    module.exports = function(){
        return {
            handleResponse(rawResponse, res){


                if(rawResponse.output.enhanceable){
                    console.log("RETURNED ACTION:", rawResponse.output.action);
                    if(rawResponse.output.action === "Ask_top"){
                        return topEnhancement(rawResponse, res);
                    }

                    if(rawResponse.output.action === "Ask_price") {
                        return priceEnhancement(rawResponse, res);
                    }

                    if(rawResponse.output.action === "Ask_drop"){
                        return changeEnhancement(rawResponse, res);
                    }

                    if(rawResponse.output.action === "Ask_percentage_drop"){
                        return changeEnhancement(rawResponse, res);
                    }

                    if(rawResponse.output.action === "Ask_percentage_rise"){
                        return changeEnhancement(rawResponse, res);
                    }

                    if(rawResponse.output.action === "Ask_active"){
                        return activeEnhancement(rawResponse, res);
                    }
                }

                return res.status(200).send({
                    output: rawResponse.output.text,
                    context: rawResponse.context

                });

            }
        }
    }
}());