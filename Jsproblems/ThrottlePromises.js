var callApi = (request) => {

    new Promise((resolve, reject) => {
        fetch("https://api.github.com/users")
        .then (result => {
            resolve(result)
        })
        .catch(error => {
            reject(error);
        })
    })
}


var throttleApiCall = (funcs, noOfCalls) => {

    let result = [];
    return function(...args) {
        
        var fn = funcs.shift();
        var  funcCall = function(){
            
            result.push()
        }

        funcCall();
    }
}

