window.onload = function() {

    let isFocused = false;
    let isSelected = false;
    const container = document.getElementById('container');

    const onStarFocus = (event) => {
        
        if(isSelected === false)
        {
            isFocused = true;
            const starId = event.target.id;
            console.log("Print the id", starId);
            for(let index = 0; index < parseInt(starId) + 1; index++)
            {
                const element = document.getElementById(index.toString());
                element.style.background = 'red';
            }
        }
    }

    const onLeaveFocus = (event) => {

        if(isFocused && isSelected === false)
        {
            const starId = event.target.id;
            console.log("Print the id", starId);
            for(let index = 0; index < parseInt(starId) + 1; index++)
            {
                const element = document.getElementById(index.toString());
                element.style.background = 'none';
            }
            isFocused = false;
        }
    }

    const onStartSelected = (event) => {
        if(isFocused) isFocused = false;
        // isSelected = true;
        event.preventDefault();
        let noOfChildren = container.children.length;

        for(let index = 0; index <  noOfChildren; index++)
        {
            const element = document.getElementById(index);
            element.style.background = 'none';
        }

        const starId = event.target.id;
        for(let index = 0; index <  parseInt(starId) + 1; index++)
        {
            const element = document.getElementById(index);
            element.style.background = 'red';
        }
    }
    for(let index = 0; index < 5; index++ ){
        const divElement = document.createElement('div');
        divElement.id = index;
        divElement.classList.add(['star-five']);
        // divElement.style.height = 200 + 'px';
        // divElement.style.width = 200 + 'px';
        // divElement.style.border = '1px solid red';
        divElement.addEventListener('mouseover', onStarFocus);
        divElement.addEventListener('mouseleave', onLeaveFocus);
        divElement.addEventListener('click', onStartSelected);
        console.log("Print container", container.children);
        container.appendChild(divElement);
    }

   
}