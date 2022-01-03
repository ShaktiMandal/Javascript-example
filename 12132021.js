//reverse a string

var reverseString = function(str) {
    return str.split(" ").reverse().join(" ");
}

//console.log(reverseString("the sky is blue"));

//reverse the string string O(1)

var reverseStringWithoutSpace = function(str) {
    let result = ""
    let reverseString = getReverseString(str, 0, str.length - 1);
    for(let index = 0; index < reverseString.length; index++)
    {
        if(reverseString[index] === " " || reverseString.length === index + 1)
        {
            
            result += getReverseString(reverseString.slice(0, index ), 0, index)
        }
    }

    console.log("result", result);
}

var getReverseString = function(str, start, end){

    let temp = "";
    while(start <= end)
    {       
        let currentValue = str.slice(start, start + 1);
        temp = currentValue.concat(temp);
        start++;
    }

    return temp;
   
}

reverseStringWithoutSpace("The sky is blue");