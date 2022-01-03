'use strict'

window.onload = () => {
    var table = document.getElementById("table");
    fetch('https://randomuser.me/api/?results=20')
    .then(async response => {
        if(response.ok)
        {
            var userData = await response.json();   
            var row = table.insertRow(0);   
            Object.keys(userData.results[0]).forEach(data => {
                var headerCell = document.createElement("TH");
                headerCell.innerHTML = data;
                row.appendChild(headerCell);
            });

            for(let index = 1; index <= userData.results.length; index++)
            {
                let row = table.insertRow(index);
                Object.values(userData.results[0]).forEach(data => {
                    if(typeof data === "object")
                    {    
                        ExtractData(row, data);
                    }
                    else
                    {
                        updateRow(row, data);
                    }
                });
            }
            
        }
    })
    .catch(exce => console.error(exce));

    function updateRow(row, data)
    {
        var dataCell = document.createElement("TD");
        dataCell.innerHTML = data;
        row.appendChild(dataCell);
    }

    function ExtractData(row, data)
    {
        var finalData = "";
       
        Object.values(data).forEach(value => {

            if(typeof value === 'object')
            {
                ExtractLevel2(row, value);
            }
            else
            {
                if( value !== undefined || value !== null)
                {
                    if(finalData.length === 0)
                    {
                        finalData = value;
                    }
                    else
                    {
                        finalData = finalData + "/" + value;    
                    }
                }
            
                
            }
        }) 
        updateRow(row, finalData)
    }

    function ExtractLevel2(row, data)
    {
        var finalData = "";
        console.log(data);
        Object.values(data).forEach(value => {

            if( value !== undefined || value !== null)
            {
                if(finalData.length === 0)
                {
                    finalData = value;
                }
                else
                {
                    finalData = finalData + "/" + value;    
                }
            }    
        })          
        updateRow(row, finalData)
    }
}