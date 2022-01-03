'use strict'

window.onload = async () =>{

    var pageNumber = 1;
    var noOfRecord = 10;    
    var containerList = document.getElementById("ContainerList");
    var ProgressBar = document.getElementById("ProgressBar"); 

    const fetchData = async (pageNumber, noOfRecord) => {
        var requestParam = {page: pageNumber, limit: noOfRecord};
        var url = new URL('https://api.javascripttutorial.net/v1/quotes/');
        Object.keys(requestParam).forEach(key => url.searchParams.append(key, requestParam[key]));
        var response = await fetch(url);
        var productData = await response.json();
        DisplayData(productData);
    }
  
    const DisplayData = (productData) =>{
       
        if(productData.data.length > 0)
        {
            let width = ProgressBar.style.width.replace("%", "");
            let widthToBeSet = width === "" ? 0 : parseInt(width) + 9;
            ProgressBar.style.width = 
            ProgressBar.innerText = widthToBeSet + "%";

           productData.data.map((item, index) => {
            var listItemElement = document.createElement("LI");
            var textElement = document.createTextNode(item.quote);
            listItemElement.appendChild(textElement);
            containerList.appendChild(listItemElement);
           })
        }
    }

    fetchData(pageNumber,noOfRecord);
    containerList.addEventListener('scroll', () =>{
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = containerList;
    
        if( (scrollTop + clientHeight >= scrollHeight) )
        {
            pageNumber = pageNumber + 1;
            fetchData(pageNumber, noOfRecord)
        }
        containerList.removeEventListener('click', () => {
            pageNumber = 1;
            noOfRecord = 10;
        });
    });
}

