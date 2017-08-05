(function () {

    const _ = require("lodash");

    function topEnhancement(res) {
        let clone = new Array(res.output.text);

        clone[clone.length-1] += " askTop";

        return {
            output: clone,
            context: res.context
        }
    }

    function priceEnhancement(res) {
        let clone = new Array(res.output.text);

        clone[clone.length-1] += " askPrice";

        return {
            output: clone,
            context: res.context
        }
    }

    function dropEnhancement(res) {
        let clone = new Array(res.output.text);

        clone[clone.length-1] += " askDrop";

        return {
            output: clone,
            context: res.context
        }
    }

    function percentageDropEnhancement(res) {
        let clone = new Array(res.output.text);

        clone[clone.length-1] += " askPercentageDrop";

        return {
            output: clone,
            context: res.context
        }
    }

    function percentageRiseEnhancement(res) {
        let clone = new Array(res.output.text);

        clone[clone.length-1] += " askPercentageRise";

        return {
            output: clone,
            context: res.context
        }
    }

    module.exports = function(){
        return {
            handleResponse(rawResponse){

                if(rawResponse.output.enhanceable){
                    if(rawResponse.output.action === "Ask_top"){
                        return topEnhancement(rawResponse);
                    }

                    if(rawResponse.output.action === "Ask_price") {
                        return priceEnhancement(rawResponse);
                    }

                    if(rawResponse.output.action === "Ask_drop"){
                        return dropEnhancement(rawResponse);
                    }

                    if(rawResponse.output.action === "Ask_percentage_drop"){
                        return percentageDropEnhancement(rawResponse);
                    }

                    if(rawResponse.output.action === "Ask_percentage_rise"){
                        return percentageRiseEnhancement(rawResponse);
                    }

                }

                return {
                    output: rawResponse.output.text,
                    context: rawResponse.context

                }

            }
        }
    }
}());