'useStrict'

window.onload = () => {    

    let riderDetails = {
        startTime:"",
        startLocaltion: "",
        dropLocation: ""
    }


    const pickUpElement = document.getElementById("pickupPointId");
    const dropElement = document.getElementById("droppingPointId");
    const searchBtn = document.getElementById("searchButtonId");
    const displayLoactions = document.getElementById("activeRiderList");
    const activeRider = document.getElementById("activeRiders");

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position)
    {
        console.log(position.latitude, position.longitude);
        displayLocation(position.latitude, position.longitude);
    }

    function error()
    {
        console.log("There is an error")
    }

    function displayLocation(latitude,longitude){
        var geocoder;
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(latitude, longitude);
    
        geocoder.geocode(
            {'latLng': latlng}, 
            function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var add= results[0].formatted_address ;
                        var  value=add.split(",");
    
                        count=value.length;
                        country=value[count-1];
                        state=value[count-2];
                        city=value[count-3];
                        pickUpElement.innerText = city;
                    }
                    else  {
                        x.innerHTML = "address not found";
                    }
                }
                else {
                    x.innerHTML = "Geocoder failed due to: " + status;
                }
            }
        );
    }

    pickUpElement.addEventListener("keydown", (event) => {
        riderDetails.startLocaltion = event.target.value;
    });

    dropElement.addEventListener("keydown", (event) => {
        riderDetails.dropLocation = event.target.value;
    })

    searchBtn.addEventListener("click", (event) => {

        if(riderDetails.dropLocation)
        {
            let url = new URL("http://api.positionstack.com/v1/forward?access_key=f8e35d9bdfe06cf826300fd25631f2e5");
            Object.keys({query: riderDetails.dropLocation}).forEach(key => url.searchParams.append(key, riderDetails.dropLocation));
            fetch(url)
            .then(async response => {
                let responseResult = await response.json();
                if(responseResult.data.length)
                {
                    this.formLocationList(responseResult.data);
                }
            })
        }
        else
        {
            activeRider.innerHTML = "";
            let newElement = document.createElement("h1");
            newElement.innerText = "please enter dopping point";
            newElement.style.textAlign = "center";
            activeRider.appendChild(newElement);
        }
    });

    formLocationList = function(result)
    {   
        activeRider.innerHTML = "";
        displayLoactions.innerHTML = "";
        result.forEach(item => {
            let liElement = document.createElement('LI');
            let textEelement = document.createTextNode(item.label);
            liElement.appendChild(textEelement);
            displayLoactions.appendChild(liElement);
        });
        activeRider.appendChild(displayLoactions);
    }
}

class DcoumentWrapper {

    constructor(element, content, display)
    {
        this.element = this.createElement(element, content, display);
        this.content = content;
        this.display = display;
    }

    createElement(element)
    {
        let newElement = document.createElement(element);
        return newElement;
    }

    createChildElement(element, content, display){
        let childElement = new DcoumentWrapper(element, content, display);
        this.appendChild(childElement);
        return this;
    }

    appendChild(child)
    {
        this.element.appendChild(child);
        return this;        
    }

    addClass(className)
    {
        this.element.classList.add(className);
        return this;
    }

    actionPerformed(typeOfAction, fn){
        this.element.addEventListener(typeOfAction, fn);
        return this;
    }

    static documentGenerator(element, content, display = true)
    {
        return new DcoumentWrapper(element, content, display);
    }
}