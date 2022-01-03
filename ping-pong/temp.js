window.onload = (function() {
    const elements = document.getElementsByTagName("section");
    var node = elements;
    let result =  [];
    var traverseNode = function(node)
    {
        let parentElement = node[0].parentElement;
        let childrens  = parentElement.children;

        for(let child of childrens)
        {
            result.push(child);
            traverseNode(node);
        }
    }


    traverseNode(node)
    console.log("Travarse node", result);
   
})()