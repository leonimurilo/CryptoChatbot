(function () {

    const axios = require("axios");
    const _ = require("lodash");

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

        clone[clone.length-1] += " askPrice";

        return {
            output: clone,
            context: rawResponse.context
        }
    }

    function dropEnhancement(rawResponse, res) {
        let clone = new Array(rawResponse.output.text);

        clone[clone.length-1] += " askDrop";

        return {
            output: clone,
            context: rawResponse.context
        }
    }

    function percentageDropEnhancement(rawResponse, res) {
        let clone = new Array(rawResponse.output.text);

        clone[clone.length-1] += " askPercentageDrop";

        return {
            output: clone,
            context: rawResponse.context
        }
    }

    function percentageRiseEnhancement(rawResponse, res) {
        let clone = new Array(rawResponse.output.text);

        clone[clone.length-1] += " askPercentageRise";

        return {
            output: clone,
            context: rawResponse.context
        }
    }

    function activeEnhancement(rawResponse, res) {
        let clone = new Array(rawResponse.output.text);

        clone[clone.length-1] += " askActive";

        return {
            output: clone,
            context: rawResponse.context
        }
    }

    module.exports = function(){
        return {
            handleResponse(rawResponse, res){

                if(rawResponse.output.enhanceable){
                    if(rawResponse.output.action === "Ask_top"){
                        return topEnhancement(rawResponse, res);
                    }

                    if(rawResponse.output.action === "Ask_price") {
                        return priceEnhancement(rawResponse, res);
                    }

                    if(rawResponse.output.action === "Ask_drop"){
                        return dropEnhancement(rawResponse, res);
                    }

                    if(rawResponse.output.action === "Ask_percentage_drop"){
                        return percentageDropEnhancement(rawResponse, res);
                    }

                    if(rawResponse.output.action === "Ask_percentage_rise"){
                        return percentageRiseEnhancement(rawResponse, res);
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