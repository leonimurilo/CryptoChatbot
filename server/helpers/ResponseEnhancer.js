(function () {

    function askTop(res) {
        let clone = new Array(res.output.text);

        clone[clone.length-1] += " BITCON HAHA";

        return {
            output: clone,
            context: res.context
        }
    }

    function askPrice(res) {

    }

    function askDrop(res) {

    }

    function askPercentageDrop(res) {

    }

    function askPercentageRise(res) {

    }

    module.exports = function(){
        return {
            handleResponse(rawResponse){
                switch (true){

                    case (rawResponse.intents[0].intent === "Ask_top"):{
                        return askTop(rawResponse);
                    }

                    default:
                        return {
                            output: rawResponse.output.text,
                            context: rawResponse.context

                        }
                }
            }
        }
    }
}());