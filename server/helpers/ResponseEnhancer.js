(function () {
    module.exports = function(){
        return {
            handleResponse(rawResponse){
                // console.log(rawResponse);
                return {
                    output: rawResponse.output.text,
                    context: rawResponse.context
                }
            }
        }
    }
}());