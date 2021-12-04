window.onload = () =>{    
    const searchElement = document.getElementById("searchInput");    
    searchElement.addEventListener('keyup', debounce(onSearch, 3000));
}

// function createButton() {
//     alert("creating button", this.data.length);
//     let button = document.createElement('button');
//     button.textContent = content;
//     button.id = id;
//     button.className = "buttonClass";
//     button.addEventListener('click', ()=> alert("Het clicked on a button"));
//     return button;
// }

// const loadButton = () => {    
//     let data = this.data;
//     alert("we have data", data.length);
// }

// const moveToNext = () => {
//     alert("Move to next clicked");
// }

// const moveToPrevious = () => {
//     alert("Move to prev clicked");
// }

// const clearButton = () => {
//     let buttonDivContainer = document.getElementById("buttonContainer");
//     buttonDivContainer.innerHTML = "";
// }

// const paginationDetails = {
//     noOfPagesRequired: 1,
//     currentPage: 1,
//     data : {},
//     prev : moveToPrevious.bind(this),
//     next : moveToNext.bind(this),
//     loadButton: loadButton.bind(this),
//     createButton: createButton,
//     clearButton: clearButton.bind(this),
// }




const debounce = (fn, wait) => {    
    let timeOutHandler;    

    return (...args) =>{
        console.log("getting called", args);
        clearTimeout(timeOutHandler);

        timeOutHandler = setTimeout(()=> {
            fn.apply(null, args);
        }, wait)
    }
}

const onSearch = async (event) => {
    fetchStudentDetails(event.target.value)
        .then( studentDetails => {
            if(studentDetails.result.data.length)
            {        
                formListOfusers(studentDetails.result.data);
            }
            else
            {
                alert("There is no result");
                formNotFound(searchlistElement);
            }
        }); 
}



const formListOfusers = (users) => {
    let searchlistElement = document.getElementById("searchlistId");
    users.map( item => {
        let liElement = document.createElement('li');
        let textNode = document.createTextNode(item.name);
        liElement.appendChild(textNode);
        searchlistElement.appendChild(liElement);
    });

   
    if(users.length > 0)
    {
        formBottomActionBar(users);
    }
}

const formBottomActionBar = (users) => 
{
    let buttonDivContainer = document.getElementById("buttonContainer");
    let searchlistElement = document.getElementById("searchlistId");
    buttonDivContainer.innerHTML = "";

    let height = searchlistElement.clientHeight;
    let requiredHeight = users.length * 30;

    if(height > requiredHeight)
    {
        let prevButton = createButton("prev", "button1");
        let nextButton = createButton("next", "button2");
        buttonDivContainer.appendChild(prevButton);
        buttonDivContainer.appendChild(nextButton);
    }
    else
    {
        let noOfPagesRequired = Math.ceil(requiredHeight / height);
        let prevButton = createButton("prev", "button1");
        buttonDivContainer.appendChild(prevButton);
        for(let index = 1; index <= noOfPagesRequired - 1; index++ )
        {
            let button = createButton(index.toString(), "button" + index);
            buttonDivContainer.appendChild(button);
        }
        let nextButton = createButton("next", "button2");
        buttonDivContainer.appendChild(nextButton);
    }
}

const createButton = (content, id) =>{

    let button = document.createElement('button');
    button.textContent = content;
    button.id = id;
    button.className = "buttonClass";
    button.addEventListener('click', ()=> alert("Het clicked on a button"));
    return button;
} 

const formNotFound = () => {
    let searchlistElement = document.getElementById("searchlistId");
    const notFoundDivElement = document.getElementById("notFound");
    searchlistElement.style.display = "none";   
    notFoundDivElement.style.display = "inline-block"
}

const fetchStudentDetails = async (value) => {

    let getUrl = GetStudentDetailsApi(value);
    return fetch(getUrl)        
    .then( async response => {
        const responseData = await response.json();
        console.log(responseData);
        return new Promise((resolve, reject) => {
            resolve(
                {
                    result: responseData,
                    error: ""
                }
            )});  
    })
    .catch(error => {  
        return new Promise((resolve, reject) => {
            resolve(
                {
                    result: [],
                    error : error.message
                }
        )});
    });
}

const GetStudentDetailsApi = (value) => {
    let url = new URL("https://reqres.in/api/products");
    Object.keys({login: value}).forEach(key => url.searchParams.append("login", value));
    return url;
}
