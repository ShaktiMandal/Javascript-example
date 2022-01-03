'use strict'


window.onload = () =>{

    var input = document.getElementById("InputText");
    var searchButton = document.getElementById("searchButton");
    var listOfPeople = document.getElementById("listOfPeople");
    var PeopleContainer = document.getElementById("PeopleContainer");
    var globalPeopleList = [];
    
    const DelayFetchPeople = (func, delay) =>
    {
        debugger;
        let prevDelay = 0;   
        return (...args) => {
            let currentTime = new Date().getTime();
            if(currentTime - prevDelay > delay)
            {
                prevDelay = currentTime;
                return func(...args);
            }
        }
    }

    function FetchPeople()
    {
        fetch("https://reqres.in/api/users?page=1")
        .then(async response => {
            if(response.status === 200)
            {
                var people = await response.json();
                if(people.data.length  > 0 )
                {
                    globalPeopleList = people.data;      
                    people.data.map( (item, index) => {           
                        var listElement = document.createElement("LI");                    
                        var textNode = document.createTextNode(item.email);
                        listElement.appendChild(textNode);                            
                        listOfPeople.appendChild(listElement);
                    });                       
                }
            }
            else
            {
                listOfPeople = null;
                var h1Node = document.createElement("h1");
                h1Node.innerText = "No Result found";
            }
        })
        .catch(ex => {
            alert("There is an exception: " + ex.toString())
        })
    }

    const FilterEmail = (event) => {
        var value = event.target.value;

        while (listOfPeople.firstChild) {
            listOfPeople.removeChild(listOfPeople.firstChild);
        }

        if(globalPeopleList.length > 0)
        {
            var filteredList = globalPeopleList.filter(people => people.email.includes(value));
            filteredList.map( (item, index) => {           
                var listElement = document.createElement("LI");                    
                var textNode = document.createTextNode(item.email);
                listElement.appendChild(textNode);                            
                listOfPeople.appendChild(listElement);
            });   
        }
    }

    if(input && searchButton)
    {
        // searchButton.addEventListener("click", () => {
        //     setTimeout(() => FetchPeople(), 5000); 
        // });
        input.addEventListener("input", FilterEmail);
        searchButton.addEventListener("click", DelayFetchPeople(FetchPeople, 500)); 
    }
};